var menuitems = document.getElementById("menuitems")

menuitems.style.maxHeight = "0px"

function menutoggle() {
  if (menuitems.style.maxHeight == "0px") {
    menuitems.style.maxHeight = "500px"
  } else {
    menuitems.style.maxHeight = "0px"
  }
}

var loader = document.getElementById("preloader")

window.addEventListener("load", function () {
  loader.style.display = "none"
})

//
var slideIndex = 0
showSlides()

function showSlides() {
  var i
  var slides = document.getElementsByClassName("mySlides")
  var dots = document.getElementsByClassName("dot")
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slideIndex++
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "")
  }
  slides[slideIndex - 1].style.display = "block"
  dots[slideIndex - 1].className += " active"
  setTimeout(showSlides, 3000) // Change image every 2 seconds
}
//

const reviewcon = document.querySelector(".review-con")
const review = document.querySelector(".review")
const userimage = document.querySelector(".user-img")
const username = document.querySelector(".username")
const role = document.querySelector(".role")

const reviews = [
  {
    name: "divine",
    position: "Web Designer",
    photo: "/img/testi-1.png",
    Text: "We denounce with righteous indignation and dislike men who are beguiled and demoralized by the charms of pleasures that moment, so blinded by desires, that they cannot foresee",
  },
  {
    name: "Deborah",
    position: "Fashion Designer",
    photo: "/img/testi-2.png",
    Text: "beguiled and demoralized by the charms of pleasures that moment, so",
  },
  {
    name: "Emmanuella",
    position: "Ui designer",
    photo: "/img/testi-3.png",
    Text: " are beguiled and demoralized by the charms of pleasures that moment, so blinded by desires, that they cannot foresee",
  },
]

let idx = 1

function updatereviews() {
  const { name, position, photo, Text } = reviews[idx]

  review.innerHTML = Text
  userimage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  idx++

  if (idx > reviews.length - 1) {
    idx = 0
  }
}

setInterval(updatereviews, 10000)

// var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select")
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0]
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV")
  a.setAttribute("class", "select-selected")
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  x[i].appendChild(a)
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV")
  b.setAttribute("class", "select-items select-hide")
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV")
    c.innerHTML = selElmnt.options[j].innerHTML
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h
      s = this.parentNode.parentNode.getElementsByTagName("select")[0]
      h = this.parentNode.previousSibling
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i
          h.innerHTML = this.innerHTML
          y = this.parentNode.getElementsByClassName("same-as-selected")
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class")
          }
          this.setAttribute("class", "same-as-selected")
          break
        }
      }
      h.click()
    })
    b.appendChild(c)
  }
  x[i].appendChild(b)
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation()
    closeAllSelect(this)
    this.nextSibling.classList.toggle("select-hide")
    this.classList.toggle("select-arrow-active")
  })
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    arrNo = []
  x = document.getElementsByClassName("select-items")
  y = document.getElementsByClassName("select-selected")
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active")
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide")
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect)

//

const carousel = document.querySelector(".carousel")
const firstImg = carousel.querySelectorAll("img")[0]
arrowIcons = document.querySelectorAll(".wrapper i")

let isDragStart = false, isDragging = false,
  prevPageX,
  prevScrollleft, positionDiff

let firstImgwidth = firstImg.clientWidth + 14
let scrollwidth = carousel.scrollWidth - carousel.clientWidth

const showHideIcons = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block"
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollwidth ? "none" : "block"
}
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstImgwidth : firstImgwidth
    setTimeout(() => showHideIcons(), 60)
  })
})

const autoSlide = () => {
  if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth))return
  positionDiff = Math.abs(positionDiff)
  let firstImgwidth = firstImg.clientWidth + 14
  let valDifference = firstImgwidth - positionDiff

  if (carousel.scrollLeft > prevScrollleft) {
    return carousel.scrollLeft += positionDiff > firstImgwidth / 3 ? valDifference : -positionDiff
  }

    return (carousel.scrollLeft -=
      positionDiff > firstImgwidth / 3 ? valDifference : -positionDiff)

}

const dragStart = (e) => {
  isDragStart = true
  prevPageX = e.pageX || e.touches[0].pageX
  prevScrollleft = carousel.scrollLeft
}
const dragging = (e) => {
  if (!isDragStart) return
  e.preventDefault()
  isDragging = true
  carousel.classList.add("dragging")
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
  carousel.scrollLeft = prevScrollleft - positionDiff
  showHideIcons()
}

const dragStop = () => {
  isDragStart = false
  carousel.classList.remove("dragging")
  if (!isDragging) return
  isDragging = false
  autoSlide()
}
carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchmove", dragging)
carousel.addEventListener("mouseup", dragStop)

carousel.addEventListener("mouseleave", dragStop)
carousel.addEventListener("touchend", dragStop)

// Services Navbar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px"
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0"
}