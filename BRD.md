# 言剪 YanClip · 商业需求文档（BRD）

*2026-06-07 · v1.0 · 内部文件 · 私有*

---

## 一、产品愿景

让任何人用自然语言完成视频编辑。不需要学时间线、不需要记快捷键、不需要理解"关键帧"是什么。对着言剪说话，它出片子。

**一句话：言剪 = 视频编辑的自动驾驶。**

---

## 二、目标用户

### 核心用户画像

| 画像 | 描述 | 痛点 | 使用场景 |
|---|---|---|---|
| **跨境电商卖家** | 每天需要做 5-20 条产品视频素材，投 Google/TikTok 广告 | 雇人贵、自己剪慢、多尺寸多语言重复劳动 | 上传产品素材 → 一句话生成多版本视频 |
| **自媒体创作者** | 抖音/小红书/B站创作者，周更 3-5 条 | 剪辑耗时、创意枯竭、模板千篇一律 | 上传原始素材 → AI 自动粗剪 → 微调发布 |
| **小企业主** | 餐饮/教育/服务店主，偶尔做宣传视频 | 完全不会剪、外包贵且沟通成本高 | 拍一段素材 → "帮我做成30秒门店宣传片" |
| **普通用户** | 想做短视频但被剪辑软件劝退的人 | 打开剪映不知道从哪下手 | 拍完直接说 "帮我把这段做成好看的视频" |

### 用户分层

```
专业创作者（5%）  → 桌面版，手动为主、Agent 辅助提效
进阶创作者（25%） → Web/桌面，Agent 主力 + 手动微调
普通用户（70%）  → Web/手机，纯 Agent，零手动操作
```

---

## 三、用户故事

### 核心旅程

**场景 A：跨境卖家批量生产**

> 小王是跨境卖家，今天到了 3 个新品。他用手机拍了每款产品 2 分钟的使用演示。打开言剪网页版，上传 6 段视频，打字：「帮我把每个产品的视频剪成 3 个版本：15 秒竖版适合 TikTok、30 秒横版适合 YouTube 广告、45 秒方版适合 Facebook。加英文字幕，BGM 节奏感强一点。产品名和价格叠在视频末尾。」
>
> 5 分钟后，18 条成品视频躺在项目里。小王抽查了两条，都 ok，一键导出。

**场景 B：自媒体日更**

> 小陈是小红书博主，今天录了 10 分钟 vlog 素材。打开言剪：「帮我剪成 2 分钟以内，节奏快一点，把我在说『这个真的绝了』那段保留，其他啰嗦的剪掉。加个氛围感滤镜，结尾加关注动画。」
>
> 1 分钟后粗剪完成。小陈拖拽微调了两处转场，满意，导出发布。

**场景 C：零基础用户**

> 老张开餐馆，想做个抖音宣传视频。拍了店里环境和几道菜，打开言剪手机版，按住说话：「帮我把这些做成一个 30 秒的宣传视频，看起来高级一点，写『老张私房菜』和地址，配个温馨的音乐。」
>
> 一分钟后视频生成。老张觉得挺好，直接发了抖音。

### Agent 交互模式

| 交互方式 | 适用场景 | 优先级 |
|---|---|---|
| **单次指令** | 简单操作："剪掉前 10 秒""加渐隐转场""导出 1080p" | P0 |
| **多轮对话** | 复杂编辑：用户说→AI 做→用户反馈→AI 修改 | P0 |
| **模板触发** | 用户选模板 → AI 自动匹配素材 → 微调 | P1 |
| **批量指令** | 一个素材生成多版本、多尺寸、多语言 | P1 |
| **语音输入** | 手机端按住说话，Web 端可选 | P2 |

---

## 四、功能需求

### 4.1 Agent 命令系统（P0）

Agent 需要理解并执行的命令类型：

