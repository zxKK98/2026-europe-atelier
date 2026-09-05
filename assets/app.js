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
    desc: "9/23 香港夜航出发，经阿布扎比转机，9/24 上午抵达马德里。抵达日不塞太多：丽池公园晒太阳倒时差，入住后按马德里节奏在 14:00 吃一顿 Michelin Bib 午餐，回房补觉；傍晚才出门逛太阳门和马约尔广场，19:30 只做 aperitivo，不把它当正餐。",
    slots: [
      { t: "09-23 20:10", h: "香港 T1 起飞 · Etihad EY", d: "长途航班第一段。上机把时区表拨到马德里（−6h），先睡一觉。", kind: "transit", loc: {lat: 22.3080, lng: 113.9185} },
      { t: "09-24 00:25", h: "抵达阿布扎比 T-A", d: "转机 2 小时。找一杯咖啡，别买免税，登机时再看。", kind: "transit", loc: {lat: 24.4330, lng: 54.6511}, hop: {via: "Etihad EY 直飞", dur: "8h15m"} },
      { t: "09-24 08:10", h: "抵达马德里 T4 Barajas", d: "机场地铁 8 号线直达市区。先寄存行李，不用急着入住。", kind: "transit", loc: {lat: 40.4936, lng: -3.5668}, hop: {via: "Etihad EY 转机", dur: "5h45m"} },
      { t: "09:30", h: "Retiro 丽池公园 · 水晶宫", d: "买一杯冰咖啡，什么都不要做。看当地人。让阳光把时差晒掉。Palacio de Cristal 是园内玻璃展厅，随时有免费当代艺术展。", kind: "walk", img: "assets/img/spots/retiro-crystal-palace.jpg", loc: {lat: 40.4153, lng: -3.6844}, hop: {via: "Metro L8 → L2 到 Retiro", dur: "40min · 5€"} },
      { t: "13:00", h: "Heart Of Madrid Apartments 入住", d: "马约尔广场旁的公寓，Calle Mayor 49。先放行李、洗把脸；西班牙正经午餐从 13:30 后才进入状态，不在 12 点硬塞一顿。", kind: "stay", loc: {lat: 40.4160, lng: -3.7080}, hop: {via: "步行 Retiro → Sol", dur: "18min · 1.4km"} },
      { t: "13:45", h: "Trèsde · Michelin Bib 午餐", d: "Cava Alta 17 的 Michelin Bib Gourmand，小而不贵的现代西班牙菜。午餐 13:30-15:00，这一顿才是抵达日的正餐；从公寓步行约 12 分钟。两人点 2-3 道分享菜 + 酒水，人均约 40-50€，比星级 tasting 更适合第一天。", kind: "food", loc: {lat: 40.4122, lng: -3.7092}, hop: {via: "步行 Calle Mayor → La Latina", dur: "12min · 900m"}, link: "https://www.tresderestaurante.com/reservas/", ticket: "Michelin Bib · 人均约 40-50€", notice: "午餐最后入座窗口短，建议订 13:45-14:00；若航班延误，就改为 Mercado San Miguel 的简餐，不硬赶。" },
      { t: "15:30", h: "回民宿补觉 · 重新校时", d: "午餐后步行回 Calle Mayor 49，补睡 1.5-2 小时。把手机切到马德里时区，别再塞景点；傍晚醒来才有体力享受老城。", kind: "stay", loc: {lat: 40.4160, lng: -3.7080}, hop: {via: "步行", dur: "12min · 900m"} },
      { t: "18:00", h: "太阳门 & 马约尔广场漫步",  d: "从民宿楼下走出去就是太阳门（Puerta del Sol）和马约尔广场（Plaza Mayor），马德里的心脏。傍晚人流最有生气。", kind: "walk", img: "assets/img/spots/sol-mayor.jpg", loc: {lat: 40.4168, lng: -3.7038}, hop: {via: "步行", dur: "5min"} },
      { t: "19:30", h: "Mercado San Miguel · Aperitivo", d: "这不是正餐：14:00 已在 Trèsde 吃完午餐。这里按马德里晚间节奏，只点伊比利亚火腿、章鱼和一杯 Rioja，边站边感受夜生活刚刚开始。人均 15-25€。",  kind: "food", img: "assets/img/spots/mercado-san-miguel.jpg", loc: {lat: 40.4155, lng: -3.7091}, hop: {via: "步行", dur: "3min · 200m"}, link: "https://www.mercadodesanmiguel.es/" },
      { t: "21:30", h: "Círculo de Bellas Artes 屋顶", d: "顶楼露台看马德里入夜。门票 5€，附赠一杯。结束第一天。", kind: "venue", img: "assets/img/spots/circulo-bellas-artes.jpg", loc: {lat: 40.4188, lng: -3.6957}, hop: {via: "步行", dur: "10min · 800m"}, link: "https://www.circulobellasartes.com/azotea/", ticket: "露台 5€" }
    ],
    vlog: ["香港 T1 值机牌", "阿布扎比转机航站楼", "飞机窗外日出", "Retiro 树影", "太阳门夜色", "Mercado San Miguel 火腿摊"],
    stay: { name: "Heart Of Madrid Apartments", area: "Sol · Calle Mayor 49", note: "马约尔广场旁 · 阳台正对老街", url: "https://www.airbnb.cn/rooms/1254627226967989817" },
    mapCenter: {lat: 40.4170, lng: -3.7040, zoom: 15},
    returnHome: { from: "Círculo 屋顶", to: "Heart Of Madrid", distance: "1.1km", via: "步行", duration: "15min", note: "沿 Calle de Alcalá → Puerta del Sol → Calle Mayor，夜间主街人流稳定。" }
  },
  {
    n: 2, date: "Sep 25 · Fri", city: "马德里 → 巴塞罗那", theme: "OUIGO Morning · Casa Batlló · OBC Symphony Night",
    desc: "早班 OUIGO 高铁 9:31 从 Atocha Almudena Grandes 站厅出发，12:58 抵达 Barcelona Sants。下午在巴特罗之家入内，15:30 民宿 Check-in。17:00 不再错误地安排晚餐，留作洗澡、整理和 merienda；20:45 听完 OBC 后，按巴塞正常晚餐节奏回 Poblenou 吃 22:45 的晚餐。",
    slots: [
      { t: "08:00", h: "民宿退房 → Atocha Almudena Grandes", d: "打车或 Metro L1 到 Atocha。注意 OUIGO 用的是 Atocha 子站厅『Almudena Grandes』，不是主 AVE 大厅——认准指示牌。行李需过安检，30 min 前登机口开、5 min 前关闸。", kind: "transit", img: "assets/img/spots/atocha-station.jpg", loc: {lat: 40.4067, lng: -3.6900}, hop: {via: "打车", dur: "10min · 8€"} },
      { t: "09:31", h: "OUIGO 06501 · 座位 1D + 1E", d: "OUIGO Max/XL 舱等，含 1 手提 + 1 客舱行李 + 1 额外 25kg 行李（票 QG3UVL 已付）。二层双人排，靠窗看西班牙内陆平原变加泰罗尼亚。", kind: "transit", loc: {lat: 40.4067, lng: -3.6900}, link: "https://www.ouigo.com/", ticket: "OUIGO Max/XL · 已购 QG3UVL" },
      { t: "12:58", h: "Barcelona Sants 抵达", d: "下车往地铁 L5 走。先把行李拖到 Poblenou 民宿楼下寄存（Rut's Loft 15:00 才 check-in），或直接选站边寄存柜 Lockers Sants。", kind: "transit", loc: {lat: 41.3792, lng: 2.1400}, hop: {via: "OUIGO 直达", dur: "3h27m"} },
      { t: "14:00", h: "Casa Batlló 巴特罗之家 · 入内参观", d: "高迪 1904 年为 Josep Batlló 改造的立面，龙鳞屋顶 + 骨骼阳台，室内的漩涡采光井是最震撼的空间。选 Blue Ticket 基础票即可，加钱 Silver/Gold 可跳队。9 月开放 09:00-20:00。", kind: "museum", img: "assets/img/spots/casa-batllo.jpg", loc: {lat: 41.3917, lng: 2.1649}, hop: {via: "Metro L5 Sants → L3 Passeig de Gràcia", dur: "20min · 2.5€"}, link: "https://www.casabatllo.es/en/", ticket: "Blue 35€ · Silver 45€ · Gold 49€（跳队）" },
      { t: "15:30", h: "Rut's Loft 入住 · Poblenou", d: "打车 15min 到 Calle Pellaires 35。植物设计 Loft，房东 Rut 会亲自开门。距离 Bogatell 海滩步行 5 分钟。", kind: "stay", loc: {lat: 41.4023, lng: 2.2013}, hop: {via: "打车 Passeig de Gràcia → Poblenou", dur: "15min · 12€"} },
      { t: "17:00", h: "Poblenou · Merienda + 休整", d: "17:00 不在巴塞吃晚餐——多数正经厨房还没开。民宿安顿后喝咖啡、吃一份甜点或小三明治即可；洗澡、换衣服、充电，19:45 出门去 Nou Barris。", kind: "food", loc: {lat: 41.4018, lng: 2.2004}, hop: {via: "步行", dur: "5min"} },
      { t: "20:00", h: "Poblenou → Nou Barris · 提前进场", d: "从 Poblenou 出发，地铁转线约 35-40 分钟。20:40 前到 Plaça Major de Nou Barris，广场音乐会无需预约，提前到能从容找位置。", kind: "transit", loc: {lat: 41.4490, lng: 2.1790}, hop: {via: "L4 → L1 / L11", dur: "35-40min"} },
      { t: "20:45", h: "OBC 交响乐团 · Mercè 广场免费音乐会", d: "巴塞罗那交响乐团暨加泰罗尼亚国家交响乐团（OBC）在 Nou Barris 区政府广场的年度免费公演。指挥 Miguel Sepúlveda，曲目：Borodin《波罗维茨舞曲》→ Bartók《罗马尼亚民间舞曲》→ Tchaikovsky《天鹅湖》选段。约 75 分钟，免预约。已提前抵达，可完整听完。", kind: "event", loc: {lat: 41.4490, lng: 2.1790}, hop: {via: "步行进场", dur: "20:40 前抵达"}, link: "https://www.auditori.cat/en/events/obc-merce-2026/", ticket: "免费 · 免预约 · 约 75min" },
      { t: "22:45", h: "La Broqueta · Poblenou 正式晚餐", d: "OBC 结束后回 Poblenou，22:45 才是这晚的正式晚餐。La Broqueta 周五连续营业至 00:00，离民宿约 5 分钟；点烤海鲜、烤肉或一份分享饭，终于按巴塞的真实节奏坐下来吃。人均约 25-35€。", kind: "food", loc: {lat: 41.4007, lng: 2.2014}, hop: {via: "Nou Barris → L11/L4 → Poblenou", dur: "35-40min"}, link: "https://www.bcnrestaurantes.com/eng/imprimir/la-broqueta", notice: "这是为 OBC 保留的晚餐窗口；若演出延迟，直接点轻食，00:00 前离店回民宿。" }
    ],
    vlog: ["Atocha Almudena Grandes 站牌特写", "OUIGO 二层车厢座位 1D", "Casa Batlló 龙鳞屋顶仰角", "Poblenou 第一晚街角", "OBC 交响乐团 Nou Barris 广场全景", "天鹅湖终章时的人群"],
    stay: { name: "Rut's Loft · Poblenou", area: "Calle Pellaires 35", note: "植物设计 Loft · 距 Bogatell 海滩步行 5min", url: "https://www.airbnb.cn/rooms/9140899" },
    mapCenter: {lat: 41.3900, lng: 2.1700, zoom: 13},
    returnHome: { from: "OBC / Nou Barris", to: "Rut's Loft · Poblenou", distance: "约 7.0km", via: "L11 → L4 → 步行", duration: "35-40min", note: "若 OBC 后仍去 Bogatell，音乐散场后直接步行 6min 回民宿；不去则按此地铁线回家。" }
  },
  {
    n: 3, date: "Sep 26 · Sat", city: "巴塞罗那 · Mercè + 高迪百年", theme: "Gaudí Centennial × Correfoc",
    desc: "上午留给 Mercè 街头与哥特区，12:45 进入已购票的圣家堂。下午把原本与 OBC 冲突的 GYG Paella 体验移到这里：周六 Boqueria 市集正常开放，可保留市集采买、海鲜饭、Sangria 的完整环节。晚间看 Glòries 的 Correfoc，之后到 Bogatell 接 Love of Lesbian 和 Svetlana。",
    slots: [
      { t: "09:30", h: "自然醒 · Poblenou 本地早餐", d: "今天上午不赶任何景点。民宿楼下找家咖啡馆慢慢吃——Rambla del Poblenou 一带都是本地人去的，游客价没有。", kind: "food", loc: {lat: 41.4023, lng: 2.2013} },
      { t: "10:30", h: "Mercè 街头 · 哥特区 + Plaça de Sant Jaume", d: "Metro L4 Poblenou → Jaume I 约 15min，出来就是节庆心脏地带。周六上午固定会有 gegants（巨人游行）——三四米高的巨型人偶配鼓队穿过老城。2026 的主宾城市是上海，带来 100+ 艺术家的街头项目，是这届独有的内容。⚠ 官方逐时日程通常 9 月初才发布，出发前查 barcelona.cat/lamerce 确认具体时间地点。全部免费，不用订票。", kind: "event", img: "assets/img/spots/merce-cavalcada.jpg", loc: {lat: 41.38260, lng: 2.17707}, hop: {via: "Metro L4 → Jaume I", dur: "15min · 2.5€"}, link: "https://www.barcelona.cat/lamerce/en" },
      { t: "11:45", h: "Mercè 街头 → 圣家堂", d: "从哥特区坐 Metro L2 到 Sagrada Família 约 18min。节庆日路面拥堵，别打车。", kind: "transit", loc: {lat: 41.4036, lng: 2.1744}, hop: {via: "Metro L2 Jaume I → Sagrada Família", dur: "18min · 2.5€"} },
      { t: "12:00", h: "圣家堂前 · 轻食补给", d: "12:00 不是巴塞正经午餐时段，而且 12:45 有已购票入场。这里改成 bakery / café 的 bocadillo、果汁或咖啡，15 分钟解决；不要强行找 menú del día。今天的完整一餐是 16:00 Paella 课。", kind: "food", loc: {lat: 41.4045, lng: 2.1760}, hop: {via: "步行", dur: "5min"} },
      { t: "12:45", h: "圣家堂 · 已购票入内（留 2h30m）", d: "已购 12:45 场次（票面 30min 宽限，13:15 前入场有效）。正值午间太阳穿透西侧受难立面彩窗，把内殿柱林染成一整片橙红——高迪毕生的『石头森林』最魔幻的时刻。12:00 只做轻食补给；16:00 的 Paella 课会是下午的完整晚餐。",  kind: "museum", loc: {lat: 41.4036, lng: 2.1744}, img: "assets/img/spots/sagrada-familia.jpg", link: "https://sagradafamilia.org/en/tickets-individuals", ticket: "Basilica 26€（已购）· 含塔 36€", notice: "9 月开放 09:00-20:00。已购 9/26 周六 12:45 场次，13:15 前必须入场。需遮住肩膀和膝盖。" },
      { t: "15:15", h: "圣家堂 → Boqueria · 赶 GYG 集合", d: "出圣家堂后直接坐 L2 转 L3 到 Liceu，约 25 分钟。9/26 是周六；Boqueria 官方营业时间为周一至周六 08:00-20:30，市场导览可完整保留。", kind: "transit", loc: {lat: 41.3818, lng: 2.1717}, hop: {via: "Metro L2 → L3 · Liceu", dur: "25min · 2.5€"} },
      { t: "16:00", h: "GYG · Paella 烹饪课 + Boqueria 市集", d: "跟着大厨在 La Boqueria 选海鲜、米和藏红花，再回厨房做海鲜饭、Tapas 与 Sangria。全程 3 小时，市集导览、烹饪和晚餐都保留；9/26 是周六，不触发周日/节假日取消市集导览的规则。", kind: "food", loc: {lat: 41.3818, lng: 2.1717}, hop: {via: "步行出 Liceu", dur: "2min"}, link: "https://www.getyourguide.com/barcelona-l45/paella-cooking-experience-with-boqueria-market-tour-t44533/", gyg: { title: "Paella 烹饪课 · Boqueria 市集采买", img: "assets/img/gyg/paella.jpg", rating: "4.8", reviews: "4,200+", price: "€72 起 · 3h", url: "https://www.getyourguide.com/barcelona-l45/paella-cooking-experience-with-boqueria-market-tour-t44533/" }, notice: "预订时选 9/26 周六 16:00 左右场次；若预订页仅显示相邻时段，以保留市集导览为优先。" },
      { t: "19:15", h: "Boqueria → Glòries · Correfoc 入场", d: "课程结束后直接打车前往 Glòries，约 15 分钟。19:35 左右抵达，换上长袖长裤并留出找安全观演位置的时间。", kind: "transit", loc: {lat: 41.40384, lng: 2.18960}, hop: {via: "打车", dur: "15min · 10-12€"} },
      { t: "20:00", h: "Mercè 2026 新装置 · Porta de l'Infern Correfoc @ Glòries", d: "2026 Mercè 大更新——Correfoc 从 Via Laietana 挪到 Plaça de les Glòries，配全新 4×8m 铸铁『地狱之门』装置。魔鬼队伍从门里出来放烟花跑穿人群。长袖长裤 + 戴帽子 + 遮住脖子，站两侧不要正中间。约 20:00-22:30。", kind: "event", loc: {lat: 41.40384, lng: 2.18960}, img: "assets/img/spots/merce-correfoc.jpg", hop: {via: "Metro L4 Jaume I → Glòries", dur: "15min"}, link: "https://www.barcelona.cat/lamerce/en" },
      { t: "22:45", h: "Sips · 世界第一酒吧（火魔游行后直奔）", d: "Correfoc 约 22:30 收尾，出 Glòries 直接打车到 Muntaner 108——别去挤地铁，身上全是火药灰。Sips 是 2023 年全球最佳酒吧、近三年稳定全球前三，做的是「吧台即剧场」：中央岛吧、没有传统 back bar，酒在桌上完成最后一步。必点 Krypta（倒进嗅觉装置里喝）、Primordial（双手捧金属铸模）、Frozen Martinez，多数 €15。周六开到 02:00。", kind: "food", img: "assets/img/spots/sips-barcelona.jpg", loc: {lat: 41.3925, lng: 2.1570}, hop: {via: "打车 Glòries → Muntaner 108", dur: "12-15min · €10-13"}, link: "https://sips.barcelona/", ticket: "鸡尾酒 €15-25", notice: "周二至周六 18:30-02:00，周日周一休。不接电话订位，只能发邮件 bookings@sips.barcelona；walk-in 看空位，23:00 后最难排。" }
    ],
    vlog: ["哥特区 gegants 巨人穿街", "圣家堂彩窗染红的手", "Boqueria 海鲜摊与藏红花", "Paella 出锅特写", "Porta de l'Infern 火花特写", "Sips 中央岛吧的 Krypta 嗅觉装置"],
    stay: { name: "Rut's Loft · Poblenou", area: "Calle Pellaires 35", note: "植物设计 Loft · 距 Bogatell 海滩步行 5min", url: "https://www.airbnb.cn/rooms/9140899" },
    mapCenter: {lat: 41.3900, lng: 2.1720, zoom: 13},
    returnHome: { from: "Sips · Muntaner 108", to: "Rut's Loft · Poblenou", distance: "4.6km", via: "打车", duration: "15-18min", note: "01:00 后地铁已收班，直接在 Muntaner 街口叫 FreeNow / Cabify 回 Calle Pellaires，€13-17。周六深夜街上人多，手机收好。" }
  },
  {
    n: 4, date: "Sep 27 · Sun", city: "巴塞罗那 · 地中海帆船", theme: "Sail + Casa Milà + Tibidabo Sunset",
    desc: "上午 10:00 GYG 帆船出海 + 滨海酒庄品酒半日游（4h 固定行程）。下午看 Casa Milà；傍晚只留一段完整的 Tibidabo 体验：圣心堂最高露台、全城日落和蓝调。下山后直接回 Bogatell Beach，看 22:00 的 Mercè Piromusical 烟火闭幕。",
    slots: [
      { t: "10:00", h: "GYG · 地中海帆船 + 滨海酒庄", d: "从 Port Olímpic 或 Port Vell 上船，出海 2h 沿海岸线航行，在滨海酒庄靠岸参观 + 品 4 款红酒。4h 固定行程，人均 90-120€。周日 10:00 出发场次。", kind: "event", img: "assets/img/spots/sailing-mediterranean.jpg", loc: {lat: 41.3860, lng: 2.1975}, hop: {via: "打车 Poblenou → Port Olímpic", dur: "8min · 6€"}, link: "https://www.getyourguide.com/barcelona-l45/", ticket: "€90-120 · 4h" },
      { t: "14:30", h: "Paco Meralgo · 米其林收录 alta taberna", d: "C/ Muntaner 171（Eixample Esquerra），与 Sips 同一条街、相距 500m。米其林指南「Good Cooking」收录，自称 alta taberna 高级酒馆，Google 近 6000 条评价 4.5 分。必点：Steak Tartare montadito（米其林点名必点）、竹蛏 razor clams、patatas bravas、pan con tomate、俄式沙拉 La Rusa、扇贝；黑板上的当日野生鱼和午市限定的米饭按市场走。tapas €12 起，人均 €35-45。", kind: "food", img: "assets/img/spots/paco-meralgo.jpg", loc: {lat: 41.3960, lng: 2.1530}, hop: {via: "步行 → Casa Milà", dur: "12-15min"}, link: "https://www.restaurantpacomeralgo.com/", ticket: "tapas €12 起 · 人均 €35-45", notice: "每日 13:00-16:00 / 20:00-00:30，周日照常营业。必须在官网 restaurantpacomeralgo.com 订位，周日午市也建议提前订。" },
      { t: "15:30", h: "Casa Milà 米拉之家 · 屋顶烟囱（从容版）", d: "Passeig de Gràcia 92 号。这天不赶时间，可以按最舒服的顺序慢慢看：先上屋顶看那片「战士」烟囱群（高迪把通风口做成了雕塑，砖石曲线在下午光里会发光），再下到阁楼看悬链拱结构（像鲸鱼骨架），最后看复原的高迪时代公寓。全程 1.5h，不用像赶场那样只盯屋顶。从 Paco Meralgo 吃完步行 12-15min 就到，动线完全顺，看完直接上山看日落。", kind: "museum", img: "assets/img/spots/casa-mila.jpg", loc: {lat: 41.3954, lng: 2.1620}, hop: {via: "步行 从 Paco Meralgo", dur: "12-15min"}, link: "https://www.lapedrera.com/en", ticket: "自助 €24-28 · 官网可订" },
      { t: "17:00", h: "Tibidabo · 圣心堂登顶 + 日落全景", d: "从 Casa Milà 出发，FGC S1/S2 → Vallvidrera 缆车 → 111 路上山，约 70 分钟。18:20 登顶：教堂与观景区免费，电梯 €4；在耶稣雕像基座下拍整座巴塞、地中海和蓝调。20:00 原路下山，约 21:25 回到 Bogatell。", kind: "event", img: "assets/img/spots/tibidabo-xhs-sunset.jpg", imgMode: "portrait", loc: {lat: 41.4225, lng: 2.1190}, hop: {via: "FGC S1/S2 + Vallvidrera 缆车 + 111 路", dur: "往返约 4h25 · T-Casual 一区票"}, remote: { metric: "单程 70min · 往返 4h25", copy: "距离远，且 111 路下山末班约 21:30。若 16:50 仍未离开 Casa Milà、天气转差或体力不足，直接放弃登顶：回 Poblenou 休息，21:30 去 Bogatell 看烟火闭幕。" }, link: "https://www.tibidabo.cat/en", ticket: "登顶电梯 €4", notice: "111 路下山末班约 21:30；山顶风大，比市区低 3-5°C，带防风外套。" },
      { t: "22:00", h: "Mercè Piromusical · Bogatell Beach 烟火闭幕", d: "La Mercè 2026 的最后一场：音乐编排烟火在 Bogatell 海滩举行。今年因 Montjuïc 施工首次移到这里。住处步行 5 分钟，提前在海滩靠北一侧找位；结束后直接步行回民宿。", kind: "event", img: "assets/img/spots/merce-piromusical.jpg", loc: {lat: 41.39423, lng: 2.20488}, hop: {via: "Plaça Catalunya → L4 Poblenou → 步行", dur: "Tibidabo 下山后约 20min"}, link: "https://www.barcelona.cat/lamerce/en", ticket: "免费 · 22:00" }
    ],
    vlog: ["帆船出港航拍", "Sangria 特写", "Casa Milà 屋顶烟囱下午光", "Tibidabo 耶稣雕像与巴塞全景", "日落 → 蓝调延时", "Bogatell 海面上的 Piromusical 烟火"],
    stay: { name: "Rut's Loft · Poblenou", area: "Calle Pellaires 35", note: "植物设计 Loft · 距 Bogatell 海滩步行 5min", url: "https://www.airbnb.cn/rooms/9140899" },
    mapCenter: {lat: 41.4090, lng: 2.1550, zoom: 12},
    returnHome: { from: "Bogatell Piromusical", to: "Rut's Loft · Poblenou", distance: "0.9km", via: "海滨步行", duration: "12min", note: "烟火散场人潮大，先在海滩边缘停 10 分钟再走；无需打车，步行回家最稳。" }
  },
  {
    n: 5, date: "Sep 28 · Mon", city: "巴塞罗那 → 尼斯", theme: "Barcelona to Côte d'Azur",
    desc: "航班是下午的 Vueling VY1521（15:25 BCN T1 → 16:50 NCE T1，1h25m，已出票）。11:00 退房寄存行李，Bogatell 海滩吹风；12:30 去全天营业的 barbocata2 吃最后一顿早午餐——这是特例，不套用巴塞普通餐厅 14:00 才开午餐的规律。16:50 落地尼斯 T1，18:00 入住，19:30 天使湾日落，20:30 才按尼斯节奏去老城吃 socca。",
    slots: [
      { t: "11:00", h: "Rut's Loft 退房 · 行李寄存", d: "航班在下午，不用早起。11:00 正常退房时间，行李寄民宿或用 Bounce/Radical Storage 寄存点（5-6€/件）——楼下 Poblenou 就有。空手过完上午最后半天。", kind: "stay", loc: {lat: 41.4023, lng: 2.2013} },
      { t: "11:30", h: "Bogatell 海滩 · 告别地中海", d: "民宿步行 5min 的 Bogatell 海滩，巴塞本地人的海滩（比 Barceloneta 清静得多）。下水或者就坐在沙上吹半小时风——这是这趟旅行最后一次见地中海西段。", kind: "walk", img: "assets/img/spots/bogatell-beach.jpg", loc: {lat: 41.3970, lng: 2.2040}, hop: {via: "步行", dur: "5min"} },
      { t: "12:30", h: "barbocata2（Diagonal 店） · 巴塞最后一顿早午餐", d: "Av. Diagonal 343（Eixample Dreta）。这是少数全天营业、从早餐一路供应到晚餐的店，因此 12:30 在这里吃合理，不套用巴塞普通餐厅 14:00 才开午餐的规则。点焦糖洋葱 tortilla、bocata 三明治或周一限定焗通心粉；从 Poblenou 打车 10-12 分钟，吃完往机场方向走，不用折返。", kind: "food", img: "assets/img/spots/barbocata2.jpg", loc: {lat: 41.3975, lng: 2.1730}, hop: {via: "打车 Poblenou → Diagonal 343", dur: "10-12min · €8-10"}, link: "https://barbocata.com/pages/diagonal", ticket: "人均 €15-25", notice: "全天营业无需订位；周一的焗通心粉是限定款，想吃到就别去太晚。" },
      { t: "13:30", h: "Poblenou → BCN El Prat T1", d: "取行李后打车 25min 到 T1（30€ 双人分摊），或 Aerobús A1（6.75€/人，Plaça Catalunya 出发 35min）。Vueling 在 T1，国内申根线值机柜台建议留 1.5h。", kind: "transit", loc: {lat: 41.2971, lng: 2.0785}, hop: {via: "打车", dur: "25min · 30€"} },
      { t: "15:25", h: "VY1521 · BCN T1 → NCE T1 · 已出票", d: "西班牙伏林航空 Vueling VY1521，15:25 起飞 16:50 落地，飞行 1h25m。出行人 DUAN/JINNAN、CHEN/KANG，状态已出票。廉航——随身行李尺寸提前量好，托运额确认清楚；机上无免费餐食。窗边看比利牛斯山东段 + 法国南部海岸线。", kind: "transit", loc: {lat: 41.2971, lng: 2.0785}, link: "https://www.vueling.com/", ticket: "VY1521 · 已出票 · 1h25m" },
      { t: "16:50", h: "抵达尼斯 Côte d'Azur T1", d: "落地航站楼是 T1。T1 出来走 5min 有 Tram T2 站，30min 到市区（1.5€）；带行李赶入住建议直接打车 15min 到 Californie（约 25€ 双人分摊）。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, hop: {via: "Vueling VY1521", dur: "1h25m"}, notice: "落地航站楼是 NCE T1，机场内 T1↔T2 有免费穿梭巴士。" },
      { t: "18:00", h: "Airbnb Check-in · 尼斯西区海边", d: "220 Avenue de la Californie，走出门就是 Promenade des Anglais 海滨大道。比原计划晚 2 小时到，跟房东 Aurore 提前说一声晚点入住（自助门锁 HM8A4N4MFY）。放行李冲个澡，20 分钟就能出门。", kind: "stay", loc: {lat: 43.6900, lng: 7.2434}, hop: {via: "打车", dur: "15min · 25€"} },
      { t: "19:00", h: "天使湾 · Promenade des Anglais 日落", d: "民宿走 8min 就到 Baie des Anges 天使湾。日落 19:30，海水从金到玫瑰到深蓝，蓝椅子那一排是标志画面。沿海滨大道往老城方向慢慢走，边走边吃冰淇淋——这段刚好接晚餐。", kind: "walk", img: "assets/img/spots/baie-des-anges.jpg", loc: {lat: 43.6900, lng: 7.2434}, hop: {via: "步行", dur: "8min · 600m"} },
      { t: "20:30", h: "尼斯老城 · 第一顿 socca", d: "Chez Pipo（1923 年老店）或 René Socca，尝尼斯特色鹰嘴豆饼 socca，配 Rosé de Provence 玫瑰酒。人均 20€。从海滨大道走到老城约 25min，或打车 10min（8€）。", kind: "food", img: "assets/img/spots/socca-nice.jpg", loc: {lat: 43.7018, lng: 7.2778}, hop: {via: "步行/打车", dur: "25min 步行 · 或 8€ 打车"}, link: "https://chezpipo.fr/" }
    ],
    vlog: ["Bogatell 海滩告别镜头", "barbocata2 复古吧台与 tortilla", "BCN T1 值机牌 VY1521", "航班窗外比利牛斯东段",  "NCE T1 出站第一口海风", "天使湾蓝椅子 + 日落", "Socca 出炉"],
    stay: { name: "New, Casa Californie Terrace & Beach", area: "尼斯西区海边 · 220 Avenue de la Californie", note: "3 晚 ¥3,339.72 · 房东 Aurore · HM8A4N4MFY", url: "https://www.airbnb.cn/rooms/1705767598377386136" },
    mapCenter: {lat: 43.6950, lng: 7.2600, zoom: 13},
    returnHome: { from: "尼斯老城 · socca", to: "Casa Californie", distance: "3.2km", via: "Tram L1 → 步行", duration: "25min", note: "从 Opéra / Vieille Ville 上 L1 往 Hôpital Pasteur 反向至 Magnan，再步行 7min；22:00 后可直接打车约 12min。" }
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
      { t: "20:30", h: "老城晚餐 · La Merenda 或 Chez Palmyre", d: "尼斯老派家常菜。La Merenda 是米其林厨师 Dominique Le Stanc 转型的开放式厨房小店，没有电话订位只能到店等。人均 30€。", kind: "food", img: "assets/img/spots/la-merenda.jpg", loc: {lat: 43.7015, lng: 7.2764}, link: "https://lamerenda.net/" }
    ],
    vlog: ["Marché Provençal 橄榄油瓶", "毕加索博物馆城堡外墙", "海边生蚝手持", "Colline du Château 日落全景", "尼斯老城橘红屋顶"],
    stay: { name: "New, Casa Californie Terrace & Beach", area: "尼斯西区海边 · 220 Avenue de la Californie", note: "续住 · 房东 Aurore · HM8A4N4MFY", url: "https://www.airbnb.cn/rooms/1705767598377386136" },
    mapCenter: {lat: 43.6400, lng: 7.2000, zoom: 10},
    returnHome: { from: "La Merenda / Chez Palmyre", to: "Casa Californie", distance: "3.1km", via: "打车", duration: "12min", note: "晚餐后优先用 Uber / 官方 taxi 回 220 Avenue de la Californie；两人分摊约 €12-15，避免夜间换乘。" }
  },
  {
    n: 7, date: "Sep 30 · Wed", city: "Èze + Villefranche · 蔚蓝海岸", theme: "Cliff Villages & Bays",
    desc: "上午山头香水村 Èze（Fragonard 香水厂 + Jardin Exotique 悬崖植物园），下午滨海自由城 Villefranche-sur-Mer 彩色海湾 + 沙滩游泳。不去芒通——离尼斯只 10 分钟且景色不输，省下拉车时间。",
    slots: [
      { t: "09:30", h: "Bus 82 → Èze Village 悬崖山城", d: "从尼斯 Vauban 站坐 Ligne d'Azur 82 路巴士 25min 到 Èze Village 山顶村（2.5€/程）。或 SNCF TER 到 Èze 海边站再打车上山（10min）。", kind: "transit", img: "assets/img/spots/eze-clifftop.jpg", loc: {lat: 43.7286, lng: 7.3617}, hop: {via: "Bus 82", dur: "25min · 2.5€"}, link: "https://www.eze-tourisme.com/" },
      { t: "10:00", h: "Fragonard 香水厂 · 免费参观", d: "Fragonard 1926 年在 Èze 开的香水厂，免费参观 30min 看蒸馏工艺 + 试香。买一瓶带回国比机场便宜 30%。", kind: "museum", img: "assets/img/spots/fragonard-eze.jpg", loc: {lat: 43.7290, lng: 7.3617}, link: "https://usines-parfum.fragonard.com/en/" },
      { t: "10:45", h: "Jardin Exotique d'Èze · 异国花园", d: "山顶植物园，仙人掌 + 芦荟 + 龙舌兰在悬崖上排开，脚下是 400m 直落地中海。360° 俯瞰卡布岛（Cap Ferrat）。门票 8€。是这一天最上镜的地方。", kind: "walk", img: "assets/img/spots/jardin-exotique-eze.jpg", loc: {lat: 43.7285, lng: 7.3603}, link: "https://www.eze-tourisme.com/le-jardin-exotique-deze/", ticket: "成人 8€" },
      { t: "12:30", h: "Èze 山顶老巷午餐", d: "在中世纪石头巷子里选一家露天座，普罗旺斯 tarte 或 pissaladière（洋葱凤尾鱼扁面包）。人均 30€。", kind: "food", img: "assets/img/spots/eze-old-lane-lunch.jpg", loc: {lat: 43.7285, lng: 7.3620} },
      { t: "14:00", h: "Bus 82 → Villefranche-sur-Mer", d: "下山原路巴士 20min 到 Villefranche。彩色小镇沿海湾展开，粉、赭、黄立面倒映在蓝海。", kind: "transit", img: "assets/img/spots/villefranche-bay.jpg", loc: {lat: 43.7042, lng: 7.3106}, hop: {via: "Bus 82", dur: "20min · 2.5€"} },
      { t: "14:30", h: "彩色海湾漫步 + 沙滩游泳", d: "Plage des Marinières 沙滩（不是鹅卵石！），9 月底水温还有 22°C，可以下水。老城 Rue Obscure 是 13 世纪穿老城的地下石头长廊，转 5 分钟就出来。", kind: "walk", img: "assets/img/spots/plage-marinieres.jpg", loc: {lat: 43.7044, lng: 7.3105} },
      { t: "17:00", h: "海边露台咖啡 · La Mère Germaine", d: "毕加索、雷诺阿都来吃过的百年海鲜餐厅，光露台喝杯 rosé 也值。看夕阳把港口染金。", kind: "food", img: "assets/img/spots/mere-germaine.jpg", loc: {lat: 43.7042, lng: 7.3108} },
      { t: "18:30", h: "SNCF TER → 尼斯 Ville", d: "SNCF TER 从 Villefranche-sur-Mer 站 8 分钟直达尼斯。人均 2.5€。", kind: "transit", loc: {lat: 43.7042, lng: 7.3106}, hop: {via: "SNCF TER", dur: "8min · 2.5€"} },
      { t: "20:00", h: "尼斯松弛晚餐", d: "民宿附近或老城随便找一家法式 bistro，Steak-frites + 一支 Bandol 红。今天走了两个村，早睡。", kind: "food", loc: {lat: 43.6900, lng: 7.2434} }
    ],
    vlog: ["Fragonard 蒸馏铜锅", "Jardin Exotique 悬崖仙人掌 hyperlapse", "Villefranche 彩色海湾广角", "Rue Obscure 地下石廊", "沙滩鹅卵石对比"],
    stay: { name: "New, Casa Californie Terrace & Beach", area: "尼斯西区海边 · 220 Avenue de la Californie", note: "最后一晚 · 10/1 提前退房赶 12:35 航班 → 巴黎", url: "https://www.airbnb.cn/rooms/1705767598377386136" },
    mapCenter: {lat: 43.7100, lng: 7.3300, zoom: 12},
    returnHome: { from: "尼斯晚餐", to: "Casa Californie", distance: "视地点约 1-4km", via: "打车", duration: "8-15min", note: "这晚不锁定单一餐厅；饭后直接叫车回 220 Avenue de la Californie，避免为回程再折返 Tram。" }
  },
  {
    n: 8, date: "Oct 1 · Thu", city: "尼斯 → 巴黎 · Septime 之夜", theme: "Northbound · A Table at Septime",
    desc: "航班定了：易捷 U24856，尼斯 12:35 → 奥利 14:05。为了赶 11:00 值机，民宿要提前退房——今早不去天使湾了，行李收好直接打车 T2。下午落地奥利后，先把行李放进 5 区拉丁区公寓；如果航班准点、入住顺利，16:00 弹性加餐去 Grand Palais 看 Cézanne et nous，17:35 直接去 Septime，不回公寓折返。若任何一环延误，就跳过塞尚，回阳台休息，18:05 按备用路线出发。今晚重头戏仍是 Septime：19:30 晚市，米其林一星、全球 50 佳；回来路上再拐进清真寺茶室喝薄荷茶。明天搬去左岸 46 Rue Jacob。",
    slots: [
      { t: "09:30", h: "Casa Californie 提前退房 · 收拾行李", d: "12:35 的航班要 11:00 到 T2 值机，所以今早提前退房（比 11:00 的硬性时间早）。天使湾散步这次跳过——留给明年。房东那边打个招呼，行李直接带走不寄存。", kind: "stay", loc: {lat: 43.68793, lng: 7.24373}, notice: "为赶航班提前退房，不安排 Promenade 晨间散步。" },
      { t: "10:30", h: "打车 Californie → 尼斯机场 T2", d: "从 220 Avenue de la Californie 到 NCE T2 打车约 10-12min · 22€（双人分摊 11€）。也可以走 Tram T2（1.5€/人）但带行李换乘麻烦，赶飞机就打车。11:00 前到航站楼。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, hop: {via: "打车", dur: "10-12min · 22€"} },
      { t: "11:00", h: "T2 值机 + 安检 · 机场吃早午饭", d: "易捷是廉航，网上提前 check-in 好、行李额确认清楚（随身 56×45×25cm 免费，托运需另购）。安检后 T2 有 Paul、Pret 之类，随便吃点——这趟航班无餐食，飞机上什么都没有。今晚 Septime 是 tasting menu，中午别吃太饱。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, notice: "easyJet 经济舱无餐食。登机前吃饱或买点带上。" },
      { t: "12:35", h: "NCE T2 → ORY T1 · easyJet U24856", d: "尼斯蔚蓝海岸 T2 12:35 起飞 → 巴黎奥利 T1 14:05 落地，飞行 1h30m，空客 320（中型）。订单号 1128150429939513，携程出票中。靠窗能看到阿尔卑斯山脊往北铺开——起飞后 20 分钟左右最好看。", kind: "transit", loc: {lat: 43.6584, lng: 7.2149}, link: "https://www.easyjet.com/en", ticket: "已购 · 总 ¥1,744 双人（人均 ¥872）", notice: "易捷 U24856 · 经济舱无餐食 · 空客 320。落地是奥利 ORY 不是 CDG。" },
      { t: "14:05", h: "ORY T1 落地 · 打车进城", d: "奥利 T1 到 5 区拉丁区约 19km，打车 35-40min · €35-45（双人分摊约 €20）。出到达层直接上官方 taxi 队伍（巴黎奥利到左岸有固定价 €37），别理揽客的。两人带行李，这段就别折腾 Orlybus 换地铁了。", kind: "transit", loc: {lat: 48.7262, lng: 2.3652}, hop: {via: "打车 ORY T1 → 5 区", dur: "35-40min · €35-45"} },
      { t: "15:00", h: "拉丁区公寓 Check-in · 清真寺景观阳台", d: "Airbnb「绝美景色 | 巴黎拉丁区」，房东 Audrey，★4.87（39 评）· 1 卧 2 床 1 卫 · 15:00 后可入住、明天 11:00 前退房。阳台正对巴黎大清真寺的绿瓦穹顶和白墙庭院。落地时间刚好卡上入住时段，行李放下就能休息。", kind: "stay", loc: {lat: 48.8420, lng: 2.3554}, link: "https://www.airbnb.cn/rooms/14190318" },
      { t: "15:20", h: "弹性加餐 · 拉丁区 → Grand Palais", d: "只有在航班准点、14:05 落地后顺利进城、15:00 前后完成入住时执行。打车从拉丁区公寓到 Grand Palais 约 15-20min；如果 15:20 还没放下行李，立刻跳过，不影响今晚 Septime。", kind: "transit", loc: {lat: 48.8420, lng: 2.3554}, hop: {via: "打车 → Grand Palais", dur: "15-20min · 约 €12-18"}, notice: "弹性项：航班/入住任何一环延误就跳过，回公寓休息，18:05 按备用方案出发。" },
      { t: "16:00", h: "Cézanne et nous · Grand Palais", d: "用 75-90min 看这场秋季大展：约 180 件作品，以 Cézanne 为核心，串联 Gauguin、Matisse、Picasso、Mondrian、Joan Mitchell、Bridget Riley 与 Peter Doig。重点不是“看一遍塞尚”，而是看他的结构、色彩和空间语言怎样被后来的现代艺术家拆解再造。", kind: "museum", img: "assets/img/spots/cezanne-et-nous.jpg", loc: {lat: 48.8661, lng: 2.3126}, hop: {via: "步行入场", dur: "75-90min"}, link: "https://www.grandpalais.fr/en/program/cezanne-et-nous", ticket: "全价 €19 · 建议预约时段", notice: "展期 2026/9/23-2027/1/17。此条为航班准点后的弹性项；若未在15:20离开公寓，直接跳过。" },
      { t: "17:35", h: "Grand Palais → Septime · 直接去餐厅", d: "看完展不回拉丁区，直接打车去 Septime（80 Rue de Charonne），约 20-25min。提前到店附近喝杯水，19:30 进晚市；这样不把时间浪费在“展览→公寓→再出门”的折返上。", kind: "transit", loc: {lat: 48.8661, lng: 2.3126}, hop: {via: "打车 Grand Palais → Septime", dur: "20-25min · 约 €15-22"} },
      { t: "18:05", h: "备用方案 · 公寓 → Septime", d: "如果跳过 Cézanne：15:20 后就在阳台休息、换衣服，18:05 从公寓步行 3min 到 Place Monge，坐 M5 到 Bréguet-Sabin，再步行到 80 Rue de Charonne；约 20-25min，19:20 到店。", kind: "transit", loc: {lat: 48.8420, lng: 2.3554}, hop: {via: "步行 + M5 地铁", dur: "20-25min · 2.15€"}, notice: "与17:35“Grand Palais → Septime”二选一，不要两条都走。" },
      { t: "19:30", h: "Septime · 米其林一星 tasting menu", d: "80 Rue de Charonne, 75011。Bertrand Grébaut 的餐厅，米其林一星 + 全球 50 佳常客，开创了巴黎「neo-bistro」这一派。晚市只有一套 tasting menu（无点菜），厨师按当天市场决定内容，蔬菜是主角而不是配角。室内 45 座、开放式厨房推到最里侧，声压约 68 分贝——能正常说话。南墙那排长条沙发（banquette）是最好的位置，订位时可以在备注里写一句。建议加配酒（自然酒为主，€90/人），或者按杯点。别跳过附加的奶酪拼盘。吃到 21:45-22:00。", kind: "food", img: "assets/img/spots/rue-de-charonne.jpg", loc: {lat: 48.8547, lng: 2.3806}, link: "https://septime-charonne.fr/en/", ticket: "晚市 tasting €135-160/人 · 配酒 +€90", notice: "订位必须在 9/10（周四）10:00 巴黎时间上官网抢——只放 21 天后的位，热门场次 4 分钟清空。周六周日不营业。" },
      { t: "22:10", h: "Septime La Cave 或 M5 回拉丁区", d: "吃完还想坐一会：往回走 2min 是 Septime La Cave（3 Rue Basfroi），同一家的自然酒吧，站着喝一杯 €8-12，开到 23:00。不想续摊就直接 M5 回 Place Monge，20min。", kind: "walk", loc: {lat: 48.8542, lng: 2.3822}, hop: {via: "步行 2min / M5 回程 20min", dur: "视心情"} },
      { t: "23:00", h: "清真寺茶室夜宵 · 薄荷茶收尾", d: "回到公寓楼下 1-2min 就是 La Mosquée de Paris 的 Salon de Thé，摩尔风瓷砖庭院和无花果树，营业到 23:00——赶得紧的话直接明早来喝，早上人更少、光更好。一杯薄荷茶 3€、一块东方酥点 2€。房源标题说的「土耳其浴室 1 分钟」就是这里的 hammam（要预约、单独收费）。抬头就是白天从阳台看到的那个绿顶。", kind: "walk", loc: {lat: 48.8420, lng: 2.3554}, link: "https://www.grandemosqueedeparis.fr/", ticket: "茶室 3-8€ · hammam 约 45€ 需预约", hop: {via: "步行", dur: "2min · 150m"} }
    ],
    vlog: ["Californie 提前退房 · 关门那一刻", "NCE T2 值机牌与登机口", "空中阿尔卑斯北望", "ORY T1 出站的第一口巴黎空气", "Grand Palais 塞尚展入口", "塞尚画面里的圣维克多山", "Septime 门牌与开放式厨房", "tasting menu 每一道的特写", "夜里 M5 车厢与回家的路"],
    stay: { name: "绝美景色 · 巴黎拉丁区 · 土耳其浴室 1 分钟", area: "Quartier Latin · 75005 Paris · 清真寺景观阳台", note: "1 晚 · ★4.87（39 评）· 1 卧 2 床 1 卫 · 房东 Audrey · 人均 ¥882.96（总 ¥1,765.91）· 15:00 后入住 / 11:00 前退房", url: "https://www.airbnb.cn/rooms/14190318" },
    mapCenter: {lat: 48.8432, lng: 2.3530, zoom: 14},
    returnHome: { from: "清真寺茶室", to: "拉丁区 Airbnb", distance: "150m", via: "步行", duration: "2min", note: "茶室就在 5 区公寓旁；23:00 前离开后沿 Rue Geoffroy-Saint-Hilaire 回家即可。" }
  },
  {
    n: 9, date: "Oct 2 · Fri", city: "巴黎 · 左岸卢浮宫日", theme: "Louvre + Rive Gauche Salon",
    desc: "早上从拉丁区公寓 11:00 前退房，行李寄存或直接拖到 46 Rue Jacob。地铁 M7 一趟到卢浮宫，9:00-12:30 减负三宝路线。杜乐丽花园吃个 crêpe，13:30 走过塞纳河把行李搬进 46 Rue Jacob（15:00 才 check-in）。下午步行 12min 到奥赛，集中看 Bartholdi《自由照耀世界》+ VR：从自由女神的构想到铜板锤制、Eiffel 内部结构，再走进巴黎工作坊和纽约落成现场。傍晚花神/双叟咖啡露天座 + 圣日耳曼大道晚风。今晚开始就住 Truly Parisien 老公寓——奥赛/卢浮宫都是家门口。",
    slots: [
      { t: "08:20", h: "拉丁区公寓退房 · 行李处理", d: "公寓 11:00 前退房，但今天早出门，提前收拾好。两个选择：① 行李寄存在公寓（跟 Audrey 确认是否可以）；② 直接拖到 46 Rue Jacob 楼下用 Nannybag 寄存（5€/件/天），从公寓地铁 M7 到 Saint-Germain 约 15min。轻装去卢浮宫更舒服。", kind: "stay", loc: {lat: 48.8420, lng: 2.3554} },
      { t: "08:40", h: "M7 地铁 → 卢浮宫 Porte des Lions", d: "从公寓步行 3min 到 Place Monge 站，M7 线坐 6 站到 Palais Royal-Musée du Louvre（约 12min），出站走 4min 到南侧 Porte des Lions（黎塞留翼下）——这个侧门几乎不用排队。9:00 准时开门。", kind: "transit", loc: {lat: 48.8590, lng: 2.3346}, hop: {via: "步行 3min + M7 地铁 12min", dur: "20min · 2.15€"} },
      { t: "09:00", h: "卢浮宫 · 三宝主线（减负版）", d: "只看三样：《蒙娜丽莎》→《米洛的维纳斯》→《萨莫色雷斯的胜利女神》。走德农馆 2 楼长廊直插蒙娜丽莎，9:15 前到画前人还不多；再往回走看维罗内塞《迦拿的婚礼》。整场 3.5h 而非 5h。", kind: "museum", img: "assets/img/spots/louvre-mona-lisa.jpg", loc: {lat: 48.8606, lng: 2.3376}, link: "https://www.ticketlouvre.fr/", ticket: "非 EEA 32€ · 强制预约", notice: "周二闭馆。热浪或维修期部分展厅可能临时闭馆，参观当天可致电 +33 1 40 20 53 17 确认。" },
      { t: "11:30", h: "卢浮宫 · 法国浪漫主义红厅", d: "德农馆红厅：德拉克罗瓦《自由引导人民》、大卫《拿破仑加冕》、席里柯《美杜莎之筏》。三张大画都在同一个房间，20 分钟看完出门。", kind: "museum", loc: {lat: 48.8606, lng: 2.3376} },
      { t: "13:00", h: "杜乐丽花园 · 绿椅子 + crêpe 午餐", d: "出馆 5 分钟就是 Tuileries 花园。经典绿椅子摆在喷水池边把脚抬高。路边买一份 Angelina 栗子蛋糕或 crêpe。40 分钟。", kind: "food", img: "assets/img/spots/tuileries.jpg", loc: {lat: 48.8635, lng: 2.3275}, hop: {via: "步行", dur: "5min · 400m"} },
      { t: "14:30", h: "步行过塞纳河回左岸 · 46 Rue Jacob Check-in", d: "从杜乐丽沿 Pont Royal 或 Passerelle Solférino 过河（10-12min · 1.2km），到 46 Rue Jacob 恰好 15:00。行李搬入，稍作休整。奥赛博物馆离新家门口 12min（1.4km）。", kind: "stay", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "步行过塞纳河", dur: "12min · 1.2km"} },
      { t: "15:45", h: "奥赛博物馆 · Bartholdi《自由照耀世界》+ VR", d: "从 46 Rue Jacob 步行 12min（1.4km）到奥赛。今天不再泛看印象派 5 楼，改看官方秋季大展：Bartholdi 从最初构想、Suez Canal 方案、铜板锤制，到 Gustave Eiffel 参与的内部结构，最后运往纽约成为自由女神。再接 50min VR《A Statue for Liberty: Bartholdi's Dream》（其中约 35min 戴设备），从巴黎工作坊一路走到纽约落成。实体展在 2 楼 69 号展厅，VR 在 Seine Gallery，整段留 2h 更稳。", kind: "museum", img: "assets/img/spots/bartholdi-poster.jpg", loc: {lat: 48.8600, lng: 2.3266}, hop: {via: "步行 从 46 Rue Jacob", dur: "12min · 1.4km"}, link: "https://www.musee-orsay.fr/en/program/whats-on/exhibitions/auguste-bartholdi-liberty-enlightening-world", ticket: "展览 €16 · VR联票 €32", notice: "展期 2026/9/15-2027/1/31。VR建议提前预约；周五之外通常18:00闭馆，15:45入场更稳。官方发布的竖版主视觉已替换原来的泛印象派配图。" },
      { t: "18:30", h: "回家小憩 · 换衣服", d: "奥赛步行 12min 回 46 Rue Jacob。淋浴、换鞋、给相机充电。慢旅行的关键——今晚附近全部步行搞定，不用赶地铁。", kind: "stay", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "步行", dur: "12min"} },
      { t: "19:30", h: "Rue de Buci 集市街 · 生蚝与自然酒", d: "从家门口 Rue Jacob 向东走 3 分钟就是 Rue de Buci，露天海鲜台 Huitrerie Régis 或 L'Avant Comptoir de la Mer——站着吃 6 只 Belon 生蚝 + 一杯 Sancerre 20€。或坐进 Semilla / Le Comptoir du Relais 慢慢吃。人均 40-60€。", kind: "food", img: "assets/img/spots/rue-de-buci.jpg", loc: {lat: 48.85358, lng: 2.33645}, hop: {via: "步行", dur: "3min · 300m"} },
      { t: "22:00", h: "塞纳河夜灯散步 · 沿河东行到 Châtelet", d: "今晚不直接回家，改成沿塞纳河往东走：Rue de Buci → Pont des Arts → 卢浮宫外滩 → Pont Neuf → Châtelet，约 25min · 2.0km。这段夜里最安静，铁塔在身后、新桥的灯在前面，走完正好接上地铁去玛黑区。", kind: "walk", img: "assets/img/spots/seine-cruise.jpg", loc: {lat: 48.85720, lng: 2.33810}, hop: {via: "河岸步行 → Châtelet", dur: "25min · 2.0km" } },
      { t: "22:45", h: "Bar Nouveau · 全球第 17 的 Art Nouveau 酒吧", d: "从 Châtelet 坐 M11 两站到 Rambuteau，步行 4min 到 5 Rue des Haudriettes（玛黑区 3 区）。World's 50 Best Bars 2025 全球第 17、欧洲第 5。两层空间：一层明亮 Art Nouveau，镜面天花 + 全球最大的私人 Bimini 古董玻璃杯收藏；地下室是暗调砖墙的未来感。招牌 Ramos Whiskey Fizz（香草酸奶 + peat + 接骨木花 + 牡蛎壳勺）、Fine À L'eau、The Parisien，约 €14/杯。15:00 开门，开到约 02:00。", kind: "food", img: "assets/img/spots/bar-nouveau.jpg", loc: {lat: 48.8618, lng: 2.3586}, hop: {via: "M11 Châtelet → Rambuteau（2 站）+ 步行 4min", dur: "15min"}, link: "https://www.instagram.com/bar_nouveau_/", ticket: "鸡尾酒约 €14", notice: "不接任何预订，只能现场排队；周五 23:00 后可能等 30-45min，先在一层等位。" },
    ],
    vlog: ["Rue Jacob 门牌", "Porte des Lions 侧门排队", "蒙娜丽莎前的人群（不拍画）", "胜利女神楼梯广角", "杜乐丽绿椅子特写", "Bartholdi 自由女神旧照与VR入口", "Rue de Buci 生蚝台", "塞纳河夜灯", "Bar Nouveau 镜面天花下的古董杯墙"],
    stay: { name: "Paris · Truly parisien apartment in St Germain des Prés", area: "6 区 · 46 Rue Jacob · ★4.91", note: "首晚 · 15:00 check-in · 1 卧 1 床 1 卫", url: "https://www.airbnb.com/rooms/23476199" },
    mapCenter: {lat: 48.8590, lng: 2.3350, zoom: 14},
    returnHome: { from: "Bar Nouveau（玛黑 3 区）", to: "46 Rue Jacob", distance: "1.9km", via: "打车 / 周五末班地铁", duration: "12-15min · €13-16", note: "周五地铁开到 01:40，可坐 M11 Rambuteau → Châtelet 换 M4 到 Saint-Germain-des-Prés（约 22min）；过了末班或喝多了就直接叫 G7 / 官方 taxi，跨塞纳河 12-15min，€13-16。" }
  },
  {
    n: 10, date: "Oct 3 · Sat", city: "巴黎 · 圣旺旧物 + 圣母院 + 铁塔", theme: "Saint-Ouen Flea Market + Notre-Dame + Eiffel",
    desc: "今天不走温吞的左岸公园线，上午去巴黎北门的 Saint-Ouen 跳蚤市场：在 Dauphine、Vernaison、Paul Bert 一带看旧画框、黑胶、古董家具、复古衣物和各种有故事的旧物。午后回到西堤岛看巴黎圣母院，18:30 塞纳河蓝调游船看铁塔第一次亮灯，20:30 夏乐宫观景台看金色闪烁，最后去 Cambridge 收尾。",
    slots: [
      { t: "09:15", h: "46 Rue Jacob → Saint-Ouen 跳蚤市场", d: "从左岸出发前往 Saint-Ouen，建议 M4 直达 Porte de Clignancourt，再步行穿过 périphérique 到 Rue des Rosiers；两人也可以直接打车，约 25-35min。市场周六 10:00 开始，尽量第一批到。", kind: "transit", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "Metro M4 / 打车", dur: "25-35min"} },
      { t: "10:00", h: "Saint-Ouen 跳蚤市场 · Dauphine + Vernaison + Paul Bert", d: "巴黎最大的古董与旧物聚落，不是一个单独市场，而是 Rue des Rosiers 周边多个市场组成的 7 公顷街区。优先逛 Marché Dauphine 的玻璃顶室内市场，再去 Vernaison 看更有跳蚤市场气质的摊位，最后按兴趣扫 Paul Bert。重点找：旧画框、黑胶、老海报、复古灯具、旅行箱、奇怪小雕塑。", kind: "walk", img: "assets/img/spots/saint-ouen-puces.jpg", loc: {lat: 48.90178, lng: 2.34157}, hop: {via: "步行穿市场", dur: "2.5-3h"}, link: "https://pucesdeparissaintouen.com/en/", ticket: "免费入场", notice: "周六 10:00-18:00。市场很大，不要试图一次逛完；贵重旧物先拍照记摊位，最后再回头买。" },
      { t: "12:45", h: "Saint-Ouen 市场内午餐 · 继续淘旧物", d: "不专门折回左岸吃午餐，直接在市场内部找小餐馆或咖啡馆解决。午餐控制在 45min，13:30 左右离开，给回城和圣母院预约留出缓冲。", kind: "food", loc: {lat: 48.90178, lng: 2.34157}, hop: {via: "市场内", dur: "45min · walk-in"} },
      { t: "13:30", h: "Saint-Ouen → 西堤岛", d: "从 Porte de Clignancourt 乘 M4 南下到 Cité / Châtelet 一带，再步行到西堤岛。周六午后地铁和市场出口人流都大，13:30 必须离开，不要在最后一个摊位前拖太久。", kind: "transit", loc: {lat: 48.90178, lng: 2.34157}, hop: {via: "Metro M4 + 步行", dur: "35-45min"} },
      { t: "14:30", h: "西堤岛河岸缓冲 · 旧书摊 + Pont Neuf", d: "提前抵达西堤岛后，沿 Quai de l'Horloge 和 Quai de Montebello 慢慢走，看看旧书摊与 Pont Neuf 石雕。今天这段不是硬塞景点，而是给 Saint-Ouen 回城和圣母院预约之间留出的呼吸时间。", kind: "walk", loc: {lat: 48.85708, lng: 2.34099}, hop: {via: "步行沿塞纳河", dur: "40min · 1.5km"} },
      { t: "15:30", h: "巴黎圣母院 · 西堤岛修复主界面", d: "2019 年火灾后修复重开，塔尖 + 飞天拱壁 + 玫瑰花窗全部原样重建。目前进内殿排队约 30min，官网可预约免费时段（必须提前订）。", kind: "museum", img: "assets/img/spots/notre-dame.jpg", loc: {lat: 48.85299, lng: 2.34992}, hop: {via: "步行", dur: "10min · 0.8km"}, link: "https://www.notredamedeparis.fr/", ticket: "内殿免费 · 需官网预约时段", notice: "2024 年 12 月重开，塔楼登顶需另订。" },
      { t: "18:30", h: "塞纳河蓝调游船 · Bateaux Parisiens", d: "圣母院旁的 Pont au Double 码头就有游船。18:45-19:15 是蓝调日落最佳时刻，20:00 整点在船上看铁塔第一次金色闪烁（Scintillement）。1h 航程 18€。", kind: "venue", loc: {lat: 48.8528, lng: 2.3501}, hop: {via: "步行", dur: "3min"}, link: "https://www.bateauxparisiens.com/", ticket: "1h 游船 18€ · 提前网购可 15€", gyg: { title: "Seine Cruise · 蓝调时刻 1h 游船", img: "assets/img/gyg/nodietclub.jpg", rating: "4.8", reviews: "45,000+", price: "€18 起 · 1h", url: "https://www.getyourguide.com/paris-l16/1-hour-seine-river-sightseeing-cruise-t128772/" } },
      { t: "20:30", h: "Trocadéro 夏乐宫观景台", d: "游船下船后 Metro L6 到 Trocadéro（15min）。夏乐宫平台是拍铁塔的经典陆地视角。21:00 整点铁塔再一次 5 分钟金色闪烁——这是当晚第二次机会，比船上视角更近。免费。", kind: "walk", img: "assets/img/spots/eiffel-trocadero.jpg", loc: {lat: 48.8619, lng: 2.2886}, hop: {via: "游船 + Metro L6", dur: "40min"} },
      { t: "22:15", h: "The Cambridge Public House · 世界第 20 收尾", d: "看完铁塔金色闪烁不回家，直接 M9 从 Trocadéro 坐到 République（11 站 25min）+ 步行 8min，约 22:20 到 8 Rue de Poitou。World's 50 Best Bars 2025 全球第 20，也是全球第一家 B Corp 认证酒吧——英式 pub 的外壳，精酿鸡尾酒的内核。必点：Guinness、house Pimm's（阿尔萨斯葡萄酒 + St Germain + gin）、每周一换的极简鸡尾酒（一份酒只用 3-6 种材料），配 sausage rolls / pies / pasties 垫肚子。不接预订、walk-in 友好，开到 01:00。", kind: "food", img: "assets/img/spots/the-cambridge.jpg", loc: {lat: 48.8637, lng: 2.3625}, hop: {via: "M9 Trocadéro → République + 步行 8min", dur: "33min"}, link: "https://www.thecambridge.paris/en/", ticket: "鸡尾酒 €14 · 精酿 €4.5-10 · 自然酒 €7 起", notice: "不接预订，walk-in 即可；周六 23:00 后会满，22:30 前到比较稳。" }
    ],
    vlog: ["Saint-Ouen 玻璃顶市场", "Dauphine 旧画框与黑胶", "Vernaison 摊位细节", "Pont Neuf 石雕仰拍", "圣母院飞天拱壁", "塞纳河蓝调水面", "铁塔金色闪烁 hyperlapse", "夏乐宫仰角", "Cambridge 的第一口 Pimm's"],
    stay: { name: "Paris · Truly parisien apartment in St Germain des Prés", area: "6 区 · 46 Rue Jacob · ★4.91", note: "最后一晚 · 10/4 10:00 退房赶 CDG", url: "https://www.airbnb.com/rooms/23476199" },
    mapCenter: {lat: 48.8560, lng: 2.3380, zoom: 13},
    returnHome: { from: "The Cambridge（玛黑 3 区）", to: "46 Rue Jacob", distance: "2.3km", via: "打车 / 周六末班地铁", duration: "13-16min · €14-18", note: "周六地铁开到 01:40，可坐 M11 → Châtelet 换 M4 到 Saint-Germain-des-Prés（约 25min）；00:30 之后建议直接叫车，跨塞纳河 13-16min，€14-18。明早 10:00 退房赶 CDG，别硬撑。" }
  },
  {
    n: 11, date: "Oct 4–5 · Sun–Mon", city: "巴黎 → 广州", theme: "Farewell · Homebound",
    desc: "10/4 早晨 46 Rue Jacob 家门口最后一杯咖啡 + Poilâne 面包（Rue Cherche-Midi 步行 10min），10:00 退房，11:30 打车去 CDG T1，15:55 Saudia 航班起飞。经吉达转机，10/5 15:25 抵达广州。带着 11 天的记录回家。",
    slots: [
      { t: "08:00", h: "Rue Jacob 家门口最后早晨", d: "楼下 Rue Bonaparte 咖啡馆或 Deux Magots 露天座 8:00 开门。一杯 café crème + 一份可颂。0 分钟通勤——最后一次享受 6 区的奢侈。", kind: "food", loc: {lat: 48.85398, lng: 2.33325}, hop: {via: "步行 从民宿", dur: "2min · 0.15km"}, link: "https://cafedeflore.fr/" },
      { t: "08:45", h: "Poilâne 传奇面包店 · 带一条回家", d: "6 区 Rue du Cherche-Midi 8 号，1932 年至今的传奇面包店。步行 10min（0.7km）从家门口过去。买一条巴掌大的圆面包 Petit Pain Rétrodor 带上飞机（可以过安检）。", kind: "food", img: "assets/img/spots/poilane-bakery.jpg", loc: {lat: 48.85141, lng: 2.32712}, hop: {via: "步行", dur: "10min · 0.7km"}, link: "https://www.poilane.com/" },
      { t: "10:00", h: "46 Rue Jacob 退房 · 收拾行李", d: "民宿 10:00 硬性退房。房东 Alexandra 一般会来收钥匙，或者按 Airbnb 说明放门口柜子里。行李在民宿等打车。", kind: "stay", loc: {lat: 48.85604, lng: 2.33403} },
      { t: "11:00", h: "叫车 → CDG T1（提前 30min，Sunday 保险起见）", d: "打车 Uber/G7 从 46 Rue Jacob → CDG T1 约 €55（Sunday 早上路况顺 45-55min · 29.6km）。避开 RER B 拉行李转车。留 4h 出关 + 退税（PABLO 机 + 海关盖章可能排 40min），15:55 起飞。", kind: "transit", img: "assets/img/spots/cdg-airport.jpg", loc: {lat: 48.85604, lng: 2.33403}, hop: {via: "打车 46 Rue Jacob → CDG T1", dur: "45-55min · €55 · 29.6km"} },
      { t: "13:00", h: "CDG T1 · Saudia 值机 + PABLO 退税", d: "Saudia 在 T1，中国乘客先走 PABLO 电子退税柜台（大厅内多台）扫二维码，再去海关柜台盖章（如需现金退税），最后过安检出关。", kind: "transit", loc: {lat: 49.0097, lng: 2.5479} },
      { t: "15:55", h: "CDG T1 → 吉达 T1 · Saudia", d: "Saudia SV146 沙特航空，飞行 6h45m。晚餐在机上。窗边看阿尔卑斯 + 地中海。", kind: "transit", loc: {lat: 49.0097, lng: 2.5479} },
      { t: "22:40", h: "抵达吉达 T1", d: "转机 2h25m。吉达机场夜间清冷，找一家咖啡座就好，别买免税太多——广州还有免税。", kind: "transit", loc: {lat: 21.6796, lng: 39.1565}, hop: {via: "Saudia 直飞", dur: "6h45m"} },
      { t: "10-05 01:05", h: "吉达 → 广州 T2 · Saudia", d: "Saudia SV876，飞行 9h20m。这段睡足——广州落地是下午。", kind: "transit", loc: {lat: 21.6796, lng: 39.1565} },
      { t: "10-05 15:25", h: "抵达广州 T2 · 到家", d: "带着这本 Autumn Atelier 回家。等下次。", kind: "transit", loc: {lat: 23.3924, lng: 113.2988}, hop: {via: "Saudia 直飞", dur: "9h20m"} }
    ],
    vlog: ["Rue Jacob 晨间空街", "Poilâne 面包架", "46 Rue Jacob 门牌告别特写", "CDG 值机牌", "机窗云海", "吉达机场夜色", "广州落地舷窗"],
    stay: { name: "Return · 返程在路上", area: "CDG → 吉达 → 广州", note: "两段飞行 · 明天回到深圳" },
    mapCenter: {lat: 48.8560, lng: 2.3380, zoom: 12},
    returnHome: { from: "广州白云 T2", to: "深圳", distance: "约 130km", via: "高铁 / 预约专车", duration: "1.5-2.5h", note: "抵达当天按落地状态选：精力够就转广州南高铁回深圳；带大件行李或太晚则预约跨城专车。" }
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
    const remoteHtml = s.remote ? `<aside class="slot-remote" aria-label="远距离出行提醒"><div class="slot-remote-head"><span>Distance check</span><b>${s.remote.metric}</b></div><p>${s.remote.copy}</p></aside>` : "";
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
        <div class="slot-img${s.imgMode ? ` is-${s.imgMode}` : ""}">
          <img src="${s.img}" alt="${s.h}" loading="lazy" />
        </div>` : "";
    return `
    <div class="slot" data-slot-idx="${i}">
      <div class="slot-time">${s.t}</div>
      <div class="slot-body">
        ${imgHtml}
        ${hopHtml}
        ${remoteHtml}
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

  const returnHomeHtml = d.returnHome ? `
    <aside class="day-return" aria-label="当晚回住宿动线">
      <div class="day-return-top">
        <span class="day-return-kicker">Return · 回住所</span>
        <span class="day-return-distance">${d.returnHome.distance}</span>
      </div>
      <div class="day-return-route"><span>${d.returnHome.from}</span><i>→</i><span>${d.returnHome.to}</span></div>
      <div class="day-return-meta"><b>${d.returnHome.via}</b><span>${d.returnHome.duration}</span></div>
      ${d.returnHome.note ? `<p>${d.returnHome.note}</p>` : ""}
    </aside>` : "";

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
      <div class="day-timeline">${slotsHtml}${returnHomeHtml}</div>
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
  if (document.body.dataset.activePart !== "days") showPart("days", { scroll: false });
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

/* ---------- Part View Router · 目录一次只打开一个 Part ---------- */
const partNames = new Set(["journey", "todo", "days", "collections", "packing", "budget", "missions", "home"]);
const partSurfaces = [...document.querySelectorAll(".section"), document.querySelector(".hero"), document.querySelector(".site-foot")].filter(Boolean);

function showPart(part, { scroll = true } = {}) {
  const active = partNames.has(part) ? part : "days";
  document.body.dataset.activePart = active;

  const targets = active === "home"
    ? [document.querySelector(".hero"), document.querySelector(".site-foot")]
    : active === "collections"
      ? [document.getElementById("collections"), ...document.querySelectorAll('[data-part-group="collections"]')]
      : [document.getElementById(active)];

  partSurfaces.forEach(el => el.classList.toggle("part-is-hidden", !targets.includes(el)));
  targets.filter(Boolean).forEach(el => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
  document.querySelectorAll("[data-part-nav]").forEach(link => {
    link.classList.toggle("is-active", link.dataset.partNav === active);
    link.setAttribute("aria-current", link.dataset.partNav === active ? "page" : "false");
  });

  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPartFromHash({ scroll = false } = {}) {
  const requested = window.location.hash.replace("#", "");
  showPart(requested === "top" ? "home" : (partNames.has(requested) ? requested : "days"), { scroll });
}

document.querySelectorAll("[data-part-nav]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const part = link.dataset.partNav;
    history.pushState(null, "", `#${part}`);
    showPart(part);
  });
});
window.addEventListener("hashchange", () => openPartFromHash({ scroll: true }));
openPartFromHash();

