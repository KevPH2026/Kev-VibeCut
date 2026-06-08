/**
 * Chinese Platform Template Marketplace for Kev-VibeCut
 *
 * Pre-built text animation templates optimized for:
 * - 抖音 (Douyin) — bold, flashy, attention-grabbing
 * - 小红书 (Xiaohongshu) — clean, aesthetic, lifestyle
 * - B站 (Bilibili) — tech, creative, professional
 */

export type TemplatePlatform = "douyin" | "xhs" | "bilibili" | "general";

export interface CannedTemplate {
  id: string;
  name: string;
  description: string;
  platform: TemplatePlatform;
  category: string;
  /** CSS class / style preset ID */
  styleId: string;
  /** Default text */
  defaultText: string;
  /** Font settings */
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  /** Animation */
  animation: string;
  /** Background/Panel */
  panel?: { color: string; padding: number; borderRadius: number };
  /** Stroke */
  stroke?: { color: string; width: number };
  /** Shadow */
  shadow?: { color: string; blur: number; offsetX: number; offsetY: number };
  /** Position on canvas */
  position: "center" | "top" | "bottom" | "bottom-left" | "bottom-right";
}

export const PLATFORM_LABELS: Record<TemplatePlatform, string> = {
  douyin: "抖音",
  xhs: "小红书",
  bilibili: "B站",
  general: "通用",
};

export const TEMPLATE_CATEGORIES = [
  { id: "all", label: "全部" },
  { id: "title", label: "标题" },
  { id: "subtitle", label: "副标题" },
  { id: "cta", label: "引导关注" },
  { id: "hashtag", label: "话题标签" },
  { id: "ending", label: "片尾" },
  { id: "product", label: "产品介绍" },
  { id: "price", label: "价格标签" },
];

