/* Hamburger */
const nav = document.querySelector('.nav')
// const navList = document.querySelector('.nav__list')
const hamburgerBtn = document.querySelector('.nav__hamburger')
const toggleNav = () => {
    nav.classList.toggle('active')
    document.querySelector('.nav__list').classList.toggle('active')
    hamburgerBtn.classList.toggle('active')
    hamburgerBtn.classList.toggle('elem-rotate')
}
hamburgerBtn.addEventListener('click', toggleNav)
/* Navigation background */
document.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        nav.classList.add('darkbg')
    } else {
        nav.classList.remove('darkbg')
    }
})
/* Scrolling on click */
document.querySelectorAll('.nav__list-item').forEach((element) => {
    element.addEventListener('click', () => {
        if (window.outerWidth < 768 || window.outerHeight < 500) {
            toggleNav()
            // It's due to trasition on navList
            setTimeout(() => {
                window.scroll({
                    top: document.querySelector('.' + element.getAttribute('data-destination')).offsetTop - nav.offsetHeight,
                    left: 0,
                    behavior: 'smooth'
                })
            }, 410)
        } else {
            window.scroll({
                top: document.querySelector('.' + element.getAttribute('data-destination')).offsetTop - nav.offsetHeight,
                left: 0,
                behavior: 'smooth'
            })
        }
    })
})

/* Rhombuses */
document.querySelectorAll('.process__image-wrapper').forEach((element) => {
    element.addEventListener('click', () => document.querySelector('.process__image-wrapper[data-id="' + element.getAttribute('data-id') + '"] .process__text-wrapper').classList.toggle('active'))
})

/* Owl carousel */
const carouselItems = document.querySelectorAll('.team__carousel-item')
const carouselItemsClassNames = ['left', 'middle', 'right']
if (carouselItems.length > 3) {
    while (carouselItems.length !== carouselItemsClassNames.length) {
        carouselItemsClassNames.push('hidden')
    }
}

const carouselTurnLeft = () => {
    for (let i = 0; i < carouselItems.length; i++) {
        if (i <= 0) {
            carouselItems[i].classList.replace(carouselItemsClassNames[i], carouselItemsClassNames[carouselItemsClassNames.length - 1])
        } else {
            carouselItems[i].classList.replace(carouselItemsClassNames[i], carouselItemsClassNames[i - 1])
        }
    }
    carouselItemsClassNames.unshift(carouselItemsClassNames.splice(carouselItemsClassNames.length - 1, 1))
    carouselClearEventListeners()
}

const carouselTurnRight = () => {
    for (let i = 0; i < carouselItems.length; i++) {
        if (i >= carouselItems.length - 1) {
            carouselItems[i].classList.replace(carouselItemsClassNames[i], carouselItemsClassNames[0])
        } else {
            carouselItems[i].classList.replace(carouselItemsClassNames[i], carouselItemsClassNames[i + 1])
        }
    }
    carouselItemsClassNames.push(carouselItemsClassNames.splice(0, 1))
    carouselClearEventListeners()
}

const carouselClearEventListeners = () => {
    carouselItems.forEach((element) => {
        element.removeEventListener('click', carouselTurnRight)
        element.removeEventListener('click', carouselTurnLeft)
    })
    carouselItems.forEach((element) => {
        if (element.classList.contains('right') || element.classList.contains('middle')) element.addEventListener('click', carouselTurnLeft)
        else if (element.classList.contains('left')) element.addEventListener('click', carouselTurnRight)
    })
}
document.querySelectorAll('.team__carousel-item, .team__carousel-arrow-button').forEach((element) => {
    if (element.classList.contains('right') || element.classList.contains('middle')) element.addEventListener('click', carouselTurnLeft)
    else if (element.classList.contains('left')) element.addEventListener('click', carouselTurnRight)
})

/* Quotes switching */
let lastActiveElement = document.querySelector('.testimonials__image-wrapper--small:first-of-type')
const quoteElem = document.querySelector('.testimonials__quote')
quoteElem.style.height = quoteElem.offsetHeight + "px" // "shaking" effect fix
window.addEventListener('resize', () => {
    setTimeout(() => {
        // "shaking" effect fix
        quoteElem.style.height = 'auto'
        quoteElem.style.height = quoteElem.offsetHeight + 'px'
    }, 10);
})

function switchQuote() {
    this.removeEventListener('click', switchQuote)
    lastActiveElement.addEventListener('click', switchQuote)
    lastActiveElement.classList.toggle('active')
    lastActiveElement = this
    this.classList.toggle('active')
    const textWrapper = document.querySelector('.testimonials__text-wrapper')
    textWrapper.classList.add('active')

    const mainImage = document.querySelector('.testimonials__image--big')
    mainImage.classList.add('active')
    const mainImageSrc = mainImage.getAttribute('src')
    const letters = []

    let mainImageSrcNew = ''
    for (let i = 0; i < mainImageSrc.length; i++) {
        letters.push(mainImageSrc.charAt(i))
        if (parseInt(mainImageSrc.charAt(i)) < 9 && parseInt(mainImageSrc.charAt(i)) != NaN) {
            letters.splice(i, 1, this.getAttribute('data-id'))
        }
        mainImageSrcNew += letters[i]
    }

    setTimeout(() => {
        quoteElem.textContent = this.getAttribute('data-quote')
        document.querySelector('.testimonials__author').textContent = this.getAttribute('data-author')
        mainImage.setAttribute('src', mainImageSrcNew)
    }, 200)
    setTimeout(() => {
        textWrapper.classList.remove('active')
        mainImage.classList.remove('active')
    }, 400)
}

document.querySelectorAll('.testimonials__image-wrapper--small').forEach((element) => {
    if (element !== lastActiveElement) element.addEventListener('click', switchQuote)
})