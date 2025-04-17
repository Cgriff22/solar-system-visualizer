window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CENTER_X = canvas.width / 2;
  const CENTER_Y = canvas.height / 2;

  console.log("Canvas Loaded");
  console.log("Vercel Live test!");
  console.log("About to fetch...");
  
  let planetPositions = {};
  let scale = 0.00000001

  fetch("https://solar-system-backend.onrender.com/positions?date=2025-04-15")
    .then(res => res.json())
    .then(data => console.log("Planet data:", data))
    .then(data => {
      planetPositions = data;
    })
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
      console.log("Looking up:", p.name.toLowerCase());
      console.log("Position:" planetPositions[p.name.toLowerCase])
      let [xRaw, yRaw] = planetPositions[p.name.toLowerCase()];
      let x = CENTER_X + xRaw * scale;
      let y = CENTER_Y + yRaw * scale;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
});

