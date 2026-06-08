# Clypra → Kev-VibeCut 深度研究报告

> 生成日期：2026-06-07
> 仓库：https://github.com/AIEraDev/Clypra
> Fork：https://github.com/KevPH2026/Kev-VibeCut

---

## 一、基本面

| 维度 | 数据 |
|------|------|
| Stars | ⭐ 1,300 |
| Forks | 155 |
| Open Issues | 7 |
| Open PRs | 1 |
| Total Commits | 385 |
| 最后活跃 | 2026-06-07（12小时前） |
| 开源协议 | **MIT**（可商用，可闭源，无限制） |
| 主维护者 | theunavailableguy（单人） |
| 版本 | 0.1.0-alpha.1 |

---

## 二、技术栈

```
前端：     React 19 + TypeScript + Zustand 5
桌面壳：   Tauri 2（Rust）
移动端：   Capacitor（iOS / Android）
渲染引擎： 自研 WebGL 管线 + FFmpeg
视频处理： Rust 侧缩略图引擎（rayon 并行）
测试：     Vitest + Rust proptest
构建：     Vite
```

**关键依赖：**
- `@tauri-apps/api: ^2`
- `react: ^19.1.0`
- `zustand: ^5.0.12`
- `react-dnd: ^16.0.1`
- `lucide-react: ^1.12.0`

---

## 三、代码规模

| 层 | 文件数 | 行数 |
|----|--------|------|
| TypeScript/TSX | 286 | ~52,000 |
| Rust | 18 | - |
| 测试文件 | 60+ | - |

---

## 四、架构分析

### 4.1 目录结构

```
src/
├── components/          # React 组件
│   ├── editor/         # 核心编辑器（Timeline, Preview 等）
│   ├── screens/        # 全屏视图（LaunchScreen）
│   └── ui/             # 通用 UI 组件（Modals, Icons 等）
├── core/               # 领域核心（架构精华）
│   ├── compositor/     # 合成器
│   ├── evaluation/     # 属性求值引擎
│   ├── fonts/          # 字体加载
│   ├── history/        # 撤销/重做
│   ├── interactions/   # 交互处理
│   ├── platform/       # 平台适配
│   ├── playback/       # 播放控制
│   ├── render/         # 渲染管线
│   ├── resources/      # 资源管理
│   ├── runtime/        # 运行时
│   ├── scheduler/      # 帧调度器
│   └── timeline/       # 时间线领域模型
├── features/           # 功能模块
│   ├── audio-library/  # 音频库
│   ├── subtitles/      # 字幕
│   ├── text-effects/   # 文字特效
│   └── text-templates/ # 文字模板
├── store/              # Zustand 全局状态
│   ├── timelineStore.ts    # 时间线（SSOT）
│   ├── playbackStore.ts    # 播放同步
│   ├── projectStore.ts     # 项目管理 + 持久化
│   └── ...
├── lib/                # 工具层
│   ├── renderEngine/   # 自研 WebGL 渲染引擎 ⭐
│   ├── filmstrip/      # 胶片条
│   └── ...
└── src-tauri/          # Rust 后端
    └── src/
        ├── thumbnail_engine/  # 缩略图引擎 ⭐
        │   ├── pyramid.rs     # 多分辨率金字塔
        │   ├── atlas.rs       # 纹理图集
        │   ├── cache.rs       # LRU 缓存
        │   ├── decoder.rs     # 视频解码
        │   ├── queue.rs       # 任务队列
        │   └── retry.rs       # 重试机制
        └── commands/          # Tauri 命令
```

### 4.2 自研渲染引擎（核心资产）

```
src/lib/renderEngine/
├── renderEngine.ts        # 核心渲染循环
├── renderScheduler.ts     # 帧调度器
├── rasterSurface.ts       # 光栅化表面
├── webglRasterSurface.ts  # WebGL 加速表面
├── FilmstripCache.ts      # 胶片条纹理缓存
├── epoch.ts               # 版本失效机制
├── hysteresis.ts          # 滞后优化（防抖渲染）
├── srp.ts / tsp.ts        # 调度策略
├── transport.ts           # 数据传输
└── types.ts
```

**这是整个项目最有价值的资产。** 它不是一个简单的 FFmpeg wrapper，而是完整的 GPU 加速实时预览管线。

