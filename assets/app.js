/* =====================================================
   The Autumn Atelier — Journal Runtime
   ===================================================== */

/* ---------- Day-by-day data ----------
   slot 字段：
   - t 时间 · h 标题 · d 描述
   - loc {lat, lng} 精确坐标（用于地图打点）
   - link 官方跳转链接（博物馆/餐厅/景点官网或订票页）
   - ticket 票价文本（可选）
   - notice 近期公告文本（可选）
   - hop {via, dur} 从上一个 slot 到本 slot 的交通方式与耗时（可选）
   - kind 类型 tag：museum / venue / food / transit / walk / event
*/
const days = [
  {
    n: 1, date: "Sep 23–24 · Wed–Thu", city: "香港 → 马德里", theme: "En Route · Slow Down",
    desc: "9/23 香港夜航出发，经阿布扎比转机，9/24 上午抵达马德里。抵达日不塞太多，唯一目标是把身体调回欧洲时区。丽池公园晒太阳倒时差，太阳门 + Mercado San Miguel 吃第一顿 tapas。",
    slots: [
      { t: "09-23 20:10", h: "香港 T1 起飞 · Etihad EY", d: "长途航班第一段。上机把时区表拨到马德里（−6h），先睡一觉。", kind: "transit", loc: {lat: 22.3080, lng: 113.9185} },
      { t: "09-24 00:25", h: "抵达阿布扎比 T-A", d: "转机 2 小时。找一杯咖啡，别买免税，登机时再看。", kind: "transit", loc: {lat: 24.4330, lng: 54.6511}, hop: {via: "Etihad EY 直飞", dur: "8h15m"} },
      { t: "09-24 08:10", h: "抵达马德里 T4 Barajas", d: "机场地铁 8 号线直达市区。先寄存行李，不用急着入住。", kind: "transit", loc: {lat: 40.4936, lng: -3.5668}, hop: {via: "Etihad EY 转机", dur: "5h45m"} },
      { t: "09:30", h: "Retiro 丽池公园 · 水晶宫", d: "买一杯冰咖啡，什么都不要做。看当地人。让阳光把时差晒掉。Palacio de Cristal 是园内玻璃展厅，随时有免费当代艺术展。", kind: "walk", img: "assets/img/spots/retiro-crystal-palace.jpg", loc: {lat: 40.4153, lng: -3.6844}, hop: {via: "Metro L8 → L2 到 Retiro", dur: "40min · 5€"} },
      { t: "13:00", h: "Heart Of Madrid Apartments 入住", d: "马约尔广场旁的公寓，Calle Mayor 49。放行李，回房补睡 1.5-2h 顺应西班牙晚睡作息。", kind: "stay", loc: {lat: 40.4160, lng: -3.7080}, hop: {via: "步行 Retiro → Sol", dur: "18min · 1.4km"} },
      { t: "18:00", h: "太阳门 & 马约尔广场漫步", d: "从民宿楼下走出去就是太阳门（Puerta del Sol）和马约尔广场（Plaza Mayor），马德里的心脏。傍晚人流最有生气。", kind: "walk", img: "assets/img/spots/sol-mayor.jpg", loc: {lat: 40.4168, lng: -3.7038}, hop: {via: "步行", dur: "5min"} },
      { t: "19:30", h: "Mercado San Miguel · 第一顿 Tapas", d: "百年铁艺市场，中央挤满摊位。伊比利亚火腿 + 章鱼 + 一杯 Rioja。别拍太多，先感受节奏。人均 25-35€。", kind: "food", img: "assets/img/spots/mercado-san-miguel.jpg", loc: {lat: 40.4155, lng: -3.7091}, hop: {via: "步行", dur: "3min · 200m"}, link: "https://www.mercadodesanmiguel.es/" },
      { t: "21:30", h: "Círculo de Bellas Artes 屋顶", d: "顶楼露台看马德里入夜。门票 5€，附赠一杯。结束第一天。", kind: "venue", img: "assets/img/spots/circulo-bellas-artes.jpg", loc: {lat: 40.4188, lng: -3.6957}, hop: {via: "步行", dur: "10min · 800m"}, link: "https://www.circulobellasartes.com/azotea/", ticket: "露台 5€" }
    ],
    vlog: ["香港 T1 值机牌", "阿布扎比转机航站楼", "飞机窗外日出", "Retiro 树影", "太阳门夜色", "Mercado San Miguel 火腿摊"],
    stay: { name: "Heart Of Madrid Apartments", area: "Sol · Calle Mayor 49", note: "马约尔广场旁 · 阳台正对老街", url: "https://www.airbnb.cn/rooms/1254627226967989817" },
    mapCenter: {lat: 40.4170, lng: -3.7040, zoom: 15}
  },
  {
    n: 2, date: "Sep 25 · Fri", city: "马德里 → 巴塞罗那", theme: "OUIGO Morning · Casa Batlló",
    desc: "早班 OUIGO 高铁 9:31 从 Atocha Almudena Grandes 站厅出发，12:58 抵达 Barcelona Sants。下午在巴特罗之家入内，15:00 民宿 Check-in，傍晚跟着 GYG Paella 烹饪课在 Boqueria 市集选食材做海鲜饭，晚上赶上 Mercè 开幕的巨型木偶游行。",
    slots: [
      { t: "08:00", h: "民宿退房 → Atocha Almudena Grandes", d: "打车或 Metro L1 到 Atocha。注意 OUIGO 用的是 Atocha 子站厅『Almudena Grandes』，不是主 AVE 大厅——认准指示牌。行李需过安检，30 min 前登机口开、5 min 前关闸。", kind: "transit", img: "assets/img/spots/atocha-station.jpg", loc: {lat: 40.4067, lng: -3.6900}, hop: {via: "打车", dur: "10min · 8€"} },
      { t: "09:31", h: "OUIGO 06501 · 座位 1D + 1E", d: "OUIGO Max/XL 舱等，含 1 手提 + 1 客舱行李 + 1 额外 25kg 行李（票 QG3UVL 已付）。二层双人排，靠窗看西班牙内陆平原变加泰罗尼亚。", kind: "transit", loc: {lat: 40.4067, lng: -3.6900}, link: "https://www.ouigo.com/", ticket: "OUIGO Max/XL · 已购 QG3UVL" },
      { t: "12:58", h: "Barcelona Sants 抵达", d: "下车往地铁 L5 走。先把行李拖到 Poblenou 民宿楼下寄存（Rut's Loft 15:00 才 check-in），或直接选站边寄存柜 Lockers Sants。", kind: "transit", loc: {lat: 41.3792, lng: 2.1400}, hop: {via: "OUIGO 直达", dur: "3h27m"} },
      { t: "14:00", h: "Casa Batlló 巴特罗之家 · 入内参观", d: "高迪 1904 年为 Josep Batlló 改造的立面，龙鳞屋顶 + 骨骼阳台，室内的漩涡采光井是最震撼的空间。选 Blue Ticket 基础票即可，加钱 Silver/Gold 可跳队。9 月开放 09:00-20:00。", kind: "museum", img: "assets/img/spots/casa-batllo.jpg", loc: {lat: 41.3917, lng: 2.1649}, hop: {via: "Metro L5 Sants → L3 Passeig de Gràcia", dur: "20min · 2.5€"}, link: "https://www.casabatllo.es/en/", ticket: "Blue 35€ · Silver 45€ · Gold 49€（跳队）" },
      { t: "15:30", h: "Rut's Loft 入住 · Poblenou", d: "打车 15min 到 Calle Pellaires 35。植物设计 Loft，房东 Rut 会亲自开门。距离 Bogatell 海滩步行 5 分钟。", kind: "stay", loc: {lat: 41.4023, lng: 2.2013}, hop: {via: "打车 Passeig de Gràcia → Poblenou", dur: "15min · 12€"} },
      { t: "17:00", h: "GYG · Paella 烹饪课 + Boqueria 市集", d: "跟着大厨去 La Boqueria 亲手选食材（西班牙米、藏红花、海鲜），回小厨房现场做一整锅海鲜饭 + Sangria。4h 体验，晚餐一并解决。人均 92€。", kind: "food", loc: {lat: 41.3818, lng: 2.1717}, hop: {via: "打车 Poblenou → Raval", dur: "18min · 12€"}, link: "https://www.getyourguide.com/barcelona-l45/paella-cooking-experience-with-boqueria-market-tour-t44533/", gyg: { title: "Paella 烹饪课 · Boqueria 市集采买", img: "assets/img/gyg/paella.jpg", rating: "4.8", reviews: "2,300+", price: "€92 起 · 4h", url: "https://www.getyourguide.com/barcelona-l45/paella-cooking-experience-with-boqueria-market-tour-t44533/" } },
      { t: "20:30", h: "Mercè · Xambanga de Gegants 巨人游行", d: "2026 官方节前夜（Mercè 开幕在 9/23 已过）：Xambanga 是巨人们『精装打扮』沿 Rambla / Sant Jaume 一带边走边跳的准游行，20:30-22:00。每个村都有自己 3m 高的巨人木偶（Gegants）。舞台侧翼视角最好。", kind: "event", img: "assets/img/spots/xambanga-gegants.jpg", loc: {lat: 41.3830, lng: 2.1770}, hop: {via: "步行 Boqueria → 广场", dur: "10min · 700m"}, link: "https://www.barcelona.cat/lamerce/en" },
      { t: "22:30", h: "Mercè Música · Bogatell 海滩音乐夜", d: "Mercè 2026 把主音乐舞台放到 Bogatell 沙滩（原来在 Fòrum/Montjuïc）。周五 9/25 场次：Miki Núñez + Buhos + Suu 系加泰罗尼亚 pop-rock 阵容，免费。舞台离你 Poblenou 民宿步行 6min。", kind: "event", loc: {lat: 41.39423, lng: 2.20488}, hop: {via: "步行 广场 → Poblenou → 沙滩", dur: "打车 10min · 或 Metro L4 15min"}, link: "https://www.barcelona.cat/lamerce/en" }
    ],
    vlog: ["Atocha Almudena Grandes 站牌特写", "OUIGO 二层车厢座位 1D", "Casa Batlló 龙鳞屋顶仰角", "Boqueria 藏红花摊位", "Paella 出锅特写", "Xambanga 巨人夜间游行"],
    stay: { name: "Rut's Loft · Poblenou", area: "Calle Pellaires 35", note: "植物设计 Loft · 距 Bogatell 海滩步行 5min", url: "https://www.airbnb.cn/rooms/9140899" },
    mapCenter: {lat: 41.3900, lng: 2.1700, zoom: 13}
  },
  {
    n: 3, date: "Sep 26 · Sat", city: "巴塞罗那 · Mercè + 高迪百年", theme: "Gaudí Centennial × Correfoc",
    desc: "全天交给 Mercè 节庆 + 一座圣家堂。上午不排任何收费景点，睡到自然醒，去哥特区和 Plaça de Sant Jaume 一带泡 Mercè 街头——周六上午有巨人游行（gegants），2026 主宾城市上海带来 100+ 艺术家的街头项目，全部免费。中午在圣家堂周边吃饭，12:45 进圣家堂（已购票，正午彩窗最强，留 2.5h）。下午继续 Mercè 街头与音乐舞台，夜晚 Correfoc 火跑 + 音乐夜。⚠ Mercè 官方逐时日程通常 9 月初发布，出发前查 barcelona.cat/lamerce 确认。",
    slots: [
      { t: "09:30", h: "自然醒 · Poblenou 本地早餐", d: "今天上午不赶任何景点。民宿楼下找家咖啡馆慢慢吃——Rambla del Poblenou 一带都是本地人去的，游客价没有。", kind: "food", loc: {lat: 41.4023, lng: 2.2013} },
      { t: "10:30", h: "Mercè 街头 · 哥特区 + Plaça de Sant Jaume", d: "Metro L4 Poblenou → Jaume I 约 15min，出来就是节庆心脏地带。周六上午固定会有 gegants（巨人游行）——三四米高的巨型人偶配鼓队穿过老城。2026 的主宾城市是上海，带来 100+ 艺术家的街头项目，是这届独有的内容。⚠ 官方逐时日程通常 9 月初才发布，出发前查 barcelona.cat/lamerce 确认具体时间地点。全部免费，不用订票。", kind: "event", img: "assets/img/spots/merce-cavalcada.jpg", loc: {lat: 41.38260, lng: 2.17707}, hop: {via: "Metro L4 → Jaume I", dur: "15min · 2.5€"}, link: "https://www.barcelona.cat/lamerce/en" },
      { t: "11:45", h: "Mercè 街头 → 圣家堂", d: "从哥特区坐 Metro L2 到 Sagrada Família 约 18min。节庆日路面拥堵，别打车。", kind: "transit", loc: {lat: 41.4036, lng: 2.1744}, hop: {via: "Metro L2 Jaume I → Sagrada Família", dur: "18min · 2.5€"} },
      { t: "12:00", h: "圣家堂周边午饭（正经坐下来吃）", d: "45min 从容吃一顿。别在圣家堂正门口那圈吃——游客价且品质一般。往 Eixample 街区里走两条街（Carrer de Provença 或 Carrer de Mallorca 内侧）本地小馆多得多。简单点就叫个 menú del día（午市套餐 €15-20，含前菜+主菜+甜点+饮料）。", kind: "food", loc: {lat: 41.4045, lng: 2.1760}, hop: {via: "步行", dur: "5min"} },
      { t: "12:45", h: "圣家堂 · 已购票入内（留 2h30m）", d: "已购 12:45 场次（票面 30min 宽限，13:15 前入场有效）。正值午间太阳穿透西侧受难立面彩窗，把内殿柱林染成一整片橙红——高迪毕生的『石头森林』最魔幻的时刻。⚠ 这段没有午饭时间，出门前买个 bocadillo 带着，或在圣家堂旁边的 Eixample 街区随手解决。正经的一顿挪到 15:30 Sirvent。", kind: "museum", loc: {lat: 41.4036, lng: 2.1744}, img: "assets/img/spots/sagrada-familia.jpg", link: "https://sagradafamilia.org/en/tickets-individuals", ticket: "Basilica 26€（已购）· 含塔 36€", notice: "9 月开放 09:00-20:00。已购 9/26 周六 12:45 场次，13:15 前必须入场。需遮住肩膀和膝盖。" },
      { t: "15:15", h: "出圣家堂 · 喘口气", d: "看完出来给 30min 缓冲——走到 Sirvent 只要 5min，剩下的时间坐着歇会儿。上午连转三个高迪，信息量很大，需要放空一下再进下午的 Mercè 场子。", kind: "walk", loc: {lat: 41.4020, lng: 2.1698}, hop: {via: "步行", dur: "5min · 400m"} },
      { t: "15:30", h: "Sirvent Horchata · 加泰下午茶", d: "圣家堂旁的百年 Horchata 老店（1926 年，刚好也 100 岁），老虎豆冰饮 + Fartons 甜面包。百年老店的 horchata 要配 fartons 蘸着吃。5 分钟步行。", kind: "food", loc: {lat: 41.4020, lng: 2.1698}, img: "assets/img/spots/sirvent-horchata.jpg", hop: {via: "步行", dur: "5min · 400m"} },
      { t: "17:00", h: "Mercè 街头艺术 & 免费音乐舞台", d: "周六下午是 BAM 和 Música Mercè 的主场——Plaça Reial、Rambla del Raval、Plaça de Catalunya 几个舞台轮着演，全部免费。MAC 街头艺术分散在 Via Laietana 和老城广场。不用赶场，跟着声音走就行。⚠ 具体阵容和时间以官方日程为准（9 月初发布）。", kind: "event", loc: {lat: 41.38160, lng: 2.17607}, img: "assets/img/spots/merce-cavalcada.jpg", hop: {via: "Metro L2 → Jaume I", dur: "18min · 2.5€"}, link: "https://www.barcelona.cat/lamerce/en" },
      { t: "20:00", h: "Mercè 2026 新装置 · Porta de l'Infern Correfoc @ Glòries", d: "2026 Mercè 大更新——Correfoc 从 Via Laietana 挪到 Plaça de les Glòries，配全新 4×8m 铸铁『地狱之门』装置。魔鬼队伍从门里出来放烟花跑穿人群。长袖长裤 + 戴帽子 + 遮住脖子，站两侧不要正中间。约 20:00-22:30。", kind: "event", loc: {lat: 41.40384, lng: 2.18960}, img: "assets/img/spots/merce-correfoc.jpg", hop: {via: "Metro L4 Jaume I → Glòries", dur: "15min"}, link: "https://www.barcelona.cat/lamerce/en" },
      { t: "22:45", h: "Bogatell 海滩音乐夜 Day 2 · La Pegatina + Svetlana", d: "Correfoc 结束后步行/打车 12min 回 Poblenou 沙滩看 Mercè Música。周六 9/26 场：La Pegatina（加泰罗尼亚乡愁 skanka）+ Svetlana + Cala Vento。免费，从民宿走过去 6min。", kind: "event", loc: {lat: 41.39423, lng: 2.20488}, img: "assets/img/spots/bogatell-beach.jpg", hop: {via: "打车 Glòries → Bogatell", dur: "10min · €8"}, link: "https://www.barcelona.cat/lamerce/en" }
    ],
    vlog: ["哥特区 gegants 巨人穿街", "Casa Milà 屋顶烟囱慢摇", "圣家堂彩窗染红的手", "Cavalcada 花车 + 大龙", "Porta de l'Infern 火花特写", "Bogatell 沙滩音乐夜人海"],
    stay: { name: "Rut's Loft · Poblenou", area: "Calle Pellaires 35", note: "植物设计 Loft · 距 Bogatell 海滩步行 5min", url: "https://www.airbnb.cn/rooms/9140899" },
    mapCenter: {lat: 41.3900, lng: 2.1720, zoom: 13}
  },
  {
    n: 4, date: "Sep 27 · Sun", city: "巴塞罗那 · 地中海帆船", theme: "Sail + Casa Milà + Tibidabo Sunset",
    desc: "上午 10:00 GYG 帆船出海 + 滨海酒庄品酒半日游（4h 固定行程）。下午补上 Casa Milà（从 Day 3 挪过来的）。傍晚登 Tibidabo——512 米全城最高点，圣心堂顶上就是那尊「神爱世人」耶稣像，站在雕像底座下俯瞰整个巴塞罗那和地中海，日落前 1 小时上去能拍全白天→日落→蓝调三种光。晚上回市区 Poble Sec 吃 Denassus 塔帕斯。",
    slots: [
      { t: "10:00", h: "GYG · 地中海帆船 + 滨海酒庄", d: "从 Port Olímpic 或 Port Vell 上船，出海 2h 沿海岸线航行，在滨海酒庄靠岸参观 + 品 4 款红酒。4h 固定行程，人均 90-120€。周日 10:00 出发场次。", kind: "event", img: "assets/img/spots/sailing-mediterranean.jpg", loc: {lat: 41.3860, lng: 2.1975}, hop: {via: "打车 Poblenou → Port Olímpic", dur: "8min · 6€"}, link: "https://www.getyourguide.com/barcelona-l45/", ticket: "€90-120 · 4h" },
      { t: "14:30", h: "Poblenou 简午餐 · Els Pescadors", d: "回你 Airbnb 楼下的老渔村区。Els Pescadors 是三代经营的海鲜餐厅，藏在广场角落被大榕树包围，Suquet 炖鱼和黑米海鲜饭本地口碑。船上已吃过就跳过。", kind: "food", loc: {lat: 41.4023, lng: 2.2013}, hop: {via: "步行/打车", dur: "10min"}, link: "https://elspescadors.com/en/" },
      { t: "15:30", h: "Casa Milà 米拉之家 · 屋顶烟囱（从容版）", d: "Passeig de Gràcia 92 号。这天不赶时间，可以按最舒服的顺序慢慢看：先上屋顶看那片「战士」烟囱群（高迪把通风口做成了雕塑，砖石曲线在下午光里会发光），再下到阁楼看悬链拱结构（像鲸鱼骨架），最后看复原的高迪时代公寓。全程 1.5h，不用像赶场那样只盯屋顶。从 Poblenou 打车约 15min（€10-12），看完直接打车去 Mirador 看日落。", kind: "museum", img: "assets/img/spots/casa-mila.jpg", loc: {lat: 41.3954, lng: 2.1620}, hop: {via: "打车 Poblenou → Passeig de Gràcia", dur: "15min · €10-12"}, link: "https://www.lapedrera.com/en", ticket: "自助 €24-28 · 官网可订" },
      { t: "17:00", h: "出发去 Tibidabo（三段交通）", d: "从 Passeig de Gràcia 走到 Plaça Catalunya 坐 FGC 的 S1 或 S2 线（注意是 FGC 不是 TMB 地铁，在 Plaça Catalunya 站内找 S1/S2 指示牌），约 15 分钟到终点站 Peu del Funicular。⚠ 上车一定要坐中间几节车厢——头尾车厢到站不开门，这是最容易踩的坑。到站后不要出站，跟着 Vallvidrera Superior 指示牌上楼换缆车（免费，含在交通卡里），3 分钟到半山腰。出缆车站过个小广场就是 111 路红色小巴站，9 分钟到终点 Plaça Tibidabo。全程约 1 小时 10 分。", kind: "transit", loc: {lat: 41.4225, lng: 2.1190}, hop: {via: "FGC S1/S2 + 缆车 + 111 路", dur: "约 70min · T-Casual 一区票"} },
      { t: "18:20", h: "Tibidabo 山顶 · 圣心堂登顶（€4）", d: "512 米，巴塞罗那最高点。教堂本身和地穴免费，登顶电梯 €4——先坐电梯，最后一段要步行爬上去，最高处就在那尊「神爱世人」耶稣雕像底座下。站在这里整个巴塞罗那和地中海铺在脚下，晴天能望到 70 公里外的比利牛斯山。观景区（Panoramic Area）免费，那架 Avió 老飞机复刻版和 Giradabo 摩天轮就在这一层，不花钱也能拍到。", kind: "museum", img: "assets/img/spots/mirador-farma.jpg", loc: {lat: 41.4225, lng: 2.1190}, link: "https://www.tibidabo.cat/en", ticket: "登顶电梯 €4 · 教堂与观景区免费" },
      { t: "18:45", h: "Tibidabo 日落 + 蓝调（日落约 19:38）", d: "日落前 1 小时登顶是这条线最关键的安排——能一路拍下来：白天全景 → 金色时刻 → 日落 → 蓝调时刻，光线每半小时换一次。机位就在耶稣雕像底座下，让雕像的手臂入镜，脚下是整座城市。⚠ 山顶比市区低 3-5°C 且风很大，务必带防风外套。", kind: "walk", img: "assets/img/spots/mirador-farma.jpg", loc: {lat: 41.4225, lng: 2.1190}, hop: {via: "徒步登顶段", dur: "拍到 20:00"}, notice: "111 路下山末班约 21:30（部分资料写 22:00，保守按 21:30 算）。拍完蓝调 20:00 开始下山，时间充裕。" },
      { t: "20:00", h: "下山 · 111 路 → 缆车 → FGC", d: "原路返回。111 路下山末班约 21:30，20:00 出发绰绰有余。若错过末班，山下打车回市区约 €25-30。到 Plaça Catalunya 约 21:15。", kind: "transit", loc: {lat: 41.3870, lng: 2.1700}, hop: {via: "111 路 + 缆车 + FGC S1/S2", dur: "约 70min"} },
      { t: "21:30", h: "Denassus · Poble Sec 塔帕斯晚餐", d: "Poble Sec 热门小酒馆，特色 Tapas 与选酒极其惊艳。必订位（订 21:30 场，说明是从 Tibidabo 下山过来）。人均 40€。", kind: "food", img: "assets/img/spots/denassus.jpg", loc: {lat: 41.3736, lng: 2.1614}, hop: {via: "打车 Plaça Catalunya → Poble Sec", dur: "12min · €9"} }
    ],
    vlog: ["帆船出港航拍", "Sangria 特写", "Casa Milà 屋顶烟囱下午光", "FGC 车厢 + 缆车 + 111 路小巴上山", "耶稣雕像底座下的全城俯瞰", "日落 → 蓝调延时", "Denassus tapas 手持"],
    stay: { name: "Rut's Loft · Poblenou", area: "Calle Pellaires 35", note: "植物设计 Loft · 距 Bogatell 海滩步行 5min", url: "https://www.airbnb.cn/rooms/9140899" },
    mapCenter: {lat: 41.4090, lng: 2.1550, zoom: 12}
  },
  {
    n: 5, date: "Sep 28 · Mon", city: "巴塞罗那 → 尼斯", theme: "Barcelona to Côte d'Azur",
    desc: "航班是下午的 Vueling VY1521（15:25 BCN T1 → 16:50 NCE T1，1h25m，已出票），所以上午在巴塞多赚半天：11:00 退房寄存行李，Bogatell 海滩 + Poblenou 老渔村午餐，13:00 去机场。16:50 落地尼斯 T1，18:00 入住 220 Avenue de la Californie，正好赶上 19:30 天使湾日落，老城 socca 收尾。",
    slots: [
      { t: "11:00", h: "Rut's Loft 退房 · 行李寄存", d: "航班在下午，不用早起。11:00 正常退房时间，行李寄民宿或用 Bounce/Radical Storage 寄存点（5-6€/件）——楼下 Poblenou 就有。空手过完上午最后半天。", kind: "stay", loc: {lat: 41.4023, lng: 2.2013} },
      { t: "11:30", h: "Bogatell 海滩 · 告别地中海", d: "民宿步行 5min 的 Bogatell 海滩，巴塞本地人的海滩（比 Barceloneta 清静得多）。下水或者就坐在沙上吹半小时风——这是这趟旅行最后一次见地中海西段。", kind: "walk", img: "assets/img/spots/bogatell-beach.jpg", loc: {lat: 41.3970, lng: 2.2040}, hop: {via: "步行", dur: "5min"} },
      { t: "12:30", h: "Poblenou 早午餐 · Can Recasens", d: "Poblenou 老仓库改的酒馆，暖光木架 + 一整墙葡萄酒，招牌是烤面包配加泰隆奶酪冷肉拼盘。人均 30€。（Day 4 已去过 Els Pescadors 就换这家；反过来也行。）吃完取行李直接打车走。", kind: "food", loc: {lat: 41.4008, lng: 2.1985}, hop: {via: "步行", dur: "5min"}, link: "https://www.canrecasens.com/" },
      { t: "13:30", h: "Poblenou → BCN El Prat T1", d: "取行李后打车 25min 到 T1（30€ 双人分摊），或 Aerobús A1（6.75€/人，Plaça Catalunya 出发 35min）。Vueling 在 T1，国内申根线值机柜台建议留 1.5h。", kind: "transit", loc: {lat: 41.2971, lng: 2.0785}, hop: {via: "打车", dur: "25min · 30€"} },
      { t: "15:25", h: "VY1521 · BCN T1 → NCE T1 · 已出票", d: "西班牙伏林航空 Vueling VY1521，15:25 起飞 16:50 落地，飞行 1h25m。出行人 DUAN/JINNAN、CHEN/KANG，状态已出票。廉航——随身行李尺寸提前量好，托运额确认清楚；机上无免费餐食。窗边看比利牛斯山东段 + 法国南部海岸线。", kind: "transit", loc: {lat: 41.2971, lng: 2.0785}, link: "https://www.vueling.com/", ticket: "VY1521 · 已出票 · 1h25m" },
      { t: "16:50", h: "抵达尼斯 Côte d'Azur T1", d: "落地航站楼是 T1。T1 出来走 5min 有 Tram T2 站，30min 到市区（1.5€）；带行李赶入住建议直接打车 15min 到 Californie（约 25€ 双人分摊）。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, hop: {via: "Vueling VY1521", dur: "1h25m"}, notice: "落地航站楼是 NCE T1，机场内 T1↔T2 有免费穿梭巴士。" },
      { t: "18:00", h: "Airbnb Check-in · 尼斯西区海边", d: "220 Avenue de la Californie，走出门就是 Promenade des Anglais 海滨大道。比原计划晚 2 小时到，跟房东 Aurore 提前说一声晚点入住（自助门锁 HM8A4N4MFY）。放行李冲个澡，20 分钟就能出门。", kind: "stay", loc: {lat: 43.6900, lng: 7.2434}, hop: {via: "打车", dur: "15min · 25€"} },
      { t: "19:00", h: "天使湾 · Promenade des Anglais 日落", d: "民宿走 8min 就到 Baie des Anges 天使湾。日落 19:30，海水从金到玫瑰到深蓝，蓝椅子那一排是标志画面。沿海滨大道往老城方向慢慢走，边走边吃冰淇淋——这段刚好接晚餐。", kind: "walk", img: "assets/img/spots/baie-des-anges.jpg", loc: {lat: 43.6900, lng: 7.2434}, hop: {via: "步行", dur: "8min · 600m"} },
      { t: "20:30", h: "尼斯老城 · 第一顿 socca", d: "Chez Pipo（1923 年老店）或 René Socca，尝尼斯特色鹰嘴豆饼 socca，配 Rosé de Provence 玫瑰酒。人均 20€。从海滨大道走到老城约 25min，或打车 10min（8€）。", kind: "food", img: "assets/img/spots/socca-nice.jpg", loc: {lat: 43.7018, lng: 7.2778}, hop: {via: "步行/打车", dur: "25min 步行 · 或 8€ 打车"}, link: "https://chezpipo.fr/" }
    ],
    vlog: ["Bogatell 海滩告别镜头", "Can Recasens 酒墙暖光", "BCN T1 值机牌 VY1521", "航班窗外比利牛斯东段", "NCE T1 出站第一口海风", "天使湾蓝椅子 + 日落", "Socca 出炉"],
    stay: { name: "New, Casa Californie Terrace & Beach", area: "尼斯西区海边 · 220 Avenue de la Californie", note: "3 晚 ¥3,339.72 · 房东 Aurore · HM8A4N4MFY", url: "https://www.airbnb.cn/rooms/1705767598377386136" },
    mapCenter: {lat: 43.6950, lng: 7.2600, zoom: 13}
  },
  {
    n: 6, date: "Sep 29 · Tue", city: "尼斯 → 昂蒂布 → 尼斯", theme: "Antibes · Picasso",
    desc: "早班火车 20min 到昂蒂布（Antibes），普罗旺斯露天集市 + 老城 + 海边城堡里的毕加索博物馆。傍晚回尼斯，Colline du Château 城堡山看日落，老城 socca 晚餐。",
    slots: [
      { t: "09:30", h: "尼斯 Ville 火车站 → Antibes", d: "SNCF TER 区间车 20min 直达（5€，随到随买）。尼斯 Ville 站离民宿 Tram T1 5 站。", kind: "transit", loc: {lat: 43.7047, lng: 7.2617}, hop: {via: "Tram T1 + SNCF TER", dur: "40min · 6.5€"}, link: "https://www.sncf-connect.com/" },
      { t: "10:00", h: "Marché Provençal 普罗旺斯集市", d: "Antibes 老城 Cours Masséna 每天早上的露天集市，蔬果+芝士+橄榄+香草+熏衣草香皂。挑一份 fougasse 面包和 rosé 当野餐。", kind: "food", img: "assets/img/spots/marche-antibes.jpg", loc: {lat: 43.5808, lng: 7.1263} },
      { t: "11:30", h: "昂蒂布老城漫步", d: "沿海岸城墙走一圈，看毕加索晚年住过的港口视角。老城巷道石板 + 蓝色木窗，是普罗旺斯明信片本人。", kind: "walk", img: "assets/img/spots/antibes-oldtown.jpg", loc: {lat: 43.5806, lng: 7.1266} },
      { t: "13:00", h: "Musée Picasso Antibes · 城堡里的毕加索", d: "Château Grimaldi 城堡 1946 年借给毕加索当画室 6 个月，他把整层画满了。现在原址成博物馆，藏 245 件毕加索作品 + 尼古拉·德·斯塔埃尔与哈通展。海边城堡里的文化厚度独一份。", kind: "museum", img: "assets/img/spots/picasso-antibes.jpg", loc: {lat: 43.5811, lng: 7.1258}, link: "https://www.antibes-juanlespins.com/culture/musee-picasso", ticket: "成人 8€", notice: "周一闭馆。周二—周日 10:00-13:00 + 14:00-18:00。" },
      { t: "15:00", h: "海边午餐 · Le Vauban 或 港边露天", d: "Antibes 港口边找一家露天座，尼斯沙拉 + 一杯 rosé + 现开生蚝。人均 35€。", kind: "food", loc: {lat: 43.5810, lng: 7.1310} },
      { t: "17:00", h: "SNCF 返回尼斯", d: "同一条 TER 线 20min 回尼斯 Ville 站。", kind: "transit", loc: {lat: 43.5808, lng: 7.1263}, hop: {via: "SNCF TER", dur: "20min · 5€"} },
      { t: "18:00", h: "Colline du Château · 城堡山日落", d: "老城背后的绿色小山头（免费 + 免费电梯上），山顶废墟观景台俯瞰整个天使湾 + 老城橘红屋顶 + 港口。日落 19:30。", kind: "walk", img: "assets/img/spots/colline-chateau.jpg", loc: {lat: 43.6957, lng: 7.2799}, hop: {via: "步行", dur: "12min"} },
      { t: "20:30", h: "老城晚餐 · La Merenda 或 Chez Palmyre", d: "尼斯老派家常菜。La Merenda 是米其林厨师 Dominique Le Stanc 转型的开放式厨房小店，没有电话订位只能到店等。人均 30€。", kind: "food", loc: {lat: 43.7015, lng: 7.2764} }
    ],
    vlog: ["Marché Provençal 橄榄油瓶", "毕加索博物馆城堡外墙", "海边生蚝手持", "Colline du Château 日落全景", "尼斯老城橘红屋顶"],
    stay: { name: "New, Casa Californie Terrace & Beach", area: "尼斯西区海边 · 220 Avenue de la Californie", note: "续住 · 房东 Aurore · HM8A4N4MFY", url: "https://www.airbnb.cn/rooms/1705767598377386136" },
    mapCenter: {lat: 43.6400, lng: 7.2000, zoom: 10}
  },
  {
    n: 7, date: "Sep 30 · Wed", city: "Èze + Villefranche · 蔚蓝海岸", theme: "Cliff Villages & Bays",
    desc: "上午山头香水村 Èze（Fragonard 香水厂 + Jardin Exotique 悬崖植物园），下午滨海自由城 Villefranche-sur-Mer 彩色海湾 + 沙滩游泳。不去芒通——离尼斯只 10 分钟且景色不输，省下拉车时间。",
    slots: [
      { t: "09:30", h: "Bus 82 → Èze Village 悬崖山城", d: "从尼斯 Vauban 站坐 Ligne d'Azur 82 路巴士 25min 到 Èze Village 山顶村（2.5€/程）。或 SNCF TER 到 Èze 海边站再打车上山（10min）。", kind: "transit", loc: {lat: 43.7286, lng: 7.3617}, hop: {via: "Bus 82", dur: "25min · 2.5€"}, link: "https://www.eze-tourisme.com/" },
      { t: "10:00", h: "Fragonard 香水厂 · 免费参观", d: "Fragonard 1926 年在 Èze 开的香水厂，免费参观 30min 看蒸馏工艺 + 试香。买一瓶带回国比机场便宜 30%。", kind: "museum", img: "assets/img/spots/fragonard-eze.jpg", loc: {lat: 43.7290, lng: 7.3617}, link: "https://usines-parfum.fragonard.com/en/" },
      { t: "10:45", h: "Jardin Exotique d'Èze · 异国花园", d: "山顶植物园，仙人掌 + 芦荟 + 龙舌兰在悬崖上排开，脚下是 400m 直落地中海。360° 俯瞰卡布岛（Cap Ferrat）。门票 8€。是这一天最上镜的地方。", kind: "walk", img: "assets/img/spots/jardin-exotique-eze.jpg", loc: {lat: 43.7285, lng: 7.3603}, link: "https://www.eze-tourisme.com/le-jardin-exotique-deze/", ticket: "成人 8€" },
      { t: "12:30", h: "Èze 山顶老巷午餐", d: "在中世纪石头巷子里选一家露天座，普罗旺斯 tarte 或 pissaladière（洋葱凤尾鱼扁面包）。人均 30€。", kind: "food", img: "assets/img/spots/jardin-exotique-eze.jpg", loc: {lat: 43.7285, lng: 7.3620} },
      { t: "14:00", h: "Bus 82 → Villefranche-sur-Mer", d: "下山原路巴士 20min 到 Villefranche。彩色小镇沿海湾展开，粉、赭、黄立面倒映在蓝海。", kind: "transit", img: "assets/img/spots/villefranche-bay.jpg", loc: {lat: 43.7042, lng: 7.3106}, hop: {via: "Bus 82", dur: "20min · 2.5€"} },
      { t: "14:30", h: "彩色海湾漫步 + 沙滩游泳", d: "Plage des Marinières 沙滩（不是鹅卵石！），9 月底水温还有 22°C，可以下水。老城 Rue Obscure 是 13 世纪穿老城的地下石头长廊，转 5 分钟就出来。", kind: "walk", img: "assets/img/spots/villefranche-bay.jpg", loc: {lat: 43.7044, lng: 7.3105} },
      { t: "17:00", h: "海边露台咖啡 · La Mère Germaine", d: "毕加索、雷诺阿都来吃过的百年海鲜餐厅，光露台喝杯 rosé 也值。看夕阳把港口染金。", kind: "food", img: "assets/img/spots/mere-germaine.jpg", loc: {lat: 43.7042, lng: 7.3108} },
      { t: "18:30", h: "SNCF TER → 尼斯 Ville", d: "SNCF TER 从 Villefranche-sur-Mer 站 8 分钟直达尼斯。人均 2.5€。", kind: "transit", loc: {lat: 43.7042, lng: 7.3106}, hop: {via: "SNCF TER", dur: "8min · 2.5€"} },
      { t: "20:00", h: "尼斯松弛晚餐", d: "民宿附近或老城随便找一家法式 bistro，Steak-frites + 一支 Bandol 红。今天走了两个村，早睡。", kind: "food", loc: {lat: 43.6900, lng: 7.2434} }
    ],
    vlog: ["Fragonard 蒸馏铜锅", "Jardin Exotique 悬崖仙人掌 hyperlapse", "Villefranche 彩色海湾广角", "Rue Obscure 地下石廊", "沙滩鹅卵石对比"],
    stay: { name: "New, Casa Californie Terrace & Beach", area: "尼斯西区海边 · 220 Avenue de la Californie", note: "最后一晚 · 10/1 提前退房赶 12:35 航班 → 巴黎", url: "https://www.airbnb.cn/rooms/1705767598377386136" },
    mapCenter: {lat: 43.7100, lng: 7.3300, zoom: 12}
  },
  {
    n: 8, date: "Oct 1 · Thu", city: "尼斯 → 巴黎 · Septime 之夜", theme: "Northbound · A Table at Septime",
    desc: "航班定了：易捷 U24856，尼斯 12:35 → 奥利 14:05。为了赶 11:00 值机，民宿要提前退房——今早不去天使湾了，行李收好直接打车 T2。下午 14:05 落地奥利，打车 35min 进城，早早就能 check-in 5 区拉丁区的公寓——推开阳台窗，正对巴黎大清真寺的绿瓦穹顶。今晚的重头戏是 Septime：19:30 晚市，地铁 M5 直达 20min，米其林一星、全球 50 佳，一份 tasting menu 吃到快 22:00。回来路上再拐进清真寺茶室喝杯薄荷茶收尾。明天搬去左岸 46 Rue Jacob。",
    slots: [
      { t: "09:30", h: "Casa Californie 提前退房 · 收拾行李", d: "12:35 的航班要 11:00 到 T2 值机，所以今早提前退房（比 11:00 的硬性时间早）。天使湾散步这次跳过——留给明年。房东那边打个招呼，行李直接带走不寄存。", kind: "stay", loc: {lat: 43.68793, lng: 7.24373}, notice: "为赶航班提前退房，不安排 Promenade 晨间散步。" },
      { t: "10:30", h: "打车 Californie → 尼斯机场 T2", d: "从 220 Avenue de la Californie 到 NCE T2 打车约 10-12min · 22€（双人分摊 11€）。也可以走 Tram T2（1.5€/人）但带行李换乘麻烦，赶飞机就打车。11:00 前到航站楼。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, hop: {via: "打车", dur: "10-12min · 22€"} },
      { t: "11:00", h: "T2 值机 + 安检 · 机场吃早午饭", d: "易捷是廉航，网上提前 check-in 好、行李额确认清楚（随身 56×45×25cm 免费，托运需另购）。安检后 T2 有 Paul、Pret 之类，随便吃点——这趟航班无餐食，飞机上什么都没有。今晚 Septime 是 tasting menu，中午别吃太饱。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, notice: "easyJet 经济舱无餐食。登机前吃饱或买点带上。" },
      { t: "12:35", h: "NCE T2 → ORY T1 · easyJet U24856", d: "尼斯蔚蓝海岸 T2 12:35 起飞 → 巴黎奥利 T1 14:05 落地，飞行 1h30m，空客 320（中型）。订单号 1128150429939513，携程出票中。靠窗能看到阿尔卑斯山脊往北铺开——起飞后 20 分钟左右最好看。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, link: "https://www.easyjet.com/en", ticket: "已购 · 总 ¥1,744 双人（人均 ¥872）", notice: "易捷 U24856 · 经济舱无餐食 · 空客 320。落地是奥利 ORY 不是 CDG。" },
      { t: "14:05", h: "ORY T1 落地 · 打车进城", d: "奥利 T1 到 5 区拉丁区约 19km，打车 35-40min · €35-45（双人分摊约 €20）。出到达层直接上官方 taxi 队伍（巴黎奥利到左岸有固定价 €37），别理揽客的。两人带行李，这段就别折腾 Orlybus 换地铁了。", kind: "transit", loc: {lat: 48.7262, lng: 2.3652}, hop: {via: "打车 ORY T1 → 5 区", dur: "35-40min · €35-45"} },
      { t: "15:00", h: "拉丁区公寓 Check-in · 清真寺景观阳台", d: "Airbnb「绝美景色 | 巴黎拉丁区」，房东 Audrey，★4.87（39 评）· 1 卧 2 床 1 卫 · 15:00 后可入住、明天 11:00 前退房。阳台正对巴黎大清真寺的绿瓦穹顶和白墙庭院。落地时间刚好卡上入住时段，行李放下就能休息。", kind: "stay", loc: {lat: 48.8420, lng: 2.3554}, link: "https://www.airbnb.cn/rooms/14190318" },
      { t: "16:30", h: "阳台下午茶 · 或补个觉 · 换衣服", d: "阳台正对绿顶，下午光线斜过来的时候最好拍。楼下 Franprix 买瓶水上来，坐着发会呆。前面七天连轴转，这两小时该歇。18:50 要出门去 Septime，提前换身干净衣服——不用正装，smart casual 就好（干净的牛仔裤 + 衬衫/针织衫足够）。", kind: "stay", loc: {lat: 48.8420, lng: 2.3554} },
      { t: "18:50", h: "M5 地铁 → Septime（11 区 Charonne）", d: "从公寓步行 3min 到 Place Monge，M5 线 Bastille 方向坐 4 站到 Bréguet-Sabin，出站走 8min 到 80 Rue de Charonne；或 M5 到 Bastille 换 M8 一站。全程约 20-25min · 2.15€/人。19:20 到店最舒服——早 10 分钟，不用赶。", kind: "transit", loc: {lat: 48.8547, lng: 2.3806}, hop: {via: "步行 3min + M5 地铁 · 4 站", dur: "20-25min · 2.15€"} },
      { t: "19:30", h: "Septime · 米其林一星 tasting menu", d: "80 Rue de Charonne, 75011。Bertrand Grébaut 的餐厅，米其林一星 + 全球 50 佳常客，开创了巴黎「neo-bistro」这一派。晚市只有一套 tasting menu（无点菜），厨师按当天市场决定内容，蔬菜是主角而不是配角。室内 45 座、开放式厨房推到最里侧，声压约 68 分贝——能正常说话。南墙那排长条沙发（banquette）是最好的位置，订位时可以在备注里写一句。建议加配酒（自然酒为主，€90/人），或者按杯点。别跳过附加的奶酪拼盘。吃到 21:45-22:00。", kind: "food", img: "assets/img/spots/rue-de-charonne.jpg", loc: {lat: 48.8547, lng: 2.3806}, link: "https://septime-charonne.fr/en/", ticket: "晚市 tasting €135-160/人 · 配酒 +€90", notice: "订位必须在 9/10（周四）10:00 巴黎时间上官网抢——只放 21 天后的位，热门场次 4 分钟清空。周六周日不营业。" },
      { t: "22:10", h: "Septime La Cave 或 M5 回拉丁区", d: "吃完还想坐一会：往回走 2min 是 Septime La Cave（3 Rue Basfroi），同一家的自然酒吧，站着喝一杯 €8-12，开到 23:00。不想续摊就直接 M5 回 Place Monge，20min。", kind: "walk", loc: {lat: 48.8542, lng: 2.3822}, hop: {via: "步行 2min / M5 回程 20min", dur: "视心情"} },
      { t: "23:00", h: "清真寺茶室夜宵 · 薄荷茶收尾", d: "回到公寓楼下 1-2min 就是 La Mosquée de Paris 的 Salon de Thé，摩尔风瓷砖庭院和无花果树，营业到 23:00——赶得紧的话直接明早来喝，早上人更少、光更好。一杯薄荷茶 3€、一块东方酥点 2€。房源标题说的「土耳其浴室 1 分钟」就是这里的 hammam（要预约、单独收费）。抬头就是白天从阳台看到的那个绿顶。", kind: "walk", loc: {lat: 48.8420, lng: 2.3554}, link: "https://www.grandemosqueedeparis.fr/", ticket: "茶室 3-8€ · hammam 约 45€ 需预约", hop: {via: "步行", dur: "2min · 150m"} }
    ],
    vlog: ["Californie 提前退房 · 关门那一刻", "NCE T2 值机牌与登机口", "空中阿尔卑斯北望", "ORY T1 出站的第一口巴黎空气", "推开阳台窗 → 清真寺绿顶第一眼", "Septime 门牌与开放式厨房", "tasting menu 每一道的特写", "夜里 M5 车厢与回家的路"],
    stay: { name: "绝美景色 · 巴黎拉丁区 · 土耳其浴室 1 分钟", area: "Quartier Latin · 75005 Paris · 清真寺景观阳台", note: "1 晚 · ★4.87（39 评）· 1 卧 2 床 1 卫 · 房东 Audrey · 人均 ¥882.96（总 ¥1,765.91）· 15:00 后入住 / 11:00 前退房", url: "https://www.airbnb.cn/rooms/14190318" },
    mapCenter: {lat: 48.8432, lng: 2.3530, zoom: 14}
  },
  {
    n: 9, date: "Oct 2 · Fri", city: "巴黎 · 左岸卢浮宫日", theme: "Louvre + Rive Gauche Salon",
    desc: "早上从拉丁区公寓 11:00 前退房，行李寄存或直接拖到 46 Rue Jacob。地铁 M7 一趟到卢浮宫，9:00-12:30 减负三宝路线。杜乐丽花园吃个 crêpe，13:30 走过塞纳河把行李搬进 46 Rue Jacob（15:00 才 check-in）。下午奥赛博物馆步行 12min，看印象派 5 楼。傍晚花神/双叟咖啡露天座 + 圣日耳曼大道晚风。今晚开始就住 Truly Parisien 老公寓——奥赛/卢浮宫都是家门口。",
    slots: [
      { t: "08:20", h: "拉丁区公寓退房 · 行李处理", d: "公寓 11:00 前退房，但今天早出门，提前收拾好。两个选择：① 行李寄存在公寓（跟 Audrey 确认是否可以）；② 直接拖到 46 Rue Jacob 楼下用 Nannybag 寄存（5€/件/天），从公寓地铁 M7 到 Saint-Germain 约 15min。轻装去卢浮宫更舒服。", kind: "stay", loc: {lat: 48.8420, lng: 2.3554} },
      { t: "08:40", h: "M7 地铁 → 卢浮宫 Porte des Lions", d: "从公寓步行 3min 到 Place Monge 站，M7 线坐 6 站到 Palais Royal-Musée du Louvre（约 12min），出站走 4min 到南侧 Porte des Lions（黎塞留翼下）——这个侧门几乎不用排队。9:00 准时开门。", kind: "transit", loc: {lat: 48.8590, lng: 2.3346}, hop: {via: "步行 3min + M7 地铁 12min", dur: "20min · 2.15€"} },
      { t: "09:00", h: "卢浮宫 · 三宝主线（减负版）", d: "只看三样：《蒙娜丽莎》→《米洛的维纳斯》→《萨莫色雷斯的胜利女神》。走德农馆 2 楼长廊直插蒙娜丽莎，9:15 前到画前人还不多；再往回走看维罗内塞《迦拿的婚礼》。整场 3.5h 而非 5h。", kind: "museum", img: "assets/img/spots/louvre-mona-lisa.jpg", loc: {lat: 48.8606, lng: 2.3376}, link: "https://www.ticketlouvre.fr/", ticket: "非 EEA 32€ · 强制预约", notice: "周二闭馆。热浪或维修期部分展厅可能临时闭馆，参观当天可致电 +33 1 40 20 53 17 确认。" },
      { t: "11:30", h: "卢浮宫 · 法国浪漫主义红厅", d: "德农馆红厅：德拉克罗瓦《自由引导人民》、大卫《拿破仑加冕》、席里柯《美杜莎之筏》。三张大画都在同一个房间，20 分钟看完出门。", kind: "museum", loc: {lat: 48.8606, lng: 2.3376} },
      { t: "13:00", h: "杜乐丽花园 · 绿椅子 + crêpe 午餐", d: "出馆 5 分钟就是 Tuileries 花园。经典绿椅子摆在喷水池边把脚抬高。路边买一份 Angelina 栗子蛋糕或 crêpe。40 分钟。", kind: "food", img: "assets/img/spots/tuileries.jpg", loc: {lat: 48.8635, lng: 2.3275}, hop: {via: "步行", dur: "5min · 400m"} },
      { t: "14:30", h: "步行过塞纳河回左岸 · 46 Rue Jacob Check-in", d: "从杜乐丽沿 Pont Royal 或 Passerelle Solférino 过河（10-12min · 1.2km），到 46 Rue Jacob 恰好 15:00。行李搬入，稍作休整。奥赛博物馆离新家门口 12min（1.4km）。", kind: "stay", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "步行过塞纳河", dur: "12min · 1.2km"} },
      { t: "15:45", h: "奥赛博物馆 · 印象派 5 楼", d: "从 46 Rue Jacob 步行 12min（1.4km）沿 Rue de l'Université 到奥赛。只上 5 楼——莫奈 → 马奈 → 修拉 → 梵高。1h30m 精读足够。周五延时到 21:45。", kind: "museum", loc: {lat: 48.8600, lng: 2.3266}, hop: {via: "步行", dur: "12min · 1.4km"}, link: "https://billetterie.musee-orsay.fr/", ticket: "线上 16€ · 现场 14€", notice: "周一闭馆！每月第一个周日免费但需预约。" },
      { t: "18:30", h: "回家小憩 · 换衣服", d: "奥赛步行 12min 回 46 Rue Jacob。淋浴、换鞋、给相机充电。慢旅行的关键——今晚附近全部步行搞定，不用赶地铁。", kind: "stay", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "步行", dur: "12min"} },
      { t: "19:30", h: "Rue de Buci 集市街 · 生蚝与自然酒", d: "从家门口 Rue Jacob 向东走 3 分钟就是 Rue de Buci，露天海鲜台 Huitrerie Régis 或 L'Avant Comptoir de la Mer——站着吃 6 只 Belon 生蚝 + 一杯 Sancerre 20€。或坐进 Semilla / Le Comptoir du Relais 慢慢吃。人均 40-60€。", kind: "food", img: "assets/img/spots/rue-de-buci.jpg", loc: {lat: 48.85358, lng: 2.33645}, hop: {via: "步行", dur: "3min · 300m"} },
      { t: "22:00", h: "塞纳河夜灯散步回家", d: "从 Rue de Buci 走到塞纳河 Pont des Arts / Institut de France 拍夜景（步行 5min），沿河向西走 400m 回家门口。整天最后一步都是走回家——奢侈。", kind: "walk", loc: {lat: 48.85720, lng: 2.33810}, hop: {via: "步行 回 46 Rue Jacob", dur: "8min · 0.7km", gyg: null } }
    ],
    vlog: ["Rue Jacob 门牌", "Porte des Lions 侧门排队", "蒙娜丽莎前的人群（不拍画）", "胜利女神楼梯广角", "杜乐丽绿椅子特写", "奥赛大钟", "Rue de Buci 生蚝台", "塞纳河夜灯"],
    stay: { name: "Paris · Truly parisien apartment in St Germain des Prés", area: "6 区 · 46 Rue Jacob · ★4.91", note: "首晚 · 15:00 check-in · 1 卧 1 床 1 卫", url: "https://www.airbnb.com/rooms/23476199" },
    mapCenter: {lat: 48.8590, lng: 2.3350, zoom: 14}
  },
  {
    n: 10, date: "Oct 3 · Sat", city: "巴黎 · 左岸慢日 + 圣母院 + 铁塔", theme: "Rive Gauche + Notre-Dame + Eiffel",
    desc: "从 46 Rue Jacob 出发的完整一天。上午卢森堡公园绿椅子 + 双叟/花神咖啡，下午西堤岛巴黎圣母院（修复重开），18:30 塞纳河蓝调游船看铁塔第一次亮灯，20:30 夏乐宫观景台看铁塔金色闪烁。晚上打车 15min 回家门口——今天是巴黎的高潮。",
    slots: [
      { t: "09:30", h: "家门口散步 · Rue de Buci 早市", d: "从 46 Rue Jacob 出门左转 Rue Bonaparte 走 3min 就是 Rue de Buci 集市街。周六早上最热闹，蚝摊、面包店、花店全开。买一份新鲜可颂当早餐，站着吃。", kind: "food", img: "assets/img/spots/rue-de-buci.jpg", loc: {lat: 48.85358, lng: 2.33645}, hop: {via: "步行 从民宿出发", dur: "3min · 250m"} },
      { t: "10:30", h: "卢森堡公园 · 绿椅子读书", d: "从家门口沿 Rue Bonaparte 一路南下 19min（1.7km）到卢森堡公园正门。经典绿椅子围着中央水池，带一本《恶之花》读半小时（或假装读）。免费。", kind: "walk", img: "assets/img/spots/luxembourg-garden.jpg", loc: {lat: 48.8462, lng: 2.3372}, hop: {via: "步行", dur: "19min · 1.7km"} },
      { t: "12:30", h: "Les Deux Magots 或 Café de Flore · 午餐", d: "回家门口最经典的两家：Deux Magots（Rue Jacob 转角就是，步行 90 秒）+ 花神（隔壁）。萨特/波伏娃/加缪都写过东西的桌子。点一份 Croque Monsieur + café crème。人均 30-40€。", kind: "food", img: "assets/img/spots/cafe-flore.jpg", loc: {lat: 48.85405, lng: 2.33393}, hop: {via: "步行", dur: "22min 从卢森堡回来 · 1.9km"}, link: "https://cafedeflore.fr/" },
      { t: "14:30", h: "沿塞纳河散步到西堤岛", d: "花神走出来往东，沿 Quai Malaquais → Quai de Conti → Pont Neuf（巴黎最古老的桥）→ 西堤岛。全程 20min 步行 · 1.5km，河风、旧书摊 Bouquinistes、Pont Neuf 石雕。", kind: "walk", loc: {lat: 48.85708, lng: 2.34099}, hop: {via: "步行沿塞纳河", dur: "20min · 1.5km"} },
      { t: "15:30", h: "巴黎圣母院 · 西堤岛修复主界面", d: "2019 年火灾后修复重开，塔尖 + 飞天拱壁 + 玫瑰花窗全部原样重建。目前进内殿排队约 30min，官网可预约免费时段（必须提前订）。", kind: "museum", img: "assets/img/spots/notre-dame.jpg", loc: {lat: 48.85299, lng: 2.34992}, hop: {via: "步行", dur: "10min · 0.8km"}, link: "https://www.notredamedeparis.fr/", ticket: "内殿免费 · 需官网预约时段", notice: "2024 年 12 月重开，塔楼登顶需另订。" },
      { t: "18:30", h: "塞纳河蓝调游船 · Bateaux Parisiens", d: "圣母院旁的 Pont au Double 码头就有游船。18:45-19:15 是蓝调日落最佳时刻，20:00 整点在船上看铁塔第一次金色闪烁（Scintillement）。1h 航程 18€。", kind: "venue", loc: {lat: 48.8528, lng: 2.3501}, hop: {via: "步行", dur: "3min"}, link: "https://www.bateauxparisiens.com/", ticket: "1h 游船 18€ · 提前网购可 15€", gyg: { title: "Seine Cruise · 蓝调时刻 1h 游船", img: "assets/img/gyg/nodietclub.jpg", rating: "4.8", reviews: "45,000+", price: "€18 起 · 1h", url: "https://www.getyourguide.com/paris-l16/1-hour-seine-river-sightseeing-cruise-t128772/" } },
      { t: "20:30", h: "Trocadéro 夏乐宫观景台", d: "游船下船后 Metro L6 到 Trocadéro（15min）。夏乐宫平台是拍铁塔的经典陆地视角。21:00 整点铁塔再一次 5 分钟金色闪烁——这是当晚第二次机会，比船上视角更近。免费。", kind: "walk", img: "assets/img/spots/eiffel-trocadero.jpg", loc: {lat: 48.8619, lng: 2.2886}, hop: {via: "游船 + Metro L6", dur: "40min"} },
      { t: "22:15", h: "打车回家门口 · 最后一晚宵夜", d: "从 Trocadéro 打车回 46 Rue Jacob 约 12min · €14（比转 2 次 Metro 快也不比它贵多少）。到家门口 Rue de Buci 还有几家开到凌晨的小酒吧，喝一杯庆祝今晚圆满。今晚不去红磨坊——体力留给明早退房。", kind: "food", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "打车 Trocadéro → 46 Rue Jacob", dur: "12min · €14 · 4.8km"} }
    ],
    vlog: ["Rue de Buci 早市可颂", "卢森堡绿椅子特写", "双叟咖啡桌面（假装读书）", "Pont Neuf 石雕仰拍", "圣母院飞天拱壁", "塞纳河蓝调水面", "铁塔金色闪烁 hyperlapse", "夏乐宫仰角"],
    stay: { name: "Paris · Truly parisien apartment in St Germain des Prés", area: "6 区 · 46 Rue Jacob · ★4.91", note: "最后一晚 · 10/4 10:00 退房赶 CDG", url: "https://www.airbnb.com/rooms/23476199" },
    mapCenter: {lat: 48.8560, lng: 2.3380, zoom: 13}
  },
  {
    n: 11, date: "Oct 4–5 · Sun–Mon", city: "巴黎 → 广州", theme: "Farewell · Homebound",
    desc: "10/4 早晨 46 Rue Jacob 家门口最后一杯咖啡 + Poilâne 面包（Rue Cherche-Midi 步行 10min），10:00 退房，11:30 打车去 CDG T1，15:55 Saudia 航班起飞。经吉达转机，10/5 15:25 抵达广州。带着 11 天的记录回家。",
    slots: [
      { t: "08:00", h: "Rue Jacob 家门口最后早晨", d: "楼下 Rue Bonaparte 咖啡馆或 Deux Magots 露天座 8:00 开门。一杯 café crème + 一份可颂。0 分钟通勤——最后一次享受 6 区的奢侈。", kind: "food", loc: {lat: 48.85398, lng: 2.33325}, hop: {via: "步行 从民宿", dur: "2min · 0.15km"}, link: "https://cafedeflore.fr/" },
      { t: "08:45", h: "Poilâne 传奇面包店 · 带一条回家", d: "6 区 Rue du Cherche-Midi 8 号，1932 年至今的传奇面包店。步行 10min（0.7km）从家门口过去。买一条巴掌大的圆面包 Petit Pain Rétrodor 带上飞机（可以过安检）。", kind: "food", img: "assets/img/spots/poilane-bakery.jpg", loc: {lat: 48.85141, lng: 2.32712}, hop: {via: "步行", dur: "10min · 0.7km"}, link: "https://www.poilane.com/" },
      { t: "10:00", h: "46 Rue Jacob 退房 · 收拾行李", d: "民宿 10:00 硬性退房。房东 Alexandra 一般会来收钥匙，或者按 Airbnb 说明放门口柜子里。行李在民宿等打车。", kind: "stay", loc: {lat: 48.85604, lng: 2.33403} },
      { t: "11:00", h: "叫车 → CDG T1（提前 30min，Sunday 保险起见）", d: "打车 Uber/G7 从 46 Rue Jacob → CDG T1 约 €55（Sunday 早上路况顺 45-55min · 29.6km）。避开 RER B 拉行李转车。留 4h 出关 + 退税（PABLO 机 + 海关盖章可能排 40min），15:55 起飞。", kind: "transit", img: "assets/img/spots/cdg-airport.jpg", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "打车 46 Rue Jacob → CDG T1", dur: "45-55min · €55 · 29.6km"} },
      { t: "13:00", h: "CDG T1 · Saudia 值机 + PABLO 退税", d: "Saudia 在 T1，中国乘客先走 PABLO 电子退税柜台（大厅内多台）扫二维码，再去海关柜台盖章（如需现金退税），最后过安检出关。", kind: "transit", img: "assets/img/spots/cdg-airport.jpg", loc: {lat: 49.0097, lng: 2.5479} },
      { t: "15:55", h: "CDG T1 → 吉达 T1 · Saudia", d: "Saudia SV146 沙特航空，飞行 6h45m。晚餐在机上。窗边看阿尔卑斯 + 地中海。", kind: "transit", img: "assets/img/spots/cdg-airport.jpg", loc: {lat: 49.0097, lng: 2.5479} },
      { t: "22:40", h: "抵达吉达 T1", d: "转机 2h25m。吉达机场夜间清冷，找一家咖啡座就好，别买免税太多——广州还有免税。", kind: "transit", loc: {lat: 21.6796, lng: 39.1565}, hop: {via: "Saudia 直飞", dur: "6h45m"} },
      { t: "10-05 01:05", h: "吉达 → 广州 T2 · Saudia", d: "Saudia SV876，飞行 9h20m。这段睡足——广州落地是下午。", kind: "transit", loc: {lat: 21.6796, lng: 39.1565} },
      { t: "10-05 15:25", h: "抵达广州 T2 · 到家", d: "带着这本 Autumn Atelier 回家。等下次。", kind: "transit", loc: {lat: 23.3924, lng: 113.2988}, hop: {via: "Saudia 直飞", dur: "9h20m"} }
    ],
    vlog: ["Rue Jacob 晨间空街", "Poilâne 面包架", "46 Rue Jacob 门牌告别特写", "CDG 值机牌", "机窗云海", "吉达机场夜色", "广州落地舷窗"],
    stay: { name: "Return · 返程在路上", area: "CDG → 吉达 → 广州", note: "两段飞行 · 明天回到深圳" },
    mapCenter: {lat: 48.8560, lng: 2.3380, zoom: 12}
  }
];

