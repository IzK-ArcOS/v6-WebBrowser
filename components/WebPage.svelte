<script lang="ts">
  import { onMount } from "svelte";
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { loadError } = runtime;

  let iframe: HTMLIFrameElement;

  onMount(() => {
    runtime.initialize(iframe);
  });
</script>

<div class="webpage">
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe bind:this={iframe} class:visible={!$loadError}></iframe>
</div>
