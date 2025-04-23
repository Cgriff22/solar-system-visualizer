window.addEventListener('DOMContentLoaded', () => {
  // === Canvas Setup ===
  const canvas = document.getElementById('solarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let CENTER_X = canvas.width / 2;
  let CENTER_Y = canvas.height / 2;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    CENTER_X = canvas.width / 2;
    CENTER_Y = canvas.height / 2;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // === Global Variables ===
  let currentDate = new Date();
  let planetPositions = {};
  let scale = 0.0000001;

  const planets = [
    { name: "Mercury", radius: 50, color: "gray" },
    { name: "Venus", radius: 80, color: "yellow" },
    { name: "Earth", radius: 110, color: "blue" },
    { name: "Mars barycenter", radius: 140, color: "red" },
    { name: "Jupiter barycenter", radius: 180, color: "orange" },
    { name: "Saturn barycenter", radius: 200, color: "orange" },
    { name: "Uranus barycenter", radius: 220, color: "blue" },
    { name: "Neptune barycenter", radius: 240, color: "blue" },
    { name: "Pluto barycenter", radius: 5, color: "purple" },
  ];

  const paragraph = document.getElementById("top-text");
  const topText = document.getElementById("top-text");
  // === Utility Functions ===

  // Places initial date in text boxes
  function readDate(date) {
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const monthBox = document.getElementById("month-box");
    const dayBox = document.getElementById("day-box");
    const yearBox = document.getElementById("year-box");

    
    topText.innerHTML = currentDate;

    if (monthBox && dayBox && yearBox) {
      monthBox.value = currentMonth;
      dayBox.value = currentDay;
      yearBox.value = currentYear;
    }
  }

  function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    const dateStr = currentDate.toISOString().split("T")[0];

    console.log("Fetching date:", dateStr);
    //fetch(`https://solar-system-backend.onrender.com/positions?date=${dateStr}`)
    fetch(`http://localhost:8000/positions?date=${dateStr}`)
      .then(res => res.json())
      .then(data => {
        planetPositions = data;
        console.log("Planet positions: ", data);
        draw();
      })
      .catch(err => console.error("Fetch error:", err));
  }

  // === Event Handlers ===
  function forwardClick() {
    changeDate(30);
    paragraph.innerText = currentDate.toDateString();
    readDate(currentDate);
  }

  function backwardClick() {
    changeDate(-30);
    paragraph.innerText = currentDate.toDateString();
    readDate(currentDate);
  }

  function customDate(){
    const monthElement = document.getElementById("month-box");
    const dayElement = document.getElementById("day-box");
    const yearElement = document.getElementById("year-box");

    const month = monthElement.value;
    const day = dayElement.value;
    const year = yearElement.value;
    
    const customDate = new Date(year, month, day);
    topText.innerHTML = customDate;
    const customDateStr = customDate.toISOString().split("T")[0];
    currentDate = customDate;

    // uvicorn main:app --reload 
    // type above command in python main directory and correct virtual environment
    // to begin serving to local host
    fetch(`http://localhost:8000/positions?date=${customDateStr}`)
      .then(res => res.json())
      .then(data => {
        planetPositions = data;
        console.log("Planet positions: ", data);
        draw();
      })
      .catch(err => console.error("Fetch error:", err));
  }
    
function zoomIn(){
  scale *= 1.1;
}
function zoomOut(){
  scale /= 1.1;
}
 
  document.getElementById("zoom-in").onclick = zoomIn;
  document.getElementById("zoom-out").onclick = zoomOut;
  document.getElementById("enter-button").onclick = customDate;
  document.getElementById("forward").onclick = forwardClick;
  document.getElementById("backward").onclick = backwardClick;

  // === Drawing ===
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Sun
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(CENTER_X, CENTER_Y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Sol", CENTER_X + 15, CENTER_Y);

    // Draw planets
    planets.forEach((p) => {
      const key = p.name.toLowerCase();
      if (!(key in planetPositions)) {
        console.warn(`Missing position for ${key}`);
        return;
      }

      const [xRaw, yRaw] = planetPositions[key];
      const x = CENTER_X + xRaw * scale;
      const y = CENTER_Y + yRaw * scale;

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = "12px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(p.name, x + 10, y);
    });

    requestAnimationFrame(draw);
  }

  // === Initialize ===
  readDate(currentDate);
  changeDate(0);

  console.log("Canvas Loaded");
  console.log("Vercel Live test!");
  console.log("About to fetch...");
});
