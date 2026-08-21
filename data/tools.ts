export type Lang = "es" | "en";

export type ToolType = "web" | "desktop";

export type ToolStatus = "live" | "dev" | "mvp";

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
  icon?: string;
  typeLabel: Localized;
  statusLabel: Localized;
  tagline: Localized;
  description: Localized;
  highlights: Localized[];
  stack: string[];
  tags: string[];
}

export const tools: Tool[] = [
  {
    slug: "block-settings",
    name: "Block Settings Generator",
    type: "web",
    status: "live",
    url: "https://blocksettings.vercel.app",
    repoUrl: "https://github.com/sebasaurio/BlockSettings",
    screenshot: undefined,
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
  },
  {
    slug: "metatrader-analysis",
    name: "Metatrader Analyzer",
    type: "web",
    status: "dev",
    repoUrl: "https://github.com/sebasaurio/MetatraderAnalysis",
    screenshot: undefined,
    typeLabel: { es: "Web", en: "Web" },
    statusLabel: { es: "En desarrollo", en: "In development" },
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
  },
  {
    slug: "sqx-organizer",
    name: "SQX Organizer",
    type: "desktop",
    status: "mvp",
    version: "0.4",
    repoUrl: "https://github.com/sebasaurio/SQXOrganizer",
    icon: "/icons/sqx-organizer.png",
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
  },
];

export const siteCopy: Record<
  Lang,
  {
    heroBadge: string;
    heroTitle1: string;
    heroTitleAccent: string;
    heroTitle2: string;
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
  }
> = {
  es: {
    heroBadge: "Kit personal de trading algorítmico",
    heroTitle1: "Herramientas para",
    heroTitleAccent: "trading algorítmico",
    heroTitle2: "construidas a mano",
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
  },
  en: {
    heroBadge: "Personal algorithmic trading toolkit",
    heroTitle1: "Tools for",
    heroTitleAccent: "algorithmic trading",
    heroTitle2: "built by hand",
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
  },
};
