/**
 * PhD Clicker - Chinese Advisor Traits Data
 * Converted from advisor_feature.json to ES Module
 */

export const TRAITS_ZH = {
    green: [
        { id: "green_001", name: "来者不拒", description: "对学生的任何请求从不说不，包括帮你写推荐信和报销咖啡钱", effect: { type: "multiplier", target: "coffee", value: 1.10 }, effect_text: "咖啡产出 +10%" },
        { id: "green_002", name: "偶有回复", description: "邮件通常石沉大海，但偶尔会在凌晨3点突然回你", effect: { type: "multiplier", target: "manual_click", value: 1.05 }, effect_text: "手动点击产出 +5%" },
        { id: "green_003", name: "佛系放养", description: "一个月见一次，见面只问'最近怎么样'，从不催进度", effect: { type: "multiplier", target: "offline", value: 1.08 }, effect_text: "离线收益 +8%" },
        { id: "green_004", name: "略懂代码", description: "能看懂 for 循环，偶尔指出你少了个分号", effect: { type: "starting_bonus", target: "rp", value: 50 }, effect_text: "开局赠送 50 RP" },
        { id: "green_005", name: "按时发薪", description: "RA 工资从不拖欠，这在学术圈已经是稀有品质了", effect: { type: "multiplier", target: "undergrad", value: 1.10 }, effect_text: "本科生产出 +10%" },
        { id: "green_006", name: "有求必应", description: "推荐信从不推辞，虽然内容基本是模板", effect: { type: "multiplier", target: "global_rp", value: 1.02 }, effect_text: "全局 RP 产出 +2%" },
        { id: "green_007", name: "朝九晚五", description: "从不要求学生加班，自己也准点下班。学术圈的一股清流", effect: { type: "starting_bonus", target: "rp", value: 100 }, effect_text: "开局赠送 100 RP" },
        { id: "green_008", name: "自带经费", description: "手头有几个小基金，够买几个月云计算额度", effect: { type: "starting_bonus", target: "colab", value: 1 }, effect_text: "开局赠送 1 个 Colab 会员" },
        { id: "green_009", name: "人脉尚可", description: "认识几个审稿人，虽然不一定愿意帮忙", effect: { type: "additive", target: "submission_rate", value: 0.01 }, effect_text: "投稿成功率 +1%" },
        { id: "green_010", name: "心态平和", description: "论文被拒从不发火，只会说'没关系，换个会投'", effect: { type: "multiplier", target: "rebuttal_penalty", value: 0.9 }, effect_text: "Rebuttal 失败惩罚 -10%" },
        { id: "green_011", name: "偶尔请客", description: "组会后偶尔请吃饭，虽然要AA但至少他付大头", effect: { type: "multiplier", target: "coffee", value: 1.10 }, effect_text: "咖啡产出 +10%" },
        { id: "green_012", name: "脾气温和", description: "从不骂学生，最狠的话是'这个结果有点意思'", effect: { type: "multiplier", target: "undergrad", value: 1.08 }, effect_text: "本科生产出 +8%" },
        { id: "green_013", name: "守时守信", description: "开会准时到，承诺的 DDL 也从不提前", effect: { type: "multiplier", target: "manual_click", value: 1.03 }, effect_text: "手动点击产出 +3%" },
        { id: "green_014", name: "基础扎实", description: "至少能看懂你 paper 里的公式，虽然不一定能推导", effect: { type: "multiplier", target: "global_rp", value: 1.01 }, effect_text: "全局 RP 产出 +1%" },
        { id: "green_015", name: "善于倾听", description: "愿意听你抱怨科研压力，虽然解决方案是'再坚持坚持'", effect: { type: "starting_bonus", target: "rp", value: 80 }, effect_text: "开局赠送 80 RP" },
        { id: "green_016", name: "记性尚可", description: "能记住你的名字和研究方向，这已经很不容易了", effect: { type: "multiplier", target: "undergrad", value: 1.05 }, effect_text: "本科生产出 +5%" },
        { id: "green_017", name: "从不甩锅", description: "出了问题从不怪学生，虽然也不帮你解决", effect: { type: "multiplier", target: "rebuttal_penalty", value: 0.92 }, effect_text: "Rebuttal 失败惩罚 -8%" },
        { id: "green_018", name: "会议常客", description: "每年去好几个会，虽然主要是为了旅游", effect: { type: "multiplier", target: "global_rp", value: 1.015 }, effect_text: "全局 RP 产出 +1.5%" }
    ],

    blue: [
        { id: "blue_001", name: "大方慷慨", description: "报销从不拖欠，GPU 额度也愿意多批一点", effect: { type: "multiplier", target: "compute_facilities", value: 1.08 }, effect_text: "算力类设施产出 +8%" },
        { id: "blue_002", name: "资源丰富", description: "办公室角落有几块吃灰的 GPU，愿意借你用", effect: { type: "starting_bonus", target: "3090", value: 1 }, effect_text: "开局赠送 1 个二手 3090" },
        { id: "blue_003", name: "指导有方", description: "改稿有建设性意见，不是那种只会说'再改改'的类型", effect: { type: "multiplier", target: "global_rp", value: 1.06 }, effect_text: "全局 RP 产出 +6%" },
        { id: "blue_004", name: "论文高产", description: "每年至少十篇打底，虽然大部分是挂名的", effect: { type: "additive", target: "paper_bonus", value: 0.02 }, effect_text: "每篇论文额外 +2% 全局产出" },
        { id: "blue_005", name: "审稿老手", description: "当了十年 reviewer，深谙审稿人心理", effect: { type: "additive", target: "submission_rate", value: 0.03 }, effect_text: "投稿成功率 +3%" },
        { id: "blue_006", name: "工程出身", description: "PhD 之前写过几年代码，至少能帮你 debug", effect: { type: "multiplier", target: "claude_code", value: 1.15 }, effect_text: "Claude Code 产出 +15%" },
        { id: "blue_007", name: "圈内混脸", description: "虽然不是大佬但认识很多大佬，愿意帮你引荐", effect: { type: "multiplier", target: "collaborator", value: 1.10 }, effect_text: "大佬合作者产出 +10%" },
        { id: "blue_008", name: "乐于助人", description: "愿意帮学生找工作、写推荐信，不收隐性学术债", effect: { type: "starting_bonus", target: "rp", value: 300 }, effect_text: "开局赠送 300 RP" },
        { id: "blue_009", name: "偶有灵感", description: "有时能给出不错的 idea，虽然大部分时候是'你自己想想'", effect: { type: "multiplier", target: "manual_click", value: 1.12 }, effect_text: "手动点击产出 +12%" },
        { id: "blue_010", name: "财务自由", description: "横向收入可观，不太在乎经费，花钱比较大方", effect: { type: "multiplier", target: "facility_cost", value: 0.97 }, effect_text: "设施购买折扣 3%" },
        { id: "blue_011", name: "开明包容", description: "允许你做 side project，只要能发出 paper 就行", effect: { type: "multiplier", target: "offline", value: 1.12 }, effect_text: "离线收益 +12%" },
        { id: "blue_012", name: "态度积极", description: "被拒稿不气馁，总说'审稿人瞎了眼'然后鼓励你继续投", effect: { type: "multiplier", target: "rebuttal_penalty", value: 0.80 }, effect_text: "Rebuttal 失败惩罚 -20%" },
        { id: "blue_013", name: "效率极高", description: "改稿速度快，不会把你的稿子压两个月", effect: { type: "multiplier", target: "submission_cost", value: 0.95 }, effect_text: "投稿 RP 消耗 -5%" },
        { id: "blue_014", name: "学生优先", description: "一作永远给学生，自己只挂通讯", effect: { type: "multiplier", target: "global_rp", value: 1.05 }, effect_text: "全局 RP 产出 +5%" },
        { id: "blue_015", name: "关系融洽", description: "组里氛围好，没有勾心斗角，大家愿意互相帮忙", effect: { type: "multiplier", target: "academic_facilities", value: 1.08 }, effect_text: "学术/人力类设施产出 +8%" },
        { id: "blue_016", name: "经验丰富", description: "见过太多 Reviewer #2，知道怎么怼回去", effect: { type: "multiplier", target: "rebuttal_bonus", value: 1.10 }, effect_text: "Rebuttal 成功加成 +10%" },
        { id: "blue_017", name: "适度催促", description: "会催进度但有分寸，不会天天追着你要结果", effect: { type: "multiplier", target: "manual_click", value: 1.10 }, effect_text: "手动点击产出 +10%" },
        { id: "blue_018", name: "英语流利", description: "能帮你润色 paper，至少语法错误会少很多", effect: { type: "additive", target: "submission_rate", value: 0.02 }, effect_text: "投稿成功率 +2%" },
        { id: "blue_019", name: "思路清晰", description: "讨论问题思路清晰，不会把你绕晕", effect: { type: "multiplier", target: "global_rp", value: 1.04 }, effect_text: "全局 RP 产出 +4%" }
    ],

    purple: [
        { id: "purple_001", name: "小有名气", description: "在小同行圈子里有点地位，审稿人看到名字会客气三分", effect: { type: "additive", target: "submission_rate", value: 0.06 }, effect_text: "投稿成功率 +6%" },
        { id: "purple_002", name: "算力充裕", description: "有自己的小集群，二十几张卡随便你用", effect: { type: "multiplier", target: "compute_facilities", value: 1.18 }, effect_text: "算力类设施产出 +18%" },
        { id: "purple_003", name: "嗅觉敏锐", description: "总能找到热点方向，虽然有时候追得太晚", effect: { type: "multiplier", target: "global_rp", value: 1.10 }, effect_text: "全局 RP 产出 +10%" },
        { id: "purple_004", name: "文笔老辣", description: "改稿一针见血，能把你的车轱辘话改成人话", effect: { type: "additive", target: "submission_rate", value: 0.05 }, effect_text: "投稿成功率 +5%" },
        { id: "purple_005", name: "组会高效", description: "组会从不废话，半小时结束，剩下时间自己干活", effect: { type: "multiplier", target: "manual_click", value: 1.20 }, effect_text: "手动点击产出 +20%" },
        { id: "purple_006", name: "慧眼识珠", description: "招的本科生都是卷王，干活又快又好", effect: { type: "multiplier", target: "undergrad", value: 1.25 }, effect_text: "本科生产出 +25%" },
        { id: "purple_007", name: "业界人脉", description: "认识大厂的人，能帮你搞到免费 GPU 额度", effect: { type: "starting_bonus", target: "h100", value: 1 }, effect_text: "开局赠送 1 个 H100 集群" },
        { id: "purple_008", name: "代码洁癖", description: "要求代码整洁可复现，逼着你养成好习惯", effect: { type: "multiplier", target: "claude_code", value: 1.30 }, effect_text: "Claude Code 产出 +30%" },
        { id: "purple_009", name: "经费充足", description: "横向纵向都有，买设备从不手软", effect: { type: "multiplier", target: "facility_cost", value: 0.92 }, effect_text: "设施购买折扣 8%" },
        { id: "purple_010", name: "佛系大佬", description: "自己已经 tenure 了，不需要卷学生", effect: { type: "multiplier", target: "offline", value: 1.20 }, effect_text: "离线收益 +20%" },
        { id: "purple_011", name: "德高望重", description: "开会坐前排，审稿人不敢随便给差评", effect: { type: "multiplier", target: "collaborator", value: 1.20 }, effect_text: "大佬合作者产出 +20%" },
        { id: "purple_012", name: "通情达理", description: "能协调毕业时间，不会卡着你不让走", effect: { type: "multiplier", target: "rebuttal_penalty", value: 0.65 }, effect_text: "Rebuttal 失败惩罚 -35%" },
        { id: "purple_013", name: "眼光独到", description: "总能找到好问题，不做已经被做烂的方向", effect: { type: "multiplier", target: "global_rp", value: 1.08 }, effect_text: "全局 RP 产出 +8%" },
        { id: "purple_014", name: "护犊情深", description: "愿意和审稿人 battle，为学生争取利益", effect: { type: "additive", target: "submission_rate", value: 0.04 }, effect_text: "投稿成功率 +4%" },
        { id: "purple_015", name: "热衷分享", description: "经常介绍实习、工作机会，真心希望学生发展好", effect: { type: "starting_bonus", target: "rp", value: 600 }, effect_text: "开局赠送 600 RP" },
        { id: "purple_016", name: "口碑极佳", description: "业内 respected，合作者愿意多花时间帮忙", effect: { type: "additive", target: "paper_bonus", value: 0.03 }, effect_text: "每篇论文额外 +3% 全局产出" },
        { id: "purple_017", name: "务实高效", description: "不搞形式主义，组里没有无意义的杂活", effect: { type: "multiplier", target: "academic_facilities", value: 1.15 }, effect_text: "学术/人力类设施产出 +15%" },
        { id: "purple_018", name: "名门正派", description: "学术谱系好，师承脉络清晰", effect: { type: "additive", target: "inflation_reduction", value: -0.005 }, effect_text: "通胀系数 -0.005" }
    ],

    gold: [
        { id: "gold_001", name: "开山鼻祖", description: "深度学习早期入场，圈子里都是老朋友", effect: { type: "multiplier", target: "global_rp", value: 1.18 }, effect_text: "全局 RP 产出 +18%" },
        { id: "gold_002", name: "算力之王", description: "手里有几百张卡，训个 7B 模型跟玩一样", effect: { type: "multiplier", target: "compute_facilities", value: 1.35 }, effect_text: "算力类设施产出 +35%" },
        { id: "gold_003", name: "学术世家", description: "导师的导师是图灵奖得主，自带 debuff 免疫", effect: { type: "additive", target: "submission_rate", value: 0.10 }, effect_text: "投稿成功率 +10%" },
        { id: "gold_004", name: "灌水圣手", description: "论文数量三位数，投稿命中率高得离谱", effect: { type: "additive", target: "paper_bonus", value: 0.05 }, effect_text: "每篇论文额外 +5% 全局产出" },
        { id: "gold_005", name: "审稿霸主", description: "Area Chair 当到手软，审稿人看到名字直接躺平", effect: { type: "multiplier", target: "rebuttal_bonus", value: 1.30 }, effect_text: "Rebuttal 成功加成 +30%" },
        { id: "gold_006", name: "资本加持", description: "融了几轮资金，实验室比创业公司还有钱", effect: { type: "multiplier", target: "facility_cost", value: 0.85 }, effect_text: "设施购买折扣 15%" },
        { id: "gold_007", name: "预印本狂魔", description: "arXiv 刷屏常客，每周都有新 paper", effect: { type: "multiplier", target: "arxiv", value: 1.40 }, effect_text: "arXiv 灌水机产出 +40%" },
        { id: "gold_008", name: "本科收割", description: "招生能力惊人，清北本科随便挑", effect: { type: "multiplier", target: "undergrad", value: 1.50 }, effect_text: "本科生产出 +50%" },
        { id: "gold_009", name: "学阀网络", description: "小同行大半是自己学生，审稿基本是自家人", effect: { type: "additive", target: "submission_rate", value: 0.08 }, effect_text: "投稿成功率 +8%" },
        { id: "gold_010", name: "工程之神", description: "代码质量比工业界还高，GitHub star 五位数", effect: { type: "multiplier", target: "claude_code", value: 1.50 }, effect_text: "Claude Code 产出 +50%" },
        { id: "gold_011", name: "顶会常客", description: "每个顶会都有 paper，有时候还不止一篇", effect: { type: "multiplier", target: "global_rp", value: 1.15 }, effect_text: "全局 RP 产出 +15%" },
        { id: "gold_012", name: "财大气粗", description: "经费花不完，年底要突击消费", effect: { type: "additive", target: "inflation_reduction", value: -0.012 }, effect_text: "通胀系数 -0.012" },
        { id: "gold_013", name: "效率狂魔", description: "组会十五分钟结束，剩下时间全是干货讨论", effect: { type: "multiplier", target: "manual_click", value: 1.35 }, effect_text: "手动点击产出 +35%" },
        { id: "gold_014", name: "桃李满园", description: "学生都很厉害，毕业去向清一色大厂和名校", effect: { type: "multiplier", target: "academic_facilities", value: 1.28 }, effect_text: "学术/人力类设施产出 +28%" },
        { id: "gold_015", name: "人形集群", description: "自带 GPU 资源入场，实验从不排队", effect: { type: "starting_bonus", target: "h100", value: 2 }, effect_text: "开局赠送 2 个 H100 集群" },
        { id: "gold_016", name: "风口冲浪", description: "每个热点都踩中，从 GAN 到 Diffusion 到 LLM", effect: { type: "multiplier", target: "global_rp", value: 1.20 }, effect_text: "全局 RP 产出 +20%" },
        { id: "gold_017", name: "量产机器", description: "论文产出惊人，组里永远有十几篇在投", effect: { type: "multiplier", target: "chinese_conf", value: 1.40 }, effect_text: "中文三大会产出 +40%" },
        { id: "gold_018", name: "圈内顶流", description: "Twitter 粉丝六位数，发个推就能上新闻", effect: { type: "multiplier", target: "collaborator", value: 1.35 }, effect_text: "大佬合作者产出 +35%" }
    ],

    red: [
        { id: "red_001", name: "疯狂内卷", description: "Push 程度令人发指，每天工作十六小时是基本要求", effect: { positive: { type: "multiplier", target: "global_rp", value: 1.28 }, negative: { type: "disable", target: "offline" } }, effect_text: "全局 RP +28%，但离线收益完全失效" },
        { id: "red_002", name: "唯一作者", description: "极度在意排名，第一作者必须是你但其他位置不能有人", effect: { positive: { type: "additive", target: "submission_rate", value: 0.12 }, negative: { type: "multiplier", target: "academic_facilities", value: 0.75 } }, effect_text: "投稿成功率 +12%，但学术/人力类设施产出 -25%" },
        { id: "red_003", name: "永不下班", description: "凌晨三点发邮件是常态，周末开组会是传统", effect: { positive: { type: "multiplier", target: "manual_click", value: 1.55 }, negative: { type: "multiplier", target: "offline_cap", value: 0.5 } }, effect_text: "手动点击产出 +55%，但离线收益上限减半" },
        { id: "red_004", name: "算力偏执", description: "相信一切问题都能用更多 GPU 解决，人力不重要", effect: { positive: { type: "multiplier", target: "compute_facilities", value: 1.45 }, negative: { type: "multiplier", target: "academic_facilities", value: 0.80 } }, effect_text: "算力类设施产出 +45%，但学术/人力类设施产出 -20%" },
        { id: "red_005", name: "完美主义", description: "改稿改到天荒地老，0.1% 的提升都要追", effect: { positive: { type: "additive", target: "submission_rate", value: 0.08 }, negative: { type: "additive", target: "rebuttal_questions", value: 1 } }, effect_text: "投稿成功率 +8%，但 Rebuttal 题数 +1" },
        { id: "red_006", name: "压榨专家", description: "对本科生极其严苛，但产出确实高", effect: { positive: { type: "multiplier", target: "undergrad", value: 1.70 }, negative: { type: "multiplier", target: "manual_click", value: 0.75 } }, effect_text: "本科生产出 +70%，但手动点击产出 -25%" },
        { id: "red_007", name: "快速迭代", description: "追求快速投稿，质量不够数量来凑", effect: { positive: { type: "multiplier", target: "submission_cost", value: 0.65 }, negative: { type: "additive", target: "submission_rate", value: -0.05 } }, effect_text: "投稿 RP 消耗 -35%，但投稿成功率 -5%" },
        { id: "red_008", name: "人脉至上", description: "花大量时间 social，实际科研时间反而少了", effect: { positive: { type: "multiplier", target: "collaborator", value: 1.55 }, negative: { type: "additive", target: "inflation_increase", value: 0.02 } }, effect_text: "大佬合作者产出 +55%，但通胀系数 +0.02" },
        { id: "red_009", name: "卷王附体", description: "带着学生一起卷，不卷不舒服斯基", effect: { positive: { type: "multiplier", target: "global_rp", value: 1.32 }, negative: { type: "disable", target: "offline" } }, effect_text: "全局 RP +32%，但离线收益完全失效" },
        { id: "red_010", name: "学阀作风", description: "圈子里说一不二，但得罪的人也不少", effect: { positive: { type: "additive", target: "submission_rate", value: 0.10 }, negative: { type: "multiplier", target: "facility_cost", value: 1.18 } }, effect_text: "投稿成功率 +10%，但设施购买价格 +18%" },
        { id: "red_011", name: "重器轻人", description: "相信硬件决定一切，软实力都是虚的", effect: { positive: { type: "multiplier", target: "compute_facilities", value: 1.40 }, negative: { type: "multiplier", target: "academic_facilities", value: 0.75 } }, effect_text: "算力类设施产出 +40%，但学术/人力类设施产出 -25%" },
        { id: "red_012", name: "结果导向", description: "只看最终数字，过程不重要，失败了后果自负", effect: { positive: { type: "multiplier", target: "global_rp", value: 1.25 }, negative: { type: "multiplier", target: "rebuttal_penalty", value: 2.0 } }, effect_text: "全局 RP +25%，但 Rebuttal 失败惩罚翻倍" },
        { id: "red_013", name: "吹毛求疵", description: "追求完美到病态，投稿前要改二十遍", effect: { positive: { type: "additive", target: "submission_rate", value: 0.09 }, negative: { type: "multiplier", target: "submission_cost", value: 1.30 } }, effect_text: "投稿成功率 +9%，但投稿 RP 消耗 +30%" },
        { id: "red_014", name: "挥金如土", description: "花钱大方但不管时间成本，学生自己想办法", effect: { positive: { type: "multiplier", target: "facility_cost", value: 0.78 }, negative: { type: "multiplier", target: "offline", value: 0.50 } }, effect_text: "设施购买折扣 22%，但离线收益 -50%" },
        { id: "red_015", name: "肝帝本尊", description: "自己也是工作狂，以身作则带着大家肝", effect: { positive: { type: "multiplier", target: "manual_click", value: 1.65 }, negative: { type: "disable", target: "offline" } }, effect_text: "手动点击产出 +65%，但离线收益完全失效" },
        { id: "red_016", name: "人海战术", description: "相信人多力量大，但算力永远不够用", effect: { positive: { type: "multiplier", target: "academic_facilities", value: 1.40 }, negative: { type: "multiplier", target: "compute_facilities", value: 0.72 } }, effect_text: "学术/人力类设施产出 +40%，但算力类设施产出 -28%" },
        { id: "red_017", name: "极限压缩", description: "时间管理大师，但学生心理健康不在考虑范围", effect: { positive: { type: "additive", target: "inflation_reduction", value: -0.018 }, negative: { type: "additive", target: "rebuttal_questions", value: 2 } }, effect_text: "通胀系数 -0.018，但 Rebuttal 题数 +2" },
        { id: "red_018", name: "魔鬼训练", description: "高压环境出人才，但不是所有人都能撑下来", effect: { positive: { type: "multiplier", target: "global_rp", value: 1.22 }, negative: { type: "multiplier", target: "rebuttal_bonus", value: 0.70 } }, effect_text: "全局 RP +22%，但 Rebuttal 成功加成 -30%" }
    ]
};
