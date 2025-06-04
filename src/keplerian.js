// Helper functions
function degreesToRadians(deg) {
    return deg * Math.PI / 180;
  }
  
  function radiansToDegrees(rad) {
    return rad * 180 / Math.PI;
  }
  
  function getJulianDate(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }
  function julianToDate(jd){
    const unixTime = (jd - 2440587.5) * 86400000;
    return new Date(unixTime);
  }
  
  function solveEccentricAnomaly(M_deg, e, tolerance = 1e-6) {
    const M = degreesToRadians(M_deg);
    let E = M;
  
    while (true) {
      const delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      E = E - delta;
      if (Math.abs(delta) < tolerance) {
        break;
      }
    }
  
    return radiansToDegrees(E);
  }
  
  function updatePlanetPosition(planet, T) {
    const a = planet.a + planet.aDot * T;
    const e = planet.e + planet.eDot * T;
    const i = (planet.i + planet.iDot * T) % 360;
    const L = (planet.L + planet.LDot * T) % 360;
    const w = (planet.w + planet.wDot * T) % 360;
    const o = (planet.o + planet.oDot * T) % 360;
  
    let M = (L - w) % 360;
    if (M < 0) M += 360;
    if (M > 180) M -= 360;
  
    const E = solveEccentricAnomaly(M, e);
  
    const E_rad = degreesToRadians(E);
    const r = a * (1 - e * Math.cos(E_rad));
  
    const trueAnomalyRad = 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E_rad / 2),
      Math.sqrt(1 - e) * Math.cos(E_rad / 2)
    );
    const v = (radiansToDegrees(trueAnomalyRad) + 360) % 360;
  
    return { name: planet.name, a, e, i, L, w, o, M, E, r, v };
  }
  
  // Draw functions
  function drawOrbit(ctx, planet, scale, centerX, centerY) {
    const a = planet.a * scale;
    const e = planet.e;
    const b = a * Math.sqrt(1 - e * e);
  
    const offsetX = centerX - e * a;
  
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.ellipse(offsetX, centerY, a, b, 0, 0, 2 * Math.PI);
    ctx.stroke();
  }

function generateStars() {
  const canvas = document.getElementById("solarCanvas");
  const stars = [];
  for (let i = 0; i < 250; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    stars.push({x: x, y: y});
  }
  return stars;
}
  function drawPlanets(ctx, planetsData, scale, centerX, centerY) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // draw stars in the background
    if (window.stars) {
      for (const star of window.stars){
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
  }
    // Draw Sun
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fill();
  
    // Draw Orbits
    for (const planet of planetsData) {
      drawOrbit(ctx, planet, scale, centerX, centerY);
    }
  
    // Draw Planets
    for (const planet of planetsData) {
      const vRad = degreesToRadians(planet.v);
      const x = planet.r * Math.cos(vRad);
      const y = planet.r * Math.sin(vRad);
  
      const screenX = centerX + x * scale;
      const screenY = centerY + y * scale;
  
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(screenX, screenY, 4, 0, 2 * Math.PI);
      ctx.fill();
  
      ctx.fillStyle = "white";
      ctx.font = "10px Arial";
      ctx.fillText(planet.name, screenX + 5, screenY + 5);
    }
  }
  
  // === Data ===
  const planets = [
    {
        name: "Mercury",
        a: 0.38709927,
        aDot: 0.00000037,
        e: 0.20563593,
        eDot: 0.00001906,
        i: 7.00497902,
        iDot: -0.00594749,
        L: 252.25032350,
        LDot: 149472.67411175,
        w: 77.45779628,
        wDot: 0.16047689,
        o: 48.33076593,
        oDot: -0.12534081
      },
      {
        name: "Venus",
        a: 0.72333566,
        aDot: 0.00000390,
        e: 0.00677672,
        eDot: -0.00004107,
        i: 3.39467605,
        iDot: -0.00078890,
        L: 181.97909950,
        LDot: 58517.81538729,
        w: 131.60246718,
        wDot: 0.00268329,
        o: 76.67984255,
        oDot: -0.27769418
      },
    {
        name: "Earth",
        a: 1.00000261,
        aDot: 0.00000562,
        e: 0.01671123,
        eDot: -0.00004392,
        i: -0.00001531,
        iDot: -0.01294668,
        L: 100.46457166,
        LDot: 35999.37244981,
        w: 102.93768193,
        wDot: 0.32327364,
        o: 0.0,
        oDot: 0.0
    },
    {
        name: "Mars",
        a: 1.52371034,
        aDot: 0.00001847,
        e: 0.09339410,
        eDot: 0.00007882,
        i: 1.84969142,
        iDot: -0.00813131,
        L: -4.55343205,
        LDot: 19140.30268499,
        w: -23.94362959,
        wDot: 0.44441088,
        o: 49.55953891,
        oDot: -0.29257343
    },
    {
        name: "Jupiter",
        a: 5.20288700,
        aDot: -0.00011607,
        e: 0.04838624,
        eDot: -0.00013253,
        i: 1.30439695,
        iDot: -0.00183714,
        L: 34.39644051,
        LDot: 3034.74612775,
        w: 14.72847983,
        wDot: 0.21252668,
        o: 100.47390909,
        oDot: 0.20469106
    }, 
    {
        name: "Saturn",
        a: 9.53667594,
        aDot: -0.00125060,
        e: 0.05386179,
        eDot: -0.00050991,
        i: 2.48599187,
        iDot: 0.00193609,
        L: 49.95424423,
        LDot: 1222.49362201,
        w: 92.59887831,
        wDot: -0.41897216,
        o: 113.66242448,
        oDot: -0.28867794
    },
    {
        name: "Uranus",
        a: 19.18916464,
        aDot: -0.00196176,
        e: 0.04725744,
        eDot: -0.00004397,
        i: 0.77263783,
        iDot: -0.00242939,
        L: 313.23810451,
        LDot: 428.48202785,
        w: 170.95427630,
        wDot: 0.40805281,
        o: 74.01692503,
        oDot: 0.04240589
    },
    {
        name: "Neptune",
        a: 30.06992276,
        aDot: 0.00026291,
        e: 0.00859048,
        eDot: 0.00005105,
        i: 1.77004347,
        iDot: 0.00035372,
        L: -55.12002969,
        LDot: 218.45945325,
        w: 44.96476227,
        wDot: -0.32241464,
        o: 131.78422574,
        oDot: -0.00508664
    },
    {
        name: "Pluto",
        a: 39.48211675,
        aDot: -0.00031596,
        e: 0.24882730,
        eDot: 0.00005170,
        i: 17.14001206,
        iDot: 0.00004818,
        L: 238.92903833,
        LDot: 145.20780515,
        w: 224.06891629,
        wDot: -0.04062942,
        o: 110.30393684,
        oDot: -0.01183482
      }
      
  ];


  // Utility Functions
  
