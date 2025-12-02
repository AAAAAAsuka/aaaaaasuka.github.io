---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
# About Me

## PhD Clicker (play here)

<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="/game.css">
<script src="/data.zh.js"></script>
<script src="/data.en.js"></script>

<!-- Floating widget trigger -->
<div id="phd-clicker-app" class="font-sans">
  <div id="floating-widget" class="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-3 rounded-full shadow-lg cursor-pointer flex items-center gap-3" style="z-index:2147482000;">
    <i data-lucide="flask-conical" class="w-5 h-5"></i>
    <span id="widget-text">开始研究</span>
    <span id="widget-rp-display" class="hidden text-sm font-mono">RP: 0</span>
  </div>

  <!-- Game container (hidden by default, full-screen overlay) -->
  <div id="game-container" class="hidden fixed inset-0 bg-slate-900 text-slate-200 flex flex-col overflow-y-auto lg:overflow-hidden" style="z-index:2147483000;">
    <div class="h-8 bg-black flex-shrink-0 flex items-center px-4 text-sm text-green-400 font-mono border-b border-slate-700 gap-3">
      <span id="news-prefix" class="font-bold shrink-0">NEWS:</span>
      <div id="news-ticker" class="overflow-hidden whitespace-nowrap flex-1">
        <span></span>
      </div>
      <button id="lang-toggle" class="text-xs text-slate-200 border border-slate-600 px-2 py-0.5 rounded hover:border-indigo-400 hover:text-white transition-colors shrink-0">English</button>
    </div>

    <div id="main-panels" class="flex flex-1 flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      <!-- LEFT PANEL -->
      <div class="w-full lg:w-1/3 min-w-[280px] border-b lg:border-b-0 lg:border-r border-slate-700 flex flex-col p-4 lg:p-6 bg-slate-900 order-1">
        <div class="mb-8 text-center">
          <h1 id="title-text" class="text-3xl font-bold text-white mb-1 tracking-tight">PhD Clicker</h1>
          <p id="subtitle-text" class="text-slate-400 text-sm">涓哄鏈奖鍝嶅姏鑰岃倽</p>
        </div>
        <div class="text-center mb-8">
          <div id="rp-display" class="text-5xl font-mono font-bold text-indigo-400 mb-2">0</div>
          <div id="rp-label" class="text-sm text-slate-400 uppercase tracking-widest">Research Points (RP)</div>
          <div id="rp-per-second-display" class="text-green-500 font-mono text-lg mt-1">+0 / sec</div>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end lg:justify-center pb-6 gap-4">
          <button id="manual-research-button" class="group relative w-56 h-56 md:w-64 md:h-64 lg:w-[22rem] lg:h-[22rem] rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_70px_rgba(79,70,229,0.5)] active:scale-95 transition-all duration-75 flex flex-col items-center justify-center border-4 border-indigo-400/30 overflow-hidden">
            <i data-lucide="activity" class="w-12 h-12 text-white mb-2 group-hover:animate-bounce"></i>
            <span id="manual-button-label" class="font-bold text-white text-lg">杩涜瀹為獙</span>
            <div id="floating-text-container" class="absolute inset-0 pointer-events-none"></div>
          </button>
        </div>
      </div>

      <!-- MIDDLE PANEL -->
      <div class="w-full lg:w-1/3 min-w-[280px] border-b lg:border-b-0 lg:border-r border-slate-700 bg-slate-800/50 flex flex-col order-3 lg:order-2">
        <div class="p-4 border-b border-slate-700 bg-slate-900/50 sticky top-0 z-10">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-2 text-yellow-500">
              <i data-lucide="book-open" class="w-5 h-5"></i>
              <span id="citations-display" class="font-bold">Citations: 0</span>
              <span id="citations-rate-display" class="text-xs text-yellow-300 font-mono bg-yellow-900/30 px-2 py-0.5 rounded">+0/sec</span>
              <span id="papers-count-display" class="text-xs text-yellow-200 font-mono bg-yellow-900/50 px-2 py-0.5 rounded">璁烘枃鏁? 0</span>
            </div>
            <span id="h-index-display" class="text-xs text-slate-500">鍏ㄥ眬浜у嚭 +0%</span>
          </div>
          <button id="submit-paper-button" class="w-full mb-2 py-2 bg-indigo-900/30 border border-indigo-700 text-indigo-200 hover:bg-indigo-900/50 rounded text-sm font-bold transition-colors flex items-center justify-between gap-2 px-3">
            <span class="flex items-center gap-2"><i data-lucide="file-plus" class="w-4 h-4"></i> <span id="submit-paper-label">鎻愪氦璁烘枃 (鎻愬崌寮曠敤澧為暱)</span></span>
            <span id="submit-paper-cost" class="text-indigo-300 font-mono text-xs">...</span>
          </button>
          <button id="prestige-button" class="w-full py-2 bg-yellow-900/30 border border-yellow-700 text-yellow-500 hover:bg-yellow-900/50 rounded text-sm font-bold transition-colors flex items-center justify-center gap-2">
            <i data-lucide="award" class="w-4 h-4"></i>
            <span id="prestige-label">姣曚笟绛旇京 (杞敓)</span>
          </button>
        </div>
        <div id="upgrades-container" class="p-4 flex-1 overflow-y-auto lg:overflow-visible custom-scrollbar">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="zap" class="w-4 h-4"></i> <span id="upgrades-title">Upgrades</span>
            </h2>
            <button id="upgrades-toggle" class="lg:hidden text-xs text-slate-300 border border-slate-700 px-2 py-1 rounded hover:border-indigo-400 hover:text-white transition-colors">鏀惰捣</button>
          </div>
          <div id="upgrades-wrapper" class="lg:block">
            <div id="upgrades-list" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
          </div>
        </div>
        <div class="p-4 border-t border-slate-700 bg-slate-900/50 flex justify-between">
          <button id="reset-button" class="text-red-500 hover:text-red-400 flex items-center gap-1 text-xs">
            <i data-lucide="trash-2" class="w-3 h-3"></i> <span id="reset-label">Reset Save</span>
          </button>
          <div class="text-slate-500 text-xs flex items-center gap-1">
            <i data-lucide="save" class="w-3 h-3"></i> <span id="autosave-label">Auto-saving</span>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="w-full lg:w-1/3 min-w-[260px] bg-slate-900 flex flex-col overflow-hidden order-2 lg:order-3">
        <div class="p-4 border-b border-slate-700 shadow-md z-10 sticky top-0">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <i data-lucide="cpu" class="w-4 h-4"></i> <span id="facilities-title">璁炬柦</span>
            </h2>
            <button id="buildings-toggle" class="lg:hidden text-xs text-slate-300 border border-slate-700 px-2 py-1 rounded hover:border-indigo-400 hover:text-white transition-colors">鏀惰捣</button>
          </div>
        </div>
        <div id="buildings-wrapper" class="flex-1 lg:h-full overflow-y-auto custom-scrollbar">
          <div id="buildings-list" class="p-2 flex flex-col gap-2"></div>
        </div>
      </div>
    </div>
    <button id="minimize-button" class="absolute top-5 right-5 w-10 h-10 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-300 z-[100000]">&ndash;</button>
  </div>
