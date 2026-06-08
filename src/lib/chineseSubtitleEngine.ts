/**
 * Chinese Subtitle Engine for Kev-VibeCut
 *
 * Intelligent Chinese text segmentation for subtitles.
 * Unlike English (which breaks on spaces), Chinese requires
 * word-boundary awareness for natural-looking subtitles.
 *
 * Core algorithm:
 * 1. Intl.Segmenter("zh") breaks text into meaningful word segments
 * 2. Group words into chunks targeting ~15 chars per subtitle line
 * 3. Respect punctuation as natural break points
 * 4. Never break mid-word
 */

/** A subtitle segment ready for timeline placement */
export interface ChineseSubSegment {
  text: string;
  /** Character count (useful for duration estimation) */
  charCount: number;
}

/**
 * Break Chinese text into word segments using Intl.Segmenter.
 * Falls back to character-level splitting if Segmenter is unavailable.
 */
function segmentChineseWords(text: string): string[] {
  try {
    const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
    const segments: string[] = [];
    for (const { segment, isWordLike } of segmenter.segment(text)) {
      if (isWordLike) {
        segments.push(segment);
      } else {
        // Keep punctuation/spaces as their own segments
        segments.push(segment);
      }
    }
    return segments;
  } catch {
    // Fallback: character-level splitting for CJK
    const result: string[] = [];
    for (const char of text) {
      result.push(char);
    }
    return result;
  }
}

/**
 * Chinese punctuation characters that are natural break points.
 */
const CHINESE_PUNCTUATION = new Set([
  "。", "，", "！", "？", "；", "：", "、",
  ".", ",", "!", "?", ";", ":",
  "…", "～", "—", "～",
  "）", "】", "》", "」", "』", "〉", "〕",
]);

/**
 * Characters that should NOT be at the start of a subtitle line.
 */
const NO_LINE_START = new Set([
  "，", "。", "！", "？", "；", "：", "、",
  ".", ",", "!", "?", ";", ":",
  "）", "】", "》", "」", "』", "〉", "〕",
  "%", "℃", "％",
]);

/**
 * Characters that should NOT be at the end of a subtitle line.
 */
const NO_LINE_END = new Set([
  "（", "【", "《", "「", "『", "〈", "〔",
  "$", "￥", "＄",
]);

/**
 * Segment Chinese text into subtitle-friendly chunks.
 *
 * @param text - The full text to segment
 * @param maxCharsPerLine - Target max characters per subtitle line (default 16)
 * @returns Array of segmented strings
 */
export function segmentChineseSubtitles(text: string, maxCharsPerLine: number = 16): ChineseSubSegment[] {
  if (!text) return [];

  // Quick check: if text has no CJK characters, use simple space splitting
  const hasCJK = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
  if (!hasCJK) {
    // English/other: just return as-is or split on newlines
    return text.split(/\n+/).filter(Boolean).map((t) => ({
      text: t.trim(),
      charCount: t.length,
    }));
  }

  const words = segmentChineseWords(text);
  const result: ChineseSubSegment[] = [];
  let currentChunk = "";
  let currentLength = 0;

  const flushChunk = () => {
    if (currentChunk) {
      result.push({ text: currentChunk.trim(), charCount: currentLength });
      currentChunk = "";
      currentLength = 0;
    }
  };

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Newline → force break
    if (word === "\n") {
      flushChunk();
      continue;
    }

    const wordLen = word.length;

    // Punctuation → append and consider breaking
    if (CHINESE_PUNCTUATION.has(word)) {
      // Don't start a new line with punctuation
      if (currentChunk && !NO_LINE_END.has(currentChunk[currentChunk.length - 1])) {
        currentChunk += word;
        currentLength += wordLen;
      }
      // Break after strong punctuation
      if (/[。！？!?\n]/.test(word)) {
        flushChunk();
      }
      continue;
    }

    // Skip spaces at chunk start
    if (word.trim() === "" && currentChunk === "") continue;

    // No-start characters → append to previous chunk
    if (NO_LINE_START.has(word) && currentChunk) {
      currentChunk += word;
      currentLength += wordLen;
      continue;
    }

    // Overflow → break into new chunk
    if (currentLength + wordLen > maxCharsPerLine && currentChunk) {
      // Don't leave no-end characters hanging
      const lastChar = currentChunk[currentChunk.length - 1];
      if (NO_LINE_END.has(lastChar)) {
        currentChunk += word;
        currentLength += wordLen;
        continue;
      }
      flushChunk();
    }

    currentChunk += word;
    currentLength += wordLen;
  }

  flushChunk();

  return result;
}

/**
 * Estimate subtitle display duration based on character count.
 * Chinese: ~4-5 chars per second (slower than English due to character density)
 *
 * @param charCount - Number of characters in the subtitle
 * @returns Duration in seconds (minimum 1.0s)
 */
export function estimateSubtitleDuration(charCount: number): number {
  // Chinese reading speed: ~250-300 chars/min = ~4.5 chars/sec
  // Minimum 1.0s, maximum reasonable display time
  const duration = charCount / 4.5;
  return Math.max(1.0, Math.min(duration, 8.0));
}

/**
 * Split a full transcript into timed subtitle segments.
 * Useful for auto-captioning with timestamps.
 *
 * @param fullText - The complete transcribed text
 * @param totalDuration - Total duration of the audio/video in seconds
 * @param maxCharsPerLine - Max chars per subtitle
 * @returns Array of { text, startTime, endTime } segments
 */
export function segmentWithTiming(
  fullText: string,
  totalDuration: number,
  maxCharsPerLine: number = 16
): Array<{ text: string; startTime: number; endTime: number }> {
  const segments = segmentChineseSubtitles(fullText, maxCharsPerLine);
  if (segments.length === 0) return [];

  const totalChars = segments.reduce((sum, s) => sum + s.charCount, 0);
  const secPerChar = totalDuration / Math.max(1, totalChars);

  let currentTime = 0;
  return segments.map((seg) => {
    const duration = Math.max(1.0, seg.charCount * secPerChar);
    const startTime = currentTime;
    currentTime += duration;
    return {
      text: seg.text,
      startTime: parseFloat(startTime.toFixed(2)),
      endTime: parseFloat(currentTime.toFixed(2)),
    };
  });
}

/**
 * Detect if text is primarily Chinese.
 */
export function isChineseText(text: string): boolean {
  const cjkCount = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  return cjkCount > text.length * 0.3;
}
