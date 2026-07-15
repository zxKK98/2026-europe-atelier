/* =====================================================
   The Autumn Atelier — Journal Runtime
   ===================================================== */

/* ---------- Day-by-day data ---------- */
const days = [
  {
    n: 1, city: "Hong Kong → Madrid", theme: "En Route · Slow Down",
    desc: "9/23 香港出发，经阿布扎比转机，9/24 上午抵达马德里。抵达之日不做具体游览。今天唯一目标：把身体调回欧洲时区。用一杯咖啡、一片公园、一顿 tapas 结束。",
    slots: [
      { t: "09-23 20:10", h: "香港 T1 起飞 · Etihad EY", d: "长途航班第一段。上机把时区表拨到马德里（−6h），先睡一觉。" },
      { t: "09-24 00:25", h: "抵达阿布扎比 T-A", d: "转机 2 小时。找一杯咖啡，别买免税，登机时再看。" },
      { t: "09-24 02:25", h: "阿布扎比 → 马德里 T4", d: "飞行约 8 小时。这段睡满。" },
      { t: "09-24 08:10", h: "抵达马德里 T4 Barajas", d: "机场地铁 8 号线直达市区。先寄存行李，不用急着入住。" },
      { t: "11:30", h: "入住酒店", d: "推荐街区：Salamanca（安静优雅）或 Barrio de Las Letras（文学街区，步行到普拉多）。" },
      { t: "14:00", h: "Retiro Park", d: "买一杯冰咖啡，什么都不要做。看当地人。让阳光把时差晒掉。" },
      { t: "18:00", h: "Mercado San Miguel", d: "第一顿 tapas，第一杯 Rioja。别拍太多，先感受节奏。" },
      { t: "21:30", h: "屋顶酒吧", d: "Círculo de Bellas Artes 顶楼看马德里入夜。结束第一天。" }
    ],
    vlog: ["香港 T1 值机牌", "阿布扎比转机航站楼", "飞机窗外日出", "马德里第一缕阳光", "Retiro 树影"]
  },
  {
    n: 2, city: "Madrid", theme: "Masterpieces",
    desc: "把一整天交给两座美术馆。中午留一顿慢午餐，傍晚坐高铁去巴塞。为什么一定要看《格尔尼卡》？在现场你会懂。",
    slots: [
      { t: "09:00", h: "普拉多 VIP 早鸟", d: "比公众早 30 分钟入馆，专程去看《宫娥》与戈雅黑色时期。" },
      { t: "13:00", h: "Botín 或 Casa Lucio", d: "全世界最古老的餐厅之一，点烤乳猪。" },
      { t: "15:30", h: "索菲亚王后艺术中心", d: "《格尔尼卡》原作。留 30 分钟只看它。" },
      { t: "18:20", h: "Atocha 站高铁 → 巴塞", d: "AVE 二等舱也很舒服，2 小时 30 分抵达。" },
      { t: "22:00", h: "巴塞夜宵", d: "El Xampanyet 站着吃两口 anchoa，喝一杯 cava，睡。" }
    ],
    vlog: ["普拉多外墙", "《格尔尼卡》前的人群（不拍画）", "AVE 车窗", "巴塞第一夜霓虹"]
  },
  {
    n: 3, city: "Barcelona", theme: "Gaudí",
    desc: "整整一天与高迪相处。晨间预约的米拉之家、午后的 Passeig de Gràcia、夜里的 Mercè Festival。",
    slots: [
      { t: "09:00", h: "米拉之家晨间导览", d: "开门第一场天光最柔。屋顶烟囱像超现实主义雕塑。" },
      { t: "12:00", h: "Cerería Subirà 蜡烛店", d: "1761 年开业，巴塞最古老的商店，路过就买一根。" },
      { t: "13:30", h: "Passeig de Gràcia 慢走", d: "从 Casa Batlló 到 La Pedrera，一路是新艺术运动。" },
      { t: "16:00", h: "圣家堂内部", d: "预约进入。选下午光线穿过彩窗的时段。" },
      { t: "20:00", h: "Mercè Festival", d: "9 月末巴塞守护神节。看人塔（Castellers）与火龙（Correfoc）。" }
    ],
    vlog: ["米拉之家门把手特写", "Passeig 街拍", "圣家堂穹顶仰角", "夜市火光"]
  },
  {
    n: 4, city: "Barcelona / Girona", theme: "Coast & Craft",
    desc: "参考建议日。可以留在巴塞（哥特区 + 皮卡索博物馆），也可以租车沿 Costa Brava 北上 Girona 与 Camiral。",
    slots: [
      { t: "08:30", h: "Nomad Coffee", d: "巴塞最好的第三波咖啡之一。" },
      { t: "10:00", h: "哥特区 & Born 区漫步", d: "小巷、天井、独立设计店。带一本笔记本。" },
      { t: "13:00", h: "皮卡索博物馆", d: "看年轻时期作品，理解他后来的爆发。" },
      { t: "16:00", h: "海边散步 Barceloneta", d: "地中海秋风。买一支冰淇淋。" },
      { t: "20:30", h: "Disfrutar", d: "三星前 elBulli 团队开的实验餐厅。需要提前 1 个月订。" }
    ],
    vlog: ["Nomad 拉花", "哥特区光影", "海边人像", "餐盘俯拍"]
  },
  {
    n: 5, city: "Costa Brava · Camiral", theme: "Green Hour",
    desc: "一整天留给高尔夫。Camiral（原 PGA Catalunya）是欧洲排名前 5 的赛事级球场。不打球也可以来吃午餐、看景。",
    slots: [
      { t: "07:30", h: "早班车 / 自驾出发", d: "从巴塞到 Camiral 约 90 分钟。" },
      { t: "09:00", h: "Stadium Course 前 9 洞", d: "3 号洞下坡穿松林；7 号洞岛型果岭是签名洞。" },
      { t: "12:30", h: "会所午餐", d: "从露台看整个球场秋色。" },
      { t: "14:00", h: "后 9 洞", d: "或改坐球车拍摄机位。" },
      { t: "19:00", h: "回巴塞或住 Camiral Hotel", d: "住一晚更从容。" }
    ],
    vlog: ["果岭清晨露水", "球道秋色广角", "推杆特写", "会所落地窗"]
  },
  {
    n: 6, city: "Barcelona → Provence", theme: "Southbound",
    desc: "从巴塞飞马赛或坐火车到艾克斯。切换到法国南部的节奏：安静、缓慢、香草味。",
    slots: [
      { t: "10:00", h: "巴塞飞马赛", d: "或 Renfe-SNCF 直达火车 4 小时 30 分。" },
      { t: "14:00", h: "抵达 Aix-en-Provence", d: "在 Cours Mirabeau 大道找一家露天座位。" },
      { t: "16:00", h: "Cézanne 画室", d: "塞尚的最后工作室，保留原样，人极少。" },
      { t: "19:30", h: "本地小馆", d: "点普罗旺斯焗菜和一支 rosé。" },
      { t: "22:00", h: "回酒店写日记", d: "第一次在法国过夜。" }
    ],
    vlog: ["火车窗外向日葵", "石板路脚步", "Cézanne 画笔", "Rosé 玻璃杯"]
  },
  {
    n: 7, city: "Provence · Calanques", theme: "Countryside & Sea",
    desc: "参考建议日。上午薰衣草田或 Luberon 山村，下午 Cassis 帆船进入 Calanques 峭壁国家公园。",
    slots: [
      { t: "08:00", h: "Gordes / Roussillon", d: "两个山村选一：Gordes 更全景，Roussillon 是赭石红。" },
      { t: "12:30", h: "山间小馆午餐", d: "叫一份 tarte 和当地芝士拼盘。" },
      { t: "15:30", h: "Cassis 帆船", d: "包一小时私人帆船，进入 Calanques 峭壁。" },
      { t: "18:00", h: "港口日落", d: "买一份 socca 站着吃。" },
      { t: "21:00", h: "回艾克斯", d: "早睡。明天去巴黎。" }
    ],
    vlog: ["山村航拍", "Cassis 蓝海", "帆船风帆", "日落港口"]
  },
  {
    n: 8, city: "Provence → Paris", theme: "Fashion Week Prelude",
    desc: "TGV 高铁北上巴黎。下午入住玛黑区，晚上开始体验巴黎时装周氛围。",
    slots: [
      { t: "09:30", h: "TGV → 巴黎", d: "从 Aix TGV 到 Gare de Lyon 约 3 小时 15 分。" },
      { t: "13:00", h: "入住玛黑", d: "推荐 Hôtel Jules & Jim 或 Le Petit Moulin。" },
      { t: "15:00", h: "Ten Belles 或 Fragments", d: "点一杯 flat white，看当地人打电话谈生意。" },
      { t: "17:30", h: "秀场外街拍", d: "Palais de Tokyo / Grand Palais 附近最容易碰到。" },
      { t: "21:00", h: "Clamato 或 Septime 姊妹店", d: "小海鲜与自然酒。" }
    ],
    vlog: ["TGV 隧道", "玛黑门牌", "咖啡馆桌面", "街拍长镜头"]
  },
  {
    n: 9, city: "Paris", theme: "Rive Gauche",
    desc: "左岸日。上午奥赛，中午 Café de Flore，下午莎士比亚书店与塞纳河，晚上一场歌剧或独自散步。",
    slots: [
      { t: "09:30", h: "奥赛博物馆", d: "去 5 楼印象派。莫奈 → 马奈 → 修拉 → 梵高。" },
      { t: "13:00", h: "Café de Flore 或 Les Deux Magots", d: "点一份牛排薯条。观察比拍照重要。" },
      { t: "15:00", h: "莎士比亚书店", d: "买一本英文诗集，加盖店章。" },
      { t: "17:00", h: "塞纳河慢走", d: "从艺术桥走到新桥。看落日反光。" },
      { t: "20:30", h: "巴黎歌剧院 或 街区散步", d: "看心情，不强求。" }
    ],
    vlog: ["奥赛大钟", "咖啡杯与烟灰缸", "书店旋转书架", "塞纳河游船尾迹"]
  },
  {
    n: 10, city: "Paris → 广州", theme: "Farewell",
    desc: "10/4 下午从戴高乐机场经吉达回广州。上午 Marché 一小时、和面包师说 bonjour，中午前必须往机场走。带着一整本子的记录回家。",
    slots: [
      { t: "08:00", h: "Marché des Enfants Rouges", d: "巴黎最古老的市场。买一份摩洛哥餐当早午餐。" },
      { t: "10:00", h: "打包 & 最后一杯咖啡", d: "Substance Coffee，浅烘豆子。别恋战。" },
      { t: "11:30", h: "出发去 CDG 机场", d: "沙特航空 T1 值机。RER B 约 50 分钟，或专车约 45 分钟。留至少 3 小时余量。" },
      { t: "13:00", h: "抵达 CDG T1 · 值机 + 出关", d: "非申根区回国大批量退税，退税柜台可能排队 40 分钟。" },
      { t: "15:55", h: "CDG T1 → 吉达 T1 · Saudia", d: "飞行约 6h45m。晚餐在机上。" },
      { t: "22:40", h: "抵达吉达 T1", d: "转机 2 小时 25 分。吉达机场夜间清冷，找一家咖啡座就好。" },
      { t: "10-05 01:05", h: "吉达 → 广州 T2 · Saudia", d: "飞行约 9h20m。这段睡足。" },
      { t: "10-05 15:25", h: "抵达广州 T2", d: "带着这本 Atelier 回家。" }
    ],
    vlog: ["市场蔬果特写", "咖啡最后一杯", "戴高乐值机牌", "机场跑道", "护照与登机牌"]
  }
];

