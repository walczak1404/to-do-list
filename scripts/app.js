const test = document.querySelector(".test");

test.addEventListener("contextmenu", event => {
   event.preventDefault();

   console.log("git");
})