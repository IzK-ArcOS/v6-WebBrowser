> [!IMPORTANT]
> When you're done reading this file, just replace its content with some of your own. You don't _need_ a README, but it would be fun.

# v6-App
The built-in app template for ArcOS v6

## What do I do?
> [!IMPORTANT]
> When renaming variables, functions or objects, use F2 to rename it, this prevents broken imports. After renaming, check for unsaved files.

Before doing anything else, change this stuff:
- The name of the class in [runtime.ts](./ts/runtime.ts) to a unique name (preferrably using the ID of the app)
- The name and data of the object in [app.ts](./ts/app.ts) to the properties of the app (use F2 to rename the object)
- The contents of this README file (**after you're done reading it** ofcourse)

## What's next?
Well, begin writing your application! Use references from the parent codebase to access stuff like the File System. One thing though, try to put _all_
the logic in the Runtime class instead of in global files. Otherwise it could interfere with the whole PIDs thing. This does mean that the Runtime will
become quite big, oh well.

### Assets
Assets that are only used by this app can be put in the [assets/](./assets/) directory. Then use the Svelte way of importing the images and assets.

If the asset is referenced by other apps as well, it's possible that it's already in the parent codebase. Check this to make sure you're not uploading duplicate images.

### App.svelte
The [App.svelte](./App.svelte) file can have two major exports:
- `export let pid: number`: The PID of the process, will also be passed to the Runtime in the window renderer,
- `export let app: App`: The current process' forked app data. Changing anything here will immediately update the process.

### main.css
Please use scoped rulesets to only modify the content of _your_ application, leaving the rest of the codebase untouched:

```css
window#appTemplate > div.foo > div.bar {
  la: dee, da;
}
```