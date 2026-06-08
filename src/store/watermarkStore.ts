/**
 * Watermark Store for Kev-VibeCut
 *
 * Manages watermark configuration for one-click brand watermarking.
 * Supports text and image watermarks.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WatermarkType = "text" | "image" | "none";
export type WatermarkPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";

export interface WatermarkConfig {
  enabled: boolean;
  type: WatermarkType;
  /** Text watermark content */
  text: string;
  /** Image watermark data URL */
  imageDataUrl: string;
  /** Position on canvas */
  position: WatermarkPosition;
  /** Opacity (0-1) */
  opacity: number;
  /** Scale relative to canvas size (0.01-0.2) */
  scale: number;
  /** Margin from edges in pixels */
  margin: number;
  /** Text color */
  color: string;
  /** Font size in px */
  fontSize: number;
}

const DEFAULT_WATERMARK: WatermarkConfig = {
  enabled: false,
  type: "text",
  text: "",
  imageDataUrl: "",
  position: "bottom-right",
  opacity: 0.5,
  scale: 0.08,
  margin: 20,
  color: "#ffffff",
  fontSize: 24,
};

interface WatermarkStore {
  config: WatermarkConfig;
  setEnabled: (enabled: boolean) => void;
  setType: (type: WatermarkType) => void;
  setText: (text: string) => void;
  setImageDataUrl: (url: string) => void;
  setPosition: (position: WatermarkPosition) => void;
  setOpacity: (opacity: number) => void;
  setScale: (scale: number) => void;
  setMargin: (margin: number) => void;
  setColor: (color: string) => void;
  setFontSize: (fontSize: number) => void;
  resetWatermark: () => void;
}

export const useWatermarkStore = create<WatermarkStore>()(
  persist(
    (set) => ({
      config: DEFAULT_WATERMARK,

      setEnabled: (enabled) =>
        set((s) => ({ config: { ...s.config, enabled } })),
      setType: (type) =>
        set((s) => ({ config: { ...s.config, type } })),
      setText: (text) =>
        set((s) => ({ config: { ...s.config, text } })),
      setImageDataUrl: (imageDataUrl) =>
        set((s) => ({ config: { ...s.config, imageDataUrl } })),
      setPosition: (position) =>
        set((s) => ({ config: { ...s.config, position } })),
      setOpacity: (opacity) =>
        set((s) => ({ config: { ...s.config, opacity } })),
      setScale: (scale) =>
        set((s) => ({ config: { ...s.config, scale } })),
      setMargin: (margin) =>
        set((s) => ({ config: { ...s.config, margin } })),
      setColor: (color) =>
        set((s) => ({ config: { ...s.config, color } })),
      setFontSize: (fontSize) =>
        set((s) => ({ config: { ...s.config, fontSize } })),
      resetWatermark: () =>
        set({ config: DEFAULT_WATERMARK }),
    }),
    { name: "kev-vibecut-watermark" }
  )
);

/** Canvas watermark rendering helper */
export function renderWatermarkOnCanvas(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  config: WatermarkConfig
): void {
  if (!config.enabled) return;
  if (config.type === "none") return;
  if (config.type === "text" && !config.text) return;
  if (config.type === "image" && !config.imageDataUrl) return;

  const { position, opacity, margin, scale, color, fontSize } = config;
  const watermarkSize = Math.min(canvasWidth, canvasHeight) * scale;

  ctx.save();
  ctx.globalAlpha = opacity;

  let x: number, y: number;

  switch (position) {
    case "bottom-right":
      x = canvasWidth - watermarkSize - margin;
      y = canvasHeight - watermarkSize * 0.3 - margin;
      break;
    case "bottom-left":
      x = margin;
      y = canvasHeight - watermarkSize * 0.3 - margin;
      break;
    case "top-right":
      x = canvasWidth - watermarkSize - margin;
      y = margin;
      break;
    case "top-left":
      x = margin;
      y = margin;
      break;
    case "center":
      x = (canvasWidth - watermarkSize) / 2;
      y = (canvasHeight - watermarkSize * 0.3) / 2;
      break;
  }

  if (config.type === "text") {
    ctx.font = `${fontSize}px "Noto Sans SC", "PingFang SC", sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = "bottom";
    ctx.fillText(config.text, x, y + watermarkSize * 0.3);
  } else if (config.type === "image") {
    // Image watermark will be rendered via drawImage in the export pipeline
    // The image element is created and rendered by the caller
  }

  ctx.restore();
}