**时间线操作**
| 命令示例 | Agent 动作 |
|---|---|
| "剪掉开头 5 秒" | 裁剪 clip.inPoint += 5s |
| "把第三段删掉" | 删除 track 上第 3 个 clip |
| "第二段和第三段换个位置" | 交换两个 clip 在时间线上的位置 |
| "把这段拆成两半，在中间加个文字" | split clip → insert text layer |
| "把结尾延长 2 秒，做个定格" | 调整 clip.outPoint + freeze frame |

**转场与特效**
| 命令示例 | Agent 动作 |
|---|---|
| "片段之间加渐隐转场" | 在所有 clip 之间插入 crossfade transition |
| "开头加个闪白效果" | 在第一个 clip 开头加 white flash |
| "整体加个电影感滤镜" | 调整全局 color grading 参数 |
| "让画面稳定一点" | 启用视频防抖 |

**文字与字幕**
| 命令示例 | Agent 动作 |
|---|---|
| "自动加字幕" | 语音识别 → 生成字幕 track |
| "字幕翻译成英文" | 翻译字幕文本 |
| "开头加标题「我的日常 vlog」" | 在时间线 0s 处插入文字层 |
| "标题用粗体，大一点，居中" | 调整文字层样式参数 |

**音频**
| 命令示例 | Agent 动作 |
|---|---|
| "把背景音乐调小一点" | 调整音频 track volume |
| "这个片段原声去掉，换 BGM" | mute clip audio → add BGM track |
| "音乐节奏卡在画面切换点上" | 自动 beat detection → align cuts |

**导出**
| 命令示例 | Agent 动作 |
|---|---|
| "导出 1080p MP4" | 渲染 1920×1080 H.264 |
| "导出竖版适合抖音" | 渲染 1080×1920 |
| "发到抖音" | 导出 → 调起发布接口 |

### 4.2 手动编辑能力（P0，继承 Clypra）

Clypra 已有功能全部保留，作为 Agent 操作的 fallback：
- 多轨时间线（视频 + 音频 + 文字 + 特效轨）
- 帧精确裁剪
- 拖拽排序
- 撤销/重做（100 级）
- 音频波形可视化
- 胶片条预览
- 转场效果
- FFmpeg 导出

### 4.3 文件管理

| 功能 | 说明 | 优先级 |
|---|---|---|
| 本地上传 | 拖拽/点击上传视频、音频、图片 | P0 |
| 素材库 | 上传过的素材可复用 | P1 |
| 云端存储 | 项目自动保存到云端（托管版） | P1 |
| 本地存储 | IndexedDB 离线存储（Web 版） | P0 |
| URL 导入 | 粘贴视频链接直接导入 | P2 |

### 4.4 模板系统（P1）

| 功能 | 说明 |
|---|---|
| 内置模板 | 10 个 MVP 模板（vlog/产品展示/宣传片/教程/开箱） |
| AI 匹配 | 分析用户素材内容 → 推荐最合适的模板 |
| 模板参数 | 用户可调：时长、风格强度、BGM 类型、配色 |
| 模板市场 | 创作者上传模板 → 平台审核 → 定价 → 抽佣 30%（P2） |

### 4.5 协作（P2）

| 功能 | 说明 |
|---|---|
| 项目分享 | 生成分享链接，对方可查看/评论 |
| 评论标注 | 在时间线特定位置添加评论 |
| 权限控制 | 只读 / 可评论 / 可编辑 |
| 版本历史 | 自动保存项目版本，可回溯 |

---

## 五、非功能需求

### 5.1 性能

| 指标 | Web 版目标 | 桌面版目标 |
|---|---|---|
| 首屏加载 | < 3s | < 2s |
| 预览帧率 | 30fps（1080p） | 60fps（4K） |
| Agent 响应 | < 5s（简单指令）/ < 30s（复杂指令） | 同 Web |
| 导出速度 | 云端渲染，1080p 1x 实时 | 本地渲染，4K 2-3x 实时 |
| 最大项目时长 | 30 分钟 | 无限制 |
| 并发用户 | 支持 1000 同时在线（托管版 MVP） | — |

