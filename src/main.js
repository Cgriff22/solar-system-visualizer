window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CENTER_X = canvas.width / 2;
  const CENTER_Y = canvas.height / 2;

  console.log("Canvas Loaded");
  console.log("Vercel Live test!");
  console.log("About to fetch...");

  fetch("https://solar-system-backend.onrender.com/positions?date=2025-04-15")
    .then(res => res.json())
    .then(data => console.log("Planet data:", data))
    .catch(err => console.error("Fetch error:", err));

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