export const CANNED_TEMPLATES: CannedTemplate[] = [
  // ── 抖音模板 ──
  {
    id: "dy-title-1",
    name: "炸裂标题",
    description: "抖音爆款标题，粗体红字+黑底",
    platform: "douyin",
    category: "title",
    styleId: "dy-boom-title",
    defaultText: "点击关注不迷路",
    fontFamily: "noto-sans-sc",
    fontSize: 64,
    fontWeight: "bold",
    color: "#FF2D55",
    animation: "scale-in",
    stroke: { color: "#000000", width: 4 },
    shadow: { color: "rgba(0,0,0,0.6)", blur: 12, offsetX: 2, offsetY: 2 },
    position: "center",
  },
  {
    id: "dy-subtitle-1",
    name: "黄色描边字幕",
    description: "抖音常见黄色描边，醒目",
    platform: "douyin",
    category: "subtitle",
    styleId: "dy-yellow-sub",
    defaultText: "这个方法真的太绝了",
    fontFamily: "noto-sans-sc",
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    animation: "fade-up",
    stroke: { color: "#FFCC00", width: 3 },
    shadow: { color: "rgba(0,0,0,0.5)", blur: 4, offsetX: 1, offsetY: 2 },
    position: "bottom",
  },
  {
    id: "dy-cta-1",
    name: "点赞关注引导",
    description: "底部浮动引导关注",
    platform: "douyin",
    category: "cta",
    styleId: "dy-cta-bottom",
    defaultText: "👍 点赞 · 关注 · 转发",
    fontFamily: "noto-sans-sc",
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    animation: "pulse",
    panel: { color: "rgba(255,45,85,0.85)", padding: 16, borderRadius: 24 },
    shadow: { color: "rgba(0,0,0,0.3)", blur: 8, offsetX: 0, offsetY: 4 },
    position: "bottom",
  },
  {
    id: "dy-ending-1",
    name: "片尾关注卡片",
    description: "视频结尾关注引导动画",
    platform: "douyin",
    category: "ending",
    styleId: "dy-ending-card",
    defaultText: "关注我，每天学一招",
    fontFamily: "noto-sans-sc",
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    animation: "scale-up-fade",
    panel: { color: "rgba(0,0,0,0.7)", padding: 24, borderRadius: 16 },
    stroke: { color: "#FF2D55", width: 2 },
    position: "center",
  },
  {
    id: "dy-price-1",
    name: "闪购价格标签",
    description: "直播间秒杀价格",
    platform: "douyin",
    category: "price",
    styleId: "dy-flash-price",
    defaultText: "¥99 限时抢",
    fontFamily: "noto-sans-sc",
    fontSize: 56,
    fontWeight: "bold",
    color: "#FF2D55",
    animation: "bounce-in",
    stroke: { color: "#FFFFFF", width: 2 },
    shadow: { color: "#FF2D55", blur: 16, offsetX: 0, offsetY: 0 },
    position: "bottom-right",
  },

  // ── 小红书模板 ──
  {
    id: "xhs-title-1",
    name: "小红书封面标题",
    description: "干净白色大字+半透明黑底",
    platform: "xhs",
    category: "title",
    styleId: "xhs-cover-title",
    defaultText: "必收藏的宝藏好物",
    fontFamily: "noto-sans-sc",
    fontSize: 56,
    fontWeight: "500",
    color: "#FFFFFF",
    animation: "fade-up",
    panel: { color: "rgba(0,0,0,0.5)", padding: 24, borderRadius: 12 },
    position: "center",
  },
  {
    id: "xhs-subtitle-1",
    name: "小清新字幕",
    description: "小红书风格简约字幕",
    platform: "xhs",
    category: "subtitle",
    styleId: "xhs-clean-sub",
    defaultText: "分享生活中的小美好",
    fontFamily: "noto-sans-sc",
    fontSize: 36,
    fontWeight: "400",
    color: "#333333",
    animation: "fade-in",
    position: "bottom",
    panel: { color: "rgba(255,255,255,0.85)", padding: 12, borderRadius: 8 },
  },
  {
    id: "xhs-product-1",
    name: "好物推荐卡",
    description: "小红书风格产品标签",
    platform: "xhs",
    category: "product",
    styleId: "xhs-product-tag",
    defaultText: "🏷️ 自用推荐",
    fontFamily: "noto-sans-sc",
    fontSize: 32,
    fontWeight: "500",
    color: "#FF2442",
    animation: "slide-left",
    panel: { color: "rgba(255,255,255,0.9)", padding: 12, borderRadius: 20 },
    position: "bottom-left",
  },
  {
    id: "xhs-hashtag-1",
    name: "话题标签",
    description: "小红书风格话题标签",
    platform: "xhs",
    category: "hashtag",
    styleId: "xhs-hashtag",
    defaultText: "#好物分享 #日常 #种草",
    fontFamily: "noto-sans-sc",
    fontSize: 28,
    fontWeight: "400",
    color: "#999999",
    animation: "fade-in",
    position: "bottom",
  },

  // ── B站模板 ──
  {
    id: "bili-title-1",
    name: "B站科技标题",
    description: "科技感深色标题",
    platform: "bilibili",
    category: "title",
    styleId: "bili-tech-title",
    defaultText: "从零搭建你的第一个AI应用",
    fontFamily: "noto-sans-sc",
    fontSize: 52,
    fontWeight: "bold",
    color: "#00D4FF",
    animation: "glitch-in",
    panel: { color: "rgba(10,10,20,0.85)", padding: 24, borderRadius: 4 },
    stroke: { color: "#00D4FF", width: 1 },
    shadow: { color: "#00D4FF", blur: 20, offsetX: 0, offsetY: 0 },
    position: "center",
  },
  {
    id: "bili-subtitle-1",
    name: "B站进度条字幕",
    description: "极简白色字幕+进度条背景",
    platform: "bilibili",
    category: "subtitle",
    styleId: "bili-progress-sub",
    defaultText: "接下来我们看第三步",
    fontFamily: "noto-sans-sc",
    fontSize: 32,
    fontWeight: "500",
    color: "#E0E0E0",
    animation: "fade-up",
    position: "bottom",
  },
  {
    id: "bili-ending-1",
    name: "B站三连引导",
    description: "一键三连片尾动画",
    platform: "bilibili",
    category: "ending",
    styleId: "bili-sanlian",
    defaultText: "⚡ 点赞 投币 收藏 ⚡",
    fontFamily: "noto-sans-sc",
    fontSize: 48,
    fontWeight: "bold",
    color: "#FB7299",
    animation: "bounce-in",
    stroke: { color: "#FFFFFF", width: 2 },
    shadow: { color: "rgba(251,114,153,0.5)", blur: 16, offsetX: 0, offsetY: 4 },
    position: "center",
  },

  // ── 通用模板 ──
  {
    id: "gen-title-1",
    name: "极简黑体标题",
    description: "适用于任何场景的干净标题",
    platform: "general",
    category: "title",
    styleId: "gen-clean-title",
    defaultText: "你的标题",
    fontFamily: "noto-sans-sc",
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFFFFF",
    animation: "fade-in",
    panel: { color: "rgba(0,0,0,0.6)", padding: 20, borderRadius: 8 },
    position: "center",
  },
  {
    id: "gen-subtitle-1",
    name: "底部通用字幕",
    description: "标准白底黑边字幕",
    platform: "general",
    category: "subtitle",
    styleId: "gen-standard-sub",
    defaultText: "字幕文字",
    fontFamily: "noto-sans-sc",
    fontSize: 34,
    fontWeight: "500",
    color: "#FFFFFF",
    animation: "fade-up",
    stroke: { color: "#000000", width: 2 },
    position: "bottom",
  },
];

/**
 * Get templates filtered by platform and category.
 */
export function getTemplates(options: { platform?: TemplatePlatform; category?: string; search?: string } = {}): CannedTemplate[] {
  let result = CANNED_TEMPLATES;

  if (options.platform && options.platform !== "general") {
    result = result.filter((t) => t.platform === options.platform || t.platform === "general");
  }

  if (options.category && options.category !== "all") {
    result = result.filter((t) => t.category === options.category);
  }

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter((t) => t.name.includes(q) || t.description.includes(q) || t.defaultText.includes(q));
  }

  return result;
}
