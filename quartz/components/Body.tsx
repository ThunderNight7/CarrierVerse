import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const scriptVinotinto = `
  (function() {
    function normalizarTexto(texto) {
      return (texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\\u0300-\\u036f]/g, "");
    }

    const TEMAS_PALABRAS_CLAVE = {
      agua: [
        "aquaquinesis", "aquakinesis", "aquamancia",
        "hidroquinesis", "hidrokinesis", "hidromancia",
        "hematokinesis", "hematoquinesis", "hemomancia",
        "agua", "mar", "oceano", "rio", "lluvia", "vapor", "marea",
        "sangre", "sanguineo", "hemorragia"
      ],
      hielo: [
        "crioquinesis", "criokinesis", "criomancia",
        "glaciokinesis", "glacioquinesis", "glaciomancia",
        "hielo", "escarcha", "nieve", "helado", "congelar", "congelacion", "frost", "permafrost"
      ],
      viento: [
        "aeroquinesis", "aerokinesis", "aeromancia",
        "anemoquinesis", "anemokinesis", "anemomancia",
        "atmokinesis", "atmokinesis", "atmomancia",
        "viento", "aire", "brisa", "huracan", "tornado", "tifon", "ciclon", "vendaval", "rafaga", "clima", "tormenta"
      ],
      energia: [
        "electroquinesis", "electrokinesis", "electromancia",
        "fulguroquinesis", "fulgurokinesis", "fulguromancia",
        "keraunokinesis", "keraunokinesis", "keraunomancia",
        "ergokinesis", "ergokinesis", "ergomancia",
        "electricidad", "rayo", "rayos", "trueno", "truenos", "relampago", "chispa", "chispas", "voltaje", "plasma", "energia", "mana", "eter", "aether"
      ],
      naturaleza: [
        "fitokinesis", "fitoquinesis", "fitomancia",
        "dendroquinesis", "dendrokinesis", "dendromancia", "silvomancia",
        "geoquinesis", "geokinesis", "geomancia",
        "biokinesis", "bioquinesis", "biomancia",
        "botanica", "tierra", "roca", "rocas", "piedra", "bosque", "selva", "planta", "plantas", "flora", "fauna", "naturaleza", "natural", "vida"
      ],
      sombra: [
        "umbrakinesis", "umbraquinesis", "umbramancia",
        "skiakinesis", "skiaquinesis", "skiamancia",
        "necroquinesis", "nekrokinesis", "necromancia",
        "sombra", "sombras", "oscuridad", "oscuro", "nocturno", "noche", "tinieblas", "abismo", "vacio", "necro"
      ],
      luz: [
        "fotoquinesis", "fotokinesis", "fotomancia",
        "lumokinesis", "luminoquinesis", "luminomancia",
        "helioquinesis", "heliokinesis", "heliomancia",
        "luz", "luces", "rayo de luz", "fotones", "resplandor", "brillo", "sol", "solar", "aurora"
      ],
      maldito: [
        "maldito", "maldita", "maldicion", "maldiciones", "maleficio", "hex",
        "corrupcion", "corrupto", "condena", "anatema", "ruina", "pestilencia",
        "veneno", "toxina", "toxico", "venenoso", "toxikinesis", "toxicoquinesis", "toxicomancia"
      ],
      divino: [
        "divino", "divina", "divinidad", "sagrado", "sagrada", "celestial",
        "angelical", "aureo", "dorado", "bendicion", "divina providencia", "santidad"
      ],
      metal: [
        "ferroquinesis", "ferrokinesis", "ferromancia",
        "metaloquinesis", "metalokinesis", "metalomancia",
        "magnetoquinesis", "magnetokinesis", "magnetomancia",
        "metal", "metales", "acero", "hierro", "oro", "plata", "cobre", "bronce", "aleacion", "magnetismo"
      ],
      gravedad: [
        "gravitokinesis", "gravitoquinesis", "gravimancia",
        "barokinesis", "baroquinesis", "baromancia",
        "gravedad", "peso", "masa", "atraccion", "repulsion", "levitacion", "ingravidez"
      ],
      realidad: [
        "ontokinesis", "ontoquinesis", "ontomancia",
        "nomokinesis", "nomoquinesis", "nomomancia",
        "cronoquinesis", "cronokinesis", "cronomancia",
        "realidad", "alteracion de la realidad", "paradoja", "causalidad", "destino", "probabilidad", "suerte", "tiempo"
      ],
      dimensional: [
        "spatiokinesis", "espacioquinesis", "espaciokinesis", "espaciomancia",
        "dimensional", "dimension", "dimensiones", "espacio", "espacial",
        "portal", "portales", "teletransporte", "brecha", "plano", "multiverso", "hiperespacio"
      ],
      mente: [
        "telequinesis", "telekinesis", "telepatia",
        "oniroquinesis", "onirokinesis", "oniromancia",
        "psiquico", "psiquica", "mental", "mente", "ilusion", "ilusiones", "espejismo", "sueno", "suenos", "hipnosis", "percepcion"
      ],
      sonido: [
        "sonoquininesis", "sonoquinesis", "sonokinesis", "sonomancia",
        "acustico", "acustica", "onda", "ondas", "vibracion", "vibraciones", "resonancia", "eco", "sonido", "voz", "silencio"
      ],
      invocacion: [
        "invocacion", "invocar", "convocacion", "convocar",
        "espiritu", "espiritus", "alma", "almas", "bestia", "bestias",
        "criatura", "criaturas", "familiar", "invocador", "sello", "pacto", "pactos"
      ],
      cuerpo: [
        "fuerza", "superfuerza", "velocidad", "supervelocidad",
        "agilidad", "reflejos", "resistencia", "regeneracion",
        "curacion", "sanacion", "cuerpo", "fisico", "potencia", "muscular"
      ],
      fuego: [
        "piroquinesis", "pirokinesis", "piromancia",
        "termokinesis", "termoquinesis", "termomancia",
        "fuego", "igneo", "ignea", "ascuas", "brasas", "llamas", "llama",
        "incendio", "calor", "magma", "lava", "volcan", "ceniza", "cenizas"
      ]
    };

    const PALETAS_CANVAS = {
      fuego: {
        nucleoBrillo: "255, 120, 130",
        haloMedio: "225, 38, 68",
        haloBorde: "110, 20, 35",
        centroFrio: "255, 195, 190",
        direccionY: 1
      },
      agua: {
        nucleoBrillo: "180, 240, 255",
        haloMedio: "32, 145, 225",
        haloBorde: "12, 65, 115",
        centroFrio: "225, 250, 255",
        direccionY: -0.45
      },
      hielo: {
        nucleoBrillo: "215, 250, 255",
        haloMedio: "95, 205, 245",
        haloBorde: "25, 95, 140",
        centroFrio: "240, 253, 255",
        direccionY: -0.35
      },
      viento: {
        nucleoBrillo: "210, 255, 242",
        haloMedio: "72, 205, 175",
        haloBorde: "20, 85, 75",
        centroFrio: "235, 255, 250",
        direccionY: 0.75
      },
      energia: {
        nucleoBrillo: "220, 245, 255",
        haloMedio: "75, 175, 255",
        haloBorde: "25, 75, 145",
        centroFrio: "240, 250, 255",
        direccionY: 1.15
      },
      naturaleza: {
        nucleoBrillo: "205, 255, 195",
        haloMedio: "68, 185, 88",
        haloBorde: "22, 82, 36",
        centroFrio: "232, 255, 225",
        direccionY: 0.65
      },
      sombra: {
        nucleoBrillo: "225, 175, 255",
        haloMedio: "145, 58, 225",
        haloBorde: "58, 18, 98",
        centroFrio: "242, 215, 255",
        direccionY: 0.85
      },
      luz: {
        nucleoBrillo: "255, 252, 215",
        haloMedio: "245, 215, 95",
        haloBorde: "120, 95, 25",
        centroFrio: "255, 255, 240",
        direccionY: 0.9
      },
      maldito: {
        nucleoBrillo: "235, 165, 215",
        haloMedio: "165, 35, 115",
        haloBorde: "68, 12, 48",
        centroFrio: "250, 210, 235",
        direccionY: 0.7
      },
      divino: {
        nucleoBrillo: "255, 236, 175",
        haloMedio: "225, 168, 45",
        haloBorde: "105, 72, 15",
        centroFrio: "255, 248, 215",
        direccionY: 0.85
      },
      metal: {
        nucleoBrillo: "225, 236, 248",
        haloMedio: "130, 152, 175",
        haloBorde: "48, 60, 75",
        centroFrio: "245, 250, 255",
        direccionY: 0.8
      },
      gravedad: {
        nucleoBrillo: "205, 195, 255",
        haloMedio: "105, 85, 215",
        haloBorde: "42, 30, 95",
        centroFrio: "230, 225, 255",
        direccionY: -0.6
      },
      realidad: {
        nucleoBrillo: "255, 195, 245",
        haloMedio: "210, 75, 175",
        haloBorde: "85, 22, 72",
        centroFrio: "255, 230, 250",
        direccionY: 0.95
      },
      dimensional: {
        nucleoBrillo: "185, 215, 255",
        haloMedio: "82, 125, 245",
        haloBorde: "30, 48, 110",
        centroFrio: "225, 238, 255",
        direccionY: 0.85
      },
      mente: {
        nucleoBrillo: "245, 185, 255",
        haloMedio: "188, 78, 225",
        haloBorde: "78, 24, 98",
        centroFrio: "252, 225, 255",
        direccionY: 0.6
      },
      sonido: {
        nucleoBrillo: "185, 250, 255",
        haloMedio: "58, 195, 220",
        haloBorde: "18, 82, 98",
        centroFrio: "225, 253, 255",
        direccionY: 0.75
      },
      invocacion: {
        nucleoBrillo: "255, 210, 175",
        haloMedio: "215, 112, 48",
        haloBorde: "92, 42, 16",
        centroFrio: "255, 235, 215",
        direccionY: 0.85
      },
      cuerpo: {
        nucleoBrillo: "255, 185, 175",
        haloMedio: "215, 68, 52",
        haloBorde: "95, 24, 18",
        centroFrio: "255, 225, 220",
        direccionY: 1.0
      }
    };

    function detectarTemaPagina() {
      const ruta = normalizarTexto(window.location.pathname || "");
      const h1Texto = normalizarTexto(
        (document.querySelector("article h1, .page-header h1, h1") || {}).textContent || ""
      );
      const tituloDoc = normalizarTexto(document.title || "");

      const fuentes = [ruta, h1Texto, tituloDoc];

      for (const fuente of fuentes) {
        if (!fuente) continue;
        for (const [tema, palabras] of Object.entries(TEMAS_PALABRAS_CLAVE)) {
          if (palabras.some((p) => fuente.includes(normalizarTexto(p)))) {
            return tema;
          }
        }
      }

      const combinado = fuentes.filter(Boolean).join(" ");
      if (
        combinado.includes("quinesis") ||
        combinado.includes("kinesis") ||
        combinado.includes("mancia")
      ) {
        return "energia";
      }

      return "fuego";
    }

    function aplicarTemaPagina() {
      const tema = detectarTemaPagina();
      document.body.setAttribute("data-tema-pagina", tema);
      return tema;
    }

    function obtenerFactorPagina() {
      const clave = window.location.pathname || "default";
      let hash = 0;
      for (let i = 0; i < clave.length; i++) {
        hash = (hash * 31 + clave.charCodeAt(i)) >>> 0;
      }
      const normalizado = (hash % 1000) / 1000;
      return 0.65 + normalizado * 0.8;
    }

    let temaActual = aplicarTemaPagina();
    let factorActual = obtenerFactorPagina();
    let ultimoScroll = 0;
    let impulsoScroll = 0;

    function leerScrollReal() {
      const candidatos = [
        document.scrollingElement,
        document.documentElement,
        document.body,
        document.getElementById("quartz-body"),
        document.querySelector(".center"),
        document.querySelector(".page")
      ].filter(Boolean);

      let mejorScroll = window.scrollY || window.pageYOffset || 0;
      let mejorMax = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        document.body.scrollHeight - window.innerHeight,
        0
      );

      for (const el of candidatos) {
        const maxEl = el.scrollHeight - el.clientHeight;
        if (maxEl > 20 && el.scrollTop >= 0) {
          mejorScroll = Math.max(mejorScroll, el.scrollTop);
          mejorMax = Math.max(mejorMax, maxEl);
        }
      }

      return { scrollActual: mejorScroll, maxScroll: mejorMax };
    }

    function actualizarProgresoVinotinto() {
      const { scrollActual, maxScroll } = leerScrollReal();
      const delta = scrollActual - ultimoScroll;
      ultimoScroll = scrollActual;
      impulsoScroll = Math.max(-24, Math.min(24, impulsoScroll + delta * 0.12));

      if (maxScroll <= 0) {
        document.body.style.setProperty("--vinotinto-progreso", "0");
        return;
      }

      const baseProgreso = Math.min(Math.max(scrollActual / maxScroll, 0), 1);
      const progresoConRitmo = Math.min(baseProgreso * factorActual, 1);

      document.body.style.setProperty("--vinotinto-progreso", progresoConRitmo.toFixed(4));
    }

    let canvas = null;
    let ctx = null;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const NUM_GRUPOS = 3;
    const ASCUAS_POR_GRUPO = 9;
    let ascuas = [];

    const cursor = {
      x: -500,
      y: -500,
      suaveX: -500,
      suaveY: -500,
      activo: false
    };

    function crearAscuaDeGrupo(grupoId) {
      const w = width || window.innerWidth || 1200;
      const h = height || window.innerHeight || 800;
      const margenX = Math.min(80, w * 0.08);
      const xBase = margenX + Math.random() * Math.max(100, w - margenX * 2);
      const yInicial = h * (0.25 + Math.random() * 0.72);

      return {
        grupo: grupoId,
        xBase: xBase,
        yInicial: yInicial,
        tamano: 1.1 + Math.random() * 1.4,
        halo: 5.5 + Math.random() * 5.5,
        recorridoSubida: 75 + Math.random() * 95,
        amplitudSeno: 12 + Math.random() * 20,
        frecuenciaSeno: 1.3 + Math.random() * 1.4,
        faseSeno: Math.random() * Math.PI * 2,
        brilloPico: 0.65 + Math.random() * 0.30
      };
    }

    function poblarGrupos() {
      ascuas = [];
      for (let g = 0; g < NUM_GRUPOS; g++) {
        for (let i = 0; i < ASCUAS_POR_GRUPO; i++) {
          ascuas.push(crearAscuaDeGrupo(g));
        }
      }
    }

    function redimensionarCanvas() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function asegurarCanvas() {
      let el = document.getElementById("ascuas-canvas");
      if (!el) {
        el = document.createElement("canvas");
        el.id = "ascuas-canvas";
        el.setAttribute("aria-hidden", "true");
        const cont = document.getElementById("quartz-body") || document.body;
        cont.prepend(el);
      }
      if (el instanceof HTMLCanvasElement) {
        canvas = el;
        ctx = canvas.getContext("2d");
        redimensionarCanvas();
      }
    }

    window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (!cursor.activo) {
        cursor.suaveX = e.clientX;
        cursor.suaveY = e.clientY;
        cursor.activo = true;
      }
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      cursor.activo = false;
    });

    window.addEventListener("scroll", actualizarProgresoVinotinto, { passive: true, capture: true });
    document.addEventListener("scroll", actualizarProgresoVinotinto, { passive: true, capture: true });
    window.addEventListener("resize", () => {
      actualizarProgresoVinotinto();
      redimensionarCanvas();
    }, { passive: true });

    document.addEventListener("nav", function() {
      temaActual = aplicarTemaPagina();
      factorActual = obtenerFactorPagina();
      asegurarCanvas();
      setTimeout(() => {
        temaActual = aplicarTemaPagina();
        asegurarCanvas();
        actualizarProgresoVinotinto();
      }, 60);
    });

    asegurarCanvas();
    poblarGrupos();
    actualizarProgresoVinotinto();

    const ventanasGrupo = [
      { inicio: 0.00, pico: 0.16, fin: 0.38 },
      { inicio: 0.30, pico: 0.48, fin: 0.70 },
      { inicio: 0.62, pico: 0.80, fin: 1.00 }
    ];

    let cicloProgreso = 0;
    const duracionCicloSegundos = 13.5;
    let ultimoTiempo = performance.now();

    function pesoVentana(t, v) {
      if (t <= v.inicio || t >= v.fin) return 0;
      if (t < v.pico) {
        return (t - v.inicio) / Math.max(v.pico - v.inicio, 0.0001);
      }
      return Math.max(0, (v.fin - t) / Math.max(v.fin - v.pico, 0.0001));
    }

    function obtenerPaletaCanvas(tema) {
      return PALETAS_CANVAS[tema] || PALETAS_CANVAS.fuego;
    }

    function dibujarParticula(x, y, tamano, halo, alfa, paleta) {
      if (alfa <= 0.01 || !ctx) return;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, halo);
      grad.addColorStop(0, "rgba(" + paleta.nucleoBrillo + ", " + alfa.toFixed(3) + ")");
      grad.addColorStop(0.35, "rgba(" + paleta.haloMedio + ", " + (alfa * 0.45).toFixed(3) + ")");
      grad.addColorStop(1, "rgba(" + paleta.haloBorde + ", 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, halo, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(" + paleta.centroFrio + ", " + Math.min(1, alfa * 1.15).toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(x, y, tamano * 0.65, 0, Math.PI * 2);
      ctx.fill();
    }

    function animarAscuas(ahora) {
      const dt = Math.min((ahora - ultimoTiempo) / 1000, 0.05);
      ultimoTiempo = ahora;

      if (!canvas || !canvas.isConnected) {
        asegurarCanvas();
      }

      if (ctx && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        const esOscuro = document.documentElement.getAttribute("saved-theme") === "dark";
        if (esOscuro) {
          temaActual = document.body.getAttribute("data-tema-pagina") || "fuego";
          const paleta = obtenerPaletaCanvas(temaActual);

          const avanceScroll = Math.abs(impulsoScroll) * 0.0018;
          impulsoScroll *= 0.88;

          cicloProgreso += dt / duracionCicloSegundos + avanceScroll;

          if (cicloProgreso >= 1) {
            cicloProgreso = cicloProgreso % 1;
            poblarGrupos();
          }

          const tiempoGlobal = ahora / 1000;

          if (cursor.activo) {
            const factorSuavizado = 1 - Math.pow(0.0015, dt);
            cursor.suaveX += (cursor.x - cursor.suaveX) * factorSuavizado;
            cursor.suaveY += (cursor.y - cursor.suaveY) * factorSuavizado;
          }

          for (let i = 0; i < ascuas.length; i++) {
            const a = ascuas[i];
            const v = ventanasGrupo[a.grupo];
            const peso = pesoVentana(cicloProgreso, v);

            if (peso <= 0.01) continue;

            const avanceEnGrupo = Math.max(0, Math.min(1, (cicloProgreso - v.inicio) / Math.max(v.fin - v.inicio, 0.0001)));
            let yActual = a.yInicial - avanceEnGrupo * a.recorridoSubida * paleta.direccionY;
            const serpenteoX = Math.sin(tiempoGlobal * a.frecuenciaSeno + a.faseSeno + avanceEnGrupo * 4) * a.amplitudSeno;
            let xActual = a.xBase + serpenteoX;

            if (cursor.activo) {
              const dx = cursor.suaveX - xActual;
              const dy = cursor.suaveY - yActual;
              const dist = Math.hypot(dx, dy);
              const radioInfluencia = 130;
              if (dist > 1 && dist < radioInfluencia) {
                const fuerza = (1 - dist / radioInfluencia) * 14;
                xActual += (dx / dist) * fuerza;
                yActual += (dy / dist) * fuerza * 0.6;
              }
            }

            const parpadeo = 0.8 + 0.2 * Math.sin(tiempoGlobal * 8 + a.faseSeno);
            const alfaActual = peso * parpadeo * a.brilloPico;

            dibujarParticula(xActual, yActual, a.tamano, a.halo, alfaActual, paleta);
          }

          if (cursor.activo) {
            const pulsoGuia = 0.55 + 0.2 * Math.sin(tiempoGlobal * 6);
            dibujarParticula(cursor.suaveX, cursor.suaveY, 1.35, 11, pulsoGuia, paleta);
          }
        }
      }

      requestAnimationFrame(animarAscuas);
    }

    requestAnimationFrame(animarAscuas);
  })();
`

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return (
    <div id="quartz-body">
      <canvas id="ascuas-canvas" aria-hidden="true" />
      {children}
      <script dangerouslySetInnerHTML={{ __html: scriptVinotinto }} />
    </div>
  )
}

export default (() => Body) satisfies QuartzComponentConstructor