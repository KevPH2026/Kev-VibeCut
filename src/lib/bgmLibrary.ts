/**
 * Free BGM Library for Kev-VibeCut
 *
 * Integrates with Pixabay Audio API for royalty-free music.
 * Provides curated Chinese creator-friendly categories.
 *
 * Pixabay API: https://pixabay.com/api/docs/
 * Rate limit: 100 requests/minute (free tier)
 */

export interface BGMTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  previewUrl: string; // streaming URL
  downloadUrl: string; // download URL
  tags: string[];
  bpm?: number;
  source: "pixabay" | "builtin";
}

export type BGMCategory =
  | "vlog"
  | "tech"
  | "travel"
  | "food"
  | "fashion"
  | "cinematic"
  | "upbeat"
  | "calm"
  | "corporate"
  | "chinese";

export const BGM_CATEGORIES: Record<BGMCategory, { label: string; query: string }> = {
  vlog: { label: "Vlog日常", query: "vlog happy" },
  tech: { label: "科技感", query: "technology futuristic" },
  travel: { label: "旅行风光", query: "travel nature cinematic" },
  food: { label: "美食", query: "food cooking happy" },
  fashion: { label: "时尚", query: "fashion stylish upbeat" },
  cinematic: { label: "电影感", query: "cinematic epic orchestral" },
  upbeat: { label: "活力", query: "upbeat energetic pop" },
  calm: { label: "安静", query: "calm relaxing ambient" },
  corporate: { label: "商务", query: "corporate motivational" },
  chinese: { label: "中国风", query: "chinese traditional guzheng" },
};

const PIXABAY_AUDIO_API = "https://pixabay.com/api/";

/**
 * Build-in demo tracks that work without internet.
 * These are curated recommendations — users provide their own files.
 */
const BUILTIN_TRACKS: BGMTrack[] = [
  {
    id: "builtin-1",
    title: "夏日阳光（Vlog推荐）",
    artist: "Pixabay · Upbeat",
    duration: 120,
    previewUrl: "",
    downloadUrl: "",
    tags: ["vlog", "happy", "upbeat"],
    source: "builtin",
  },
  {
    id: "builtin-2",
    title: "科技未来（评测推荐）",
    artist: "Pixabay · Tech",
    duration: 120,
    previewUrl: "",
    downloadUrl: "",
    tags: ["tech", "futuristic", "electronic"],
    source: "builtin",
  },
  {
    id: "builtin-3",
    title: "温柔时光（生活推荐）",
    artist: "Pixabay · Calm",
    duration: 120,
    previewUrl: "",
    downloadUrl: "",
    tags: ["calm", "acoustic", "relaxing"],
    source: "builtin",
  },
  {
    id: "builtin-4",
    title: "大片开场（宣传推荐）",
    artist: "Pixabay · Cinematic",
    duration: 120,
    previewUrl: "",
    downloadUrl: "",
    tags: ["cinematic", "epic", "orchestral"],
    source: "builtin",
  },
  {
    id: "builtin-5",
    title: "中国风雅（古风推荐）",
    artist: "Pixabay · Chinese",
    duration: 120,
    previewUrl: "",
    downloadUrl: "",
    tags: ["chinese", "traditional", "guzheng"],
    source: "builtin",
  },
  {
    id: "builtin-6",
    title: "轻快节奏（美食推荐）",
    artist: "Pixabay · Food",
    duration: 120,
    previewUrl: "",
    downloadUrl: "",
    tags: ["food", "happy", "ukulele"],
    source: "builtin",
  },
];

/**
 * Search Pixabay for royalty-free music tracks.
 * Falls back to builtin recommendations on failure.
 */
export async function searchBGMTracks(
  category: BGMCategory,
  page: number = 1,
  perPage: number = 20
): Promise<BGMTrack[]> {
  const cat = BGM_CATEGORIES[category];
  if (!cat) return BUILTIN_TRACKS;

  try {
    // Pixabay API key — free tier, rate-limited
    // Users can set their own key in settings
    const apiKey = localStorage.getItem("kev-vibecut_pixabay_key") || "";
    if (!apiKey) return BUILTIN_TRACKS;

    const params = new URLSearchParams({
      key: apiKey,
      q: cat.query,
      per_page: String(perPage),
      page: String(page),
    });

    const response = await fetch(`${PIXABAY_AUDIO_API}?${params}`);
    if (!response.ok) return BUILTIN_TRACKS;

    const data = await response.json();
    if (!data.hits?.length) return BUILTIN_TRACKS;

    return data.hits.map((hit: any) => ({
      id: `pixabay-${hit.id}`,
      title: hit.title || hit.tags?.split(",")[0] || "音乐",
      artist: hit.user || "Pixabay",
      duration: hit.duration || 120,
      previewUrl: hit.previewURL || "",
      downloadUrl: hit.largeAudioURL || hit.audioURL || "",
      tags: hit.tags?.split(",").map((t: string) => t.trim()) || [],
      source: "pixabay" as const,
    }));
  } catch {
    return BUILTIN_TRACKS;
  }
}

/**
 * Get builtin tracks for offline use.
 */
export function getBuiltinTracks(): BGMTrack[] {
  return BUILTIN_TRACKS;
}

/**
 * Get all BGM categories for UI display.
 */
export function getBGMCategories(): { id: BGMCategory; label: string }[] {
  return Object.entries(BGM_CATEGORIES).map(([id, cat]) => ({
    id: id as BGMCategory,
    label: cat.label,
  }));
}