const missions = [
  { d: "Day 01", t: "在 Retiro 公园听完一整首歌不看手机。" },
  { d: "Day 02", t: "在《格尔尼卡》面前站够十分钟。" },
  { d: "Day 03", t: "找到一扇你最喜欢的门，拍下来。" },
  { d: "Day 04", t: "买一件『路过就要』的东西，不必贵。" },
  { d: "Day 05", t: "和一个当地老人聊天，哪怕只是天气。" },
  { d: "Day 06", t: "在露天座位读完一份法文报纸的头版。" },
  { d: "Day 07", t: "在海边捡一颗石头，写上日期带回家。" },
  { d: "Day 08", t: "买一本法文杂志，看不懂也留着。" },
  { d: "Day 09", t: "记录今天听见的五种语言。" },
  { d: "Day 10", t: "在咖啡馆写一页旅行日记，寄给未来的自己。" }
];

/* ---------- Render Days ---------- */
const daysContent = document.getElementById("daysContent");
const daysTabs = document.querySelectorAll(".day-tab");

function renderDay(n) {
  const d = days[n - 1];
  const slotsHtml = d.slots.map(s => `
    <div class="slot">
      <div class="slot-time">${s.t}</div>
      <div class="slot-body">
        <h4>${s.h}</h4>
        <p>${s.d}</p>
      </div>
    </div>`).join("");
  const shotsHtml = d.vlog.map((v, i) =>
    `<span>${v}</span>${i < d.vlog.length - 1 ? '<span class="arr">↓</span>' : ''}`
  ).join("");

  daysContent.innerHTML = `
    <div class="day-card">
      <div class="day-hero">
        <span class="day-hero-num">${String(d.n).padStart(2, "0")}</span>
        <span class="day-hero-city">${d.city}</span>
        <span class="day-hero-theme">${d.theme}</span>
        <p class="day-hero-desc">${d.desc}</p>
        <div class="day-vlog">
          <div class="day-vlog-title">📸 Vlog Shot List</div>
          <div class="day-vlog-shots">${shotsHtml}</div>
        </div>
      </div>
      <div class="day-timeline">${slotsHtml}</div>
    </div>`;
}

