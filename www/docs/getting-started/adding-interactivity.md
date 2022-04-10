Up to now none of the pages in the demo project have contained any client side
JavaScript. This is great for resiliency and performance, but it can also limit
the possibilities of interactivity. In many current generation web frameworks,
you get the choice of shipping no JavaScript to the client, or shipping a
renderer for the entire page.

This is not very flexible, especially considering that most pages will only have
small pieces of content that require interactivity. For example a otherwise
static page might need a little bit of JavaScript to power a image carousel or
"buy now" button. This model is often called
[islands architechture][islands-architechture]. This refers to a page having
little "islands" of interactivity, in a sea of otherwise static content.

`fresh` embraces this model. All pages are rendered server side, but you can
create "island components" that are _also_ rendered client side. To do this,
`fresh` projects have a special `islands/` folder. The modules in this folder
each encapsulate a single island component. The name of the module should be the
pascal case name of the island component. For example a counter component would
be defined in the file `islands/Counter.tsx`. A buy now button would be defined
in the file `islands/BuyNowButton.tsx`.

Here is an example of an island component that counts down to a specific time.

```tsx
// islands/Countdown.tsx

/** @jsx h */
import { h, useEffect, useMemo, useState } from "../client_deps.ts";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

// The target date is passed as a string instead of as a `Date`, because the
// props to island components need to be JSON (de)serializable.
export default function Countdown(props: { target: string }) {
  const target = new Date(props.target);
  const [now, setNow] = useState(new Date());

  // Set up an interval to update the `now` date every second with the current
  // date as long as the component is mounted.
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      if (now > target) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [props.target]);

  // If the target date has passed, we stop counting down.
  if (now > target) {
    return <span>🎉</span>;
  }

  // Otherwise, we format the remaining time using `Intl.RelativeTimeFormat` and
  // render it.
  const secondsLeft = Math.floor((target.getTime() - now.getTime()) / 1000);
  return <span>{timeFmt.format(secondsLeft, "seconds")}</span>;
}
```

To include this in a page component, one can just use the component normally.
Fresh will take care of automatically mounting the island component on the
client with the correct props:

```tsx
// routes/countdown.tsx

/** @jsx h */
import { h } from "../client_deps.ts";
import { Countdown } from "../islands/Countdown.tsx";

export default function Page() {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return (
    <p>
      The big event is happening <Countdown target={date.toISOString()} />.
    </p>
  );
}
```

Before trying this out, one must run `fresh manifest` again to update the
`fresh.gen.ts` file with the new island component. Just like routes, island
components need to be registered in the manifest file. This means that
`fresh manifest` needs to be run every time a new island component is added,
removed, or renamed.

[islands-architechture]: https://jasonformat.com/islands-architecture
