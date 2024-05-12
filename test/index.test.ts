import { test } from "bun:test";
import CSSPlugin from "../src";

test("css loader", async () => {
  const plugin = CSSPlugin();
  await Bun.plugin(plugin);
  const scss = await import("./test.scss");
  console.log(scss);
  Bun.plugin.clearAll();
});