</div>

<div id="dev-console" class="hidden fixed bottom-4 right-4 w-80 bg-slate-900/95 border border-indigo-500 rounded-lg shadow-2xl p-4 z-[200000]">
  <div class="flex items-center justify-between mb-2">
    <div class="text-sm font-bold text-indigo-200">Dev Console</div>
    <button id="dev-close" class="text-slate-400 hover:text-white text-xs">Close</button>
  </div>
  <div class="space-y-2 text-xs text-slate-300">
    <label class="flex items-center justify-between gap-2">
      <span class="w-20">RP</span>
      <input id="dev-rp" type="number" class="w-40 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-white text-right" placeholder="100000">
      <button id="dev-set-rp" class="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500">Set</button>
    </label>
    <label class="flex items-center justify-between gap-2">
      <span class="w-20">Citations</span>
      <input id="dev-citations" type="number" class="w-40 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-white text-right" placeholder="100">
      <button id="dev-set-citations" class="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500">Set</button>
    </label>
    <label class="flex items-center justify-between gap-2">
      <span class="w-20">璁烘枃鏁?</span>
      <input id="dev-papers" type="number" class="w-40 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-white text-right" placeholder="10">
      <button id="dev-set-papers" class="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500">Set</button>
    </label>
  </div>
</div>

