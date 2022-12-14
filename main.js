const $ = (selector)=>document.querySelector(selector)

const $btnHambur = $(".navbar-burger");
const $navBarEnd = $(".navbar-menu");



const toggleIsActive = ()=>{
    $navBarEnd.classList.toggle("is-active")
    $btnHambur.classList.toggle("is-active");
}

// eventos

$btnHambur.addEventListener("click",toggleIsActive)
//