### 5.2 兼容性

| 平台 | 要求 |
|---|---|
| Web | Chrome 100+ / Edge 100+ / Safari 16+ / Firefox 110+ |
| 桌面 | macOS 12+ / Windows 10+ / Linux (Ubuntu 22.04+) |
| 手机 | iOS 16+ / Android 13+ |

### 5.3 安全

- 用户上传素材加密存储
- 项目数据隔离（用户 A 不能访问用户 B 的项目）
- Agent 操作可撤销（用户始终有最终控制权）
- 不上传用户素材用于训练（隐私承诺）

### 5.4 国际化

- 中文优先（MVP）
- 英文界面（Phase 3）
- UI 文案支持 i18n（架构预留）

---

## 六、Agent 架构设计

### 6.1 架构原则

```
1. Agent 操作的是时间线 API，不是直接操作 DOM/Renderer
2. Agent 与手动模式共用同一套时间线状态（Zustand store）
3. 所有 Agent 操作可被用户手动覆盖、撤销
4. Agent 必须先展示预览，用户确认后再执行破坏性操作
```

### 6.2 Agent 流水线

```
用户输入（文本/语音）
       ↓
意图分类器（本地小模型/规则）
       ↓
   ┌───┴───┐
   ↓       ↓
简单指令   复杂指令
   ↓       ↓
规则匹配   LLM 推理
   ↓       ↓
   └───┬───┘
       ↓
操作序列生成（TimelineAction[]）
       ↓
安全校验（操作是否合法？是否可逆？）
       ↓
预览执行（先渲染预览，不修改项目状态）
       ↓
用户确认 / 自动应用（取决于设置）
       ↓
时间线 API 调用（Zustand action dispatch）
       ↓
WebGL 渲染更新
```

### 6.3 TimelineAction 类型定义

```typescript
type TimelineAction =
  | { type: "trim"; clipId: string; inPoint?: number; outPoint?: number }
  | { type: "delete"; clipId: string }
  | { type: "move"; clipId: string; newPosition: number; trackId?: string }
  | { type: "split"; clipId: string; atTime: number }
  | { type: "addTransition"; between: [string, string]; effect: TransitionType }
  | { type: "addText"; text: string; at: number; duration: number; style?: TextStyle }
  | { type: "addSubtitles"; language: string; autoGenerate: boolean }
  | { type: "adjustAudio"; clipId: string; volume?: number; mute?: boolean }
  | { type: "addBGM"; source: string; startAt?: number; volume?: number }
  | { type: "applyTemplate"; templateId: string }
  | { type: "export"; format: ExportFormat; resolution: Resolution }
  | { type: "undo" }
  | { type: "redo" }
```

### 6.4 安全校验规则

- 操作的目标 clip/track 必须存在
- 不能产生重叠冲突（move 操作）
- 不能产生空轨道
- 导出前检查：项目不能为空、时长 > 0
- 批量操作上限：单次最多创建 20 个 clip（防止 LLM 幻觉产生垃圾）

---

## 七、技术实现计划

### 7.1 WebPlatformAdapter 实现

```typescript
class WebPlatformAdapter implements PlatformInterface {
  type = "web" as const;
  isTauri() { return false; }
  isCapacitor() { return false; }
  isWeb() { return true; }

  // 文件选择：使用 File System Access API / 传统 input
  async openFileDialog(options): Promise<SelectedFile[] | null> { ... }

  // 文件路径 → Blob URL（Web 版无本地路径概念）
  convertFileSrc(path: string): string { ... }

  // 存储：IndexedDB
  async saveProject(id, payload, list): Promise<void> { ... }
  async loadProject(id): Promise<string> { ... }

  // 帧提取：video 元素 + Canvas
  async getMediaMetadata(blobUrl: string): Promise<VideoMetadata> { ... }
  async extractPosterFrame(blobUrl: string, time: number): Promise<string> { ... }
}
```

### 7.2 视频帧解码（Web 替代方案）

