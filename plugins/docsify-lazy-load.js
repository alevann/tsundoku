(function () {
  const loadScript = src => {
    const loaded = document.querySelector(`script[src="${src}"]`)
    if (loaded) {
      return new Promise(resolve => {
        resolve(loaded)
      })
    }

    const script = document.createElement('script')
    script.src = src
    document.body.append(script)

    return new Promise(resolve => {
      script.addEventListener('load', () => {
        resolve(script)
      })
    })
  }

  const lazyLoad = function (hook) {
    hook.beforeEach(async function (markdown, next) {
      const promises = []
      markdown.split('\n')
        .map(line => {
          const match = line.match(/.*<!--\s*lazy:(.*)\s*-->/)
          if (match) {
            promises.push(loadScript(match[1].trim()))
          }
          return line
        })
        .join('\n')

      await Promise.all(promises)
      next(markdown)
    })
  }

  $docsify = $docsify ?? {}
  $docsify.plugins = [].concat($docsify.plugins ?? [], lazyLoad)
})()
