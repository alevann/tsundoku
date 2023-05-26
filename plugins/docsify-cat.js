(function () {

  const createCat = () => {
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

    const img = document.createElement('img')
    img.style.position = 'absolute'
    img.style.left = `calc(50vw - ${imgWidth}px)`
    img.style.top = `calc(50vh - ${imgHeight}px)`
    img.style.width = `${imgWidth}px`
    img.style.height = `${imgHeight}px`
    img.src = '/docs/.assets/funny-cat.gif'
    img.alt = 'funny cat gif'
    img.className = 'funny-cat-gif-query-selector-class'
    bounceBody.appendChild(img)

    return container
  }

  const reset = () => {
    const catImage = catRef.querySelector('.funny-cat-gif-query-selector-class')
    if (!catImage) {
      return
    }

    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    pause =
      width <= catImage.getBoundingClientRect().width ||
      height <= catImage.getBoundingClientRect().height;

    catImage.style.left = `100px`
    catImage.style.top = `100px`
  }

  let catRef = null
  let intRef = null
  const FPS = 60

  let width
    , height
    , velocityX = 2
    , velocityY = 2
    , pause = true

  const imgHeight = 169.3
  const imgWidth = 213.3

  const setupCat = () => {
    if (!catRef) {
      catRef = createCat()
    }
    catRef.style.visibility = 'visible'
    reset()
    window.addEventListener('resize', reset, true)

    intRef = setInterval(() => {
      if (pause) return;

      const catImage = catRef.querySelector('.funny-cat-gif-query-selector-class')
      let rect = catImage.getBoundingClientRect()

      let left = rect.x
      let top = rect.y

      if (left + rect.width >= width || left <= 0) {
        velocityX = -velocityX
      }

      if (top + rect.height >= height || top <= 0) {
        velocityY = -velocityY
      }

      catImage.style.left = rect.x + velocityX + 'px'
      catImage.style.top = rect.y + velocityY + 'px'
    }, 1000 / FPS)
  }

  const cleanupCat = () => {
    clearInterval(intRef)

    if (!catRef) {
      return
    }
    catRef.style.visibility = 'hidden'
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