```
桌面版：Rust ffmpeg-next → 原生解码 → base64 WebP
Web 版：<video> 元素 → seek → Canvas.drawImage() → toDataURL()
```

性能对比：
- 桌面版（Rust）：3-15ms/帧
- Web 版（video+canvas）：20-50ms/帧（可接受，预览够用）

### 7.3 导出方案（Web 版）

**小项目（< 2 分钟，1080p）**：FFmpeg.wasm 在浏览器本地处理
**大项目**：上传素材到云端 → 服务端 FFmpeg 渲染 → 返回下载链接

### 7.4 数据流

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  用户输入     │ →  │  Agent 引擎   │ →  │  操作序列     │
│ (自然语言)    │    │ (LLM/规则)    │    │ (Action[])   │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  WebGL 渲染   │ ←  │  Zustand     │ ←  │  安全校验     │
│  (实时预览)    │    │  (时间线状态)  │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 八、MVP 范围

### MVP 必须包含（12 周）

| 模块 | 内容 |
|---|---|
| **平台** | Web 版（主力）+ 桌面版（继承） |
| **手动编辑** | Clypra 全部现有功能 |
| **Agent 基础** | 单次指令：裁剪/删除/移动/转场/文字/字幕/导出 |
| **文件** | 本地上传 + IndexedDB 本地存储 |
| **模板** | 5 个内置模板 |
| **导出** | Web: FFmpeg.wasm 小项目 + 云端大项目 |
| **部署** | 开源 GitHub + 托管版 Vercel |

### MVP 不包含

- 手机版（继承但不优化）
- 多轮对话（单次指令优先）
- 批量生产
- 协作编辑
- 模板市场
- 一键发布到社交平台
- 语音输入
- 国际化（中文优先）

---

## 九、成功指标

| 指标 | MVP 上线后 3 个月目标 |
|---|---|
| 注册用户 | 1,000 |
| 月活 MAU | 500 |
| Agent 指令执行成功率 | > 80% |
| 用户平均 session 时长 | > 10 分钟 |
| 项目完成率（创建→导出） | > 40% |
| GitHub Stars | 500 |
| NPS | > 30 |

---

## 十、假设与约束

### 核心假设

1. **用户愿意用自然语言操作视频编辑。** 如果用户更习惯手动拖拽，Agent 的定位需要调整（退为辅助而非主力）。
2. **LLM 能可靠地将自然语言映射到时间线操作。** 如果映射错误率过高（>30%），需要回退到模板+参数模式。
3. **FFmpeg.wasm 在浏览器中的性能可接受。** 如果小项目导出都太慢，需要完全依赖云端渲染。
4. **Clypra 的架构能平滑支持 Agent 层。** 如果时间线 API 设计有根本冲突，需要 fork 后大幅重构。
5. **开源社区会接受 "Agent 版 Clypra"。** 如果社区视为 "分裂"，需要差异化叙事。

### 约束

- **时间：** 12 周 MVP，K 可投入时间有限（COO 主业）
- **人力：** 初期 K + 我（002）+ 可能 1-2 个外包/兼职
- **预算：** LLM API 费用控制在 $200/月（MVP 阶段），云端渲染按量付费
- **技术债：** Agent 层可以粗糙，但渲染引擎和平台适配层必须稳定

---

## 十一、术语表

| 术语 | 定义 |
|---|---|
| Agent 指令 | 用户输入的自然语言，被解析为 TimelineAction 序列 |
| TimelineAction | Agent 生成的原子操作，对应时间线的一次状态变更 |
| 时间线 API | Zustand store 的 action 方法，Agent 和手动模式共用 |
| WebPlatformAdapter | Web 版平台适配器，替代 Tauri 平台能力 |
| 预览执行 | Agent 操作先在虚拟状态上渲染，不修改实际项目 |
| 安全校验 | 操作执行前的合法性检查（存在性、冲突、上限） |

---

*这份文档是活的。每两周与 BP 一起 review。功能优先级随用户反馈调整。*
