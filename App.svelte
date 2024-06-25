<script lang="ts">
  import "./css/main.css";
  import Titlebar from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar.svelte";
  import Toolbar from "./components/Toolbar.svelte";
  import WebPage from "./components/WebPage.svelte";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;
  export let pid: number;

  const { appMutator: app } = runtime;
</script>

<Titlebar {pid} {app} />
<Toolbar {runtime} />
<WebPage {runtime} />
