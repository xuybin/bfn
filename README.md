# bfn

A web framework, used like function

The web framework [compatible with fresh](https://bfn-fresh.deno.dev/),fork from fresh

[Fresh](https://fresh.deno.dev/) is a web framework that lets you build projects very fast, highly dynamic,
and without the need of a build step. Fresh embraces isomorphic JavaScript like
never before. Write a JSX component, have it render on the edge just-in-time,
and then enhance it with client side JS for great interactivity.

Fresh does not have a build step - you write your code, deploy it to
[Deno Deploy](https://deno.com/deploy), and from there everything is handled by
the framework.

- No build step
- Zero config necessary
- JIT rendering on the edge
- Tiny (example is 0-3KB of runtime JS)<sup>1</sup>
- Optional client side hydration
- TypeScript out of the box
- File-system routing à la Next.js

## Install

To install, run the following command. This will add `bfn` CLI to your PATH.
Make sure to have Deno 1.12.0 or later installed.

```sh
deno install -A -f -n bfn -r https://deno.land/x/bfn/cli/mod.ts
```

### Usage

Start the project:

```sh
bfn new ./project
```

To now start the project:

```
bfn start ./project/routes.ts
```
Or

To start remote project with `bfn`:

```
bfn start --port=8080 https://deno.land/x/bfn/templet/edge.ts
```

To start remote project with `deno`:

```
deno run -A  https://deno.land/x/bfn/cli/start.ts --port=8080 https://deno.land/x/bfn/templet/edge.ts
```

To start remote project with `Deno Deploy`:

```
# Input this url in Deploy URL button
https://deno.land/x/bfn/templet/edge.ts
```