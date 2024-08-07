// back to top button
let mybutton = document.getElementById("toTopButton");
window.onscroll = function() {scrollFunction()};

mybutton.style.display = "none";

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}