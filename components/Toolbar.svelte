<script lang="ts">
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { currentUrl, historyPointer, history } = runtime;

  let url = "";

  function go() {
    $currentUrl = url;
    runtime.Go();
    url = "";
  }
</script>

<div class="toolbar">
  <div class="navigation">
    <button
      class="material-icons-round"
      on:click={() => runtime.goBack()}
      disabled={$historyPointer <= 0}
    >
      arrow_back_ios_new
    </button>
    <button
      class="material-icons-round"
      on:click={() => runtime.goForward()}
      disabled={$historyPointer >= $history.length - 1}
    >
      arrow_forward_ios
    </button>
    <button class="material-icons-round" on:click={() => runtime.refresh()}>refresh</button>
  </div>
  <input
    type="text"
    placeholder="Where do you want to go today?"
    bind:value={url}
    class="addressbar"
  />
  <button on:click={go} disabled={!url} class="material-icons-round">launch</button>
</div>