const missions = [
  { d: "Day 01", t: "在 Retiro 公园听完一整首歌不看手机。" },
  { d: "Day 02", t: "在 OUIGO 二层车厢窗边拍一张 3 秒 hyperlapse。" },
  { d: "Day 03", t: "在圣家堂彩窗染红的地板上站够两分钟。" },
  { d: "Day 04", t: "在帆船甲板上不看手机看海 10 分钟。" },
  { d: "Day 05", t: "在天使湾捡一颗鹅卵石，写上日期带回家。" },
  { d: "Day 06", t: "在 Antibes 集市买一小瓶普罗旺斯橄榄油。" },
  { d: "Day 07", t: "在 Èze 悬崖上给远方的人写一张明信片。" },
  { d: "Day 08", t: "在 TGV 上写下今天最想记住的一件事。" },
  { d: "Day 09", t: "在杜乐丽绿椅子上把脚抬起来发呆 15 分钟。" },
  { d: "Day 10", t: "在铁塔金色闪烁的 5 分钟里不举手机看它。" },
  { d: "Day 11", t: "在 Du Pain et des Idées 买 5 个蜗牛卷带回家。" }
];

/* ---------- Render Days ---------- */
const daysContent = document.getElementById("daysContent");
const daysTabs = document.querySelectorAll(".day-tab");

