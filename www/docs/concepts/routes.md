> TODO(lucacasonato): complete this page

At it's core, routes describe how a request for a given path should be handled,
and what the response should be. To do this, routes have two main parts: the
handler, and the component. A route can have either one, or both, but never
neither.

The handler is a function that is called for every request to the route. It
needs to return a response that is then sent to the client. The response could
be anything: a plain text string, a JSON object, an HTML page, a WebSocket
connection, a streaming file, or pretty much anything else. The handler is
passed a `render` function that it can call to invoke rendering the component.

The component is the template for a page. It is a JSX element that is rendered
on the server. The page component gets passed props that can be used by it to
determine exactly what should be rendered. By default the request URL, the
matches from the URL pattern match, and any data passed to the handler's
`render` function are passed to the component as props.

Let's look at a basic route that returns a plain text string:

```tsx
// routes/plain.tsx

import { HandlerContext, Handlers } from "../server_deps.ts";

export const handler: Handlers = {
  GET(ctx: HandlerContext) {
    return new Response("Hello World");
  },
};
```

To define a handler, one needs to export a `handler` function or object from the
route module. If the handler is an object, each key in the object is the name of
the HTTP method that the handler should be called for. For example the `GET`
handler above is called for `GET` requests. If the handler is a function, it is
called for all requests regardless of the method.

Now, let's render some HTML using the route component. Another example:

```tsx
// routes/html.tsx

/** @jsx h */
import { h, PageProps } from "../client_deps.ts";

export default function Page(props: PageProps) {
  return <div>You are on the page '{props.url.href}'.</div>;
}
```

The page component needs to be the default export of the route module. It is
passed props that can be used to render the page.

As you can see in the second example, if no handler is explicitly defined a
default handler is used that just renders out the page component if present. You
can also override the default handler though to modify how exactly rendering
should work.

In the below example, a custom handler is used to add a custom header to the
response after rendering the page component.

```tsx
// routes/html.tsx

/** @jsx h */
import { h, PageProps } from "../client_deps.ts";
import { HandlerContext, Handlers } from "../server_deps.ts";

export const handler: Handlers = {
  GET(ctx: HandlerContext) {
    const resp = ctx.render();
    resp.headers.set("X-Custom-Header", "Hello World");
    return resp;
  },
};

export default function Page(props: PageProps) {
  return <div>You are on the page '{props.url.href}'.</div>;
}
```
