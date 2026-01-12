/**
 * PhD Clicker - Chinese Legend Advisors Data
 * Converted from legend_advisors.json to ES Module
 */

export const LEGEND_ADVISORS_ZH = {
    jinghui: {
        id: "jinghui",
        name: "Jinghui Chen",
        title: "The Advisor (导师)",
        desc: "他看了一眼你的 Loss 曲线，淡淡地说：再跑几个 Epoch 试试。",
        unlock_connection: "jinghui",
        traits: [
            { id: "jinghui_001", name: "对抗鲁棒", rarity: "gold", description: "专攻 Adversarial Robustness，你的论文天生自带防御 Reviewer #2 的 buff", effect: { type: "multiplier", target: "rebuttal_penalty", value: 0.50 }, effect_text: "Rebuttal 失败惩罚减半" },
            { id: "jinghui_002", name: "凌晨在线", rarity: "purple", description: "邮件回复时间永远是 2:47 AM，让你怀疑他是不是 AI", effect: { type: "multiplier", target: "offline", value: 1.25 }, effect_text: "离线收益 +25%" },
            { id: "jinghui_003", name: "再跑一下", rarity: "blue", description: "不管什么问题，答案都是'再跑几个 epoch 试试'，而且经常真的有用", effect: { type: "multiplier", target: "manual_click", value: 1.18 }, effect_text: "手动点击产出 +18%" },
            { id: "jinghui_004", name: "保底二成", rarity: "purple", description: "就算 paper 写得再烂，他总能帮你找到能投的地方", effect: { type: "additive", target: "submission_rate_floor", value: 0.20 }, effect_text: "投稿成功率保底 20%" }
        ]
    },

    hinton: {
        id: "hinton",
        name: "Geoffrey Hinton",
        title: "The Godfather (教父)",
        desc: "他刚刚退出了 Google，现在他有空指导你了。",
        unlock_connection: "hinton",
        traits: [
            { id: "hinton_001", name: "祖师庇佑", rarity: "gold", description: "图灵奖光环加持，审稿人看到你导师名字直接闭嘴", effect: { type: "additive", target: "submission_rate", value: 0.12 }, effect_text: "投稿成功率 +12%" },
            { id: "hinton_002", name: "反向传播", rarity: "gold", description: "转生时，你的一部分学术积累会神奇地保留下来", effect: { type: "multiplier", target: "rebirth_rp_retain", value: 0.05 }, effect_text: "转生时保留 5% 的 RP" },
            { id: "hinton_003", name: "末日预言", rarity: "purple", description: "经常警告 AI 会毁灭人类，但这不妨碍他继续发 paper", effect: { type: "multiplier", target: "global_rp", value: 1.15 }, effect_text: "全局 RP 产出 +15%" },
            { id: "hinton_004", name: "桃李天下", rarity: "purple", description: "学生遍布各大实验室，随便捞一个都能帮你审稿", effect: { type: "multiplier", target: "collaborator", value: 1.25 }, effect_text: "大佬合作者产出 +25%" }
        ]
    },

    jensen: {
        id: "jensen",
        name: "Jensen Huang",
        title: "The Supplier (皮衣客)",
        desc: "The more you buy, the more you save.",
        unlock_connection: "jensen",
        traits: [
            { id: "jensen_001", name: "皮衣加持", rarity: "gold", description: "穿上皮衣，GPU 性能自动提升 100%（心理作用）", effect: { type: "multiplier", target: "compute_facilities", value: 2.0 }, effect_text: "算力类设施产出 x2" },
            { id: "jensen_002", name: "买越多省越多", rarity: "purple", description: "这句话在数学上是错的，但你就是忍不住想买更多", effect: { type: "multiplier", target: "facility_cost", value: 0.88 }, effect_text: "设施购买折扣 12%" },
            { id: "jensen_003", name: "摩尔定律", rarity: "blue", description: "每 18 个月你的算力会翻一番（如果你买得起的话）", effect: { type: "multiplier", target: "h100", value: 1.30 }, effect_text: "H100 集群产出 +30%" },
            { id: "jensen_004", name: "股价飞天", rarity: "red", description: "NVDA 股价一路狂飙，你的实验室预算却越来越紧", effect: { positive: { type: "multiplier", target: "compute_facilities", value: 1.35 }, negative: { type: "multiplier", target: "academic_facilities", value: 0.85 } }, effect_text: "算力类设施产出额外 +35%，但学术/人力类设施产出 -15%" }
        ]
    },

    lecun: {
        id: "lecun",
        name: "Yann LeCun",
        title: "The Skeptic (世界模型)",
        desc: "那不是 AGI，那只是统计学鹦鹉。",
        unlock_connection: "lecun",
        traits: [
            { id: "lecun_001", name: "世界模型", rarity: "gold", description: "坚信 World Model 才是正道，Autoregressive 都是邪路", effect: { type: "multiplier", target: "global_rp", value: 1.20 }, effect_text: "全局 RP 产出 +20% (独立乘区)" },
            { id: "lecun_002", name: "推特战神", rarity: "purple", description: "每天在线对喷，从 Gary Marcus 到 Elon Musk 无一幸免", effect: { type: "multiplier", target: "arxiv", value: 1.35 }, effect_text: "arXiv 灌水机产出 +35%" },
            { id: "lecun_003", name: "CNN之父", rarity: "purple", description: "卷积神经网络奠基人，虽然现在大家都在用 Transformer", effect: { type: "additive", target: "submission_rate", value: 0.08 }, effect_text: "投稿成功率 +8%" },
            { id: "lecun_004", name: "嘴硬心软", rarity: "blue", description: "嘴上说 LLM 是鹦鹉，身体却很诚实地在 Meta 搞 LLaMA", effect: { type: "multiplier", target: "manual_click", value: 1.15 }, effect_text: "手动点击产出 +15%" }
        ]
    },

    altman: {
        id: "altman",
        name: "Sam Altman",
        title: "The Capitalist (奥特曼)",
        desc: "7 Trillion.",
        unlock_connection: "altman",
        traits: [
            { id: "altman_001", name: "融资圣体", rarity: "gold", description: "开口就是 7 万亿美元，让你觉得自己申请的那点经费不值一提", effect: { type: "additive", target: "inflation_reduction", value: -0.02 }, effect_text: "通胀系数 -0.02 (1.15 → 1.13)" },
            { id: "altman_002", name: "董事会危机", rarity: "red", description: "偶尔会被董事会开除，但总能在 48 小时内复活", effect: { positive: { type: "multiplier", target: "global_rp", value: 1.25 }, negative: { type: "multiplier", target: "rebuttal_bonus", value: 0.80 } }, effect_text: "全局 RP +25%，但 Rebuttal 成功加成 -20%" },
            { id: "altman_003", name: "安全剧场", rarity: "purple", description: "嘴上喊着 AI Safety，手上加速训练 GPT-5", effect: { type: "multiplier", target: "compute_facilities", value: 1.22 }, effect_text: "算力类设施产出 +22%" },
            { id: "altman_004", name: "商业嗅觉", rarity: "blue", description: "知道什么研究方向能拿到钱，虽然不一定是好研究", effect: { type: "multiplier", target: "submission_cost", value: 0.85 }, effect_text: "投稿 RP 消耗 -15%" }
        ]
    },

    kaiming: {
        id: "kaiming",
        name: "Kaiming He",
        title: "The Architect (残差之父)",
        desc: "让你的网络再深一点。",
        unlock_connection: "kaiming",
        traits: [
            { id: "kaiming_001", name: "残差连接", rarity: "gold", description: "让梯度不再消失，让论文不再被拒", effect: { type: "multiplier", target: "upgrade_cost", value: 0.70 }, effect_text: "所有升级项价格 -30%" },
            { id: "kaiming_002", name: "引用炸弹", rarity: "gold", description: "ResNet 引用量十万+，随便沾点边就能蹭到热度", effect: { type: "additive", target: "paper_bonus", value: 0.05 }, effect_text: "每篇论文额外 +5% 全局产出" },
            { id: "kaiming_003", name: "大道至简", rarity: "purple", description: "越简单的方法越有效，Batch Norm 就是最好的证明", effect: { type: "multiplier", target: "global_rp", value: 1.12 }, effect_text: "全局 RP 产出 +12%" },
            { id: "kaiming_004", name: "业界跳板", rarity: "blue", description: "从 MSRA 到 FAIR 到 MIT，每次跳槽都是一次升级", effect: { type: "multiplier", target: "facility_cost", value: 0.92 }, effect_text: "设施购买折扣 8%" }
        ]
    },

    vaswani: {
        id: "vaswani",
        name: "Ashish Vaswani",
        title: "Attention Author",
        desc: "Attention is all you need.",
        unlock_connection: "vaswani",
        traits: [
            { id: "vaswani_001", name: "注意力机制", rarity: "gold", description: "你的每一次点击都可能触发自注意力暴击", effect: { type: "crit_chance", target: "manual_click", value: 0.10, crit_multiplier: 10 }, effect_text: "手动点击 10% 概率触发 10 倍暴击" },
            { id: "vaswani_002", name: "八作传奇", rarity: "purple", description: "八个一作的神话，证明了好 idea 可以让所有人共赢", effect: { type: "multiplier", target: "collaborator", value: 1.30 }, effect_text: "大佬合作者产出 +30%" },
            { id: "vaswani_003", name: "改变世界", rarity: "purple", description: "一篇 paper 开创了 LLM 时代，你也想复刻这个奇迹", effect: { type: "additive", target: "submission_rate", value: 0.07 }, effect_text: "投稿成功率 +7%" },
            { id: "vaswani_004", name: "离职创业", rarity: "blue", description: "Google Brain 八子全部出走创业，学术界的流量密码", effect: { type: "multiplier", target: "manual_click", value: 1.20 }, effect_text: "手动点击产出 +20%" }
        ]
    },

    ilya: {
        id: "ilya",
        name: "Ilya Sutskever",
        title: "The Believer (SSI)",
        desc: "Feel the AGI.",
        unlock_connection: "ilya",
        traits: [
            { id: "ilya_001", name: "感受梯度", rarity: "gold", description: "据说他能直接感受到 loss landscape 的形状", effect: { type: "additive", target: "tier3_submission_rate", value: 0.10 }, effect_text: "顶会基础中稿率 +10%" },
            { id: "ilya_002", name: "超级对齐", rarity: "purple", description: "离开 OpenAI 创立 SSI，专注于让 AGI 不杀死人类", effect: { type: "multiplier", target: "global_rp", value: 1.18 }, effect_text: "全局 RP 产出 +18%" },
            { id: "ilya_003", name: "神秘主义", rarity: "purple", description: "发言玄之又玄，让人怀疑他是不是已经看到了 AGI", effect: { type: "multiplier", target: "agi", value: 1.40 }, effect_text: "AGI 雏形产出 +40%" },
            { id: "ilya_004", name: "政变老手", rarity: "red", description: "参与过董事会政变，虽然最后又道歉了", effect: { positive: { type: "additive", target: "submission_rate", value: 0.08 }, negative: { type: "multiplier", target: "rebuttal_penalty", value: 1.30 } }, effect_text: "投稿成功率 +8%，但 Rebuttal 失败惩罚 +30%" }
        ]
    },

    linus: {
        id: "linus",
        name: "Linus Torvalds",
        title: "Open Source God",
        desc: "Show me the code.",
        unlock_connection: "linus",
        traits: [
            { id: "linus_001", name: "开源之神", rarity: "gold", description: "Linux + Git，现代计算基础设施的奠基人", effect: { type: "multiplier", target: "claude_code", value: 1.60 }, effect_text: "Claude Code 产出 +60%" },
            { id: "linus_002", name: "毒舌评审", rarity: "purple", description: "代码写得烂他会直接骂你，但你知道他是对的", effect: { type: "multiplier", target: "rebuttal_bonus", value: 1.25 }, effect_text: "Rebuttal 成功加成 +25%" },
            { id: "linus_003", name: "代码即法", rarity: "purple", description: "不看 PPT 不看论文，Show me the code", effect: { type: "multiplier", target: "compute_facilities", value: 1.18 }, effect_text: "算力类设施产出 +18%" },
            { id: "linus_004", name: "终身维护", rarity: "blue", description: "30 年如一日维护 Linux 内核，这种毅力你学不来", effect: { type: "multiplier", target: "offline", value: 1.20 }, effect_text: "离线收益 +20%" }
        ]
    },

    karpathy: {
        id: "karpathy",
        name: "Andrej Karpathy",
        title: "The Teacher",
        desc: "Let's build GPT from scratch.",
        unlock_connection: "karpathy",
        traits: [
            { id: "karpathy_001", name: "从零开始", rarity: "gold", description: "Let's build GPT from scratch，两小时教会你 Transformer", effect: { type: "multiplier", target: "academic_facilities", value: 3.0 }, effect_text: "学术/人力类设施产出 x3" },
            { id: "karpathy_002", name: "全网老师", rarity: "purple", description: "YouTube 播放量千万，带出的学生遍布全球", effect: { type: "multiplier", target: "undergrad", value: 1.50 }, effect_text: "本科生产出 +50%" },
            { id: "karpathy_003", name: "反复横跳", rarity: "blue", description: "OpenAI → Tesla → OpenAI → 独立，每次离职都是新闻", effect: { type: "multiplier", target: "manual_click", value: 1.15 }, effect_text: "手动点击产出 +15%" },
            { id: "karpathy_004", name: "Vibe Coding", rarity: "purple", description: "发明了 Vibe Coding，让你用自然语言写代码", effect: { type: "multiplier", target: "claude_code", value: 1.35 }, effect_text: "Claude Code 产出 +35%" }
        ]
    }
};
