// const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const display = document.querySelector(".display");
const colorName = document.querySelector(".color-name");
const colorNames = document.querySelectorAll(".color-names");
const colorInput = document.getElementById("colorInput");
var colorInputs = document.querySelectorAll("#colorInputs");
const checkbox = document.getElementById("checkbox");
const input = document.querySelector("#checkbox");

let condition = false;

const popUp = document.querySelector(".popup");
const Export = document.querySelector(".export");

const code = document.querySelector(".code");

// this function gives random numbers
function getRandomHue() {
  return Math.floor(Math.random() * 361);
}
function getRandomSaturation() {
  return Math.floor(Math.random() * 41) + 60;
}
function getRandomLightness() {
  return Math.floor(Math.random() * 21) + 60;
}

function hslaToHex(hsla) {
  var h = hsla[0];
  var s = hsla[1];
  var l = hsla[2];
  var a = hsla[3];

  s /= 100;
  l /= 100;

  var c = (1 - Math.abs(2 * l - 1)) * s;
  var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  var m = l - c / 2;
  var r, g, b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b;
}

// this button change colors of display, input value and background image css colors

btn.addEventListener("click", function () {
  if (popUp.className.includes("show")) {
    popUp.classList.remove("show");
  }

  colorNames.forEach((name) => {
    name.style.textTransform = "uppercase";
  });

  // this function gives random hex value like #FF0000
  function displayColor() {
    return `hsla(${getRandomHue()},100%,80%,1)`;
  }

  function displayImage() {
    return `hsla(${getRandomHue()},${getRandomSaturation()}%,${getRandomLightness()}%,1)`;
  }

  if (condition) {
    const display_Color = displayColor();

    display.style.backgroundColor = display_Color;

    var colorHslaArray = display_Color.replace(/[^\d,.]/g, "").split(",");
    var hexColor = hslaToHex(colorHslaArray);

    colorInput.value = hexColor;
    colorName.innerHTML = hexColor;
  }
  // On random btn click this array will contain 7 random colors value

  let backgroundColors = [];
  for (let i = 0; i <= 6; i++) {
    var imageHslaArray = displayImage()
      .replace(/[^\d,.]/g, "")
      .split(",");
    var hexImage = hslaToHex(imageHslaArray);
    backgroundColors.push(hexImage);
  }
  // console.log(backgroundColors);

  // This changes the location and colors of each display's background image, contains 7 colors with loaction

  let radialGradients = "";
  for (let i = 0; i < backgroundColors.length; i++) {
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);
    radialGradients += `radial-gradient(at ${x}% ${y}%, ${backgroundColors[i]} 0px, transparent 50%),`;

    colorInputs[i].value = backgroundColors[i];
    colorInputs[i].nextElementSibling.innerHTML = backgroundColors[i];
  }

  // console.log(radialGradients)

  display.style.backgroundImage = radialGradients.slice(0, -1);
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 32) {
    // Call the button click function here
    btn.click();
    event.preventDefault();
  }
});

// give color input control to dropdown btn and change display color

var colorBtn = document.querySelectorAll("#colorBtn");
var isInputOpen = false;

colorBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let choosenInput = e.currentTarget.previousElementSibling.childNodes[1];
    let choosenColor = e.currentTarget.previousElementSibling.childNodes[3];
    if (isInputOpen) {
      isInputOpen = false;
    } else {
      choosenInput.click();
      isInputOpen = true;
    }

    const hex = choosenInput.value;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    let gradientString = window.getComputedStyle(display).backgroundImage;
    let spiletedArray = gradientString.split("rgba(0, 0, 0, 0) 50%)");

    if (e.currentTarget.parentNode.classList[0] === "color-box") {
      choosenInput.addEventListener("change", function () {
        let inputValue = this.value;
        display.style.backgroundColor = inputValue;
        choosenColor.innerHTML = inputValue;
      });
    } else {
      choosenInput.addEventListener("change", function () {
        var inputValue = this.value;
        choosenColor.innerHTML = inputValue;
        let parts = spiletedArray[choosenInput.className].replace(
          rgb,
          inputValue
        );
        spiletedArray[choosenInput.className] = parts;
        let backgroundImage = spiletedArray.join("rgba(0, 0, 0, 0) 50%)");
        // console.log(backgroundImage);
        display.style.backgroundImage = backgroundImage;
      });
    }
    if (popUp.className.includes("show")) {
      popUp.classList.remove("show");
    }
  });
});

Export.addEventListener("click", () => {
  let backgroundImage = window.getComputedStyle(display).backgroundImage;
  let backgroundcolor = window.getComputedStyle(display).backgroundColor;
  function cssCode() {
    let text = `background-image: ${backgroundImage};<br> background-color: ${backgroundcolor};`;
    return text.split("),").join("),<br>");
  }
  code.innerHTML = cssCode();
  // console.log(cssCode());
  popUp.classList.toggle("show");
});

let copyBtn = document.querySelector(".copy");

function changeCopyButton(copyBtn) {
  copyBtn.children[0].classList.remove("fa-clipboard");
  copyBtn.children[0].classList.remove("fa-regular");
  copyBtn.children[0].classList.add("fa-solid");
  copyBtn.children[0].classList.add("fa-check");
  copyBtn.children[1].textContent = "Copied!";

  setTimeout(() => {
    copyBtn.children[0].classList.remove("fa-solid");
    copyBtn.children[0].classList.remove("fa-check");
    copyBtn.children[0].classList.add("fa-clipboard");
    copyBtn.children[0].classList.add("fa-regular");
    copyBtn.children[1].textContent = "Copy code";
  }, 2000);
}

copyBtn.addEventListener("click", () => {
  changeCopyButton(copyBtn);
  var copyText = document.querySelector(".code");
  navigator.clipboard.writeText(copyText.textContent);
});

var div = document.querySelector("html");
var themeIcon = document.querySelector("#theme-icon");
function toggleClass() {
  div.classList.toggle("light");
  themeIcon.classList.toggle("fa-moon");
  var hasClass = div.classList.contains("light");
  var hasClassMoon = themeIcon.classList.contains("fa-moon");
  localStorage.setItem("themeLight", hasClass);
  localStorage.setItem("themeIcon", hasClassMoon);
}

window.onload = function () {
  var div = document.querySelector("html");
  var hasClass = localStorage.getItem("themeLight");
  var hasClassMoon = localStorage.getItem("themeIcon");
  if (hasClass === "true") {
    div.classList.add("light");
  } else {
    div.classList.remove("light");
  }

  if (hasClassMoon === "true") {
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
  }
};

const themeBtn = document.querySelector(".theme");

themeBtn.addEventListener("click", toggleClass);

input.addEventListener("click", () => {
  if (checkbox.checked) {
    condition = true;
  } else {
    condition = false;
  }
  console.log(condition);
});
