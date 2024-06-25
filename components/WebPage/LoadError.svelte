<script lang="ts">
  import { Runtime } from "$apps/WebBrowser/ts/runtime";
  import { WarningIcon } from "$ts/images/dialog";

  export let runtime: Runtime;

  const { currentHostname } = runtime;
</script>

<div class="load-error">
  <img src={WarningIcon} alt="" />
  <div class="content">
    <h3 class="title">Couldn't connect!</h3>
    <p>
      ArcOS couldn't connect to the server at {$currentHostname}. This page might not work here.
      Please check the URL and try again.
    </p>
  </div>
</div>
