window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CENTER_X = canvas.width / 2;
  const CENTER_Y = canvas.height / 2;

  console.log("Canvas Loaded");
  console.log("Vercel Live test!");

  const planets = [
    { name: "Mercury", radius: 50, color: "gray" },
    { name: "Venus", radius: 80, color: "yellow" },
    { name: "Earth", radius: 110, color: "blue" },
    { name: "Mars", radius: 140, color: "red" },
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw orbits
    planets.forEach(p => {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.arc(CENTER_X, CENTER_Y, p.radius, 0, 2 * Math.PI);
      ctx.stroke();
    });

    // Draw planets (fake positions for now)
    planets.forEach((p, i) => {
      let angle = Date.now() / 1000 + i;
      let x = CENTER_X + p.radius * Math.cos(angle);
      let y = CENTER_Y + p.radius * Math.sin(angle);

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
});
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
