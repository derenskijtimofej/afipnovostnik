
let NEWS = [];

// =====================
// LOAD JSON
// =====================
async function loadNews(){
  try{
    const res = await fetch("news.json");
    NEWS = await res.json();
    init();
  } catch(err){
    console.log("Ошибка загрузки news.json", err);
  }
}

// =====================
// UTILS
// =====================
function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5);
}

// =====================
// CARD
// =====================
function createCard(n){
  const el = document.createElement("div");
  el.className = "card";

  el.innerHTML = `
    <img src="https://picsum.photos/600/400?random=${Math.random()}">
    <div class="card-content">
      <h3>${n.title}</h3>
      <p>${n.text}</p>
    </div>
  `;

  observer.observe(el);
  return el;
}

// =====================
// MAIN RENDER (ЯНДЕКС-ЛОГИКА)
// =====================
function renderHome(){

  const grid = document.getElementById("newsGrid");
  const side = document.getElementById("sideNews");

  if(!grid || !side){
    console.log("Нет DOM элементов");
    return;
  }

  const data = shuffle(NEWS);

  // 🟢 HERO
  const hero = data[0];
  document.getElementById("heroTitle").textContent = hero.title;
  document.getElementById("heroText").textContent = hero.text;

  // картинка героя
  document.getElementById("heroImg").src =
    `https://picsum.photos/1200/600?random=${Math.random()}`;

  // 🟢 GRID (основные новости)
  grid.innerHTML = "";
  data.slice(1,5).forEach(n=>{
    grid.appendChild(createCard(n));
  });

  // 🟢 SIDE (важные)
  side.innerHTML = "";
  data.slice(5,8).forEach(n=>{
    const d = document.createElement("div");
    d.className = "side-card";
    d.innerHTML = `<h3>${n.title}</h3>`;
    side.appendChild(d);
  });
}

// =====================
// ANIMATION
// =====================
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("show");
    }
  });
});

// =====================
// INIT SAFE
// =====================
function init(){
  renderHome();
}

// запуск только после загрузки DOM
document.addEventListener("DOMContentLoaded", loadNews);