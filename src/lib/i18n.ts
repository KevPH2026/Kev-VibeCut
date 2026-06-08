// Kev-VibeCut i18n — Chinese-first, English fallback
export type Lang = "zh" | "en";

const zh: Record<string, string> = {
  // ── LaunchScreen ──
  "app.name": "Kev-VibeCut",
  "app.tagline": "Agent 驱动 · 开源视频编辑器",
  "launch.newProject": "新建项目",
  "launch.startNew": "开始新项目",
  "launch.recentProjects": "最近项目",
  "launch.noRecent": "暂无最近项目",
  "launch.createAmazing": "开始创作",
  "launch.beginWith": "从16:9横屏画布开始，为YouTube和宽屏内容优化，或打开下方的最近项目。",
  "launch.startHint": "创建新项目开始使用",
  "launch.moreOptions": "更多选项",
  "launch.rename": "重命名",
  "launch.delete": "删除",
  "launch.renameProject": "重命名项目",
  "launch.deleteProject": "删除项目",
  "launch.projectName": "项目名称",
  "launch.deleteConfirm": "确定要删除 {name} 吗？",
  "launch.deleteUndone": "此操作不可撤销。所有项目数据将被永久删除。",
  "launch.renaming": "重命名中...",
  "launch.deleting": "删除中...",
  "launch.cancel": "取消",
  "launch.today": "今天",
  "launch.yesterday": "昨天",
  "launch.daysAgo": "{n} 天前",

  // ── TopBar ──
  "topbar.backToHome": "回到首页",
  "topbar.untitled": "未命名项目",
  "topbar.settings": "设置",
  "topbar.export": "导出",

  // ── Sidebar / Tabs ──
  "tab.media": "素材",
  "tab.audio": "音频",
  "tab.text": "文字",
  "tab.stickers": "贴纸",
  "tab.effects": "特效",
  "tab.transitions": "转场",
  "tab.captions": "字幕",

  // ── Media Tab ──
  "media.importMedia": "导入素材",
  "media.importing": "导入中...",
  "media.noMedia": "暂无素材",
  "media.getStarted": "导入视频、音频或图片开始编辑",
  "media.importSuccess": "成功导入 {count} 个文件",
  "media.importFailed": "导入失败",
  "media.addToTimeline": "添加到时间线",
  "media.removeFromTimeline": "从时间线移除",
  "media.addToTrack": "添加到轨道",
  "media.importFailedFile": "导入 {name} 失败",

  // ── Timeline ──
  "timeline.empty": "时间线为空",
  "timeline.importHint": "导入素材或拖拽到时间线",
  "timeline.noClips": "暂无片段",
  "timeline.noClipsUnderPlayhead": "播放头下无片段可分割",
  "timeline.splitCount": "已分割 {count} 个片段",
  "timeline.deleteLeftCount": "已对 {count} 个片段应用左侧删除",
  "timeline.noClipsDeleteLeft": "播放头左侧无片段可删除",
  "timeline.deleteRightCount": "已对 {count} 个片段应用右侧删除",
  "timeline.noClipsDeleteRight": "播放头右侧无片段可删除",
  "timeline.clip": "个片段",

  "preview.playbackQuality": "播放质量",
  "preview.fullQuality": "完整质量",
  "preview.fullQualityDesc": "原始视频分辨率",
  "preview.highQuality": "高质量",
  "preview.highQualityDesc": "流畅播放，不影响导出视频",
  "preview.mediumQuality": "中等质量",
  "preview.mediumQualityDesc": "更流畅播放，不影响导出视频",
  "preview.lowQuality": "低质量",
  "preview.lowQualityDesc": "最流畅播放，不影响导出视频",

  // ── Properties ──
  "properties.title": "属性",
  "properties.selectClip": "选择一个片段进行编辑",
  "properties.position": "位置",
  "properties.scale": "缩放",
  "properties.rotation": "旋转",
  "properties.opacity": "透明度",
  "properties.textStyle": "文字样式",
  "properties.videoTransform": "视频（变换）",
  "properties.clipProperties": "片段属性",
  "properties.transform": "变换",
  "properties.fitMode": "适配模式",
  "properties.resetFit": "重置适配",
  "properties.xPosition": "X 位置",
  "properties.yPosition": "Y 位置",
  "properties.width": "宽度",
  "properties.height": "高度",
  "properties.timingOptions": "时间选项",
  "properties.trimIn": "裁剪入点（秒）",
  "properties.trimOut": "裁剪出点（秒）",

  // ── Export ──
  "export.title": "导出视频",
  "export.duration": "时长",
  "export.canvas": "画布",
  "export.frameRate": "帧率",
  "export.resolution": "分辨率",
  "export.codec": "编码",
  "export.quality": "质量",
  "export.estSize": "预估大小",
  "export.exporting": "导出中...",
  "export.export": "导出",
  "export.failed": "导出失败",
  "export.preset": "导出预设",
  "export.checkingFFmpeg": "检查 FFmpeg...",
  "export.ffmpegReady": "FFmpeg 就绪",
  "export.ffmpegMissing": "缺少 FFmpeg",
  "export.ffmpegInstallHint": "安装 FFmpeg 并添加到 PATH",
  "export.project": "项目",
  "export.name": "名称",
  "export.exportSettings": "导出设置",
  "export.pixelFormat": "像素格式",
  "export.output": "输出",
  "export.noOutputSelected": "未选择输出文件...",
  "export.browse": "浏览",
  "export.noContent": "暂无导出内容",
  "export.addClipsHint": "请在导出前将片段添加到时间线。",
  "export.ffmpegRequired": "需要 FFmpeg",
  "export.ffmpegRequiredHint": "视频导出需要安装 FFmpeg 并在系统 PATH 中可用。",
  "export.exportingVideo": "正在导出视频...",
  "export.progress": "进度",
  "export.speed": "速度",
  "export.timeRemaining": "剩余时间",
  "export.complete": "导出完成！",
  "export.completeMessage": "您的视频已成功生成并保存到设备。",
  "export.totalRenderTime": "总渲染时间",
  "export.renderedFrames": "已渲染帧数",
  "export.avgSpeed": "平均速度",
  "export.savedPath": "保存路径",
  "export.revealInFinder": "在访达中显示",
  "export.exportAnother": "再次导出",
  "export.failedMessage": "渲染和编码过程中发生错误。",
  "export.tryAgain": "重试",
  "export.saveName": "保存名称",
  "export.clickToRename": "点击重命名项目",

  // ── Settings ──
  "settings.title": "设置",
  "settings.appearance": "外观",
  "settings.editor": "编辑器",
  "settings.cache": "存储与缓存",
  "settings.about": "关于",
  "settings.theme": "主题",
  "settings.language": "语言",
  "settings.autoSave": "自动保存",
  "settings.autoSaveDesc": "定时自动保存项目",
  "settings.snapToGrid": "吸附网格",
  "settings.snapToGridDesc": "拖拽片段时吸附到刻度线",
  "settings.autoRipple": "自动波纹",
  "settings.autoRippleDesc": "删除片段时自动闭合间隙",
  "settings.aspectRatio": "画面比例",
  "settings.aspectRatioDesc": "导出画布尺寸",
  "settings.frameRate": "帧率",
  "settings.frameRateDesc": "项目每秒帧数",
  "settings.defaultFrameRate": "默认帧率",
  "settings.defaultFrameRateDesc": "新建项目默认帧率",
  "settings.customThemeEditor": "自定义主题编辑器",
  "settings.base": "基础：",
  "settings.import": "导入",
  "settings.exportTheme": "导出",
  "settings.copy": "复制",
  "settings.reset": "重置",
  "settings.searchColors": "搜索颜色...",
  "settings.applyCustomTheme": "应用自定义主题",
  "settings.hideEditor": "隐藏编辑器",
  "settings.customTheme": "自定义主题",
  "settings.font": "字体",
  "settings.timeline": "时间线",
  "settings.sequenceSettings": "序列设置",
  "settings.defaults": "默认值",
  "settings.aboutDesc": "使用 Tauri、React 和 FFmpeg 构建的现代原生视频编辑器。为速度和创作自由而设计。",
  "settings.importThemeHint": "从 JSON 文件导入主题",
  "settings.exportThemeHint": "导出主题到 JSON 文件",
  "settings.copyAllColors": "从选中的基础主题复制所有颜色",
  "settings.resetToDefault": "重置为默认暗色主题",

  // ── General ──
  "general.save": "保存",
  "general.cancel": "取消",
  "general.delete": "删除",
  "general.rename": "重命名",
  "general.confirm": "确认",
  "general.close": "关闭",
  "general.back": "返回",
  "general.search": "搜索",
  "general.loading": "加载中...",
  "general.error": "出错了",
  "general.success": "成功",
  "general.warning": "警告",
  "general.done": "完成",
  "general.play": "播放",
  "general.pause": "暂停",
  "general.stop": "停止",

  // ── Audio ──
  "audio.noAudio": "暂无音频",
  "audio.importAudio": "导入音频",
  "audio.search": "搜索公开音频...",
  "audio.loading": "正在加载音频库",
  "audio.noApproved": "暂无审核通过的音频",
  "audio.noApprovedHint": "从 Clypra Studio 发布的音频将在 API 缓存刷新后显示。",
  "audio.addToTimeline": "添加到时间线",
  "audio.downloadAdd": "下载并添加",

  // ── Text ──
  "text.addText": "添加文字",
  "text.editText": "编辑文字",
  "text.fontSize": "字号",
  "text.fontFamily": "字体",
  "text.textEffects": "文字特效",
  "text.templates": "模板",
  "text.favorites": "收藏 ({n})",
  "text.captions": "字幕",
  "text.updating": "正在更新特效和模板库...",
  "text.favoriteTemplates": "收藏模板 ({n})",
  "text.noFavorites": "暂无收藏模板。",
  "text.noMatchingTemplates": "未找到匹配的模板",
  "text.tryOtherCategories": "尝试搜索其他类别",
  "text.autoCaptionGen": "自动字幕生成器",
  "text.autoCaptionDesc": "使用本地语音识别模型从项目时间线的音轨自动生成高精度字幕。",
  "text.language": "语言",
  "text.filterGaps": "过滤空白和静音",
  "text.skipSilent": "自动跳过静音音频块",
  "text.noClipsForCaption": "时间线上未找到音频或视频片段。请先将媒体拖到时间线上进行转录。",
  "text.startCaptioning": "开始生成字幕",
  "text.analyzingAudio": "正在分析音频时间线...",
  "text.transcribing": "正在转录音频（Whisper 离线）...",
  "text.aligning": "正在对齐时间戳...",
  "text.stitching": "正在拼接字幕轨道...",
  "text.keepOpen": "请保持 Clypra 开启。此过程在本地运行。",
  "text.captionsGenerated": "字幕生成成功！",
  "text.captionsCreated": "已创建 {n} 个带样式的字幕片段，与活动时间线完美对齐。",
  "text.captionAgain": "再次生成字幕",

  // ── Stickers ──
  "stickers.search": "搜索贴纸...",

  // ── Captions ──
  "captions.importSubtitles": "导入字幕",
  "captions.exportSRT": "导出 SRT",
  "captions.addManual": "添加手动字幕",
  "captions.timingEditor": "字幕时间编辑器 ({n})",
  "captions.noCaptions": "时间线上暂无字幕。点击\"添加手动\"或\"导入\"开始。",
  "captions.enterText": "输入字幕文字...",
  "captions.start": "开始：",
  "captions.duration": "时长：",
  "captions.jumpPlayhead": "跳转播放头到起始位置",
  "captions.deleteCaption": "删除字幕",

  // ── Download ──
  "download.downloading": "正在下载音频",
  "download.complete": "下载完成",
  "download.failed": "下载失败",
  "download.cached": "已缓存",
  "download.failedShort": "失败",
  "download.ready": "音频已就绪",

  // ── Error ──
  "error.somethingWentWrong": "出错了",
  "error.unexpected": "发生了意外错误。",
  "error.tryAgain": "重试",

  // ── Editor ──
  "editor.selectAdjacentClips": "请选择两个相邻片段或将播放头放在剪切点",
  "editor.transitionAdded": "已添加 {name} 转场",

  // ── Common Actions ──
  "action.undo": "撤销",
  "action.redo": "重做",
  "action.cut": "剪切",
  "action.copy": "复制",
  "action.paste": "粘贴",
  "action.selectAll": "全选",
  "action.zoomIn": "放大",
  "action.zoomOut": "缩小",
  "action.fitToScreen": "适应屏幕",

  // ── Project ──
  "project.saveSuccess": "项目已保存",
  "project.saveFailed": "保存失败",
  "project.renameTitle": "重命名项目",
  "project.deleteConfirm": "确认删除此项目？",

  // ── Toast ──
  "toast.projectSaved": "项目已保存",
  "toast.exportStarted": "开始导出...",
  "toast.exportComplete": "导出完成",

  // ── Toolbar Tooltips ──
  "toolbar.undo": "撤销 (Cmd+Z)",
  "toolbar.redo": "重做 (Cmd+Shift+Z)",
  "toolbar.freeMove": "自由移动模式",
  "toolbar.insertMode": "插入模式",
  "toolbar.rippleMove": "波纹移动模式",
  "toolbar.swapClips": "交换选中片段 (Ctrl+Shift+S)",
  "toolbar.deleteLeft": "删除播放头左侧 (Q)",
  "toolbar.deleteRight": "删除播放头右侧 (W)",
  "toolbar.splitAll": "在播放头处分割所有 (S)",
  "toolbar.snap": "吸附",
  "toolbar.rippleEdit": "波纹编辑模式 (R) - 修剪时按住 Shift",
  "toolbar.deleteSelected": "删除选中片段",
  "toolbar.duplicateSelected": "复制选中片段 (Cmd/Ctrl+D)",
  "toolbar.closeGaps": "闭合间隙",
  "toolbar.zoomOut": "缩小",
  "toolbar.zoomIn": "放大",
};

const en: Record<string, string> = {};

// Auto-generate English from keys (use key as fallback)
// English overrides where different from key:
const enOverrides: Record<string, string> = {
  "launch.noRecent": "No recent projects",
  "tab.media": "Media",
  "tab.audio": "Audio",
  "tab.text": "Text",
  "tab.stickers": "Stickers",
  "tab.effects": "Effects",
  "tab.transitions": "Transitions",
  "tab.captions": "Captions",
};

let currentLang: Lang = "zh";

export function setLanguage(lang: Lang) {
  currentLang = lang;
  try { localStorage.setItem("kev-vibecut_lang", lang); } catch {}
}

export function getLanguage(): Lang {
  try {
    const saved = localStorage.getItem("kev-vibecut_lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch {}
  return currentLang;
}

export function t(key: string, params?: Record<string, string | number>): string {
  let text: string;
  if (currentLang === "zh") {
    text = zh[key] || key;
  } else {
    text = enOverrides[key] || en[key] || key;
  }
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}

// Initialize from saved preference
try {
  const saved = localStorage.getItem("kev-vibecut_lang");
  if (saved === "en") currentLang = "en";
} catch {}