### 4.3 状态管理设计

每个 Store 都有清晰的三元组文档：
- **OWNERSHIP**：谁是单一真相来源
- **PERSISTENCE**：是否持久化
- **MUTABILITY**：谁可以修改

这种工程纪律在开源项目中极其罕见。

### 4.4 测试策略

- Rust 侧：proptest（属性测试）
- TS 侧：Vitest（60+ 文件）
- 覆盖：unit / integration / component / property-based

---

## 五、功能清单

| 功能 | 状态 | 备注 |
|------|------|------|
| 多格式导入（MP4/MOV/WebM/MKV/M4V/AVI） | ✅ | |
| 音频导入（MP3/WAV/AAC） | ✅ | |
| 图片导入（JPG/PNG/WebP） | ✅ | |
| 帧精确裁剪 | ✅ | |
| 多轨时间线 | ✅ | |
| 音频波形可视化 | ✅ | |
| 胶片条预览 | ✅ | |
| 文字叠加层 + 自定义字体 | ✅ | |
| 文字特效 | ✅ | |
| 文字模板 | ✅ | |
| 转场效果 | ✅ | 最近新增 |
| 字幕 | ✅ | |
| 项目保存/加载 + 自动保存 | ✅ | |
| 撤销/重做（100 级） | ✅ | |
| FFmpeg 导出 | ✅ | |
| 跨平台桌面（macOS/Win/Linux） | ✅ | |
| 移动端（iOS/Android） | ✅ | Capacitor 打包 |
| 暗色模式 | ✅ | |

---

## 六、魔改潜力评估

### 优势

1. **MIT 协议**：可闭源商用，无法律风险
2. **自研渲染引擎**：不依赖云服务，可以离线跑
3. **模块化架构**：core/features/store/lib 四层分离，容易替换和扩展
4. **跨平台底子**：桌面 + 移动端框架已搭好
5. **代码质量 S 级**：架构设计、测试、文档都远超平均水准

### 风险

1. **Bus Factor = 1**：单核心维护者 theunavailableguy，如果他弃坑，后续维护全靠自己
2. **Alpha 版本**：API 可能变动，功能可能不稳定
3. **Tauri 桌面生态**：国内用户更习惯网页版，桌面端分发有额外门槛
4. **剪映碾压**：CapCut/剪映免费且功能全，差异化必须足够锋利

### 魔改方向脑暴

| 方向 | 描述 | 匹配度 |
|------|------|--------|
| Agent 剪映 | 自然语言驱动的视频编辑，AI 自动完成剪辑 | ⭐⭐⭐⭐⭐ |
| 跨境短视频工厂 | 批量产品视频生成 + 多语言字幕 + 模板 | ⭐⭐⭐⭐ |
| 垂直行业版 | 房产/餐饮/教育行业专属视频工具 | ⭐⭐⭐ |
| 白标 SaaS | 给代理商的视频编辑工具，收 SaaS 费 | ⭐⭐⭐ |

---

## 七、本地环境

```
路径：   ~/.hermes/workspace/clypra-product/
Fork：   github.com/KevPH2026/Kev-VibeCut
上游：   github.com/AIEraDev/Clypra
Node：   v25.6.1 ✅
Rust：   1.94.0 ✅
npm：    695 packages ✅
TSC：    零错误 ✅
```

---

## 八、竞品参考

| 竞品 | 定位 | 优势 | 劣势 |
|------|------|------|------|
| 剪映/CapCut | 全民视频编辑 | 免费、功能全、模板多 | 手动操作、无 Agent 能力 |
| Premiere Pro | 专业剪辑 | 行业标准 | 贵、重、学习成本高 |
| DaVinci Resolve | 专业调色+剪辑 | 免费版功能强 | 硬件要求高 |
| Descript | AI 视频编辑 | 基于文本编辑视频 | 仅英文、贵 |
| ScreenStudio | 屏幕录制 | 自动美化 | macOS only |

**Kev-VibeCut的机会窗口：** 剪映强在「手动剪」，Descript 强在「文本驱动编辑」，但 **没有人做「Agent 驱动编辑」**——你说一段话，AI 理解意图，自动完成剪辑全流程。这是 Clypra 架构的最佳魔改方向。
