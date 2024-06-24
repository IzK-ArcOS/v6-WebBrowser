<script lang="ts">
  import { App } from "$types/app";
  import "./css/main.css";

  export let app: App;
</script>

<h1>Hello, World!</h1>
<p>Working! App {app.metadata.name}, version {app.metadata.version}.</p>
