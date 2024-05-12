import type { BunPlugin } from 'bun'
import browersTarget from './browserslist'

function cssPlugin(): BunPlugin {
  return {
    name: 'bun-plugin-css',
    async setup(build) {
      const { compileString } = await import('sass')
      const { transform } = await import('lightningcss')

      // when a .scss|css file is imported...
      build.onLoad({ filter: /\.(scss|css)$/ }, async (args) => {
        // read and parse the file
        let text = await Bun.file(args.path).text()
        if (args.path.endsWith('.scss')) {
          text = compileString(text).css
        }

        const { code } = transform({
          code: Buffer.from(text),
          filename: args.path,
          minify: true,
          targets: browersTarget,
        })

        // and returns it as a module
        return {
          exports: {
            content: code.toString(),
            default: code.toString(),
          },
          loader: 'object', // special loader for JS objects
        }
      })
    },
  }
}

export default cssPlugin
