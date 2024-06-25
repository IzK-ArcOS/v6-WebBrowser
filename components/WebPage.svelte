<script lang="ts">
  import { onMount } from "svelte";
  import { Runtime } from "../ts/runtime";
  import LoadError from "./WebPage/LoadError.svelte";

  export let runtime: Runtime;

  const { loadError } = runtime;

  let iframe: HTMLIFrameElement;

  onMount(() => {
    runtime.initialize(iframe);
  });

  function context(e: MouseEvent) {
    e.preventDefault();
  }
</script>

<div class="webpage">
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe bind:this={iframe} class:visible={!$loadError} on:contextmenu={context}></iframe>
  {#if $loadError}
    <LoadError {runtime} />
  {/if}
</div>
