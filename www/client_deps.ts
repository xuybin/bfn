export * from "../runtime/mod.ts";
import { IS_BROWSER } from "../runtime/mod.ts";
import { apply, setup, tw } from "https://esm.sh/twind@0.16.16";
export { apply, setup, tw };
if (IS_BROWSER) {
  setup({});
}
