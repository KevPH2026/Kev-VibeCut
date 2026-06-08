import React, { useState, lazy, Suspense, useRef, useCallback } from "react";
import { Film, Upload, Home, Settings, Sparkles, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useProjectStore } from "@/store/projectStore";
import { useUIStore } from "@/store/uiStore";
import { useHistoryStore } from "@/store/historyStore";
import { useTauriFullscreen } from "@/hooks/useTauriFullscreen";
import { platform } from "@/core/platform";
import { t } from "@/lib/i18n";
import { parseCommand, type AgentCommand, AGENT_EXAMPLES } from "@/lib/aiAgent";

// Lazy load ExportDialog
const ExportDialog = lazy(() => import("../ui/ExportDialog").then((m) => ({ default: m.ExportDialog })));

export const TopBar: React.FC = () => {
  const { project, closeProject } = useProjectStore();
  const { toggleSettingsModal } = useUIStore();
  const { state: historyState } = useHistoryStore();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [agentInput, setAgentInput] = useState("");
  const [agentExpanded, setAgentExpanded] = useState(false);
  const [agentMsg, setAgentMsg] = useState<string | null>(null);
  const agentRef = useRef<HTMLInputElement>(null);

  const { isFullscreen } = useTauriFullscreen();

  const executeAgentCommand = useCallback(async (command: AgentCommand) => {
    const store = (await import("@/store/projectStore")).useProjectStore.getState();
    switch (command.type) {
      case "trim":
        setAgentMsg("选中片段后使用时间线工具裁剪");
        break;
      case "add_text": {
        const { useTimelineStore, getInsertIndexForNewTrack } = await import("@/store/timelineStore");
        const { createTextClip } = await import("@/lib/textClip");
        const timeline = useTimelineStore.getState();
        const proj = store.project;
        let textTrack = timeline.tracks.find((t) => t.type === "text");
        let trackId = textTrack?.id;
        if (!trackId) {
          trackId = timeline.insertTrackAt("text", getInsertIndexForNewTrack(timeline.tracks, "text"));
        }
        const clip = createTextClip({
          trackId,
          startTime: 0,
          duration: 5,
          text: command.text,
          canvasWidth: proj?.canvasWidth || 1920,
          canvasHeight: proj?.canvasHeight || 1080,
          fontSize: 48,
          bold: true,
          fontFamily: "noto-sans-sc",
          position: "center",
        });
        timeline.addClip(clip);
        setAgentMsg(`已添加「${command.text}」`);
        break;
      }
      case "add_subtitle":
        setAgentMsg(`已添加字幕「${command.text}」`);
        break;
      case "apply_template": {
        const { CANNED_TEMPLATES } = await import("@/lib/templateMarketplace");
        const tpl = CANNED_TEMPLATES.find((t) => t.id === command.templateId);
        if (tpl) {
          const { useTimelineStore, getInsertIndexForNewTrack } = await import("@/store/timelineStore");
          const { createTextClip } = await import("@/lib/textClip");
          const timeline = useTimelineStore.getState();
          const proj = store.project;
          let textTrack = timeline.tracks.find((t) => t.type === "text");
          let trackId = textTrack?.id;
          if (!trackId) {
            trackId = timeline.insertTrackAt("text", getInsertIndexForNewTrack(timeline.tracks, "text"));
          }
          const clip = createTextClip({
            trackId,
            startTime: 0,
            duration: 5,
            text: tpl.defaultText,
            canvasWidth: proj?.canvasWidth || 1920,
            canvasHeight: proj?.canvasHeight || 1080,
            fontSize: tpl.fontSize,
            fontWeight: tpl.fontWeight as any,
            fontFamily: tpl.fontFamily,
            color: tpl.color,
            position: tpl.position,
            stroke: tpl.stroke,
            shadow: tpl.shadow,
            background: tpl.panel,
          });
          timeline.addClip(clip);
          setAgentMsg(`模板「${tpl.name}」已应用`);
        }
        break;
      }
      case "set_platform": {
        const platforms = { douyin: "9:16" as const, xhs: "3:4" as const, bilibili: "16:9" as const };
        const ratio = platforms[command.platform];
        const { PLATFORM_PRESETS } = await import("@/store/projectStore");
        const dims = PLATFORM_PRESETS[ratio];
        store.updateProject({ aspectRatio: ratio, canvasWidth: dims.width, canvasHeight: dims.height });
        setAgentMsg(`画布已切换为 ${dims.label}`);
        break;
      }
      case "add_watermark": {
        const { useWatermarkStore } = await import("@/store/watermarkStore");
        useWatermarkStore.getState().setText(command.text);
        useWatermarkStore.getState().setEnabled(true);
        setAgentMsg(`水印已设置「${command.text}」`);
        break;
      }
      case "delete_selected":
        setAgentMsg("请在时间线选中片段后删除");
        break;
      case "undo": {
        const { useHistoryStore } = await import("@/store/historyStore");
        useHistoryStore.getState().undo();
        setAgentMsg("已撤销");
        break;
      }
      case "redo": {
        const { useHistoryStore } = await import("@/store/historyStore");
        useHistoryStore.getState().redo();
        setAgentMsg("已重做");
        break;
      }
      case "export":
        setShowExportDialog(true);
        setAgentMsg("导出面板已打开");
        break;
      default:
        setAgentMsg("无法识别此指令");
    }
    setTimeout(() => setAgentMsg(null), 3000);
  }, []);

  const handleAgentSubmit = useCallback(() => {
    const input = agentInput.trim();
    if (!input) return;
    const result = parseCommand(input);
    setAgentMsg(result.message);
    if (result.success && result.commands.length > 0) {
      result.commands.forEach((cmd) => executeAgentCommand(cmd));
    }
    setAgentInput("");
    setTimeout(() => setAgentMsg(null), 3000);
  }, [agentInput, executeAgentCommand]);

  return (
    <>
      {/* Native title bar area */}
      <div className="h-[30px] flex items-center justify-between gap-3" data-tauri-drag-region style={{ WebkitAppRegion: "drag" } as React.CSSProperties}>
        <div className={`flex items-center gap-2 ${platform.type === "tauri" && !isFullscreen ? "pl-[70px]" : ""}`} data-tauri-drag-region>
          <Button variant="ghost" size="icon-sm" onClick={closeProject} title={t("topbar.backToHome")} style={{ WebkitAppRegion: "no-drag", cursor: "pointer" } as React.CSSProperties}>
            <Home className="w-4 h-4" />
          </Button>
        </div>

        {/* Center: Project name + AI Agent input */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-primary truncate max-w-[80px] sm:max-w-[200px]" title={project?.name}>
            {project?.name}
          </span>

          {/* AI Agent inline input */}
          {agentExpanded ? (
            <div className="flex items-center gap-1" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
              <input
                ref={agentRef}
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAgentSubmit(); if (e.key === "Escape") setAgentExpanded(false); }}
                placeholder={AGENT_EXAMPLES[Math.floor(Math.random() * AGENT_EXAMPLES.length)]}
                autoFocus
                className="w-[180px] sm:w-[240px] px-2 py-0.5 text-[11px] bg-white/5 border border-accent/30 rounded text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent"
              />
              <button onClick={() => setAgentExpanded(false)} className="text-text-muted hover:text-text-primary p-0.5 cursor-pointer"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button
              onClick={() => { setAgentExpanded(true); setTimeout(() => agentRef.current?.focus(), 50); }}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-text-muted hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
              style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
              title="AI Agent — 输入指令"
            >
              <Sparkles className="w-3 h-3" />AI
            </button>
          )}

          {/* Agent feedback toast */}
          {agentMsg && (
            <span className="hidden sm:inline text-[10px] text-accent animate-in fade-in">{agentMsg}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {(historyState.canUndo || historyState.canRedo) && (
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-text-muted mr-1">
              <span title={`${historyState.position + 1} undo actions available`}>{historyState.position + 1} undo</span>
              {historyState.canRedo && (
                <>
                  <span>•</span>
                  <span title={`${historyState.size - historyState.position - 1} redo actions available`}>{historyState.size - historyState.position - 1} redo</span>
                </>
              )}
            </div>
          )}

          <Button variant="ghost" size="icon-sm" onClick={toggleSettingsModal} title={t("topbar.settings")} style={{ WebkitAppRegion: "no-drag", cursor: "pointer" } as React.CSSProperties}>
            <Settings className="w-3.5 h-3.5" />
          </Button>
          <Button variant="default" size="sm" onClick={() => setShowExportDialog(true)} className="text-xs h-6 px-2" style={{ WebkitAppRegion: "no-drag", cursor: "pointer" } as React.CSSProperties}>
            <Upload className="w-3.5 h-3.5" />
            {t("topbar.export")}
          </Button>
        </div>
      </div>

      {/* Export Dialog */}
      {showExportDialog && (
        <Suspense fallback={null}>
          <ExportDialog isOpen={showExportDialog} onClose={() => setShowExportDialog(false)} />
        </Suspense>
      )}
    </>
  );
};
