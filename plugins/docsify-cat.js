(function () {

  const createCatContainer = () => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    document.body.appendChild(container)

    const bounceBody = document.createElement('div')
    bounceBody.style.width = '100vw'
    bounceBody.style.height = '100vh'
    bounceBody.style.position = 'relative'
    bounceBody.style.overflow = 'hidden'
    container.appendChild(bounceBody)

    return [container, bounceBody]
  }

  const createCat = (bounceBody) => {
    const img = document.createElement('img')
    img.style.position = 'absolute'
    img.style.left = `0`
    img.style.top = `0`
    img.style.width = `${imgWidth}px`
    img.style.height = `${imgHeight}px`
    img.src = '/docs/.assets/funny-cat.gif'
    img.alt = 'funny cat gif bouncing around'
    bounceBody.appendChild(img)

    return img
  }

  const reset = () => {
    if (!catContainer) {
      return
    }

    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    catRef.forEach(cat => cat.style.left = `${Math.floor(Math.random() * (width - imgWidth - 1)) + 20}px`)
    catRef.forEach(cat => cat.style.top = `${Math.floor(Math.random() * (height - imgHeight - 1)) + 20}px`)
  }

  let catContainer = null
  let catRef = []
  let intRef = null
  const FPS = 60

  let width
    , height

  const imgHeight = 101.6
  const imgWidth = 128

  const catTick = () => {
    catRef.forEach(cat => {
      let rect = cat.getBoundingClientRect()

      let left = rect.x
      let top = rect.y

      if (left + rect.width >= width || left <= 0) {
        cat.velocityX = -cat.velocityX
      }

      if (top + rect.height >= height || top <= 0) {
        cat.velocityY = -cat.velocityY
      }

      cat.style.left = rect.x + cat.velocityX + 'px'
      cat.style.top = rect.y + cat.velocityY + 'px'
    })
  }

  const setupCat = () => {
    if (!catContainer) {
      const [container, bounceBody] = createCatContainer()
      for (let i = 0; i < 3; i++) {
        const ref = createCat(bounceBody)
        const spd = Math.floor(Math.random() * 5) + 2
        ref.velocityX = Math.random() > .5 ? spd : -spd
        ref.velocityY = Math.random() > .5 ? spd : -spd
        catRef.push(ref)
      }
      catContainer = container
    }
    catContainer.style.visibility = 'visible'
    reset()
    window.addEventListener('resize', reset, true)

    intRef = setInterval(catTick, 1000 / FPS)
  }

  const cleanupCat = () => {
    clearInterval(intRef)

    if (!catContainer) {
      return
    }
    catContainer.style.visibility = 'hidden'
    window.removeEventListener('resize', reset)
  }

  const cat = function (hook) {
    hook.afterEach(function (html, next) {
      if (window.location.hash.endsWith('funny-cat-gif')) {
        setupCat()
      } else {
        cleanupCat()
      }
      next(html)
    })
  }

  $docsify = $docsify ?? {}
  $docsify.plugins = [].concat($docsify.plugins ?? [], cat)
})()