/* Brand 点击回目录首页 */
document.querySelector(".top-nav .brand")?.addEventListener("click", () => {
  history.pushState(null, "", "#top");
  showPart("home");
});
document.querySelector(".mnav-brand")?.addEventListener("click", event => {
  event.preventDefault();
  history.pushState(null, "", "#top");
  showPart("home");
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
        { t: "Paella 烹饪课 + Boqueria（Day 3）", amt: 565, note: "€72 起 · 9/26 周六 · 3h 含市集导览与晚餐" },
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


/* ---------- Hero · 出发倒计时 ---------- */
(function () {
  var el = document.getElementById("heroCountdown");
  if (!el) return;
  var trip = new Date(2026, 8, 23);
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var days = Math.round((trip - today) / 86400000);
  if (days > 0) el.textContent = "T\u2212" + days + " \u5929 \u00b7 2026.09.23 \u51fa\u53d1";
  else if (days === 0) el.textContent = "\u4eca\u5929\u51fa\u53d1 \u2708";
  else el.textContent = "\u65c5\u9014\u7b2c " + (-days + 1) + " \u5929";
})();

/* ---------- Hero · 明信片轻微视差（尊重减少动效偏好） ---------- */
(function () {
  var items = document.querySelectorAll(".hg-item");
  if (!items.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var raf = null;
  function tick() {
    raf = null;
    var y = window.scrollY || window.pageYOffset || 0;
    for (var i = 0; i < items.length; i++) {
      items[i].style.translate = "0 " + (y * (0.05 + i * 0.018)).toFixed(1) + "px";
    }
  }
  window.addEventListener("scroll", function () {
    if (raf === null) raf = requestAnimationFrame(tick);
  }, { passive: true });
})();