// 保存地图实例引用，切换 day 时销毁
let currentMap = null;

function slotIcon(kind) {
  const map = {
    museum: "🏛️", food: "🍽️", walk: "🚶", transit: "🚆",
    event: "🎪", venue: "✨", stay: "🛏️"
  };
  return map[kind] || "📍";
}

/* Renaissance: Arabic → Roman numerals (1..99 sufficient) */
function toRoman(num) {
  const map = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let n = num, out = "";
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

function renderDay(n) {
  const d = days[n - 1];

  // 销毁上一个地图
  if (currentMap) {
    currentMap.remove();
    currentMap = null;
  }

  const slotsHtml = d.slots.map((s, i) => {
    const linkHtml = s.link ? `<a class="slot-link" href="${s.link}" target="_blank" rel="noopener">🔗 官网 / 订票</a>` : "";
    const ticketHtml = s.ticket ? `<div class="slot-ticket"><span class="ticket-tag">Ticket</span> ${s.ticket}</div>` : "";
    const noticeHtml = s.notice ? `<div class="slot-notice"><span class="notice-tag">⚠ 公告</span> ${s.notice}</div>` : "";
    const hopHtml = s.hop ? `<div class="slot-hop"><span class="hop-arr">↳</span> <b>${s.hop.via}</b> · ${s.hop.dur}</div>` : "";
    const gygHtml = s.gyg ? `
      <a class="slot-gyg" href="${s.gyg.url}" target="_blank" rel="noopener">
        <div class="slot-gyg-img" style="background-image:url('${s.gyg.img}')"></div>
        <div class="slot-gyg-body">
          <div class="slot-gyg-tag">GetYourGuide · 预订</div>
          <div class="slot-gyg-title">${s.gyg.title}</div>
          <div class="slot-gyg-meta">
            <span class="slot-gyg-rating">★ ${s.gyg.rating} <em>(${s.gyg.reviews})</em></span>
            <span class="slot-gyg-price">${s.gyg.price}</span>
          </div>
          <div class="slot-gyg-cta">立即预订 <span class="slot-gyg-arr">↗</span></div>
        </div>
      </a>` : "";
    const imgHtml = s.img ? `
        <div class="slot-img">
          <img src="${s.img}" alt="${s.h}" loading="lazy" />
        </div>` : "";
    return `
    <div class="slot" data-slot-idx="${i}">
      <div class="slot-time">${s.t}</div>
      <div class="slot-body">
        ${imgHtml}
        ${hopHtml}
        <h4><span class="slot-icon">${slotIcon(s.kind)}</span> ${s.h}</h4>
        <p>${s.d}</p>
        ${ticketHtml}
        ${noticeHtml}
        ${linkHtml}
        ${gygHtml}
      </div>
    </div>`;
  }).join("");

  const shotsHtml = d.vlog.map((v, i) =>
    `<span>${v}</span>${i < d.vlog.length - 1 ? '<span class="arr">↓</span>' : ''}`
  ).join("");

  // 住宿卡片：整卡可点击跳转
  const stayHtml = d.stay ? (
    d.stay.url ? `
        <a class="day-stay is-clickable" href="${d.stay.url}" target="_blank" rel="noopener">
          <span class="day-stay-tag">Stay ·</span>
          <span class="day-stay-name">${d.stay.name}</span>
          <span class="day-stay-area">${d.stay.area}</span>
          <span class="day-stay-note">${d.stay.note}</span>
          <span class="day-stay-arrow">↗</span>
        </a>` : `
        <div class="day-stay">
          <span class="day-stay-tag">Stay ·</span>
          <span class="day-stay-name">${d.stay.name}</span>
          <span class="day-stay-area">${d.stay.area}</span>
          <span class="day-stay-note">${d.stay.note}</span>
        </div>`
  ) : "";

  daysContent.innerHTML = `
    <div class="day-card">
      <div class="day-hero">
        <span class="day-hero-num">${toRoman(d.n)}</span>
        <span class="day-hero-num-arabic">Day ${String(d.n).padStart(2, "0")}</span>
        ${d.date ? `<span class="day-hero-date">${d.date}</span>` : ""}
        <span class="day-hero-city">${d.city}</span>
        <span class="day-hero-theme">${d.theme}</span>
        <p class="day-hero-desc">${d.desc}</p>
        ${stayHtml}
        <div class="day-vlog">
          <div class="day-vlog-title">📸 Vlog Shot List</div>
          <div class="day-vlog-shots">${shotsHtml}</div>
        </div>
      </div>
      <div class="day-map-wrap">
        <div class="day-map-head">
          <span class="map-tag">Map · 今日动线</span>
          <span class="map-hint">点击标记看详情 · 拖动缩放</span>
        </div>
        <div class="day-map" id="dayMap"></div>
      </div>
      <div class="day-timeline">${slotsHtml}</div>
    </div>`;

  // 渲染 Leaflet 地图
  renderMap(d);
}

function renderMap(d) {
  const mapEl = document.getElementById("dayMap");
  if (!mapEl || typeof L === "undefined") return;

  const c = d.mapCenter || { lat: 48.8600, lng: 2.3400, zoom: 13 };
  const map = L.map("dayMap", {
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: false
  }).setView([c.lat, c.lng], c.zoom);

  // 使用 Carto Voyager 底图（比较柔和优雅）
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", {
    subdomains: "abcd",
    maxZoom: 20
  }).addTo(map);

  const validSlots = d.slots.filter(s => s.loc && s.loc.lat && s.loc.lng);
  const latlngs = [];

  validSlots.forEach((s, i) => {
    const isMuseum = s.kind === "museum";
    const isEvent = s.kind === "event";
    const bg = isMuseum ? "#8a3a2a" : isEvent ? "#d97e2e" : "#3d3428";
    // 从 slot.h 提取一个短地名（取 · 或 空格 或 - 前的部分，去除类别后缀）
    const shortName = (s.label || s.h.split(/[·]|—|–|,/)[0]).trim().slice(0, 14);
    // 只画小圆点，label 用 tooltip（可点击展开，鼠标悬停显示）
    // 移动端把圆点放大到 34px，保证手指可以稳定点中
    const pinSize = window.matchMedia("(max-width: 900px)").matches ? 34 : 28;
    const icon = L.divIcon({
      className: "custom-map-marker",
      html: `<div class="marker-pin-only" style="background:${bg}">${i + 1}</div>`,
      iconSize: [pinSize, pinSize],
      iconAnchor: [pinSize / 2, pinSize / 2]
    });

    const popup = `
      <div class="map-popup">
        <div class="popup-time">${s.t}</div>
        <div class="popup-title">${s.h}</div>
        <div class="popup-desc">${s.d.slice(0, 80)}${s.d.length > 80 ? "…" : ""}</div>
        ${s.hop ? `<div class="popup-hop">↳ ${s.hop.via} · ${s.hop.dur}</div>` : ""}
        ${s.ticket ? `<div class="popup-ticket">🎫 ${s.ticket}</div>` : ""}
        ${s.link ? `<a href="${s.link}" target="_blank" class="popup-link">官网 / 订票 →</a>` : ""}
      </div>`;

    const marker = L.marker([s.loc.lat, s.loc.lng], { icon, riseOnHover: true, riseOffset: 500 })
      .addTo(map)
      .bindPopup(popup, { maxWidth: 260 })
      .bindTooltip(shortName, {
        permanent: true,
        direction: "right",
        offset: [10, 0],
        className: `map-tip map-tip-${isMuseum ? "museum" : isEvent ? "event" : "base"}`
      });

    // 悬停时上浮 tooltip
    marker.on("mouseover", () => marker.getTooltip().getElement()?.classList.add("is-hover"));
    marker.on("mouseout", () => marker.getTooltip().getElement()?.classList.remove("is-hover"));

    latlngs.push([s.loc.lat, s.loc.lng]);
  });

  // 连线画路线
  if (latlngs.length > 1) {
    L.polyline(latlngs, {
      color: "#8a3a2a",
      weight: 2,
      opacity: 0.55,
      dashArray: "6, 8",
      lineCap: "round"
    }).addTo(map);
  }

  // 自动 fit：只要 >= 2 个点就 fitBounds，保证所有标记落进可视区
  if (latlngs.length > 1) {
    map.fitBounds(latlngs, { padding: [50, 80], maxZoom: 15 });
  } else if (latlngs.length === 1) {
    map.setView(latlngs[0], 15);
  }

  // 关键修复：Leaflet 在 DOM 尚未稳定时初始化会加载不全瓦片
  // 延迟触发 invalidateSize，让 Leaflet 重新计算容器尺寸并补全瓦片
  setTimeout(() => {
    map.invalidateSize();
    if (latlngs.length > 1) {
      map.fitBounds(latlngs, { padding: [50, 80], maxZoom: 15 });
    }
  }, 100);
  setTimeout(() => map.invalidateSize(), 400);

  currentMap = map;
}

