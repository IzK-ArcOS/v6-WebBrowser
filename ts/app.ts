import { DefaultIcon } from "$ts/images/apps";
import { Runtime } from "./runtime";
import AppSvelte from "../App.svelte";
import { App } from "$types/app";

export const app: App = {
  metadata: {
    name: "App Template",
    description: "This is an app template",
    author: "The ArcOS Team",
    version: "0.0.0",
    icon: DefaultIcon
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "appTemplate",
  size: { w: 0, h: 0 },
  minSize: { w: 0, h: 0 },
  maxSize: { w: 0, h: 0 },
  pos: { x: 0, y: 0 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false
  },
  controls: {
    minimize: false,
    maximize: false,
    close: false
  }
}