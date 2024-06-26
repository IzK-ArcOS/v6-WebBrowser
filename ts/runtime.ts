import { AppRuntime } from "$ts/apps/runtime";
import { GlobeIcon, SpinnerIcon } from "$ts/images/general";
import { Process } from "$ts/process";
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
  public history = Store<string[]>([]);
  public historyPointer = Store<number>(-1);

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
  }

  public async navigate(url: string) {
    this.loadError.set(false);

    if (!url) return;

    this.loading.set(true);
    this.loadStart.set(performance.now());

    if (!this.iframe) return;

    this.iframe.src = "";

    const loadable = await this.checkIfLoadable(url);

    if (!loadable && this.isHttpUrl.get()) {
      this.loadError.set(true);
      this.loading.set(false);
      return;
    }

    this.iframe.src = url;
  }

  public async Go() {
    const address = this.currentUrl.get();

    this.addToHistory(address);
    this.navigate(address);
  }

  public refresh() {
    this.currentUrl.set(this.iframe.src);
    this.Go();
  }

  private _registerEventListeners() {
    if (!this.iframe) return;

    this.iframe.addEventListener("load", () => {
      this.currentUrl.set(this.iframe.getAttribute("src"));
      this.loading.set(false);

      this.loadEnd.set(performance.now());
      this.loadDuration.set(this.loadEnd.get() - this.loadStart.get());
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

    setTimeout(() => {
      const args = this.process.args;

      if (!args.length || typeof args[0] !== "string") return;

      this.navigate(args[0]);
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

  public truncateForwardHistory() {
    const historyPointer = this.historyPointer.get();
    let history = this.history.get();

    if (historyPointer < history.length - 1) {
      history = history.slice(0, historyPointer + 1);
    }

    this.history.set(history);
  }

  public addToHistory(url: string) {
    const history = this.history.get();
    let pointer = this.historyPointer.get();

    history.push(url);
    pointer++;

    this.historyPointer.set(pointer);
    this.history.set(history);
  }

  public goBack() {
    const history = this.history.get();
    let pointer = this.historyPointer.get();

    if (pointer > 0) {
      pointer--;

      this.historyPointer.set(pointer);
      this.navigate(history[pointer]);
    }
  }

  public goForward() {
    const history = this.history.get();
    let pointer = this.historyPointer.get();

    if (pointer < history.length - 1) {
      pointer++;

      this.historyPointer.set(pointer);
      this.navigate(history[pointer]);
    }
  }
}
