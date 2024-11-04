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

I am currently a Ph.D. candidate at Pennsylvania State University, advised by [Dr.Jinghui Chen](https://jinghuichen.github.io/). I earned my Bachelor's degree from the University of Electronic Science and Technology of China (UESTC) in 2022. My research interests include trustworthiness and security issues in large language models, safety and privacy issues in image generation models, and interpretation and evaluation of large pre-trained models. I warmly welcome anyone to discuss research works with me!

<em style="color: red;">I am currently seeking a research intern position for the summer of 2025. If you are hiring and interested in my background, please feel free to reach out and contact me!</em>

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


- Data Free Backdoor Attacks, **Bochuan Cao**, Jinyuan Jia, Chuxuan Hu, Wenbo Guo, Zhen Xiang, Jinghui Chen, Bo Li, Dawn Song. In Proceedings of the *37th Conference on Neural Information Processing Systems (NeurIPS), Vancouver, 2024.*
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
- *2024.11* [NeurIPS 2024 Top Reviewers](https://neurips.cc/Conferences/2024/ProgramCommittee#top-reviewers) (top 8%).
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
- *2024.05 - 2024.08*, Research Intern at CR/RSI2-NA Department, Robert Bosch LLC, Sunnyvale, USA. Advisor: Dr.Sashidhar Jakkamsetti.
- *2021.03 - 2022.03*, Research Intern at Search Strategy Department, Baidu Inc, Beijing, China. Advisor: Dr.Yiding Liu.
