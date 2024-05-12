import dts from 'bun-plugin-dts'

await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    external: ['lightningcss','sass'],
    target: 'bun',
    plugins: [dts()]
})

