/**
 * Chinese Font Loader for Kev-VibeCut
 *
 * Dynamically loads Chinese fonts from CDN when needed.
 * Fonts are lazily loaded — only when user selects them in the editor.
 *
 * Sources:
 * - Noto Sans SC: Google Fonts → mirrors for China accessibility
 * - LXGW WenKai: jsDelivr (LXGW WenKai Webfont)
 * - Alibaba PuHuiTi: 阿里官方 CDN
 */

interface FontSource {
  id: string;
  label: string;
  url: string;
  loaded: boolean;
}

const CHINESE_FONT_SOURCES: Record<string, FontSource> = {
  "noto-sans-sc": {
    id: "noto-sans-sc",
    label: "思源黑体",
    url: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap",
    loaded: false,
  },
  "lxgw-wenkai": {
    id: "lxgw-wenkai",
    label: "霞鹜文楷",
    url: "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css",
    loaded: false,
  },
  "ali-puhui": {
    id: "ali-puhui",
    label: "阿里普惠体",
    url: "", // No reliable CDN — relies on system fonts via CSS fallback
    loaded: true, // Mark as loaded since it falls back to system fonts
  },
};

let loadedStylesheets = new Set<string>();

/**
 * Load a font from CDN by injecting a <link> element.
 * Returns true if loaded (or already loaded), false on error.
 */
export async function loadFont(fontId: string): Promise<boolean> {
  const source = CHINESE_FONT_SOURCES[fontId];
  if (!source) return false;
  if (loadedStylesheets.has(fontId)) return true;

  // Ali PuHuiTi uses system font fallback
  if (!source.url) {
    loadedStylesheets.add(fontId);
    return true;
  }

  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = source.url;
    link.onload = () => {
      loadedStylesheets.add(fontId);
      source.loaded = true;
      resolve(true);
    };
    link.onerror = () => {
      // Silently fail — system fallback fonts will be used
      console.warn(`[FontLoader] Failed to load ${source.label}, using system fallback`);
      loadedStylesheets.add(fontId);
      resolve(false);
    };
    document.head.appendChild(link);
  });
}

/**
 * Preload a batch of fonts. Call at app startup to warm up cache.
 */
export async function preloadFonts(fontIds: string[]): Promise<void> {
  await Promise.allSettled(fontIds.map((id) => loadFont(id)));
}

/**
 * Check if a font has been loaded.
 */
export function isFontLoaded(fontId: string): boolean {
  return loadedStylesheets.has(fontId);
}

/**
 * Get available Chinese font list for UI.
 */
export function getChineseFontList(): { id: string; label: string }[] {
  return Object.values(CHINESE_FONT_SOURCES).map((f) => ({
    id: f.id,
    label: f.label,
  }));
}
