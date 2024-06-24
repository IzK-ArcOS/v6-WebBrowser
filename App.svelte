<script lang="ts">
  let url = "";
  let status = "";
  let iframe: HTMLIFrameElement;
  let title = "";

  function loadIframe() {
    // Reset the status and iframe src
    status = "";
    iframe.src = "";

    iframe.onload = function () {
      console.log(iframe);
      status = "Iframe loaded successfully.";
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        // Attempt to access the iframe's document
        if (!iframeDoc) {
          throw new Error("Cross-origin access denied");
        }
      } catch (e) {
        status = "Iframe loaded but cross-origin access is denied.";
      }
    };

    iframe.onloadeddata = (e) => {
      console.log(e);
    };

    iframe.onerror = function () {
      status = "Iframe failed to load.";
    };

    // Set the new URL to the iframe
    iframe.src = url;
  }
</script>

<div class="container">
  <input type="text" bind:value={url} placeholder="Enter URL" />
  <button on:click={loadIframe}>Load Iframe</button>
  <br />
  <iframe id="iframe" width="600" height="400" {title} bind:this={iframe}></iframe>
  <div class="status">{status}</div>
</div>

<style>
  .container {
    padding: 1em;
  }

  .status {
    margin-top: 1em;
    font-weight: bold;
  }
</style>
