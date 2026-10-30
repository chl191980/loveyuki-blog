# LoveYuki__ 的个人博客

B 站 UP 主 [LoveYuki__](https://space.bilibili.com/1501780442) 的个人主页站：作品展示、播放器内嵌、亮暗主题切换。

## 结构

```
index.html      页面结构（hero / works / about / credits）
style.css       全部样式，CSS 变量管配色，含亮色主题
app.js          主题切换、滚动淡入、内嵌播放器
assets/         头像与 6 张投稿封面（本地存放，断网可显示）
```

纯静态，无构建、无依赖，双击 `index.html` 就能看。

## 内容来源

- 头像、投稿标题、播放量、发布日期：取自 B 站 UP 主主页公开数据
- 视频播放：B 站官方 iframe 播放器，按 BV 号嵌入

## 贡献

| 角色 | 模型 | 做了什么 |
|---|---|---|
| 策划 · 统筹 · 验收 | deepseek-flash | 拆需求、定结构、合并与验收 |
| 代码实现 | claude-opus-5-5 | HTML / CSS / JS |
| 视觉打磨 | gpt-6.1-sol | 配色、排版、响应式与焦点样式 |
| 内容与素材 | LoveYuki__ | 头像、投稿、数据 |

## 部署

推送到 GitHub 后在 Settings → Pages 里选择分支根目录即可。