function zoomIn(){
    scale /= 0.5;
}
document.getElementById("zoom-in").onclick = zoomIn;

function zoomOut(){
    scale *= 0.5;
}
document.getElementById("zoom-out").onclick = zoomOut;

// === Animation Loop ===
let jd = getJulianDate(new Date())
let T = (jd - 2451545.0) / 36525;
let timeFactor = 0.00001;
let displayDate = julianToDate(jd);


let scale = 150;

console.log(new Date());

// resize canvas to fit window and fix resolution

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const canvas = document.getElementById("solarCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing context
}

window.addEventListener('resize', ()=>{
  resizeCanvas();
  window.stars = generateStars();
  animate();
});

// Star Generator
function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  

let forward = true;
let reversed = false;
function pause(){
  forward = false;
  reversed = false;
}
function play(){
  forward = true;
}
function reverse(){
  forward = false;
  reversed = true;
}
function increaseSpeed(){
  timeFactor *= 10;
}
function decreaseSpeed(){
  timeFactor /= 10;
}

document.getElementById("start").onclick = play;
document.getElementById("stop").onclick = pause;
document.getElementById("reverse").onclick = reverse;
document.getElementById("speed-up").onclick = increaseSpeed;
document.getElementById("slow-down").onclick = decreaseSpeed;
  
function animate() {
  const canvas = document.getElementById("solarCanvas");
  const ctx = canvas.getContext("2d");
  let CENTER_X = window.innerWidth/2;
  let CENTER_Y = window.innerHeight/2;

  const planetsData = planets.map(p => updatePlanetPosition(p, T));
  
  drawPlanets(ctx, planetsData, scale, CENTER_X, CENTER_Y);
  if (forward){
    reversed = false
    T += timeFactor; 
    jd = (T * 36525) + 2451545;
    displayDate = julianToDate(jd)
  }
  if (reversed){
    T -= timeFactor; 
    jd = (T * 36525) + 2451545;
    displayDate = julianToDate(jd)
  }
  
  //console.log(displayDate)
  document.getElementById('top-text').innerHTML = displayDate.toISOString().split("T")[0];
  
  requestAnimationFrame(animate);
}
  
  // Start everything 
  window.onload = () => {
    resizeCanvas();
    // Generate stars after canvas is properly sized
    window.stars = generateStars();
  
  // Store stars globally so animate() can access them
  
    animate();
  };
  