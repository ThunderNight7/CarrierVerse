import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const scriptVinotinto = `
  (function() {
    const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");

    const RAW_TEMAS = {
      agua: ["aquaquinesis","aquakinesis","aquamancia","hidroquinesis","hidrokinesis","hidromancia","hematokinesis","hematoquinesis","hemomancia","agua","mar","oceano","rio","lluvia","vapor","marea","sangre","sanguineo","hemorragia"],
      hielo: ["crioquinesis","criokinesis","criomancia","glaciokinesis","glacioquinesis","glaciomancia","hielo","escarcha","nieve","helado","congelar","congelacion","frost","permafrost"],
      viento: ["aeroquinesis","aerokinesis","aeromancia","anemoquinesis","anemokinesis","anemomancia","atmokinesis","atmokinesis","atmomancia","viento","aire","brisa","huracan","tornado","tifon","ciclon","vendaval","rafaga","clima","tormenta"],
      energia: ["electroquinesis","electrokinesis","electromancia","fulguroquinesis","fulgurokinesis","fulguromancia","keraunokinesis","keraunokinesis","keraunomancia","ergokinesis","ergokinesis","ergomancia","electricidad","rayo","rayos","trueno","truenos","relampago","chispa","chispas","voltaje","plasma","energia","mana","eter","aether"],
      naturaleza: ["fitokinesis","fitoquinesis","fitomancia","dendroquinesis","dendrokinesis","dendromancia","silvomancia","geoquinesis","geokinesis","geomancia","biokinesis","bioquinesis","biomancia","botanica","tierra","roca","rocas","piedra","bosque","selva","planta","plantas","flora","fauna","naturaleza","natural","vida"],
      sombra: ["umbrakinesis","umbraquinesis","umbramancia","skiakinesis","skiaquinesis","skiamancia","necroquinesis","nekrokinesis","necromancia","sombra","sombras","oscuridad","oscuro","nocturno","noche","tinieblas","abismo","vacio","necro"],
      luz: ["fotoquinesis","fotokinesis","fotomancia","lumokinesis","luminoquinesis","luminomancia","helioquinesis","heliokinesis","heliomancia","luz","luces","rayo de luz","fotones","resplandor","brillo","sol","solar","aurora"],
      maldito: ["maldito","maldita","maldicion","maldiciones","maleficio","hex","corrupcion","corrupto","condena","anatema","ruina","pestilencia","veneno","toxina","toxico","venenoso","toxikinesis","toxicoquinesis","toxicomancia"],
      divino: ["divino","divina","divinidad","sagrado","sagrada","celestial","angelical","aureo","dorado","bendicion","divina providencia","santidad"],
      metal: ["ferroquinesis","ferrokinesis","ferromancia","metaloquinesis","metalokinesis","metalomancia","magnetoquinesis","magnetokinesis","magnetomancia","metal","metales","acero","hierro","oro","plata","cobre","bronce","aleacion","magnetismo"],
      gravedad: ["gravitokinesis","gravitoquinesis","gravimancia","barokinesis","baroquinesis","baromancia","gravedad","peso","masa","atraccion","repulsion","levitacion","ingravidez"],
      realidad: ["ontokinesis","ontoquinesis","ontomancia","nomokinesis","nomoquinesis","nomomancia","cronoquinesis","cronokinesis","cronomancia","realidad","alteracion de la realidad","paradoja","causalidad","destino","probabilidad","suerte","tiempo"],
      dimensional: ["spatiokinesis","espacioquinesis","espaciokinesis","espaciomancia","dimensional","dimension","dimensiones","espacio","espacial","portal","portales","teletransporte","brecha","plano","multiverso","hiperespacio"],
      mente: ["telequinesis","telekinesis","telepatia","oniroquinesis","oniroquinesis","oniromancia","psiquico","psiquica","mental","mente","ilusion","ilusiones","espejismo","sueno","suenos","hipnosis","percepcion"],
      sonido: ["sonoquininesis","sonoquinesis","sonokinesis","sonomancia","acustico","acustica","onda","ondas","vibracion","vibraciones","resonancia","eco","sonido","voz","silencio"],
      invocacion: ["invocacion","invocar","convocacion","convocar","espiritu","espiritus","alma","almas","bestia","bestias","criatura","criaturas","familiar","invocador","sello","pacto","pactos"],
      cuerpo: ["fuerza","superfuerza","velocidad","supervelocidad","agilidad","reflejos","resistencia","regeneracion","curacion","sanacion","cuerpo","fisico","potencia","muscular"],
      fuego: ["piroquinesis","pirokinesis","piromancia","termokinesis","termoquinesis","termomancia","fuego","igneo","ignea","ascuas","brasas","llamas","llama","incendio","calor","magma","lava","volcan","ceniza","cenizas"]
    };

    const TEMAS_NORM = Object.fromEntries(
      Object.entries(RAW_TEMAS).map(([k, list]) => [k, list.map(norm)])
    );

    // [nucleoBrillo, haloMedio, haloBorde, centroFrio, direccionY, ola1, ola2, ola3]
    const TEMA_DATA = {
      fuego:       ["255,120,130", "225,38,68",   "110,20,35",  "255,195,190",  1.00,  "235,115,138", "245,155,168", "210,82,108"],
      agua:        ["180,240,255", "32,145,225",  "12,65,115",  "225,250,255", -0.45,  "82,185,235",  "130,210,245", "56,152,210"],
      hielo:       ["215,250,255", "95,205,245",  "25,95,140",  "240,253,255", -0.35,  "115,205,232", "162,226,244", "82,178,212"],
      viento:      ["210,255,242", "72,205,175",  "20,85,75",   "235,255,250",  0.75,  "92,208,178",  "142,228,205", "64,178,150"],
      energia:     ["220,245,255", "75,175,255",  "25,75,145",  "240,250,255",  1.15,  "98,165,245",  "148,198,250", "70,136,224"],
      naturaleza:  ["205,255,195", "68,185,88",   "22,82,36",   "232,255,225",  0.65,  "96,198,116",  "145,222,158", "68,168,90"],
      sombra:      ["225,175,255", "145,58,225",  "58,18,98",   "242,215,255",  0.85,  "162,115,235", "192,158,245", "128,82,208"],
      luz:         ["255,252,215", "245,215,95",  "120,95,25",  "255,255,240",  0.90,  "228,192,74",  "245,218,126", "198,162,48"],
      maldito:     ["235,165,215", "165,35,115",  "68,12,48",   "250,210,235",  0.70,  "212,98,168",  "234,146,198", "178,68,138"],
      divino:      ["255,236,175", "225,168,45",  "105,72,15",  "255,248,215",  0.85,  "228,174,68",  "245,204,120", "196,142,42"],
      metal:       ["225,236,248", "130,152,175", "48,60,75",   "245,250,255",  0.80,  "132,154,178", "172,190,208", "102,124,148"],
      gravedad:    ["205,195,255", "105,85,215",  "42,30,95",   "230,225,255", -0.60,  "132,112,228", "168,154,242", "102,82,202"],
      realidad:    ["255,195,245", "210,75,175",  "85,22,72",   "255,230,250",  0.95,  "218,104,192", "238,152,216", "184,74,162"],
      dimensional: ["185,215,255", "82,125,245",  "30,48,110",  "225,238,255",  0.85,  "104,144,238", "152,182,248", "76,116,214"],
      mente:       ["245,185,255", "188,78,225",  "78,24,98",   "252,225,255",  0.60,  "186,108,228", "214,154,242", "154,76,202"],
      sonido:      ["185,250,255", "58,195,220",  "18,82,98",   "225,253,255",  0.75,  "84,198,220",  "136,220,236", "58,168,192"],
      invocacion:  ["255,210,175", "215,112,48",  "92,42,16",   "255,235,215",  0.85,  "224,132,74",  "242,172,124", "192,102,48"],
      cuerpo:      ["255,185,175", "215,68,52",   "95,24,18",   "255,225,220",  1.00,  "222,104,86",  "240,152,136", "188,76,60"]
    };

    const ESTRELLAS_LIGHT = [
      [0.10, 0.16, 2.2, 0.7], [0.24, 0.34, 1.6, 1.3], [0.38, 0.14, 2.5, 2.1],
      [0.52, 0.28, 1.8, 0.4], [0.68, 0.19, 2.3, 1.8], [0.83, 0.32, 1.7, 2.6],
      [0.92, 0.15, 2.1, 1.1], [0.16, 0.54, 1.9, 2.4], [0.31, 0.66, 2.4, 0.9],
      [0.47, 0.52, 1.5, 1.6], [0.61, 0.69, 2.2, 2.9], [0.76, 0.56, 1.8, 0.2],
      [0.89, 0.72, 2.0, 1.5], [0.07, 0.78, 1.7, 2.2], [0.42, 0.82, 2.1, 1.0],
      [0.72, 0.84, 1.6, 2.7]
    ];

    function detectarTema() {
      const fuentes = [
        norm(location.pathname),
        norm((document.querySelector("article h1, .page-header h1, h1") || {}).textContent),
        norm(document.title)
      ];
      for (const f of fuentes) {
        if (!f) continue;
        for (const [k, list] of Object.entries(TEMAS_NORM)) {
          if (list.some((p) => f.includes(p))) return k;
        }
      }
      return /quinesis|kinesis|mancia/.test(fuentes.join(" ")) ? "energia" : "fuego";
    }

    function hashFactor() {
      const clave = location.pathname || "default";
      let h = 0;
      for (let i = 0; i < clave.length; i++) h = ((h * 31) + clave.charCodeAt(i)) >>> 0;
      return 0.65 + ((h % 1000) / 1000) * 0.8;
    }

    let tema = detectarTema();
    let factor = hashFactor();
    let ultimoScroll = 0, impulso = 0, scrollNorm = 0;
    const SCROLL_ELS = () => [document.scrollingElement, document.documentElement, document.body, document.getElementById("quartz-body"), document.querySelector(".center"), document.querySelector(".page")].filter(Boolean);

    function actualizarScroll() {
      let cur = window.scrollY || window.pageYOffset || 0;
      let max = Math.max(document.documentElement.scrollHeight - innerHeight, document.body.scrollHeight - innerHeight, 0);
      for (const el of SCROLL_ELS()) {
        const m = el.scrollHeight - el.clientHeight;
        if (m > 20 && el.scrollTop >= 0) { cur = Math.max(cur, el.scrollTop); max = Math.max(max, m); }
      }
      impulso = Math.max(-28, Math.min(28, impulso + (cur - ultimoScroll) * 0.14));
      ultimoScroll = cur;
      scrollNorm = max > 0 ? Math.min(Math.max(cur / max, 0), 1) : 0;
      document.body.style.setProperty("--vinotinto-progreso", Math.min(scrollNorm * factor, 1).toFixed(4));
    }

    let canvas, ctx, width = 0, height = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const GRUPOS = 3, POR_GRUPO = 9;
    const VENTANAS = [{ inicio: 0, pico: 0.16, fin: 0.38 }, { inicio: 0.30, pico: 0.48, fin: 0.70 }, { inicio: 0.62, pico: 0.80, fin: 1 }];
    let ascuas = [];
    const cursor = { x: -500, y: -500, sx: -500, sy: -500, activo: false };

    function crearAscua(g) {
      const w = width || innerWidth || 1200, h = height || innerHeight || 800, mx = Math.min(80, w * 0.08);
      return {
        grupo: g,
        xBase: mx + Math.random() * Math.max(100, w - mx * 2),
        yInicial: h * (0.25 + Math.random() * 0.72),
        tamano: 1.1 + Math.random() * 1.4,
        halo: 5.5 + Math.random() * 5.5,
        subida: 75 + Math.random() * 95,
        amp: 12 + Math.random() * 20,
        freq: 1.3 + Math.random() * 1.4,
        fase: Math.random() * Math.PI * 2,
        pico: 0.65 + Math.random() * 0.30
      };
    }

    function poblar() {
      ascuas = [];
      for (let g = 0; g < GRUPOS; g++) for (let i = 0; i < POR_GRUPO; i++) ascuas.push(crearAscua(g));
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = innerWidth; height = innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function asegurarCanvas() {
      let el = document.getElementById("ascuas-canvas");
      if (!el) {
        el = Object.assign(document.createElement("canvas"), { id: "ascuas-canvas", "aria-hidden": "true" });
        (document.getElementById("quartz-body") || document.body).prepend(el);
      }
      if (el instanceof HTMLCanvasElement) { canvas = el; ctx = canvas.getContext("2d"); resize(); }
    }

    function forzarExploradorEnV() {
      const exp = document.querySelector(".explorer");
      if (!exp) return;
      exp.classList.remove("is-collapsed-pc", "collapsed");
      const content = exp.querySelector(".explorer-content");
      if (content) {
        content.classList.add("open");
        content.setAttribute("aria-expanded", "true");
      }
      const toggle = exp.querySelector(":scope > .explorer-toggle, button.explorer-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
    }

    function setVentanaLateralAbierta(abierta) {
      document.body.classList.toggle("yt-drawer-open", Boolean(abierta));
      const btn = document.getElementById("btn-hamburguesa-barra");
      if (btn) btn.setAttribute("aria-expanded", String(Boolean(abierta)));
      try {
        localStorage.setItem("vinotinto-yt-drawer", abierta ? "1" : "0");
      } catch (_) {}
      forzarExploradorEnV();
    }

    function asegurarBotonHamburguesa() {
      const sidebar = document.querySelector(".sidebar.left, .left-sidebar");
      if (!sidebar) return;

      let abierta = false;
      try {
        abierta = localStorage.getItem("vinotinto-yt-drawer") === "1";
      } catch (_) {}

      let btn = document.getElementById("btn-hamburguesa-barra");
      if (!btn) {
        btn = Object.assign(document.createElement("button"), {
          id: "btn-hamburguesa-barra",
          type: "button",
          innerHTML: "&#9776;"
        });
        btn.setAttribute("aria-label", "Abrir o cerrar barra lateral");
        btn.style.cssText =
          "position:fixed;top:16px;left:22px;z-index:1200;width:42px;height:42px;background:rgba(20,18,22,0.82);border:1.5px solid rgba(255,77,109,0.55);color:#ffffff;border-radius:10px;padding:0;font-size:1.35rem;line-height:1;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,0.35);backdrop-filter:blur(6px);transition:transform 0.16s ease,background-color 0.16s ease,border-color 0.16s ease;";

        btn.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setVentanaLateralAbierta(!document.body.classList.contains("yt-drawer-open"));
        });

        if (!window.__ytDrawerListenersBound) {
          window.__ytDrawerListenersBound = true;
          document.addEventListener("click", (ev) => {
            if (!document.body.classList.contains("yt-drawer-open")) return;
            const actualSidebar = document.querySelector(".sidebar.left, .left-sidebar");
            const actualBtn = document.getElementById("btn-hamburguesa-barra");
            const target = ev.target;
            if (target instanceof Node && actualSidebar && !actualSidebar.contains(target) && target !== actualBtn) {
              setVentanaLateralAbierta(false);
            }
          });

          document.addEventListener("keydown", (ev) => {
            if (ev.key === "Escape" && document.body.classList.contains("yt-drawer-open")) {
              setVentanaLateralAbierta(false);
            }
          });
        }

        (document.getElementById("quartz-body") || document.body).prepend(btn);
      }

      setVentanaLateralAbierta(abierta);
    }

    function persistirYRestaurarBuscador() {
      const inputs = Array.from(document.querySelectorAll(".search input[type='search'], .search input[type='text'], #search-bar input"));
      for (const inp of inputs) {
        if (!(inp instanceof HTMLInputElement)) continue;
        if (!inp.dataset.vinotintoBound) {
          inp.dataset.vinotintoBound = "1";
          inp.addEventListener("input", () => {
            try {
              localStorage.setItem("quartz-search-query", inp.value);
            } catch (_) {}
          }, { passive: true });
        }
        try {
          const guardado = localStorage.getItem("quartz-search-query");
          if (guardado && !inp.value) {
            inp.value = guardado;
          }
        } catch (_) {}
      }
    }

    function syncTodo() {
      tema = detectarTema();
      document.body.setAttribute("data-tema-pagina", tema);
      factor = hashFactor();
      asegurarCanvas();
      asegurarBotonHamburguesa();
      forzarExploradorEnV();
      persistirYRestaurarBuscador();
      actualizarScroll();
    }

    window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX; cursor.y = e.clientY;
      if (!cursor.activo) { cursor.sx = e.clientX; cursor.sy = e.clientY; cursor.activo = true; }
    }, { passive: true });
    document.addEventListener("mouseleave", () => { cursor.activo = false; });
    document.addEventListener("scroll", actualizarScroll, { passive: true, capture: true });
    window.addEventListener("resize", () => { actualizarScroll(); resize(); }, { passive: true });
    document.addEventListener("nav", () => { syncTodo(); setTimeout(syncTodo, 60); });

    poblar();
    syncTodo();

    const peso = (t, v) => (t <= v.inicio || t >= v.fin) ? 0 : (t < v.pico ? (t - v.inicio) / (v.pico - v.inicio) : Math.max(0, (v.fin - t) / (v.fin - v.pico)));

    function dibujarAscua(x, y, r, halo, alfa, d) {
      if (alfa <= 0.01 || !ctx) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, halo);
      g.addColorStop(0, \`rgba(\${d[0]},\${alfa.toFixed(3)})\`);
      g.addColorStop(0.35, \`rgba(\${d[1]},\${(alfa * 0.45).toFixed(3)})\`);
      g.addColorStop(1, \`rgba(\${d[2]},0)\`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, halo, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = \`rgba(\${d[3]},\${Math.min(1, alfa * 1.15).toFixed(3)})\`;
      ctx.beginPath(); ctx.arc(x, y, r * 0.65, 0, Math.PI * 2); ctx.fill();
    }

    function dibujarEstrellasLight(tGlobal, d) {
      for (let i = 0; i < ESTRELLAS_LIGHT.length; i++) {
        const [rx, ry, tam, fase] = ESTRELLAS_LIGHT[i];
        const prof = 0.25 + (i % 4) * 0.18;
        const x = width * rx + Math.sin(tGlobal * 0.6 + fase) * 8;
        const y = ((height * ry - parallaxOlas * height * prof + impulso * 0.4) % height + height) % height;
        const titileo = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(tGlobal * 2.6 + fase * 2));
        const r = tam * (0.85 + 0.25 * titileo);

        const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 3.6);
        halo.addColorStop(0, \`rgba(\${d[5]},\${(0.32 * titileo).toFixed(3)})\`);
        halo.addColorStop(1, \`rgba(\${d[5]},0)\`);
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(x, y, r * 3.6, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = \`rgba(\${d[7]},\${(0.55 * titileo).toFixed(3)})\`;
        ctx.lineWidth = 0.9;
        const brazo = r * 2.2;
        ctx.beginPath();
        ctx.moveTo(x - brazo, y); ctx.lineTo(x + brazo, y);
        ctx.moveTo(x, y - brazo); ctx.lineTo(x, y + brazo);
        ctx.stroke();

        ctx.fillStyle = \`rgba(255,255,255,\${(0.85 * titileo).toFixed(3)})\`;
        ctx.beginPath(); ctx.arc(x, y, r * 0.65, 0, Math.PI * 2); ctx.fill();
      }
    }

    let ciclo = 0, faseOlas = 0, parallaxOlas = 0, ultimoT = performance.now();
    const CAPAS_PS3 = [
      { idx: 5, y: 0.28, pY: 0.14, a1: 38, a2: 18, f1: 0.0032, f2: 0.0075, vel: 0.90,  grosor: 52, alfa: 0.22 },
      { idx: 6, y: 0.48, pY: 0.22, a1: 48, a2: 22, f1: 0.0026, f2: 0.0062, vel: -0.72, grosor: 68, alfa: 0.18 },
      { idx: 7, y: 0.68, pY: 0.28, a1: 34, a2: 16, f1: 0.0038, f2: 0.0082, vel: 0.55,  grosor: 44, alfa: 0.15 }
    ];

    function dibujarOlas(tGlobal, dt, d) {
      parallaxOlas += (scrollNorm - parallaxOlas) * (1 - Math.pow(0.002, dt));
      faseOlas += dt * (0.65 + Math.abs(impulso) * 0.045);
      const paso = width < 640 ? 28 : 18, absImp = Math.abs(impulso);
      ctx.save(); ctx.lineCap = ctx.lineJoin = "round";

      CAPAS_PS3.forEach((c, ci) => {
        const baseY = height * (c.y - parallaxOlas * c.pY);
        const sup = [], inf = [];
        for (let x = -paso; x <= width + paso; x += paso) {
          const nx = x / Math.max(width, 1);
          const yc = baseY + Math.sin(x * c.f1 + faseOlas * c.vel + ci * 1.7) * (c.a1 + absImp * 0.45) + Math.cos(x * c.f2 - faseOlas * c.vel * 0.75 + ci * 2.4) * c.a2 + (nx - 0.5) * (parallaxOlas * 95 + impulso * 1.4);
          const mg = c.grosor * (0.55 + 0.45 * Math.sin(nx * Math.PI * 1.6 + faseOlas * 0.5 + ci));
          sup.push([x, yc - mg]); inf.push([x, yc + mg]);
        }
        const grad = ctx.createLinearGradient(0, baseY - 90, 0, baseY + 90);
        grad.addColorStop(0, \`rgba(\${d[c.idx]},0)\`);
        grad.addColorStop(0.5, \`rgba(\${d[c.idx]},\${c.alfa})\`);
        grad.addColorStop(1, \`rgba(\${d[c.idx]},0)\`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        sup.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        for (let j = inf.length - 1; j >= 0; j--) ctx.lineTo(inf[j][0], inf[j][1]);
        ctx.closePath(); ctx.fill();

        ctx.strokeStyle = \`rgba(\${d[c.idx]},\${Math.min(0.38, c.alfa * 1.65).toFixed(3)})\`;
        ctx.lineWidth = 1.4; ctx.beginPath();
        sup.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.stroke();
      });

      dibujarEstrellasLight(tGlobal, d);
      ctx.restore();
    }

    function frame(ahora) {
      const dt = Math.min((ahora - ultimoT) / 1000, 0.05); ultimoT = ahora;
      if (!canvas || !canvas.isConnected) asegurarCanvas();
      if (ctx && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        const d = TEMA_DATA[document.body.getAttribute("data-tema-pagina") || tema] || TEMA_DATA.fuego;
        const tGlobal = ahora / 1000;

        if (document.documentElement.getAttribute("saved-theme") === "dark") {
          ciclo += dt / 13.5 + Math.abs(impulso) * 0.0018;
          impulso *= 0.88;
          if (ciclo >= 1) { ciclo %= 1; poblar(); }
          if (cursor.activo) {
            const f = 1 - Math.pow(0.0015, dt);
            cursor.sx += (cursor.x - cursor.sx) * f; cursor.sy += (cursor.y - cursor.sy) * f;
          }
          for (const a of ascuas) {
            const p = peso(ciclo, VENTANAS[a.grupo]);
            if (p <= 0.01) continue;
            const av = Math.max(0, Math.min(1, (ciclo - VENTANAS[a.grupo].inicio) / (VENTANAS[a.grupo].fin - VENTANAS[a.grupo].inicio)));
            let y = a.yInicial - av * a.subida * d[4];
            let x = a.xBase + Math.sin(tGlobal * a.freq + a.fase + av * 4) * a.amp;
            if (cursor.activo) {
              const dx = cursor.sx - x, dy = cursor.sy - y, dist = Math.hypot(dx, dy);
              if (dist > 1 && dist < 130) { const f = (1 - dist / 130) * 14; x += (dx / dist) * f; y += (dy / dist) * f * 0.6; }
            }
            dibujarAscua(x, y, a.tamano, a.halo, p * (0.8 + 0.2 * Math.sin(tGlobal * 8 + a.fase)) * a.pico, d);
          }
          if (cursor.activo) dibujarAscua(cursor.sx, cursor.sy, 1.35, 11, 0.55 + 0.2 * Math.sin(tGlobal * 6), d);
        } else {
          impulso *= 0.88;
          dibujarOlas(tGlobal, dt, d);
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();
`

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => (
  <div id="quartz-body">
    <canvas id="ascuas-canvas" aria-hidden="true" />
    {children}
    <script dangerouslySetInnerHTML={{ __html: scriptVinotinto }} />
  </div>
)

export default (() => Body) satisfies QuartzComponentConstructor