import { GlobeIcon } from "$ts/images/general";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const WebBrowserApp: App = {
  metadata: {
    name: "Internet Explorer",
    description: "Browse the World Wide Web",
    author: "The ArcOS Team",
    version: "0.0.0",
    icon: GlobeIcon,
    appGroup: "utilities",
    dependendsOn: ["ArcShell"],
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "WebBrowserApp",
  size: { w: 700, h: 500 },
  minSize: { w: 500, h: 400 },
  maxSize: { w: 1200, h: 900 },
  pos: { x: 0, y: 0 },
  state: {
    minimized: false,
    maximized: false,
    headless: true,
    fullscreen: false,
    resizable: true,
  },
  controls: {
    minimize: true,
    maximize: true,
    close: true,
  },
  glass: true,
};