daysTabs.forEach(btn => {
  btn.addEventListener("click", () => {
    switchToDay(parseInt(btn.dataset.day, 10));
  });
});

/* 统一的 Day 切换函数：同步 tabs + 移动端 chip + 渲染内容 */
function switchToDay(n, opts = {}) {
  const { scrollIntoView = false } = opts;
  daysTabs.forEach(b => b.classList.toggle("is-active", parseInt(b.dataset.day, 10) === n));
  document.querySelectorAll(".mnav-chip").forEach(c => c.classList.toggle("is-active", parseInt(c.dataset.jumpDay, 10) === n));
  renderDay(n);
  if (scrollIntoView) {
    const target = document.getElementById("days");
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
}

renderDay(1);
// 初始化移动端 chip 高亮
document.querySelector('.mnav-chip[data-jump-day="1"]')?.classList.add("is-active");

/* ---------- 移动端底部导航：Day chip + 目录抽屉 ---------- */
document.querySelectorAll(".mnav-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const n = parseInt(chip.dataset.jumpDay, 10);
    switchToDay(n, { scrollIntoView: true });
    // 把点中的 chip 滚到可视区
    chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
});

const mnavSheet = document.getElementById("mnavSheet");
const mnavMenuBtn = document.getElementById("mnavMenuBtn");
if (mnavMenuBtn && mnavSheet) {
  mnavMenuBtn.addEventListener("click", () => {
    mnavSheet.classList.add("is-open");
    mnavSheet.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
  mnavSheet.querySelectorAll("[data-mnav-close]").forEach(el => {
    el.addEventListener("click", () => {
      mnavSheet.classList.remove("is-open");
      mnavSheet.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });
}

/* Brand 点击回顶部 */
document.querySelector(".top-nav .brand")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Missions ---------- */
const missionGrid = document.getElementById("missionGrid");
missionGrid.innerHTML = missions.map(m => `
  <div class="mission-card">
    <div class="mission-day">${m.d}</div>
    <div class="mission-text">${m.t}</div>
  </div>`).join("");

/* ---------- Budget · Part 11 · 单人人均 · 可编辑 ---------- */
/* 所有数字都是单人人均（CNY）· 已订部分的原始双人价写在 note 里做核对 */
const budget = {
  currency: "CNY",
  fxNote: "汇率参考 1 EUR ≈ 7.85 CNY · 2026 年 7 月 · 所有金额均为单人人均",
  cats: [
    {
      key: "flight", name: "国际机票", icon: "✈️",
      items: [
        { t: "去程 HKG → AUH → MAD · Etihad", amt: 2722, note: "9/23 20:10 · 已购 · 单人 = 双人 ¥5,444 / 2" },
        { t: "返程 CDG → JED → CAN · Saudia", amt: 3166, note: "10/4 15:55 · 已购 · 单人 = 双人 ¥6,332 / 2" }
      ]
    },
    {
      key: "intra", name: "境内交通", icon: "🚆",
      items: [
        { t: "MAD → BCN · OUIGO Max/XL 已购", amt: 447, note: "9/25 09:31 · QG3UVL · €57 x 2 = ¥895 双人 / 2 · 座位 1D+1E" },
        { t: "BCN 市内 T-Casual 地铁 10 次卡", amt: 98, note: "€12.55 · 单人一张够 3-4 天用" },
        { t: "BCN → NCE · Vueling VY1521 已购", amt: 700, note: "9/28 15:25-16:50 · 已出票 · DUAN/JINNAN + CHEN/KANG · 票价待确认，点数字可改" },
        { t: "NCE 机场 T1 → 民宿 · 打车/Tram T2", amt: 20, note: "打车 15min 约 25€ 双人分摊，或 Tram T2 1.5€" },
        { t: "NCE → ORY · easyJet U24856 已购", amt: 872, note: "10/1 12:35-14:05 · 携程 1128150429939513 · 空客 320 · 经济舱无餐食 · 总 ¥1,744 / 2" },
        { t: "巴黎 Navigo Semaine 周票", amt: 235, note: "€30 周票（含 CDG↔市区），Sun-Sat 有效" },
        { t: "ORY T1 → 拉丁区公寓 · 打车双人分摊", amt: 160, note: "10/1 14:05 落地 · €35-45 打车 / 2 · 35-40min · 约 19km" },
        { t: "10/4 打车 46 Rue Jacob → CDG · 双人分摊", amt: 220, note: "€55 打车 / 2 · 45-55min · 29.6km" },
        { t: "各城市打车零散 · 单人分摊", amt: 350, note: "巴塞/尼斯/巴黎 · 双人分摊后单人一半" }
      ]
    },
    {
      key: "stay", name: "住宿", icon: "🛏️",
      items: [
        { t: "Madrid · Heart Of Madrid Apartments (1 晚)", amt: 642, note: "9/24 · 已订 · 单人 = 总 ¥1,284.09 / 2" },
        { t: "Barcelona · Rut's Loft Poblenou (3 晚)", amt: 2623, note: "9/25-9/28 · 已订 · 单人 = 总 ¥5,245.62 / 2" },
        { t: "Nice · Casa Californie Terrace & Beach (3 晚)", amt: 1670, note: "9/28-10/1 · 已订 · 单人 = 总 ¥3,339.72 / 2 · 房东 Aurore · HM8A4N4MFY" },
        { t: "Paris · 拉丁区清真寺景观公寓 (1 晚)", amt: 883, note: "10/1 夜 · 已订 · ★4.87 · 单人 ¥882.96 = 总 ¥1,765.91 / 2 · 房东 Audrey · airbnb.cn/rooms/14190318" },
        { t: "Paris · Truly Parisien St-Germain 46 Rue Jacob (2 晚)", amt: 2169, note: "10/2-10/4 · 已订 · ★4.91 · 单人 ¥2,168.89 = 总 ¥4,337.78 / 2 · airbnb.com/rooms/23476199" }
      ]
    },
    {
      key: "ticket", name: "门票 & 演出", icon: "🎫",
      items: [
        { t: "圣家堂 Basilica 内殿", amt: 204, note: "26€ · KK 已购 9/26 12:45 场次" },
        { t: "米拉之家 La Pedrera", amt: 204, note: "26€ 官网自助票 · 9/27 Day 4 下午（从 Day 3 挪过来）" },
        { t: "Casa Batlló", amt: 275, note: "35€ Blue · Silver 45€ 可跳队 · Day 2 下午入内" },
        { t: "Musée Picasso Antibes", amt: 63, note: "8€ · 城堡博物馆 · 现场买即可" },
        { t: "Jardin Exotique d'Èze", amt: 63, note: "8€ · 悬崖植物园 · 现场买即可" },
        { t: "卢浮宫（非 EEA）", amt: 251, note: "32€ · 2026-01 涨价 · 强制预约 · 10/2 上午 9:00 场" },
        { t: "奥赛博物馆", amt: 126, note: "16€ 线上 · 10/2 下午 15:45 场 · 2026-03 起全员强制预约" },
        { t: "Palais Garnier 加尼叶歌剧院自助", amt: 118, note: "15€ · 10/3 上午（可选）· 现场不售票，必须线上订" },
        { t: "巴黎圣母院", amt: 0, note: "内殿免费 · 仅提前 2-3 天放号 · 塔楼登顶另付 16€" },
        { t: "塞纳河蓝调游船", amt: 118, note: "€15（提前网购）· 现场 18€ · Bateaux Parisiens" },
        { t: "Círculo Bellas Artes 屋顶", amt: 39, note: "5€ 含一杯 · 9/24 收尾" },
        { t: "Tibidabo 圣心堂登顶电梯", amt: 31, note: "4€ · 9/27 日落登顶 · 教堂与观景区免费" }
      ]
    },
    {
      key: "food", name: "餐饮", icon: "🍽️",
      items: [
        { t: "早餐 x 11 · 咖啡店/面包房", amt: 770, note: "每天 8-10€ 单人" },
        { t: "午餐 x 11 · 中档小馆", amt: 2310, note: "每餐 25-35€ 单人" },
        { t: "Septime 晚市 tasting（10/1）", amt: 1176, note: "€150/人（tasting €135-160 + 配酒 €90 可选）· 米其林一星" },
        { t: "晚餐 x 10 · 一顿好餐 + 日常", amt: 3500, note: "含 Casa Amàlia/Denassus/La Merenda 级别 45-60€ 单人" },
        { t: "咖啡/甜品/tapas 零花", amt: 900, note: "Nomad/Ten Belles/Café de Flore 等 单人" }
      ]
    },
    {
      key: "gyg", name: "GYG 体验预订（可选升级）", icon: "🎟️",
      items: [
        { t: "Casa Milà 早鸟小团导览（Day 3）", amt: 307, note: "€39 · 替代 28€ 白天普通票 · 90min" },
        { t: "Paella 烹饪课 + Boqueria（Day 2）", amt: 724, note: "€92 · 到巴塞当晚 · 4h 含晚餐" },
        { t: "地中海帆船 + 滨海酒庄（Day 4）", amt: 872, note: "€111 · 9/27 10:00 出发 · 4h 含 4 款红酒" },
        { t: "Seine Cruise 蓝调时刻 1h 游船（Day 10）", amt: 141, note: "€18 · 圣母院 Pont au Double 码头 · 提前购便宜" }
      ]
    },
    {
      key: "misc", name: "杂项 & 备用", icon: "🎒",
      items: [
        { t: "eSIM 数据流量（11 天欧洲）", amt: 110, note: "Airalo 或 Holafly 单人" },
        { t: "旅行保险", amt: 400, note: "申根覆盖 · Chubb/AIG 单人" },
        { t: "购物预算（不控），建议留白", amt: 3000, note: "『路过就要』· 单人可上下浮动" },
        { t: "现金备用 200€", amt: 1600, note: "小费/紧急 单人" },
        { t: "签证费（若还未办）", amt: 700, note: "已办可置 0" }
      ]
    }
  ]
};

/* 让每一条 amt 都成为 contenteditable 数字，键入直接改单条 → 联动 cat 小计 → grand total → splits */
function renderBudget() {
  const wrap = document.getElementById("budgetContent");
  if (!wrap) return;

  const catsHtml = budget.cats.map((cat, ci) => {
    const total = cat.items.reduce((a, b) => a + b.amt, 0);
    const itemsHtml = cat.items.map((it, ii) => `
      <div class="bud-row" data-ci="${ci}" data-ii="${ii}">
        <span class="bud-t">${it.t}</span>
        <span class="bud-n">${it.note}</span>
        <span class="bud-a">¥<span class="bud-amt" contenteditable="true" spellcheck="false" data-ci="${ci}" data-ii="${ii}">${it.amt.toLocaleString()}</span></span>
      </div>`).join("");
    return `
      <div class="bud-cat" data-cat="${cat.key}">
        <div class="bud-cat-head">
          <span class="bud-icon">${cat.icon}</span>
          <h4 class="bud-cat-name">${cat.name}</h4>
          <span class="bud-cat-sum" data-ci="${ci}">¥${total.toLocaleString()}</span>
        </div>
        <div class="bud-cat-body">${itemsHtml}</div>
      </div>`;
  }).join("");

  wrap.innerHTML = `
    <div class="bud-hint">
      <span class="bud-hint-tag">Editable</span>
      所有价格数字都可以直接点开修改（点数字 → 输入 → 回车 / 点其他地方保存）。分类小计、总额、分摊会实时更新。
    </div>
    <div class="bud-grid">${catsHtml}</div>
    <div class="bud-total" id="budTotal"></div>`;

  bindBudgetEdit();
  refreshBudgetTotals();
}

function refreshBudgetTotals() {
  let grand = 0;
  // 已订固定 = 国际机票 2 项 + OUIGO（intra[0]）+ Vueling VY1521（intra[2]）+ easyJet NCE→ORY（intra[4]）+ 5 家 Airbnb（stay 全部）+ 圣家堂票（ticket[0]）
  const bookedFixed =
    budget.cats[0].items[0].amt + budget.cats[0].items[1].amt   // 国际机票 x2
    + budget.cats[1].items[0].amt                                // OUIGO
    + budget.cats[1].items[2].amt                                // Vueling VY1521
    + budget.cats[1].items[4].amt                                // easyJet U24856
    + budget.cats[2].items.reduce((a, b) => a + b.amt, 0)        // 5 家 Airbnb
    + budget.cats[3].items[0].amt;                               // 圣家堂
  budget.cats.forEach((cat, ci) => {
    const sum = cat.items.reduce((a, b) => a + b.amt, 0);
    grand += sum;
    const el = document.querySelector(`.bud-cat-sum[data-ci="${ci}"]`);
    if (el) el.textContent = "¥" + sum.toLocaleString();
  });
  const per = Math.round(grand / 11); // 日均
  const totalEl = document.getElementById("budTotal");
  if (!totalEl) return;
  totalEl.innerHTML = `
    <div class="bud-total-row">
      <span class="bud-total-label">Grand Total · 单人合计（11 天）</span>
      <span class="bud-total-num">¥${grand.toLocaleString()}</span>
    </div>
    <p class="bud-note">${budget.fxNote} · 已订金额固定，其余可编辑估算。</p>
    <div class="bud-splits">
      <div class="bud-split"><span>已订固定（机票 + 已订住宿）</span><b>¥${bookedFixed.toLocaleString()}</b></div>
      <div class="bud-split"><span>待定支出（其余 = 总 − 已订）</span><b>¥${(grand - bookedFixed).toLocaleString()}</b></div>
      <div class="bud-split"><span>日均</span><b>¥${per.toLocaleString()} / 天</b></div>
      <div class="bud-split"><span>双人合计参考</span><b>¥${(grand * 2).toLocaleString()}</b></div>
    </div>`;
}

function bindBudgetEdit() {
  document.querySelectorAll(".bud-amt").forEach(el => {
    // 阻止回车换行；数字校验
    el.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); el.blur(); }
    });
    el.addEventListener("blur", () => {
      const raw = el.textContent.replace(/[^\d.]/g, "");
      const num = Math.max(0, Math.round(parseFloat(raw) || 0));
      const ci = parseInt(el.dataset.ci, 10);
      const ii = parseInt(el.dataset.ii, 10);
      budget.cats[ci].items[ii].amt = num;
      el.textContent = num.toLocaleString();
      refreshBudgetTotals();
    });
    el.addEventListener("focus", () => {
      // 全选内容方便直接改
      requestAnimationFrame(() => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    });
  });
}

renderBudget();

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById("themeToggle");
const mnavThemeToggle = document.getElementById("mnavThemeToggle");
const savedTheme = localStorage.getItem("aa-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("aa-theme", next);
}
themeToggle?.addEventListener("click", toggleTheme);
mnavThemeToggle?.addEventListener("click", toggleTheme);

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
/* ⚠ 不要用 threshold 百分比：section 一旦比视口高很多（如 Booking TODO 7700px），
   8% 阈值(620px) 会超过视口高度(469px)，条件数学上永远不成立 → 整块永久 opacity:0。
   改用 rootMargin 负底边：只要 section 顶部进入视口上方 12% 处就触发，与高度无关。 */
const reveal = el => {
  el.style.opacity = 1;
  el.style.transform = "translateY(0)";
};
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      reveal(en.target);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0, rootMargin: "0px 0px -12% 0px" });