<div id="submission-modal" class="hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[150000] overflow-y-auto">
  <div class="max-w-4xl mx-auto px-4 py-10">
    <div class="bg-slate-900 border border-indigo-800/60 rounded-2xl shadow-2xl overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
        <div>
          <p class="text-xs uppercase tracking-widest text-indigo-300 mb-1">Paper Submission</p>
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <i data-lucide="file-text" class="w-5 h-5 text-indigo-300"></i>
            <span id="submission-title">鍙戣〃璁烘枃 · Rebuttal</span>
          </h3>
        </div>
        <div class="flex items-center gap-3">
          <div id="submission-current-rp" class="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full">RP: 0</div>
          <button id="submission-close" class="text-slate-400 hover:text-white border border-slate-700 hover:border-red-400 rounded-full w-9 h-9 flex items-center justify-center transition-colors">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
      <div id="tier-stage" class="p-6 space-y-4">
        <div class="flex items-center justify-between text-sm text-slate-400">
          <div class="flex items-center gap-2">
            <span id="step1-label" class="px-2 py-1 rounded bg-indigo-900/40 text-indigo-200 text-xs font-bold uppercase">Step 1</span>
            <span id="step1-desc">閫夋嫨鎶曠娓犻亾锛堟按鍒?/ 鏅細 / 椤朵細锛夛紝涓嶅悓璐圭敤涓庝腑绋跨巼</span>
          </div>
          <div id="submission-min-cost" class="text-xs text-slate-500"></div>
        </div>
        <div id="tier-list" class="grid grid-cols-1 md:grid-cols-3 gap-3"></div>
      </div>
      <div id="question-stage" class="hidden p-6 space-y-3 border-t border-slate-800 bg-slate-900/70">
        <div class="flex items-center justify-between text-sm text-slate-400">
          <div class="flex items-center gap-2">
            <span id="step2-label" class="px-2 py-1 rounded bg-indigo-900/40 text-indigo-200 text-xs font-bold uppercase">Step 2</span>
            <span id="question-tier-label">Rebuttal Q&A</span>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span id="question-progress" class="text-slate-400">Q 1/3</span>
            <span id="question-chance" class="text-emerald-300 font-mono">80%</span>
          </div>
        </div>
        <div class="rounded-xl border border-slate-800 bg-slate-800/60 shadow-lg p-4">
          <div class="flex items-center gap-3 mb-3">
            <div id="question-reviewer-badge" class="w-10 h-10 rounded-full bg-red-500/20 border border-red-400/60 flex items-center justify-center text-red-200 font-bold">#2</div>
            <div class="leading-tight">
              <div id="question-reviewer-name" class="text-sm font-semibold text-white">Reviewer #2</div>
            </div>
          </div>
          <div id="question-text" class="text-lg text-slate-100 font-semibold leading-snug mb-3">闂鍐呭</div>
          <div id="options-container" class="space-y-2"></div>
          <div id="question-feedback" class="hidden mt-3 text-sm text-emerald-300"></div>
          <div class="mt-4 flex justify-end">
            <button id="question-next-btn" class="hidden px-4 py-2 rounded-lg border border-indigo-500 text-indigo-100 bg-indigo-900/40 hover:bg-indigo-800/60 transition-colors text-sm font-semibold">涓嬩竴棰?</button>
          </div>
        </div>
      </div>
      <div id="result-stage" class="hidden p-6 border-t border-slate-800 bg-slate-900/80">
        <div id="result-letter" class="rounded-xl border border-slate-800 bg-slate-800/70 shadow-lg p-4 mb-4">
          <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>From: review@conference.org</span>
            <span id="result-letter-date">Today</span>
          </div>
          <div id="result-letter-subject" class="text-sm font-semibold text-white mb-2">[Decision] Your Submission</div>
          <div id="result-letter-body" class="text-sm text-slate-200 leading-relaxed whitespace-pre-line">姝ｆ枃</div>
        </div>
        <div id="result-settlement" class="hidden">
          <div class="flex items-center gap-3 mb-3">
            <div id="result-icon" class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/60">A</div>
            <div>
              <div id="result-title" class="text-2xl font-bold text-emerald-300">Accept!</div>
              <div id="result-detail" class="text-sm text-slate-300">Reviewers loved your rebuttal.</div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60">
              <div class="text-xs text-slate-400 mb-1">浼氳</div>
              <div id="result-tier" class="text-sm font-semibold text-white">NeurIPS</div>
            </div>
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60">
              <div class="text-xs text-slate-400 mb-1">鏈€缁堜腑绋跨巼</div>
              <div id="result-chance" class="text-sm font-semibold text-white">45%</div>
            </div>
            <div class="p-3 rounded-lg border border-slate-800 bg-slate-800/60">
              <div class="text-xs text-slate-400 mb-1">鍒ゅ畾</div>
              <div id="result-roll" class="text-sm font-semibold text-white">Roll 0.32</div>
            </div>
          </div>
          <div id="result-rewards" class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"></div>
          <div class="flex items-center justify-between">
            <div id="result-flavor" class="text-sm text-slate-400">瀹＄浜猴細铏界劧娌＄湅鎳傦紝浣嗘劅瑙夊緢鍘夊銆?</div>
            <div class="flex gap-2">
              <button id="result-button" class="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-200 hover:bg-indigo-800/60 transition-colors">鍐嶆姇涓€绡?</button>
              <button id="submission-close-bottom" class="px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors">鍏抽棴</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://unpkg.com/lucide@latest"></script>
