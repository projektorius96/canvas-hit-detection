import './style.css';

const canvas = document.querySelector(".layer");
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;

// Alias your
const viewportWidth = /* canvas.width */ window.innerWidth   /* <= using `window.innerinnerWidth` , requires to ctx.scale(see 1^ below) */;
const viewportHeight = /* canvas.height */window.innerHeight /* <= using `window.innerinnerHeight`, requires to ctx.scale(see 1^ below) */;

// Calculate center coordinates
const centerX = viewportWidth / 2;
const centerY = viewportHeight / 2;

// Calculate rectangle dimensions relative (not absolute) to viewport itself
const rectangleWidth = viewportWidth / 8;
const rectangleHeight = viewportHeight / 8;

const canvasBoundingRect = canvas.getBoundingClientRect();
const scale = {
  x: canvas.width / canvasBoundingRect.width,
  y: canvas.height / canvasBoundingRect.height,
}

// Draw the rectangle
const ctx = canvas.getContext("2d");
  ctx.scale(/* 1^ */devicePixelRatio, /* 1^ */devicePixelRatio)
  ctx.fillStyle = "blue"; // Set fill color (adjust as needed)
  ctx.fillRect(centerX - rectangleWidth / 2, centerY - rectangleHeight / 2, rectangleWidth, rectangleHeight);

/* === */

// Create a Path2D object for the rectangle
const rectanglePath = new Path2D();
rectanglePath.rect(centerX - rectangleWidth / 2, centerY - rectangleHeight / 2, rectangleWidth, rectangleHeight);

/**
 * Sincere kudos to Joshua Tzucker for the article (link below)
 * {@link https://joshuatz.com/posts/2022/canvas-hit-detection-methods/}
 * The canvasBoundingRect props we used so far:
 * - canvasBoundingRect.left for X axis matters, if you have any non-zero marging, border, outline, of position `left`, etc.
 * - canvasBoundingRect.top for Y axis matters, if you have any non-zero marging, border, outline, of position `top`, etc.
 */
canvas.addEventListener("mousemove", (event) => {

  const mouseX = (event.clientX - canvasBoundingRect.left) * scale.x;  /* <= essentially multiplying by `scale.x` still allows us to point in the centre, but push pointer further **right**, which is present due to Device Pixel Ratio  */ 
  const mouseY = (event.clientY - canvasBoundingRect.top) * scale.y;   /* <= essentially multiplying by `scale.y` still allows us to point in the centre, but push pointer further **bottom**, which is present due to Device Pixel Ratio */

  // Check if the mouse click is within the rectangle path
  if ( ctx.isPointInPath(rectanglePath, mouseX, mouseY) ) {

    console.log("Rectangle hit!");
    // Perform your desired action when the rectangle is clicked

  }
});