document.querySelectorAll(".section").forEach(s => {
  s.style.opacity = 0;
  s.style.transform = "translateY(30px)";
  s.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
  io.observe(s);
});

/* 兜底：3 秒后强制显示任何仍处于 opacity:0 的 section。
   覆盖 observer 未触发、prefers-reduced-motion、老浏览器等所有异常路径。 */
setTimeout(() => {
  document.querySelectorAll(".section").forEach(s => {
    if (s.style.opacity === "0" || s.style.opacity === 0) reveal(s);
  });
}, 3000);

/* ============================================================
   Booking TODO · 勾选 / 折叠 / localStorage 持久化
============================================================ */
(function initTodoChecklist() {
  const KEY = "aa-todo-done";
  const cards = Array.from(document.querySelectorAll(".todo-card"));
  if (!cards.length) return;

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }

  const fill = document.getElementById("tpFill");
  const countEl = document.getElementById("tpDone");

  function refreshProgress() {
    const done = cards.filter(c => c.classList.contains("is-done")).length;
    if (countEl) countEl.textContent = done;
    if (fill) fill.style.width = (done / cards.length * 100).toFixed(1) + "%";
  }

  function persist() {
    const out = {};
    cards.forEach(c => {
      const cb = c.querySelector('input[data-todo]');
      if (cb && cb.checked) out[cb.dataset.todo] = 1;
    });
    try { localStorage.setItem(KEY, JSON.stringify(out)); } catch (e) {}
  }

  cards.forEach(card => {
    const cb = card.querySelector('input[data-todo]');
    const caret = card.querySelector(".tc-caret");
    if (!cb) return;

    // 恢复保存的状态
    if (saved[cb.dataset.todo]) {
      cb.checked = true;
      card.classList.add("is-done");
    }

    cb.addEventListener("change", () => {
      card.classList.toggle("is-done", cb.checked);
      // 勾上时默认折叠；取消勾选时清掉展开态
      card.classList.remove("is-open");
      persist();
      refreshProgress();
    });

    // 点箭头 = 展开/收起（不改变勾选状态）
    if (caret) {
      caret.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.toggle("is-open");
      });
    }

    // 折叠态下点标题也能展开（勾选框本身仍走 label 逻辑）
    const foldedTitle = card.querySelector(".tc-folded");
    if (foldedTitle) {
      foldedTitle.addEventListener("click", e => {
        if (!card.classList.contains("is-done")) return;
        e.preventDefault();
        e.stopPropagation();
        card.classList.toggle("is-open");
      });
    }
  });

  const reset = document.getElementById("tpReset");
  if (reset) {
    reset.addEventListener("click", () => {
      cards.forEach(c => {
        const cb = c.querySelector('input[data-todo]');
        if (cb) cb.checked = false;
        c.classList.remove("is-done", "is-open");
      });
      persist();
      refreshProgress();
    });
  }

  refreshProgress();
})();
