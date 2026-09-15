export type Lang = "es" | "en";

export type ToolType = "web" | "desktop" | "script";

export type ToolStatus = "live" | "dev" | "mvp" | "wip";

export interface Localized {
  es: string;
  en: string;
}

export interface Tool {
  slug: string;
  name: string;
  type: ToolType;
  status: ToolStatus;
  version?: string;
  url?: string;
  repoUrl?: string;
  screenshot?: string;
  screenshots?: string[];
  icon?: string;
  typeLabel: Localized;
  statusLabel: Localized;
  tagline: Localized;
  description: Localized;
  highlights: Localized[];
  stack: string[];
  tags: string[];
  flowStage?: string;
  maturity?: "core" | "growing" | "experimental";
  needs?: string[];
}

export const tools: Tool[] = [
  {
    slug: "sqx-results-plugins",
    name: "SQX ResultsPlugins",
    type: "script",
    status: "live",
    version: "18",
    repoUrl: "https://github.com/sebasaurio/SQXPlugins",
    typeLabel: { es: "Plugins / HTML", en: "Plugins / HTML" },
    statusLabel: { es: "En producción", en: "Live" },
    tagline: {
      es: "Colección de 18 plugins single-file que corren dentro de la pestaña Results de StrategyQuant X para analizar la estrategia seleccionada.",
      en: "Collection of 18 single-file plugins that run inside the StrategyQuant X Results tab to analyze the selected strategy.",
    },
    description: {
      es: "Suite de ResultsPlugins para SQX 144+ que se comunican con la estrategia vía la API PostMessage, todo 100% offline. Cubre el flujo completo de validación: detalle de rendimiento por año, costes reales de ejecución, anatomía de drawdowns, decay de edge (IS/OOS), tests de permutación (EGT), walk-forward, riesgo de ruina y planificador de capital, Monte Carlo para prop firms, analítica prop, calidad de trades, timing MAE/MFE, rachas, sesiones, calibración de indicadores y scorecards de degradación OOS.",
      en: "Suite of ResultsPlugins for SQX 144+ that talk to the strategy via the PostMessage API, fully offline. Covers the whole validation flow: per-year performance detail, real execution costs, drawdown anatomy, edge decay (IS/OOS), permutation tests (EGT), walk-forward, risk of ruin and capital planner, prop-firm Monte Carlo, prop analytics, trade quality, MAE/MFE timing, streaks, sessions, indicator calibration and OOS degradation scorecards.",
    },
    highlights: [
      {
        es: "18 plugins single-file sin servidor ni CDN, i18n multilingüe",
        en: "18 single-file plugins with no server or CDN, multi-language i18n",
      },
      {
        es: "Validación anti-overfit: EGT, Walk-Forward y OOS Scorecard",
        en: "Anti-overfit validation: EGT, Walk-Forward and OOS Scorecard",
      },
      {
        es: "Riesgo: Risk of Ruin, Capital Planner, Prop Monte Carlo y Prop analytics",
        en: "Risk: Risk of Ruin, Capital Planner, Prop Monte Carlo and Prop analytics",
      },
      {
        es: "Comunicación vía PostMessage API de SQX, análisis de la estrategia activa",
        en: "SQX PostMessage API communication, analyzes the active strategy",
      },
    ],
    stack: ["HTML", "Vanilla JS", "Vue 3", "Canvas", "PostMessage API"],
    tags: ["StrategyQuant", "SQX", "Plugins", "Análisis", "Backtest"],
    flowStage: "validacion",
    maturity: "core",
    needs: ["analizar estrategia seleccionada", "validar anti-overfit", "analítica de trades"],
  },
  {
    slug: "block-settings",
    name: "Block Settings Generator",
    type: "web",
    status: "live",
    url: "https://blocksettings.vercel.app",
    repoUrl: "https://github.com/sebasaurio/BlockSettings",
    screenshot: "/screenshots/block-settings.png",
    screenshots: ["/screenshots/block-settings.png"],
    typeLabel: { es: "Web", en: "Web" },
    statusLabel: { es: "En producción", en: "Live" },
    tagline: {
      es: "Calibra los rangos de bloques del StrategyQuant X AlgoWizard por símbolo y timeframe, y genera un .sqb listo para importar.",
      en: "Calibrates StrategyQuant X AlgoWizard block ranges per symbol and timeframe, and produces a ready-to-import .sqb.",
    },
    description: {
      es: "Herramienta standalone que lee el config.xml del BlockSettings.zip de SQX, calcula rangos calibrados de indicadores con una escala power-law según el modo de estrategia y la volatilidad real (Yahoo Finance), y descarga un .sqb parcheado para importar en el AlgoWizard.",
      en: "Standalone tool that reads the config.xml from SQX's BlockSettings.zip, computes calibrated indicator ranges using a power-law scale based on strategy mode and real volatility (Yahoo Finance), and downloads a patched .sqb to import into the AlgoWizard.",
    },
    highlights: [
      {
        es: "83 símbolos entre Forex, futuros, crypto, índices y acciones",
        en: "83 symbols across Forex, futures, crypto, indices and stocks",
      },
      {
        es: "8 timeframes (M1 a W1) y 4 modos: Scalping, Day, Swing, Position",
        en: "8 timeframes (M1 to W1) and 4 modes: Scalping, Day, Swing, Position",
      },
      {
        es: "Ajuste por volatilidad real vía Yahoo Finance + kits de indicadores",
        en: "Real volatility adjustment via Yahoo Finance + indicator kits",
      },
      {
        es: "API HTTP (/api/calibrate) para IAs, CLIs y pipelines",
        en: "HTTP API (/api/calibrate) for AIs, CLIs and pipelines",
      },
    ],
    stack: ["Vue 3", "HTML", "Vercel Functions", "Yahoo Finance API"],
    tags: ["StrategyQuant", "Calibración", "SQX", ".sqb", "Indicadores"],
    flowStage: "calibracion",
    maturity: "core",
    needs: ["calibrar bloques del AlgoWizard", "generar .sqb por símbolo", "ajustar rangos por volatilidad"],
  },
  {
    slug: "metatrader-analysis",
    name: "Metatrader Analyzer",
    type: "web",
    status: "live",
    url: "https://metatrader-analysis.vercel.app",
    repoUrl: "https://github.com/sebasaurio/MetatraderAnalysis",
    screenshot: "/screenshots/metatrader-analysis.png",
    screenshots: ["/screenshots/metatrader-analysis.png"],
    typeLabel: { es: "Web", en: "Web" },
    statusLabel: { es: "En producción", en: "Live" },
    tagline: {
      es: "Análisis exhaustivo de trades de MT4/MT5 desde CSVs: dashboards, riesgo y optimización de portafolio.",
      en: "In-depth MT4/MT5 trade analysis from CSVs: dashboards, risk and portfolio optimization.",
    },
    description: {
      es: "Procesa archivos CSV (nativos o de StrategyQuant) y genera dashboards interactivos con Profit Factor, Win Rate y Drawdown; curvas de equidad; simulaciones de Monte Carlo y Risk of Ruin; mapas de calor temporales; análisis MAE/MFE y optimización de portafolio con Web Workers para los cálculos pesados.",
      en: "Processes CSV exports (native or from StrategyQuant) and generates interactive dashboards with Profit Factor, Win Rate and Drawdown; equity curves; Monte Carlo and Risk of Ruin simulations; temporal heatmaps; MAE/MFE analysis and portfolio optimization, using Web Workers for heavy computation.",
    },
    highlights: [
      {
        es: "Dashboards con KPIs clave (Profit Factor, Win Rate, Drawdown)",
        en: "Dashboards with key KPIs (Profit Factor, Win Rate, Drawdown)",
      },
      {
        es: "Monte Carlo, Risk of Ruin y métricas de estabilidad",
        en: "Monte Carlo, Risk of Ruin and stability metrics",
      },
      {
        es: "Mapas de calor por hora/día y análisis de duración",
        en: "Hourly/daily heatmaps and trade-duration analysis",
      },
      {
        es: "Análisis MAE/MFE y optimización de portafolio",
        en: "MAE/MFE analysis and portfolio optimization",
      },
    ],
    stack: ["React 19", "Vite", "ECharts", "Chakra UI", "Zustand"],
    tags: ["MetaTrader", "Análisis", "Riesgo", "Monte Carlo", "CSV"],
    flowStage: "analisis",
    maturity: "core",
    needs: ["analizar historial de trades MT4/MT5", "medir riesgo y drawdown", "optimizar portafolio"],
  },
  {
    slug: "sqx-organizer",
    name: "SQX Organizer",
    type: "desktop",
    status: "mvp",
    version: "0.4.2",
    repoUrl: "https://github.com/sebasaurio/VirtualSQX",
    icon: "/icons/sqx-organizer.png",
    screenshots: ["/screenshots/sqx-organizer-1.png"],
    typeLabel: { es: "Desktop", en: "Desktop" },
    statusLabel: { es: "MVP", en: "MVP" },
    tagline: {
      es: "Organiza virtualmente tus estrategias de StrategyQuant X sin tocar los archivos originales.",
      en: "Virtually organize your StrategyQuant X strategies without touching the original files.",
    },
    description: {
      es: "Aplicación de escritorio para Windows que organiza las estrategias generadas por SQX sin mover ni modificar los archivos físicos: carpetas virtuales con drag & drop, colecciones, tags, estados con vista Kanban, historial por estrategia, detección de duplicados por SHA-256 y extracción de metadatos reales del formato .sqx.",
      en: "Windows desktop app that organizes strategies generated by SQX without moving or modifying physical files: virtual folders with drag & drop, collections, tags, statuses with a Kanban view, per-strategy history, SHA-256 duplicate detection and real metadata extraction from the .sqx format.",
    },
    highlights: [
      {
        es: "Carpetas virtuales, colecciones, tags y estados con Kanban",
        en: "Virtual folders, collections, tags and statuses with Kanban",
      },
      {
        es: "Drag & drop sin mover archivos + historial por estrategia",
        en: "Drag & drop without moving files + per-strategy history",
      },
      {
        es: "Detección de duplicados por hash SHA-256",
        en: "SHA-256 hash duplicate detection",
      },
      {
        es: "Metadatos reales del .sqx y base de datos local SQLite",
        en: "Real .sqx metadata and local SQLite database",
      },
    ],
    stack: ["Tauri 2", "Rust", "React 19", "TypeScript", "Tailwind", "SQLite"],
    tags: ["StrategyQuant", "Organizador", "Desktop", "SQLite", "Windows"],
    flowStage: "organizacion",
    maturity: "growing",
    needs: ["organizar estrategias SQX", "colecciones virtuales", "buscar y taggear"],
  },
  {
    slug: "trade-to-telegram",
    name: "TradeToTelegram",
    type: "script",
    status: "live",
    version: "2.00",
    repoUrl: "https://github.com/sebasaurio/TradeToTelegram",
    screenshots: [
      "/screenshots/trade-to-telegram-1.png",
      "/screenshots/trade-to-telegram-2.png",
      "/screenshots/trade-to-telegram-3.png",
    ],
    typeLabel: { es: "Script / EA", en: "Script / EA" },
    statusLabel: { es: "En producción", en: "Live" },
    tagline: {
      es: "Bot de notificaciones y control de trading para MetaTrader 5 a través de Telegram, implementado como Expert Advisor.",
      en: "Trading notifications and control bot for MetaTrader 5 via Telegram, implemented as an Expert Advisor.",
    },
    description: {
      es: "Sistema completo de notificaciones y control para MT5 a través de Telegram. Envía en tiempo real aperturas y cierres de posiciones, órdenes, cambios de balance y un sumario diario; permite controlar la cuenta desde el chat con comandos (/posiciones, /estadisticas, /historial, /screenshot). Incluye gestión de riesgo con Circuit Breaker, enrutamiento multi-cuenta y multi-canal con soporte de topics, y captura de capturas de gráfico.",
      en: "Full notification and control system for MT5 through Telegram. Sends real-time position openings/closings, orders, balance changes and a daily summary; lets you control the account from chat with commands (/posiciones, /estadisticas, /historial, /screenshot). Includes risk management with a Circuit Breaker, multi-account and multi-channel routing with topic support, and chart screenshot capture.",
    },
    highlights: [
      {
        es: "Notificaciones en tiempo real + sumario diario automático",
        en: "Real-time notifications + automatic daily summary",
      },
      {
        es: "Control desde chat: posiciones, estadísticas, historial, screenshot",
        en: "Chat control: positions, stats, history, screenshot",
      },
      {
        es: "Circuit Breaker con monitoreo de drawdown y cierre automático",
        en: "Circuit Breaker with drawdown monitoring and auto-close",
      },
      {
        es: "Multi-cuenta, multi-canal y soporte de topics en grupos",
        en: "Multi-account, multi-channel and topic support in groups",
      },
    ],
    stack: ["MQL5", "MetaTrader 5", "Telegram Bot API"],
    tags: ["MetaTrader", "Telegram", "Notificaciones", "MQL5", "EA"],
    flowStage: "monitoreo",
    maturity: "core",
    needs: ["notificaciones de trading en tiempo real", "control desde Telegram", "circuit breaker"],
  },
  {
    slug: "sqxtools",
    name: "SQXTools",
    type: "script",
    status: "live",
    version: "0.1",
    repoUrl: "https://github.com/sebasaurio/SQXTools",
    typeLabel: { es: "CLI / Python", en: "CLI / Python" },
    statusLabel: { es: "En producción", en: "Live" },
    tagline: {
      es: "CLI de Python para el flujo completo de StrategyQuant X: parsear .cfx/.sqb/.cfx (Custom Projects), analizar builders y detectar errores, optimizar con edge finder sobre datos reales, y generar configuraciones listas para importar.",
      en: "Python CLI for the full StrategyQuant X workflow: parse .cfx/.sqb/.cfx (Custom Projects), analyze builders and catch defects, optimize via edge finder on real data, and generate ready-to-import configs.",
    },
    description: {
      es: "Toolkit CLI v1 que cubre toda la cadena de trabajo con StrategyQuant: (1) parser universal de .cfx, .sqb, .cfx (Custom Projects) a JSON/YAML/Markdown legibles por IA; (2) analizador de configuración de builder y detección de inconsistencias (trading options, rankings, cross-checks); (3) edge finder sobre datos históricos en Parquet (Dukascopy/yfinance, cache incremental) y date optimizer de rangos IS/OOS; (4) generador de .cfx y .sqb optimizados con perfiles parametrizables; (5) integración MT5 (detección de instalaciones, sync de instruments desde SymbolInfoSessionQuote, export de sesiones reales del broker, bootstrap de brokers). Todo genérico para any broker/symbol — fuente de verdad para sesiones es MT5, no la página de Exness.",
      en: "v1 CLI toolkit covering the full StrategyQuant workflow: (1) universal parser of .cfx, .sqb, .cfx (Custom Projects) to JSON/YAML/Markdown readable by AI; (2) builder configuration analyzer and inconsistency detection (trading options, rankings, cross-checks); (3) edge finder on historical data in Parquet (Dukascopy/yfinance, incremental cache) and date optimizer for IS/OOS ranges; (4) .cfx and .sqb generator with parameterized profiles; (5) MT5 integration (installation detection, instrument sync from SymbolInfoSessionQuote, real broker session export, broker bootstrap). Generic for any broker/symbol — source of truth for sessions is MT5, not the Exness webpage.",
    },
    highlights: [
      {
        es: "Flujo completo en un CLI: parse, analizar, optimizar, generar, integrar MT5",
        en: "End-to-end CLI flow: parse, analyze, optimize, generate, integrate MT5",
      },
      {
        es: "MT5 como fuente de verdad: detecta todas tus instalaciones, exporta specs y sesiones reales",
        en: "MT5 as source of truth: detects all your installations, exports real specs and sessions",
      },
      {
        es: "Boot de broker genérico: un comando — mt5-bootstrap detecta, sync instruments y exporta sesiones",
        en: "Generic broker bootstrap: one command — mt5-bootstrap detects, syncs instruments and exports sessions",
      },
      {
        es: "Alertas definidas con inteligencia: no alerta si el cross-check global está desactivado; IS/OOS como subconjunto contiguo del IS es walk-forward válido — no lo marca como crítico",
        en: "Smart alert rules: doesn't alert when the global cross-check is disabled; contiguous OOS subset of IS is valid walk-forward — not flagged as critical",
      },
      {
        es: "Resultados en JSON para que lo lea IA; la misma sesión analiza sin API keys externas",
        en: "JSON output for AI to read; same session analyzes without external API keys",
      },
    ],
    stack: ["Python 3.11", "ZIP/XML parsing", "MT5 (SymbolInfoSessionQuote)", "Parquet (snappy, float32)", "CLI (argparse)", "GitHub Actions"],
    tags: ["StrategyQuant", "SQX", "CLI", "Python", "MT5", "Builder", "Optimization"],
    flowStage: "flujo-completo",
    maturity: "growing",
    needs: ["parsear/analizar .cfx y .sqb", "validar configuración de builder", "detectar inconsistencias", "optimizar con edge finder", "integrar MT5"],
  },
];

