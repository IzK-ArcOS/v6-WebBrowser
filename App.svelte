<script lang="ts">
  import axios from "axios";

  let url = "";
  let iframe: HTMLIFrameElement;
  let title = "";
  let loadable = true;

  async function loadIframe() {
    iframe.src = "";
    loadable = true;

    window.addEventListener("error", (e) => {
      console.log(e.error, e.message);
    });
    iframe.addEventListener("error", (e) => {
      console.log(e.message, e.error);
    });

    loadable = await checkIfLoadable(url);

    if (loadable) iframe.src = url;
  }

  async function checkIfLoadable(url: string) {
    try {
      const res = await axios.post("https://ifc.izaak-kuipers.workers.dev", { url });

      return res.data.canLoadInIframe;
    } catch {
      return false;
    }
  }
</script>

<div class="container">
  <input type="text" bind:value={url} placeholder="Enter URL" />
  <button on:click={loadIframe}>Load Iframe</button>
  <br />
  <iframe id="iframe" width="600" height="400" {title} bind:this={iframe}></iframe>
  {#if !loadable}
    <h1>Can't load!</h1>
  {/if}
</div>
