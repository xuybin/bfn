import * as $0 from "https://crux.land/api/get/3CndLQ.tsx";
import * as $$0 from "https://crux.land/api/get/58f5Ks.tsx";
import * as $1 from "https://crux.land/api/get/5xqh7b.ts";

import { start } from "../server/mod.ts";
const manifest = {
  routes: {
    // visit '/'
    "./routes/index.tsx": {
      url: "https://crux.land/api/get/3CndLQ.tsx",
      module: $0,
    },
    // visit '/a1.css'
    "./routes/a1.css.ts": {
      url: "https://crux.land/api/get/5xqh7b.ts",
      module: $1,
    },
  },
  islands: {
    "./islands/Counter.tsx": {
      url: "https://crux.land/api/get/58f5Ks.tsx",
      module: $$0,
    },
  },
  static: {
    "/favicon.ico": "./static/favicon.ico",
    "/favicon2.ico": "https://deno.land/favicon.ico",
    "/a2.css":
      "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.1.1/css/fontawesome.css",
  },
  baseUrl: import.meta.url,
};

export default manifest;

if (import.meta.main) {
  await start(manifest);
}
