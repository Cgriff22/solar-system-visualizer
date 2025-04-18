window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  // resize the canvas to fit the window.
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let CENTER_X = canvas.width / 2;
    let CENTER_Y = canvas.height / 2;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const ctx = canvas.getContext('2d');
  

  console.log("Canvas Loaded");
  console.log("Vercel Live test!");
  console.log("About to fetch...");
  
  //let planetPositions = {};
  let scale = 0.0000001
  let planetPositions = {}

  // fetch and store skyfield data
  fetch("https://solar-system-backend.onrender.com/positions?date=2025-04-15")
    .then(res => res.json())
    .then(data => { 
      planetPositions = data;
      console.log("Planet positions: ", data);
      draw();
    })
    .catch(err => console.error("Fetch error:", err));
    
  const planets = [
    { name: "Mercury", radius: 50, color: "gray" },
    { name: "Venus", radius: 80, color: "yellow" },
    { name: "Earth", radius: 110, color: "blue" },
    { name: "Mars barycenter", radius: 140, color: "red" },
    {name: "Jupiter barycenter", radius: 180, color: "orange"},
    {name: "Saturn barycenter", radius: 200, color: "orange"},
    {name: "Uranus barycenter", radius: 220, color: "blue"},
    {name: "Neptune barycenter", radius: 240, color: "blue"},
    {name: "Pluto barycenter", radius: 260, color: "purple"},
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the sun
    ctx.beginPath();
    ctx.fillStyle = "orange"
    ctx.arc(CENTER_X, CENTER_Y, 10, 0, 2 * Math.PI)
    ctx.fill()
    // namplate for sol
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Sol", CENTER_X + 15, CENTER_Y)

    // Draw planets at their positions according to de440s.bsp
    planets.forEach((p, i) => {

      // Gather planet's positional data
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

