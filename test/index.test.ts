import { test, expect } from "bun:test";
import CSSPlugin from "../src";

test('build', async()=>{
  await Bun.build({
    entrypoints: ['./test/test.ts'],
    outdir: './test/dist',
    plugins: [CSSPlugin()],
  })
})