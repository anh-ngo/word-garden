const wordInput = document.getElementById("wordInput");
const addButton = document.getElementById("add-button");
const wordContainer = document.getElementById("wordContainer");

let isDragging = false;
let initX, initY, firstX, firstY;
let lastItem;

function dragItemDown(e){
  e.preventDefault();
  lastItem = e.target;
  lastItem.style.zIndex = e.timeStamp;
  initX = lastItem.offsetLeft;
  initY = lastItem.offsetTop;
  firstX = e.pageX;
  firstY = e.pageY;
  isDragging = true;

  document.addEventListener("mousemove", handleMouseMove);
}

function dragItemUp(e){
  isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
}

function dragItemMove(e){
  if(isDragging && lastItem){
    lastItem.style.left = initX + e.pageX - firstX + 'px';
    lastItem.style.top = initY + e.pageY - firstY + 'px';
  }
}

// Create word elements and attach event listeners
addButton.addEventListener("click", () => {
  const wordElement = document.createElement("div");
  wordElement.classList.add("word");
  wordElement.innerText = wordInput.value;
  wordElement.style.setProperty("--randomX", Math.random());
  wordElement.style.setProperty("--randomY", Math.random());
  wordContainer.appendChild(wordElement);
  wordElement.addEventListener("mousedown", dragItemDown);
  wordElement.addEventListener("mouseup", dragItemUp);

  wordInput.value = "";
});

// Create symbol elements and attach event listeners
for (let i = 0; i < 5; i++) {
  const symbolElement = document.createElement("div");
  symbolElement.classList.add("symbol");
  symbolElement.innerText = "✿";
  symbolElement.style.setProperty("--randomX", Math.random());
  symbolElement.style.setProperty("--randomY", Math.random());
  wordContainer.appendChild(symbolElement);
  symbolElement.addEventListener("mousedown", dragItemDown);
  symbolElement.addEventListener("mouseup", dragItemUp);

  const slashElement = document.createElement("div");
  slashElement.classList.add("slash");
  slashElement.innerText = "\\/";
  slashElement.style.setProperty("--randomX", Math.random());
  slashElement.style.setProperty("--randomY", Math.random());
  wordContainer.appendChild(slashElement);
  slashElement.addEventListener("mousedown", dragItemDown);
  slashElement.addEventListener("mouseup", dragItemUp);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    // Remove currently selected symbol or word
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      selection.deleteFromDocument();
    } else {
      const cursorNode = selection.anchorNode;
      if (cursorNode && cursorNode.parentElement.classList.contains("symbol")) {
        cursorNode.parentElement.remove();
      } else if (cursorNode && cursorNode.parentElement.classList.contains("word")) {
        cursorNode.parentElement.remove();
      }
    }
  }
});

document.getElementById("word").addEventListener("keypress", myFunction);

function deleteWord() {
  
}

// Set play button for full screen
const playButton = document.getElementById("play-button");
const topBar = document.getElementById("top-bar");
const bottomBar = document.getElementById("bottom-bar");

playButton.addEventListener("click", () => {
    if (topBar.style.display === "none") {
      topBar.style.display = "flex";
      bottomBar.style.display = "flex";
      playButton.innerText = "Play";
      playButton.classList.remove("exit");
    } else {
      topBar.style.display = "none";
      bottomBar.style.display = "none";
      playButton.innerText = "Exit";
      playButton.classList.add("exit");
    }
  });

// Set instruction panel to appear on click
const instructionButton = document.getElementById("instruction-button");
const instructionPanel = document.getElementById("instruction-panel");
const closeButton = document.getElementById("close-button");

instructionButton.addEventListener("click", () => {
    if (instructionPanel.style.display === "none") {
        instructionPanel.style.display = "block";
        instructionButton.innerText = "X";
        instructionButton.classList.add("close");
    } else {
        instructionPanel.style.display = "none";
        instructionButton.innerText = "?";
        instructionButton.classList.remove("close");
    }
});

// Set color inputs
let wordColor;
const wordDefaultColor = "#000000";

let bgColor;
const bgDefaultColor = "#ffffff";
  
window.addEventListener("load", startup, false);

function startup() {
    wordColor = document.querySelector("#wordcolor");
    wordColor.value = wordDefaultColor;
    wordColor.addEventListener("input", updateWordColor, false);
    wordColor.addEventListener("change", updateWordColorAll, false);

    bgColor = document.querySelector("#bgcolor");
    bgColor.value = bgDefaultColor;
    bgColor.addEventListener("input", updateBgColor, false);
    bgColor.addEventListener("change", updateBgColorAll, false);

    wordColor.select();
    bgColor.select();
}

function updateWordColor(event) {
    const wordContainer = document.querySelector("#wordContainer");
    if (wordContainer) {
      wordContainer.style.color = event.target.value;
    }
}
function updateWordColorAll(event) {
    document.querySelectorAll(".word").forEach((word) => {
      word.style.color = event.target.value;
    });
}

function updateBgColor(event) {
    const background = document.querySelector(".canvas");
    if (background) {
      background.style.backgroundColor = event.target.value;
    }
  }
  
function updateBgColorAll(event) {
    document.querySelectorAll(".canvas").forEach((background) => {
      background.style.backgroundColor = event.target.value;
    });
}