export const siteCopy: Record<
  Lang,
  {
    heroBadge: string;
    heroTitle1: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    sectionLabel: string;
    sectionTitle: string;
    sectionSubtitle: string;
    typeLabel: string;
    statusLabel: string;
    highlightsTitle: string;
    stackTitle: string;
    openTool: string;
    viewCode: string;
    repo: string;
    count: string;
    footer: string;
    langToggle: string;
    privacyTitle: string;
    privacyPoints: string[];
    privacyNote: string;
    // --- Nuevas secciones ---
    filterPlaceholder: string;
    flowTitle: string;
    flowSubtitle: string;
    flowStages: Record<string, { label: string; description: string }>;
    roadmapTitle: string;
    roadmapSubtitle: string;
    compareTitle: string;
    compareSubtitle: string;
    faqTitle: string;
    faqItems: { q: string; a: string }[];
    darkToggle: string;
    lightToggle: string;
  }
> = {
  es: {
    heroBadge: "Kit personal de trading algorítmico",
    heroTitle1: "Herramientas para",
    heroTitleAccent: "trading algorítmico",
    heroSubtitle:
      "Un directorio de las herramientas que he ido construyendo para diseñar, calibrar, analizar y organizar estrategias de trading.",
    sectionLabel: "Herramientas",
    sectionTitle: "Mi caja de herramientas",
    sectionSubtitle:
      "Cada herramienta resuelve una parte del flujo: calibrar bloques de SQX, analizar el rendimiento de tus trades y organizar tu biblioteca de estrategias.",
    typeLabel: "Tipo",
    statusLabel: "Estado",
    highlightsTitle: "Destacados",
    stackTitle: "Stack",
    openTool: "Abrir herramienta",
    viewCode: "Ver código",
    repo: "Repositorio",
    count: "herramientas",
    footer: "Directorio de herramientas de trading algorítmico.",
    langToggle: "EN",
    privacyTitle: "Tu privacidad primero",
    privacyPoints: [
      "Nada de tus datos se envía a ningún servidor.",
      "Todo el procesamiento ocurre en tu propia máquina.",
      "Los archivos, estrategias y balances nunca salen de tu equipo.",
    ],
    privacyNote:
      "Estas herramientas se ejecutan localmente en tu computadora. Puedes revisar el código en GitHub para verificarlo.",
    // --- Nuevas secciones (ES) ---
    filterPlaceholder: "Buscar herramienta...",
    flowTitle: "El flujo completo",
    flowSubtitle: "Cada herramienta entra en una etapa del ciclo de trading algorítmico.",
    flowStages: {
      "flujo-completo": { label: "Flujo completo", description: "Parsear, analizar y generar configuraciones de SQX." },
      validacion: { label: "Validación", description: "Analizar la estrategia seleccionada en SQX." },
      calibracion: { label: "Calibración", description: "Ajustar rangos de bloques por símbolo y timeframe." },
      analisis: { label: "Análisis de trades", description: "Medir rendimiento, riesgo y estabilidad de tu historial." },
      organizacion: { label: "Organización", description: "Ordenar y etiquetar tu biblioteca de estrategias." },
      monitoreo: { label: "Monitoreo", description: "Recibir alerts y controlar la cuenta en vivo." },
    },
    roadmapTitle: "Estado del toolkit",
    roadmapSubtitle: "Dónde está cada herramienta y qué viene.",
    compareTitle: "Qué resuelve cada herramienta",
    compareSubtitle: "Encontrá la herramienta por lo que necesitás hacer.",
    faqTitle: "Preguntas frecuentes",
    faqItems: [
      { q: "¿Los datos salen de mi máquina?", a: "No. SQXTools, SQX Organizer y ResultsPlugins procesan todo localmente. Metatrader Analyzer lee tus CSVs exportados. TradeToTelegram solo envía lo que configuraste." },
      { q: "¿Necesito StrategyQuant para usar estas herramientas?", a: "SQXTools, ResultsPlugins y SQX Organizer están pensados para quien usa SQX. BlockSettings lee el BlockSettings.zip de SQX. Metatrader Analyzer y TradeToTelegram son independientes." },
      { q: "¿Necesito MetaTrader corriendo?", a: "Solo para Monitor de trades (TradeToTelegram) y para que SQXTools exporte sesiones reales del broker. El resto funciona sin él." },
      { q: "¿Cómo empiezo si todavía no tengo estrategias?", a: "Usá BlockSettings para calibrar bloques e importar un .sqb al AlgoWizard, o SQXTools para analizar un builder existente. Si querés calibrar bloques sin SQX, BlockSettings tiene API HTTP." },
    ],
    darkToggle: "Modo claro",
    lightToggle: "Modo oscuro",
  },
  en: {
    heroBadge: "Personal algorithmic trading toolkit",
    heroTitle1: "Tools for",
    heroTitleAccent: "algorithmic trading",
    heroSubtitle:
      "A directory of the tools I've built to design, calibrate, analyze and organize trading strategies.",
    sectionLabel: "Tools",
    sectionTitle: "My toolbox",
    sectionSubtitle:
      "Each tool solves one part of the flow: calibrating SQX blocks, analyzing your trade performance and organizing your strategy library.",
    typeLabel: "Type",
    statusLabel: "Status",
    highlightsTitle: "Highlights",
    stackTitle: "Stack",
    openTool: "Open tool",
    viewCode: "View code",
    repo: "Repository",
    count: "tools",
    footer: "Algorithmic trading tools directory.",
    langToggle: "ES",
    privacyTitle: "Your privacy first",
    privacyPoints: [
      "None of your data is sent to any server.",
      "All processing happens on your own machine.",
      "Files, strategies and balances never leave your computer.",
    ],
    privacyNote:
      "These tools run locally on your computer. You can review the code on GitHub to verify it.",
    // --- Nuevas secciones (EN) ---
    filterPlaceholder: "Search tools...",
    flowTitle: "The full flow",
    flowSubtitle: "Each tool fits into a stage of the algorithmic trading cycle.",
    flowStages: {
      "flujo-completo": { label: "Full flow", description: "Parse, analyze and generate SQX configurations." },
      validacion: { label: "Validation", description: "Analyze the selected strategy inside SQX." },
      calibracion: { label: "Calibration", description: "Adjust block ranges per symbol and timeframe." },
      analisis: { label: "Trade analysis", description: "Measure performance, risk and stability of your history." },
      organizacion: { label: "Organization", description: "Sort and tag your strategy library." },
      monitoreo: { label: "Monitoring", description: "Receive alerts and control the account live." },
    },
    roadmapTitle: "Toolkit status",
    roadmapSubtitle: "Where each tool stands and what's next.",
    compareTitle: "What each tool solves",
    compareSubtitle: "Find the tool for what you need to do.",
    faqTitle: "Frequently asked questions",
    faqItems: [
      { q: "Do my data leave my machine?", a: "No. SQXTools, SQX Organizer and ResultsPlugins process everything locally. Metatrader Analyzer reads your exported CSVs. TradeToTelegram only sends what you configured." },
      { q: "Do I need StrategyQuant to use these tools?", a: "SQXTools, ResultsPlugins and SQX Organizer are built for SQX users. BlockSettings reads SQX's BlockSettings.zip. Metatrader Analyzer and TradeToTelegram are independent." },
      { q: "Do I need MetaTrader running?", a: "Only for TradeToTelegram (trade monitoring) and for SQXTools to export real broker sessions. The rest works without it." },
      { q: "How do I start if I don't have strategies yet?", a: "Use BlockSettings to calibrate blocks and import a .sqb into the AlgoWizard, or SQXTools to analyze an existing builder. If you want to calibrate blocks without SQX, BlockSettings has an HTTP API." },
    ],
    darkToggle: "Light mode",
    lightToggle: "Dark mode",
  },
};
