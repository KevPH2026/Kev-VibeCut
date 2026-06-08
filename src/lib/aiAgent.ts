/**
 * AI Agent — Natural Language Editing Pipeline for Kev-VibeCut
 *
 * Pattern-based command parser for common video editing operations.
 * Designed for Chinese natural language input.
 *
 * Supported commands:
 * - "把这段剪到X秒" → trim clip
 * - "添加字幕/文字 XXX" → add text clip
 * - "应用模板 XX" → apply template
 * - "导出为 抖音/小红书/B站" → set platform preset
 * - "删除这段" → delete selected clip
 * - "添加水印 XXX" → set watermark
 */

import type { CannedTemplate } from "./templateMarketplace";
import { CANNED_TEMPLATES } from "./templateMarketplace";

// ─── Command Types ────────────────────────────────────────────────

export type AgentCommand =
  | { type: "trim"; target: string; duration: number }
  | { type: "add_text"; text: string; position?: string }
  | { type: "apply_template"; templateId: string }
  | { type: "add_subtitle"; text: string }
  | { type: "set_platform"; platform: "douyin" | "xhs" | "bilibili" }
  | { type: "add_watermark"; text: string }
  | { type: "delete_selected" }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "export" }
  | { type: "unknown"; original: string };

export interface ParseResult {
  success: boolean;
  commands: AgentCommand[];
  message: string; // User-facing response
}

// ─── Pattern Matching ─────────────────────────────────────────────

interface CommandPattern {
  regex: RegExp;
  extract: (match: RegExpMatchArray) => AgentCommand;
}

const PATTERNS: CommandPattern[] = [
  // Trim: "剪到X秒" / "缩短到X秒" / "截取前X秒"
  {
    regex: /(?:剪到|缩短到|截取前?|保留前?)\s*(\d+(?:\.\d+)?)\s*秒/,
    extract: (m) => ({ type: "trim", target: "selected", duration: parseFloat(m[1]) }),
  },
  // Add text: "添加文字XXX" / "加标题XXX" / "输入XXX"
  {
    regex: /(?:添加文字|加文字|加标题|输入|写上)\s*[：:]\s*(.+)/,
    extract: (m) => ({ type: "add_text", text: m[1].trim() }),
  },
  // Add subtitle: "添加字幕XXX" / "字幕XXX"
  {
    regex: /(?:添加字幕|字幕|生成字幕)\s*[：:]\s*(.+)/,
    extract: (m) => ({ type: "add_subtitle", text: m[1].trim() }),
  },
  // Apply template: "用XX模板" / "应用XX" / "模板XX"
  {
    regex: /(?:用|应用|使用|模板)\s*(.+?)(?:模板|$)/,
    extract: (m) => {
      const name = m[1].trim();
      const template = CANNED_TEMPLATES.find((t) => t.name.includes(name) || t.id.includes(name));
      return { type: "apply_template", templateId: template?.id || name };
    },
  },
  // Set platform: "导出为XX" / "设置XX比例" / "切到XX"
  {
    regex: /(?:导出为|设置|切换到|改成)\s*(抖音|小红书|B站|bilibili|横屏|竖屏)/,
    extract: (m) => {
      const map: Record<string, "douyin" | "xhs" | "bilibili"> = {
        抖音: "douyin", 小红书: "xhs", B站: "bilibili", bilibili: "bilibili",
        横屏: "bilibili", 竖屏: "douyin",
      };
      return { type: "set_platform", platform: map[m[1]] || "douyin" };
    },
  },
  // Watermark: "添加水印XXX" / "水印XXX"
  {
    regex: /(?:添加水印|水印|加水印)\s*[：:]\s*(.+)/,
    extract: (m) => ({ type: "add_watermark", text: m[1].trim() }),
  },
  // Delete: "删除" / "删掉这段"
  {
    regex: /^(?:删除|删掉)(?:这段|选中)?$/,
    extract: () => ({ type: "delete_selected" }),
  },
  // Undo: "撤销" / "回退"
  {
    regex: /^(?:撤销|回退|后退)$/,
    extract: () => ({ type: "undo" }),
  },
  // Redo: "重做" / "前进"
  {
    regex: /^(?:重做|前进|恢复)$/,
    extract: () => ({ type: "redo" }),
  },
  // Export: "导出" / "渲染"
  {
    regex: /^(?:导出|渲染|输出)$/,
    extract: () => ({ type: "export" }),
  },
];

// ─── Fuzzy Template Search ────────────────────────────────────────

function fuzzySearchTemplates(query: string): CannedTemplate[] {
  const q = query.toLowerCase();
  return CANNED_TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.defaultText.toLowerCase().includes(q)
  ).slice(0, 5);
}

// ─── Main Parser ──────────────────────────────────────────────────

export function parseCommand(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, commands: [], message: "请输入指令，例如：添加文字：大家好" };
  }

  // Try pattern matching
  for (const pattern of PATTERNS) {
    const match = trimmed.match(pattern.regex);
    if (match) {
      const command = pattern.extract(match);
      return {
        success: true,
        commands: [command],
        message: generateResponse(command),
      };
    }
  }

  // Fuzzy template search
  const templates = fuzzySearchTemplates(trimmed);
  if (templates.length > 0) {
    const top = templates[0];
    return {
      success: true,
      commands: [{ type: "apply_template", templateId: top.id }],
      message: `已匹配模板「${top.name}」${templates.length > 1 ? `（共找到${templates.length}个相关模板）` : ""}`,
    };
  }

  // Default: treat as text to add
  if (trimmed.length <= 50) {
    return {
      success: true,
      commands: [{ type: "add_text", text: trimmed }],
      message: `将添加文字「${trimmed}」`,
    };
  }

  // Long text → subtitle
  return {
    success: true,
    commands: [{ type: "add_subtitle", text: trimmed }],
    message: "将生成长文字幕",
  };
}

function generateResponse(command: AgentCommand): string {
  switch (command.type) {
    case "trim":
      return `将选中片段裁剪到 ${command.duration} 秒`;
    case "add_text":
      return `已添加文字「${command.text}」`;
    case "add_subtitle":
      return `已添加字幕「${command.text}」`;
    case "apply_template":
      const t = CANNED_TEMPLATES.find((t) => t.id === command.templateId);
      return t ? `已应用模板「${t.name}」` : `已匹配模板「${command.templateId}」`;
    case "set_platform":
      const labels = { douyin: "抖音 (9:16)", xhs: "小红书 (3:4)", bilibili: "B站 (16:9)" };
      return `画布已切换为 ${labels[command.platform]}`;
    case "add_watermark":
      return `水印已设置为「${command.text}」`;
    case "delete_selected":
      return "已删除选中片段";
    case "undo":
      return "已撤销";
    case "redo":
      return "已重做";
    case "export":
      return "正在打开导出面板…";
    default:
      return "指令已接收";
  }
}

/** Quick help / example commands for first-time users */
export const AGENT_EXAMPLES = [
  "添加文字：大家好我是K",
  "剪到15秒",
  "模板 炸裂标题",
  "添加水印：@KevPH",
  "导出为抖音",
  "撤销",
];
