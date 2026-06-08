import { useEffect, useRef, useState, useCallback } from "react";
import { platform } from "@/core/platform";

interface UseFileDropOptions {
  onDrop: (files: File[]) => Promise<void>;
  enabled?: boolean;
}

/**
 * Hook to handle file drop events — Tauri native on desktop, browser fallback on web.
 */
export const useFileDrop = ({ onDrop, enabled = true }: UseFileDropOptions) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProcessingRef = useRef(false);

  // ── Browser native drag-drop (web fallback) ──────────────────────────────────
  useEffect(() => {
    if (!enabled) return;
    if (!platform.isWeb()) return;

    const el = containerRef.current;
    if (!el) return;

    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDraggingOver(true);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy";
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        setIsDraggingOver(false);
      }
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingOver(false);
      dragCounter = 0;

      if (isProcessingRef.current) return;
      if (!e.dataTransfer?.files || e.dataTransfer.files.length === 0) return;

      const files: File[] = Array.from(e.dataTransfer.files).filter(
        (f) => f.type.startsWith("video/") || f.type.startsWith("audio/") || f.type.startsWith("image/")
      );

      if (files.length === 0) return;

      isProcessingRef.current = true;
      try {
        await onDrop(files);
      } finally {
        isProcessingRef.current = false;
      }
    };

    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);

    return () => {
      el.removeEventListener("dragenter", handleDragEnter);
      el.removeEventListener("dragover", handleDragOver);
      el.removeEventListener("dragleave", handleDragLeave);
      el.removeEventListener("drop", handleDrop);
    };
  }, [enabled, onDrop]);

  // ── Tauri native drag-drop ──────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;
    if (!platform.isTauri()) return;

    let unlisten: (() => void) | undefined;
    let isMounted = true;

    const setupTauriDrop = async () => {
      try {
        const { listen } = await import("@tauri-apps/api/event");

        const unlistenHover = await listen<{ position: { x: number; y: number } }>(
          "tauri://drag-over",
          (event) => {
            if (!containerRef.current || !isMounted) return;
            const rect = containerRef.current.getBoundingClientRect();
            const { x, y } = event.payload.position;
            setIsDraggingOver(
              x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
            );
          }
        );

        const unlistenDrop = await listen<{ paths: string[]; position: { x: number; y: number } }>(
          "tauri://drag-drop",
          async (event) => {
            if (!isMounted || !containerRef.current || isProcessingRef.current) return;
            setIsDraggingOver(false);

            const rect = containerRef.current.getBoundingClientRect();
            const { x, y } = event.payload.position;
            if (!(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)) return;

            isProcessingRef.current = true;
            try {
              // Convert paths to File-like objects for Tauri
              const files = event.payload.paths.map((p) => {
                const name = p.split("/").pop() || p.split("\\").pop() || "unknown";
                return new File([], name, { type: "" }) as any; // placeholder for Tauri paths
              });
              // We keep paths in a custom property
              (files as any)._tauriPaths = event.payload.paths;
              await onDrop(files);
            } finally {
              isProcessingRef.current = false;
            }
          }
        );

        const unlistenCancel = await listen("tauri://drag-cancelled", () => {
          if (!isMounted) return;
          setIsDraggingOver(false);
        });

        if (isMounted) {
          unlisten = () => { unlistenHover(); unlistenDrop(); unlistenCancel(); };
        } else {
          unlistenHover(); unlistenDrop(); unlistenCancel();
        }
      } catch (error) {
        console.error("[useFileDrop] Tauri setup failed:", error);
      }
    };

    setupTauriDrop();

    return () => {
      isMounted = false;
      unlisten?.();
    };
  }, [enabled, onDrop]);

  return { containerRef, isDraggingOver };
};
