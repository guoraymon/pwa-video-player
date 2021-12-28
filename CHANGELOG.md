2021-12-28
==================
测试了下`GitHub`上`wasm h265`关键词的几个播放器，使用`http-server`直接对自带的`example`进行测试，结果如下：

|       视频        | HVC1 360p 25帧<br/>（h265web.js自带） | HVC1 480p 24帧<br/>(WasmVideoPlayer自带) |           HVC1 4k 60帧 <br/>（手机录制）            | HEVC 4k 24帧 <br/>（三星演示片）     |
|:---------------:|:--------------------------------:|:-------------------------------------:|:--------------------------------------------:|------------------------------|
| WasmVideoPlayer |                正常                |                  正常                   | null function or function signature mismatch | avformat_open_input failed 8 |
|   h265web.js    |                正常                |                  正常                   |                    绿屏、卡顿                     | is playing: false            |
| WXInlinePlayer  |         loadSuccess但无画面          |            loadSuccess但无画面            |               loadSuccess但无画面                | loadSuccess但无画面              |