daysTabs.forEach(btn => {
  btn.addEventListener("click", () => {
    daysTabs.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderDay(parseInt(btn.dataset.day, 10));
  });
});
renderDay(1);

/* ---------- Missions ---------- */
const missionGrid = document.getElementById("missionGrid");
missionGrid.innerHTML = missions.map(m => `
  <div class="mission-card">
    <div class="mission-day">${m.d}</div>
    <div class="mission-text">${m.t}</div>
  </div>`).join("");

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("aa-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("aa-theme", next);
});

/* ---------- Cursor Dot ---------- */
const dot = document.getElementById("cursorDot");
let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
window.addEventListener("mousemove", e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.classList.add("is-active");
});
function loop() {
  dotX += (mouseX - dotX) * 0.18;
  dotY += (mouseY - dotY) * 0.18;
  dot.style.left = dotX + "px";
  dot.style.top = dotY + "px";
  requestAnimationFrame(loop);
}
loop();
document.querySelectorAll("a, button, .lux-card, .hl-card, .mission-card, .route-node").forEach(el => {
  el.addEventListener("mouseenter", () => dot.classList.add("is-hover"));
  el.addEventListener("mouseleave", () => dot.classList.remove("is-hover"));
});

/* ---------- Magnetic Buttons ---------- */
document.querySelectorAll(".btn-magnetic").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.25}px) scale(1.05)`;
  });
  el.addEventListener("mouseleave", () => { el.style.transform = ""; });
});

/* ---------- Hero Canvas · 秋日粒子 ---------- */
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
let W, H, particles;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = canvas.parentElement.offsetHeight;
  const density = Math.min(70, Math.floor((W * H) / 22000));
  particles = new Array(density).fill(0).map(() => spawn());
}
function spawn() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: 0.15 + Math.random() * 0.5,
    r: 0.6 + Math.random() * 1.6,
    a: 0.15 + Math.random() * 0.4,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.02
  };
}
function tick() {
  ctx.clearRect(0, 0, W, H);
  const theme = document.documentElement.getAttribute("data-theme");
  const color = theme === "dark" ? "217, 149, 112" : "138, 58, 42";
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    if (p.y > H + 10 || p.x < -10 || p.x > W + 10) {
      Object.assign(p, spawn(), { y: -5 });
    }
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = `rgba(${color}, ${p.a})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * 2.4, p.r * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  requestAnimationFrame(tick);
}
window.addEventListener("resize", resize);
resize(); tick();

/* ---------- Smooth-in Sections ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = 1;
      en.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".section").forEach(s => {
  s.style.opacity = 0;
  s.style.transform = "translateY(30px)";
  s.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
  io.observe(s);
});
