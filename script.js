let NEWS = [];

async function loadNews(){
  try{
    const res = await fetch("./news.json");
    NEWS = await res.json();
    init();
  } catch(e){
    console.log("Ошибка загрузки JSON", e);
  }
}

function shuffle(a){
  return [...a].sort(()=>Math.random()-0.5);
}

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

// 🔴 КОНТАКТЫ (НОВЫЙ БЛОК)
function renderContacts(){
  const box = document.getElementById("contacts");

  if(!box) return;

  box.innerHTML = `
    <h2>Контакты редакции</h2>

    <p>📩 Почта редакции: redac_afipnovostnic@inbox.ru</p>
    <p>📩 Основная почта: afipnovosti@inbox.ru</p>
    <p>📩 Почта админа в MAX: max-adm_afipnovostnic@inbox.ru</p>

    <a class="max-btn" target="_blank"
       href="https://max.ru/join/OAmTJRi6lL2YXgGKBuu2UmdAZDTHeu-m76S5UqRGkbk">
       🔵 Вступить в канал MAX
    </a>
  `;
}

function render(){
  const grid = document.getElementById("newsGrid");
  const side = document.getElementById("sideNews");

  if(!grid || !side) return;

  const data = shuffle(NEWS);

  // HERO
  document.getElementById("heroTitle").textContent = data[0].title;
  document.getElementById("heroText").textContent = data[0].text;

  // GRID
  grid.innerHTML = "";
  data.slice(1).forEach(n=>{
    grid.appendChild(createCard(n));
  });

  // SIDE
  side.innerHTML = "";
  data.slice(0,3).forEach(n=>{
    const d = document.createElement("div");
    d.className = "side-card";
    d.innerHTML = `<h3>${n.title}</h3>`;
    side.appendChild(d);
  });

  renderContacts();
}

// анимация
const observer = new IntersectionObserver(e=>{
  e.forEach(i=>{
    if(i.isIntersecting) i.target.classList.add("show");
  });
});

function init(){
  render();
}

document.addEventListener("DOMContentLoaded", loadNews);
