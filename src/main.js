window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CENTER_X = canvas.width / 2;
  const CENTER_Y = canvas.height / 2;

  console.log("Canvas Loaded");
  console.log("Vercel Live test!");
  console.log("About to fetch...");
  
  //let planetPositions = {};
  let scale = 0.000001
  let planetPositions = {}

  fetch("https://solar-system-backend.onrender.com/positions?date=2025-04-15")
    .then(res => res.json())
    .then(data => { 
      planetPositions = data;
      draw()
    })
    .catch(err => console.error("Fetch error:", err));
    

    

  const planets = [
    { name: "Mercury", radius: 50, color: "gray" },
    { name: "Venus", radius: 80, color: "yellow" },
    { name: "Earth", radius: 110, color: "blue" },
    { name: "Mars barycenter", radius: 140, color: "red" },
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the sun
    ctx.beginPath();
    ctx.fillStyle = "orange"
    ctx.arc(CENTER_X, CENTER_Y, 10, 0, 2 * Math.PI)
    ctx.fill()

    // Draw planets at their positions according to de440s.bsp
    planets.forEach((p, i) => {

      // Gather planet's positional data
      console.log("Looking up:", p.name.toLowerCase());
      console.log("Position:", planetPositions[p.name.toLowerCase()]);
      let [xRaw, yRaw] = planetPositions[p.name.toLowerCase()];
      let x = CENTER_X + xRaw * scale;
      let y = CENTER_Y + yRaw * scale;

      // Draw planets based on position
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw planet's name
      ctx.font = "12px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(p.name, x + 10, y)

    });

    requestAnimationFrame(draw);
  }

  
});

