import { AppRuntime } from "$ts/apps/runtime";
import { GlobeIcon, SpinnerIcon } from "$ts/images/general";
import { Process } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import axios from "axios";

export class Runtime extends AppRuntime {
  public isHttpUrl = Store<boolean>(true);
  public currentUrl = Store<string>("");
  public currentHostname = Store<string>();
  public loading = Store<boolean>(false);
  public loadError = Store<boolean>(false);
  public iframe: HTMLIFrameElement;
  public loadStart = Store<number>(0);
  public loadEnd = Store<number>(0);
  public loadDuration = Store<number>(0);

  private _initialized = false;

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    this.currentUrl.subscribe((v) => {
      if (!v) return;

      this.isHttpUrl.set(true);
      let hostname = "";

      try {
        hostname = new URL(v).hostname;
      } catch {
        hostname = "localhost";
        this.isHttpUrl.set(false);
      }

      this.currentHostname.set(hostname);
    });

    const args = process.args;

    if (!args.length || typeof args[0] !== "string") return;

    this.currentUrl.set(args[0]);
  }

  public async Go() {
    const address = this.currentUrl.get();

    this.loadError.set(false);

    if (!address) return;

    this.loading.set(true);
    this.loadStart.set(performance.now());

    if (!this.iframe) return;

    const loadable = await this.checkIfLoadable(address);

    if (!loadable && this.isHttpUrl.get()) {
      this.loadError.set(true);
      this.loading.set(false);
      return;
    }

    this.iframe.src = address;
  }

  private _registerEventListeners() {
    if (!this.iframe) return;

    this.iframe.addEventListener("load", () => {
      this.loading.set(false);

      this.loadEnd.set(performance.now());
      this.loadDuration.set(this.loadEnd.get() - this.loadStart.get());

      createErrorDialog(
        {
          title: this.iframe.src,
          message: this.loadDuration.get().toString(),
          buttons: [{ caption: "Okay", action() {} }],
        },
        this.pid,
        true
      );
    });
  }

  public initialize(iframe: HTMLIFrameElement) {
    if (!iframe || this._initialized) return;

    this.iframe = iframe;
    this._registerEventListeners();
    this._initialized = true;

    this.loading.subscribe((v) => {
      console.log(v ? "Loading" : "No longer loading");
      const app = this.appMutator.get();

      app.metadata.icon = v ? SpinnerIcon : GlobeIcon;

      this.appMutator.set(app);
    });

    this.currentUrl.subscribe((v) => {
      this.setWindowTitle(v, false);
    });
  }

  public async checkIfLoadable(url: string) {
    try {
      const res = await axios.post("https://ifc.izaak-kuipers.workers.dev", { url });

      return res.data.canLoadInIframe;
    } catch (e) {
      return true;
    }
  }
}
