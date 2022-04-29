function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const bodyBg = document.querySelector("body");

const start = document.querySelector("[data-start]")

const stop = document.querySelector("[data-stop]")

const changeColor = function () {
  const color = getRandomHexColor();
  bodyBg.style.backgroundColor = color;
};

let timer;


start.addEventListener("click", () => {
  start.disabled = true;
  timer=setInterval(() => { changeColor() }, 1000);
});


stop.addEventListener("click", () => {
  start.disabled = false;
  clearInterval(timer)
})

