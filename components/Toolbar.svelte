<script lang="ts">
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { currentUrl } = runtime;

  let url = "";

  function go() {
    $currentUrl = url;
    runtime.Go();
  }
</script>

<div class="toolbar">
  <div class="navigation">
    <button class="material-icons-round">arrow_back_ios_new</button>
    <button class="material-icons-round">arrow_forward_ios</button>
    <button class="material-icons-round">refresh</button>
  </div>
  <input
    type="text"
    placeholder="Where do you want to go today?"
    bind:value={url}
    class="addressbar"
  />
  <button on:click={go} disabled={!url} class="material-icons-round">launch</button>
</div>