<script src="/game.js"></script>


I am currently a Ph.D. candidate at Pennsylvania State University, advised by [Dr.Jinghui Chen](https://jinghuichen.github.io/). I earned my Bachelor's degree from the University of Electronic Science and Technology of China (UESTC) in 2022. My research interests include trustworthiness and security issues in large language models, safety and privacy issues in image generation models, and interpretation and evaluation of large pre-trained models. I warmly welcome anyone to discuss research works with me!

<em style="color: red;">I am actively seeking full-time research positions and faculty opportunities for 2026. If you are hiring or know of suitable openings, I would love to connect — please feel free to reach out!</em>

<!-- My research interest includes neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


<!-- # 🔥 News
- *2022.02*: &nbsp;🎉🎉 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2022.02*: &nbsp;🎉🎉 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

# 📝 Publications 

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2016</div><img src='images/500x300.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf)

**Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

[**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div> -->


- [Data Free Backdoor Attacks](https://arxiv.org/abs/2412.06219), **Bochuan Cao**, Jinyuan Jia, Chuxuan Hu, Wenbo Guo, Zhen Xiang, Jinghui Chen, Bo Li, Dawn Song. In Proceedings of the *37th Conference on Neural Information Processing Systems (NeurIPS), Vancouver, 2024.*
- [Personalized Steering of Large Language Models: Versatile Steering Vectors Through Bi-directional Preference Optimization](https://arxiv.org/abs/2406.00045), Yuanpu Cao, Tianrong Zhang, **Bochuan Cao**, Ziyi Yin, Lu Lin, Fenglong Ma, Jinghui Chen. In Proceedings of the *37th Conference on Neural Information Processing Systems (NeurIPS), Vancouver, 2024.*
- [XPrompt: Explaining Large Language Model's Generation via Joint Prompt Attribution](https://arxiv.org/abs/2405.20404), Yurui Chang, **Bochuan Cao**, Yujia Wang, Jinghui Chen, Lu Lin. *arxiv preprint*.
- [On the Intrinsic Self-Correction Capability of LLMs: Uncertainty and Latent Concept](https://arxiv.org/abs/2406.02378), Guangliang Liu, Haitao Mao, **Bochuan Cao**, Zhiyu Xue, Kristen Johnson, Jiliang Tang, Rongrong Wang. *arxiv preprint*.
- [WordGame: Efficient & Effective LLM Jailbreak via Simultaneous Obfuscation in Query and Response](https://arxiv.org/abs/2405.14023), Tianrong Zhang, **Bochuan Cao**, Yuanpu Cao, Lu Lin, Prasenjit Mitra, Jinghui Chen. *arxiv preprint*.
- [Defending Against Alignment-Breaking Attacks via Robustly Aligned LLM](https://arxiv.org/abs/2309.14348), **Bochuan Cao**, Yuanpu Cao, Lu Lin, Jinghui Chen. In Proceedings of the *The 62nd Annual Meeting of the Association for Computational Linguistics (ACL 2024 main conference), Bangkok, Thailand*. \[[codes](https://github.com/AAAAAAsuka/llm_defends)\]
- [Watch the Watcher! Backdoor Attacks on Security-Enhancing Diffusion Models](https://arxiv.org/abs/2406.09669), Changjiang Li, Ren Pang, *Bochuan Cao*, Jinghui Chen, Fenglong Ma, Shouling Ji, Ting Wang. *arxiv preprint*.
- [On the Safety of Open-Sourced Large Language Models: Does Alignment Really Prevent Them From Being Misused?](https://arxiv.org/abs/2310.01581), Hangfan Zhang, Zhimeng Guo, Huaisheng Zhu, **Bochuan Cao**, Lu Lin, Jinyuan Jia, Jinghui Chen, Dinghao Wu. In Proceedings of the *The 62nd Annual Meeting of the Association for Computational Linguistics (ACL 2024 main conference), Bangkok, Thailand*.
- Is Your Jailbreaking Prompt Truly Effective for Large Language Models?, **Bochuan Cao**, Tianrong Zhang, Yuanpu Cao, Jinyuan Jia, Lu Lin, Jinghui Chen. In Proceedings of the *SECURE AND TRUSTWORTHY LARGE LANGUAGE MODELS (SET LLM @ ICLR 2024)*. 
- [Stealthy and Persistent Unalignment on Large Language Models via Backdoor Injections](https://arxiv.org/abs/2312.00027), Yuanpu Cao, **Bochuan Cao**, Jinghui Chen. In Proceedings of the *2024 Annual Conference of the North American Chapter of the Association for Computational Linguistics (NAACL), Mexico City, Mexico, 2024.* \[[codes](https://github.com/CaoYuanpu/BackdoorUnalign)\]
- [On the Difficulty of Defending Contrastive Learning against Backdoor Attacks](https://arxiv.org/abs/2312.09057), Changjiang Li, Ren Pang, **Bochuan Cao**, Zhaohan Xi, Jinghui Chen, Shouling Ji, Ting Wang. In Proceedings of the *the 33rd USENIX Security Symposium (USENIX Security '24), PHILADELPHIA, PA, USA*.
- [IMPRESS: Evaluating the Resilience of Imperceptible Perturbations Against Unauthorized Data Usage in Diffusion-Based Generative AI](https://arxiv.org/abs/2310.19248), **Bochuan Cao**,  Changjiang Li, Ting Wang, Jinyuan Jia, Bo Li, Jinghui Chen. In Proceedings of the *37th Conference on Neural Information Processing Systems (NeurIPS), New Orleans, Louisiana, USA, 2023*. \[[codes](https://github.com/AAAAAAsuka/Impress/tree/main)\]
- [Wild-Time: A Benchmark of in-the-Wild Distribution Shift over Time](https://arxiv.org/abs/2211.14238), Huaxiu Yao, Caroline Choi, **Bochuan Cao**, Yoonho Lee, Pang Wei Koh, Chelsea Finn. In Proceedings of the *36th Advances in Neural Information Processing Systems (NeurIPS), New Orleans, Louisiana, USA, 2022*.\[[codes](https://github.com/huaxiuyao/Wild-Time)\]
- [OmniLytics: A Blockchain-based Secure Data Market for Decentralized Machine Learning](https://arxiv.org/abs/2107.05252), Jiacheng Liang, Songze Li, **Bochuan Cao**, Wensi Jiang, Chaoyang He. In Proceedings of the *International Workshop on Federated Learning for User Privacy and Data Confidentiality in Conjunction with ICML 2021*.

# 🎖 Honors and Awards
- *2024.11* [NeurIPS 2024 Top Reviewers](https://neurips.cc/Conferences/2024/ProgramCommittee#top-reviewers).
- *2023.10* NeurIPS 2023 Scholar Award.

# 📖 Educations
- *2022.08 - now*, Pennsylvania State University (Penn State), College of Information Sciences and Technology, Doctor of Philosophy. 
- *2018.09 - 2022.06*, University of Electronic Science and Technology of China (UESTC), School of Automation Engineering, Bachelor of Engineering

# 💬 Acadamic Service
### Program Committee/Reviewer
- Neural Information Processing Systems (NeurIPS)
- International Conference on Machine Learning (ICML)
- International Conference on Learning Representations (ICLR)
- International Conference on Artificial Intelligence and Statistics (AISTATS)
- Association for the Advancement of Artificial Intelligence (AAAI)
- IEEE International Conference on Big Data (BigData)
- Transactions on Knowledge and Data Engineering (TKDE)
- Transactions on Information Systems (TOIS)

### Teaching
 - SRA 365: Statistical Analysis for Information Sciences, Teaching Assistant, 2023 Fall and 2024 Spring, Penn State.

# 💻 Internships
- *2025.05 - 2025.08*, Research Intern at Security-Flow, ByteDance, San Jose, USA. Advisor: Dr.Yang Bai and Dr.Xinyu Xing.
- *2024.05 - 2024.08*, Research Intern at CR/RSI2-NA Department, Robert Bosch LLC, Sunnyvale, USA. Advisor: Dr.Sashidhar Jakkamsetti.
- *2021.03 - 2022.03*, Research Intern at Search Strategy Department, Baidu Inc, Beijing, China. Advisor: Dr.Yiding Liu.
