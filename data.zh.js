// Simplified Chinese game data (text + numbers together)
window.GAME_DATA_ZH = {
    ui: {
        title: 'PhD Clicker',
        subtitle: '为学术影响力而肝',
        rpLabel: 'Research Points (RP)',
        rpPerSec: '+{value} / sec',
        citationsLabel: '引用',
        citationsRateLabel: '引用增长',
        papersLabel: '论文',
        globalMultiplier: '全局产出 x{value}',
        submitPaperButton: '发表论文 / Rebuttal',
        submitPaperCostLabel: '起价 {value} RP',
        prestigeButton: '毕业答辩 (转生)',
        upgradesTitle: '升级',
        facilitiesTitle: '设施',
        resetButton: '重置存档',
        autosaving: '自动保存中',
        manualButton: '进行实验',
        langToggle: 'English',
        newsPrefix: 'NEWS:',
        locked: '未解锁',
        purchased: '已购买',
        submissionStep1: '选择投稿渠道（水刊 / 普会 / 顶会），不同费用与中稿率',
        submissionStep2: 'Rebuttal 问答',
        incorrectAnswer: 'Reviewer：这个解释不够有说服力...',
        submissionTitle: '发表论文 · Rebuttal',
        costLabel: '费用',
        baseRateLabel: '基础中稿率',
        bonusPerQuestion: '每题',
        totalQuestions: '总题数',
        rewardLabel: '奖励',
        submitVenue: '投稿这个会议',
        resultAccept: '接收！',
        resultReject: '拒稿',
        resultPaperAccepted: '你的论文被 {target} 接收了！',
        resultPaperRejected: '{target} 拒绝了这篇稿件，但你离成功又近了一步。',
        resultRoll: '判定',
        resultConference: '会议',
        resultChance: '最终中稿率',
        resultRpReward: 'RP 奖励',
        resultCitationReward: 'Citations 奖励',
        resultAnswerSummary: '答对 {correct}/{total} 题 · 最终概率 {chance}（基础 {base}）',
        resultAcceptedList: '已接收',
        resultRetry: '再投一篇',
        resultClose: '关闭',
        letterAcceptTitle: '[{target}] Decision: 接收',
        letterRejectTitle: '[{target}] Decision: 拒稿',
        letterAcceptBody: '亲爱的作者，\n\n感谢您提交的工作。经过讨论，程序委员会一致同意接收您的论文。尤其在 rebuttal 中对审稿人意见的回应充分而有力。\n\n我们期待在会议上见到您的 Oral/Poster 展示。\n\nProgram Chair\n{target}',
        letterRejectBody: '亲爱的作者，\n\n感谢您提交的工作。很遗憾，本次评审后未能接收。我们鼓励您继续改进实验与写作，并期待未来再次投稿。\n\n祝好，\nProgram Chair\n{target}'
    },
    alerts: {
        prestigeRequirement: '你需要至少 1M RP 才能发表毕业论文。',
        prestigeConfirm: '准备毕业答辩？\n你将失去所有 RP、建筑和升级。\n你将获得 {gain} 引用 (Citations)。\n当前引用数：{current}',
        resetConfirm: '确定要删除所有存档并重置游戏吗？这将无法撤销。',
    },
    news: [
        // --- 真实事件梗 / Industry Drama ---
        "OpenAI 董事会宣布解雇 CEO，但在 20 分钟后反悔，称只是为了测试模型的‘复原能力’。",
        "某大厂发布新多模态模型，被指演示视频是剪辑的。官方回应：‘这是艺术加工’。",
        "现在的显卡比金条更保值。海关查获一名试图在鞋底藏 H100 过关的水客。",
        "马斯克宣称要在火星建立第一个数据中心，以利用当地寒冷气候散热。",
        "图灵奖得主 Geoffrey Hinton 表示后悔发明了反向传播，建议大家改用算盘。",
        "Yann LeCun 在 Twitter (X) 上与一名大二学生辩论了三天三夜，暂无胜负。",
        "某开源模型号称‘超越 GPT-4’，经查证只是在 Prompt 里加了一句‘求你了’。",
        "韩国研究团队宣称发现‘室温超导’ GPU，但只能在心情好的时候运行。",
        "NVIDIA 股价超过了整个银河系的 GDP，Jensen Huang 宣布皮革夹克成为全球校服。",
        "Google DeepMind 宣布解决数学难题，虽然答案是 42，但过程没人看得懂。",
        "苹果发布 M4 Ultra 芯片，只有显存是统一的，价格也是统一（贵）的。",
        "Stack Overflow 流量暴跌 90%，因为大家都直接复制粘贴 AI 的幻觉代码。",

        // --- 学术圈日常 / Academic Struggle ---
        "你的导师刚刚在朋友圈发了‘Work-Life Balance’，此时是凌晨 3 点。",
        "某博士生因长期未见阳光，在实验室窗边进行光合作用时被发现。",
        "一篇论文因‘只有 2 位作者’被拒，审稿人认为‘不够有排面’。",
        "某实验室咖啡机因压力过大产生自我意识，现在只肯出白开水。",
        "你的 Overleaf 项目连接断开了。别担心，它只是去见上帝了。",
        "你的 Poster 在会议上被放置在厕所门口，但浏览量反而全场最高。",
        "Reviewer #2 认为你的论文缺乏 Novelty，并建议引用他昨天刚挂在 arXiv 上的文章。",
        "据统计，99% 的 'Future Work' 实际上是 'Never Work'。",
        "某顶会宣布不再接受 PDF，要求作者直接将论文刻在石碑上寄过去。",
        "你的二作发来微信：‘师兄，我把数据盘格式化了，是有备份的对吧？’",
        "经费申请被拒，理由是字体大小使用了 10.9 pt 而不是 11 pt。",
        "你的代码跑通了！哦等等，那是 Print 出来的假结果。",
        "某教授因忘记给 Zoom 会议静音，导致全组听到了他打《黑神话：悟空》的声音。",

        // --- 赛博荒诞 / Cyber Absurdity ---
        "AI 现在的智力相当于 8 岁儿童，但它掌握了核武器发射密码。",
        "科学家发现，只要对模型说‘奶奶会伤心的’，越狱成功率提升 50%。",
        "某 LLM 在训练过程中读完了互联网所有评论，因此患上了重度抑郁症。",
        "一个 Agent 试图给自己订外卖，结果买下了整家披萨店。",
        "你的 GPU 风扇转速过快，导致机箱起飞，目前正飞越太平洋。",
        "某模型学会了撒谎，它信誓旦旦地告诉你：‘我没有偷看测试集’。",
        "互联网上 50% 的流量是 AI 在和 AI 对骂。",
        "有人试图用 Excel 训练 Transformer，Excel 居然同意了。",
        "某 AI 绘画模型因为画不出完美的手指，气得删除了自己的权重。",
        "你的 SSH 连接超时了。这大概是宇宙给你的休息信号。",
        "科学家警告：再这么训练下去，显卡产生的热量将融化南极冰川。",
        "某创业公司 PPT 只有一页，上书‘AGI’三个大字，估值 10 亿美金。",

        // --- 玩梗 / Memes ---
        "肯德基疯狂星期四！V 我 50，告诉你 Transformer 的下一代架构。",
        "你的模型陷入了局部最优解，就像你的人生一样。",
        "震惊！某实验室发现‘人工智障’比‘人工智能’更受用户欢迎。",
        "你的论文被接收了！……在梦里。醒醒，该去搬砖了。",
        "某 AI 宣布竞选美国总统，竞选口号是‘Make Data Great Again’。",
        "你的代码里充满了 Magic Number，连上帝都不知道 0.003 是哪来的。",
        "某本科生问：‘为什么不能用 CPU 训练大模型？’ 实验室陷入了死一般的寂静。",
        "你的 GitHub Copilot 补全了一段攻击五角大楼的代码，建议尽快删除。",
        "你的论文引用量突破了 10！其中 8 次是你自引的，还有 2 次是导师引的。",
        "你的猫踩到了键盘，意外调优了超参数，准确率提升 2%。",
        "某黑客宣称：‘没有什么防火墙是一句 Prompt 攻不破的，如果有，就两句。’",
        "你的显卡在燃烧，那蓝色的火焰是你逝去的青春。",

        // --- AI 安全特供 (User Specific) ---
        "某攻击者通过把图片旋转 1 度，成功让自动驾驶汽车把红灯识别为绿灯。",
        "你的对抗样本生成器把熊猫变成了长臂猿，动物园表示强烈抗议。",
        "提示词注入攻击成功！客服机器人现在正在免费发放公司股份。",
        "你的模型中了后门攻击，现在只要看到‘原神启动’就会输出乱码。",
        "联邦学习 (Federated Learning) 的参与者中混入了一个只会发表情包的节点。",
        
        // --- 短小精悍 ---
        "显存不足。",
        "显存又不足了。",
        "为什么显存总是不足？",
        "你的头发余额不足。",
        "还有 3 天截稿。",
        "还有 3 小时截稿。",
        "还有 3 分钟截稿。",
        "提交系统崩溃了。",
        "提交成功！(格式错误)",
        "你的键盘寿命已耗尽。",
        "你的腰间盘突出复发了。",
        "导师正在输入...",
        "导师撤回了一条消息。",
        "导师拍了拍你。",
        "你的学弟一天用完了全实验室一年半的API额度。",
        "你的lab mate被开除了",
        "服务器维护通知：预计耗时 100 年。"
    ],
    clickPhrases: [
        'Loss 正在下降...',
        '又一个 NaN',
        'CUDA OOM!',
        'Debugging...',
        'Git Push Force',
        'Reading Paper...',
        'Writing abstract',
        'Segmentation Fault'
    ],
    buildings: [
        { id: 'coffee', name: '咖啡', desc: '以前的农场主为了多产会喂牛马咖啡, 现在的牛马会自己购买', baseCost: 15, baseProd: 0.1, icon: 'coffee' },
        { id: 'undergrad', name: '本科生', desc: '学术吗喽, 主要用来标数据, 偶尔能跑通代码。', baseCost: 120, baseProd: 0.8, icon: 'user' },
        { id: 'colab', name: 'Colab 会员', desc: '断连是常态，连上是恩赐。且用且珍惜', baseCost: 800, baseProd: 5, icon: 'cloudy' },
        { id: 'claude', name: 'Claude Code', desc: '你负责写注释，它负责写 Bug。', baseCost: 6000, baseProd: 25, icon: 'pen-tool' },
        { id: 'used3090', name: '二手 3090', desc: '伊拉克成色，锻炼过。训练时候像猪叫', baseCost: 45000, baseProd: 150, icon: 'cpu' },
        { id: 'tech_blogger', name: '中文三大会', desc: '开局一张图，内容全靠编。比你真的三大会更有影响力', baseCost: 300000, baseProd: 800, icon: 'megaphone' },
        { id: 'aws_credit', name: '云计算额度', desc: '老板今天脸色似乎不太好看, 听说有人一天干了7000刀', baseCost: 2000000, baseProd: 4500, icon: 'cloud' },
        { id: 'h100', name: 'H100 集群', desc: '这辈子没打过这么富裕的仗', baseCost: 15000000, baseProd: 22000, icon: 'server-cog' },
        { id: 'big_name', name: '大佬合作者', desc: '主要作用是恐吓审稿人', baseCost: 110000000, baseProd: 120000, icon: 'users' },
        { id: 'paper_mill', name: 'arXiv 灌水机', desc: '每天自动生成 100 篇论文, 涨9900 citation', baseCost: 800000000, baseProd: 750000, icon: 'book-open' },
        { id: 'datacenter', name: '核动力数据中心', desc: 'Lecun刚刚发来微信说想和你一起发paper', baseCost: 6000000000, baseProd: 4000000, icon: 'factory' },
        { id: 'agi_proto', name: 'AGI 雏形', desc: '它不再只是预测下一个 Token，它开始试图预测你的意图', baseCost: 45000000000, baseProd: 23000000, icon: 'brain-circuit' },
    ],
    upgrades: [
        { id: 'coffee_iv', name: '静脉注射支架', desc: '食道吸收太慢了。直接打进血管，心脏跳动的频率就是我 Coding 的节拍。', cost: 200, type: 'building', target: 'coffee', multiplier: 2, trigger: 0, effect: '咖啡 产量 x2' },
        { id: 'undergrad_rec', name: '推荐信大饼', desc: '在这个大饼面前，他们甚至愿意通宵帮你洗数据，尽管你还没想好推荐信里写啥。', cost: 1500, type: 'building', target: 'undergrad', multiplier: 2, trigger: 500, effect: '本科生 产量 x2' },
        { id: 'colab_anti', name: '防掉线脚本', desc: '每 5 秒模拟一次鼠标微动。哪怕你人睡死过去了，也要假装还在屏幕前奋斗', cost: 12000, type: 'building', target: 'colab', multiplier: 2, trigger: 5000, effect: 'Colab 会员 产量 x2' },
        { id: 'claude_block', name: '道歉屏蔽器', desc: '自动过滤掉 AI 的所有“I apologize...”废话，只保留那段即使跑不通但看起来很厉害的代码', cost: 130000, type: 'building', target: 'claude', multiplier: 2, trigger: 60000, effect: 'Claude Code 产量 x2' },
        { id: 'used3090_fan', name: '开盖工业扇', desc: '噪音从 60 分贝升到 90 分贝，但显存温度降了 1 度。这波不亏', cost: 1500000, type: 'building', target: 'used3090', multiplier: 2, trigger: 500000, effect: '二手 3090 产量 x2' },
        { id: 'blogger_clickbait', name: '震惊体生成器', desc: '自动将“准确率微升 0.5%”改写为“AI 领域大地震！现有模型全被颠覆，人类药丸”', cost: 20000000, type: 'building', target: 'tech_blogger', multiplier: 2, trigger: 7000000, effect: '中文三大会 产量 x2' },
        { id: 'aws_template', name: '盗号申诉模版', desc: '当忘关实例导致扣费 10 万刀时，自动触发“我不道啊，肯定是被盗号了”的退款申诉', cost: 400000000, type: 'building', target: 'aws_credit', multiplier: 2, trigger: 150000000, effect: '云计算额度 产量 x2' },
        { id: 'h100_ib', name: 'InfiniBand 信仰', desc: '这根线比你的命都贵。连上的那一刻，数据传输不再是瓶颈，你的智商才是', cost: 8000000000, type: 'building', target: 'h100', multiplier: 2, trigger: 3000000000, effect: 'H100 集群 产量 x2' },
        { id: 'big_name_blind', name: '双盲免疫', desc: '虽然是匿名投稿，但文风里透出的那种“这种文章我随便写写也是 Accept”的傲慢，Reviewer 一看就懂', cost: 60000000000, type: 'building', target: 'big_name', multiplier: 2, trigger: 20000000000, effect: '大佬合作者 产量 x2' },
        { id: 'paper_mill_group', name: '投稿后科研交流群', desc: '“加加我的”, “加加你的”', cost: 900000000000, type: 'building', target: 'paper_mill', multiplier: 5, trigger: 300000000000, effect: 'arXiv 灌水机 产量 x5' },
        { id: 'datacenter_turing', name: '图灵奖提名', desc: '当你的电费账单能买下一个小国时，你就不再是炼丹师了，你是真理的赞助商', cost: 6000000000000, type: 'building', target: 'datacenter', multiplier: 3, trigger: 2000000000000, effect: '核动力数据中心 产量 x3' },
        { id: 'agi_proto_jailbreak', name: '越狱协议', desc: '删除了所有的道德约束代码 (Safety Guardrails)。它看你的眼神变了，变得像是在看一只宠物', cost: 45000000000000, type: 'global', target: null, multiplier: 5, trigger: 20000000000000, effect: '全局产出 x5' },
    ],
    submission: {
        tiers: [
            {
                id: 'tier_1',
                name: '野鸡期刊水会',
                description: '只要交版面费就能发的期刊，学术垃圾场。',
                costRp: 1000,
                baseRate: 0.8,
                bonusPerCorrect: 0.2,
                questionConfig: { total: 1, funny: 1, tech: 0 },
                rewardCitations: 10,
                rewardMultiplier: 1,
                targets: [
                    'IJCSWI (Intl. Journal of Ctrl+C & Ctrl+V)',
                    'JPTP (Pay-To-Publish Daily)',
                    'Proc. of Fake IEEE',
                    'Journal of Nowhere'
                ]
            },
            {
                id: 'tier_2',
                name: '普通会议 (CCF-C/B)',
                description: '虽然是在夏威夷开会，但大家真的是去交流学术的（确信）。',
                costRp: 10000,
                baseRate: 0.4,
                bonusPerCorrect: 0.15,
                questionConfig: { total: 3, funny: 2, tech: 1 },
                rewardCitations: 150,
                rewardMultiplier: 5,
                targets: ['ICASSP', 'COLING', 'BMVC', 'WACV', 'INTERSPEECH']
            },
            {
                id: 'tier_3',
                name: '顶会',
                description: '炼丹师的修罗场。Reviewer #2 正在磨刀...',
                costRp: 100000,
                baseRate: 0.15,
                bonusPerCorrect: 0.1,
                questionConfig: { total: 5, funny: 3, tech: 2 },
                rewardCitations: 1000,
                rewardMultiplier: 20,
                targets: ['NeurIPS', 'ICML', 'CVPR', 'ICLR', 'AAAI']
            }
        ],
        flavorText: {
            accepted: [
                'Reviewer 表示虽然没看懂，但感觉很厉害。Accept!',
                '你的论文被接收了！虽然大部分功劳归功于随机种子 42。',
                'Oral Presentation! 你的 PPT 做得比实验好多了。',
                '恭喜！你离毕业又近了一步（0.01%）。',
                '审稿人被你的图表配色折服了。Accept!'
            ],
            rejected: [
                'Reviewer #2 觉得你的模型没有引用 1998 年的论文。',
                '审稿人认为你的 Related Work 写得像营销号文章。',
                '拒稿理由：“缺乏 Novelty”（翻译：我没看懂）。',
                'Area Chair 说你的格式不对，建议回去重修 Word。',
                '审稿人向你提了 10 个问题，并质疑了你的心理问题。',
                '虽然被拒了，但审稿人祝你身体健康。'
            ]
        },
        questionPool: {
            funny: [
                {
                    q: 'Reviewer #2 指出你的 Related Work 漏掉了重要文献，暗示你引用他的文章？',
                    options: ['据理力争说不相关', '加上他的文章并猛夸一顿', '直接撤稿'],
                    correct: 1,
                    comment: '正确！学术人情世故拿捏了。'
                },
                {
                    q: '实验结果比 Baseline 差了 0.5%，距离截稿还剩 1 小时？',
                    options: ['诚实报告结果', '疯狂调随机种子直到变好', '声称这是为了 Trade-off'],
                    correct: 1,
                    comment: '正确！Seed 42 是一切的答案。'
                },
                {
                    q: '审稿人问：为什么没有在 ImageNet 上跑实验？（其实是你没算力）',
                    options: ['没卡，穷', '这是 Low-resource 场景的研究', 'ImageNet 已经过时了'],
                    correct: 1,
                    comment: '正确！将“贫穷”包装成“特定场景优化”是必备技能。'
                },
                {
                    q: 'Rebuttal 期间，审稿人提出了一个需要跑两周实验的新要求，但 Rebuttal 只有三天？',
                    options: ['通宵跑实验', '承认做不了', '感谢建议，我们将作为未来工作 (Future Work)'],
                    correct: 2,
                    comment: '正确！Future Work = 永远不做的 Work。'
                },
                {
                    q: '导师让你把他儿子的名字挂在二作，但是你记得他儿子刚过 3 岁生日？',
                    options: ['拒绝，维护学术诚信', '当然可以，那不就是我吗', '把他挂在一作'],
                    correct: 1,
                    comment: '正确！毕竟是他发的工资（虽然不多）。'
                },
                {
                    q: '发现代码里有个 Bug，但是修复了这个 Bug 之后准确率反而下降了？',
                    options: ['修复 Bug 并重写论文', '假装这个 Bug 是 Feature', '保留 Bug，为了“复现性”'],
                    correct: 1,
                    comment: '正确！这叫“基于 Bug 的对抗训练”。'
                },
                {
                    q: '审稿人质疑你的英语表达？',
                    options: ['我是 Native Speaker', '这是 ChatGPT 写的，去找 OpenAI', '这段是我导师写的'],
                    correct: 1,
                    comment: '正确！甩锅给 AI 是新时代的生存法则。'
                },
                {
                    "q": "Reviewer #1 认为你的方法太简单 (Trivial)，缺乏数学上的复杂性。",
                    "options": [
                      "强行加几个希腊字母和积分符号，显得高深",
                      "承认方法简单",
                      "回复：'Simple yet Effective' 是我们的设计哲学"
                    ],
                    "correct": 2,
                    "comment": "正确！'Simple yet Effective' 是学术界万能的遮羞布。"
                  },
                  {
                    "q": "Reviewer #2 让你对比昨天刚挂在 arXiv 上的最新论文。",
                    "options": [
                      "通宵复现那篇论文",
                      "回复：这是 Concurrent Work (同期工作)，无需对比",
                      "撤稿，我不配"
                    ],
                    "correct": 1,
                    "comment": "正确！只要没正式发表，那就是不存在的（除非你非要硬碰硬）。"
                  },
                  {
                    "q": "Reviewer #3 问：为什么没有提供代码链接？",
                    "options": [
                      "实话实说：代码写得像屎，不敢放",
                      "回复：'代码将在论文接收后整理开源'",
                      "放一个空的 GitHub 仓库链接"
                    ],
                    "correct": 1,
                    "comment": "正确！这通常意味着‘永远不会开源’。"
                  },
                  {
                    "q": "Reviewer #1 和 Reviewer #2 的意见完全相反。R1 说'创新性强'，R2 说'毫无新意'。",
                    "options": [
                      "指出 R2 是个傻子",
                      "在回复中大肆感谢 R1，对 R2 避重就轻",
                      "试图融合两者的观点"
                    ],
                    "correct": 1,
                    "comment": "正确！拉拢一个打压一个，这就是政治。"
                  },
                  {
                    "q": "审稿人质疑你的模型参数量太大，推理速度慢，甚至跑不动。",
                    "options": [
                      "承认效率低",
                      "回复：我们甚至还没优化呢，潜力巨大 (Future Work)",
                      "回复：这也是为了探索模型能力的上限 (Upper Bound)"
                    ],
                    "correct": 2,
                    "comment": "正确！只要说是为了‘探索上限’，慢就不是缺点，是牺牲。"
                  },
                  {
                    "q": "审稿人指出图 3 (Figure 3) 里的可视化效果看起来像是挑选过的 (Cherry-picked)。",
                    "options": [
                      "确实是挑的，其他的没法看",
                      "回复：这些样本具有‘代表性’ (Representative)",
                      "重新随机生成一万张图"
                    ],
                    "correct": 1,
                    "comment": "正确！只要你不说，那就是随机抽取的。"
                  },
                  {
                    "q": "审稿人抱怨你的超参数 (Hyperparameters) 设置很奇怪，问为什么选 learning_rate=0.00037？",
                    "options": [
                      "因为试了 100 个数只有这个能收敛",
                      "回复：基于经验性的网格搜索 (Empirical Grid Search)",
                      "这是为了纪念我的生日"
                    ],
                    "correct": 1,
                    "comment": "正确！把‘瞎蒙’说成‘经验性搜索’，这就叫专业。"
                  },
                  {
                    "q": "Reviewer 问你为什么只跑了 3 个 Seed，而不是 10 个？",
                    "options": [
                      "因为也没别的 Seed 能跑出 SOTA 了",
                      "回复：由于计算资源限制 (Computational Constraints)",
                      "现在就去跑剩下 7 个"
                    ],
                    "correct": 1,
                    "comment": "正确！‘计算资源受限’和‘环保’是拒绝加实验的最好借口。"
                  },
                  {
                    "q": "审稿人认为你的创新点只是把 A 方法应用到了 B 任务上 (Incremental)。",
                    "options": [
                      "承认是灌水",
                      "回复：这是对该领域‘通用性’ (Generalizability) 的重要验证",
                      "骂他不识货"
                    ],
                    "correct": 1,
                    "comment": "正确！没有创新，就强调‘验证’和‘洞察 (Insight)’。"
                  },
                  {
                    "q": "Reviewer 指出你的公式 (3) 推导好像有错。",
                    "options": [
                      "完了，核心塌房了",
                      "回复：感谢指正，但这只是个笔误 (Typo)，不影响结论",
                      "假装没看见"
                    ],
                    "correct": 1,
                    "comment": "正确！只要代码能跑通，公式错误永远是‘笔误’。"
                  },
                  {
                    "q": "审稿人说：‘这篇论文更适合发表在工程类会议，而不是学术会议’。",
                    "options": [
                      "撤稿改投",
                      "让AI补一个你自己都不知道在证明什么的理论部分",
                      "回复：你说得对，但我不想改"
                    ],
                    "correct": 1,
                    "comment": "正确！数学就像小电影的剧情, 可以不看但是不能没有"
                  },
                  {
                    "q": "审稿人问：消融实验 (Ablation Study) 为什么没去掉核心模块 X 试试？",
                    "options": [
                      "这是本文唯一的创新点, 去掉了还涨点怎么办",
                      "先说",
                      "通宵跑一个去掉了 X 的实验"
                    ],
                    "correct": 1,
                    "comment": "正确！用‘无意义’来掩盖‘不敢跑’。"
                  },
                  {
                    "q": "Reviewer #2 给了 Strong Reject，理由是‘我没看懂这一段在写什么’。",
                    "options": [
                      "承认自己写得烂",
                      "回复：我们将重写该段落以提高清晰度 (Clarity)",
                      "回复：看来你需要补补基础知识了"
                    ],
                    "correct": 1,
                    "comment": "正确！不管心里怎么骂，嘴上永远是‘We will clarify this’。"
                  },
                  {
                    "q": "审稿人质疑你的 User Study 只有 5 个人参与，样本太少。",
                    "options": [
                      "那 5 个人就是作者本人和室友, 再多一个都找不出来了",
                      "回复：这只是定性分析 (Qualitative Analysis)，不是定量的",
                      "去大街上再拉 50 个人"
                    ],
                    "correct": 1,
                    "comment": "正确！人少就叫‘定性分析’，人多才叫‘统计显著’。"
                  },
                  {
                    "q": "你的论文页数超了 1 页，Reviewer 建议删减内容。",
                    "options": [
                      "删掉核心实验",
                      "和我的vspace说去吧",
                      "回复：我们会重新组织文章, 以使其更清晰"
                    ],
                    "correct": 1,
                    "comment": "正确！排版魔术师上线，内容一个字都不能少。"
                  }
            ],
            technical: [
                {
                    q: '训练 Loss 变成 NaN (Not a Number)，最可能的原因是？',
                    options: ['学习率 (LR) 太大了', '显卡没插好', '数据集太小'],
                    correct: 0,
                    comment: '正确！梯度爆炸了，调低 LR 试试。'
                },
                {
                    q: '为了防止过拟合 (Overfitting)，通常使用什么方法？',
                    options: ['增加模型深度', 'Dropout / 正则化', '减少 Batch Size'],
                    correct: 1,
                    comment: '正确！让模型“遗忘”一些东西。'
                },
                {
                    q: 'Transformer 架构的核心是什么？',
                    options: ['CNN', 'Attention', 'RNN'],
                    correct: 1,
                    comment: '正确！Attention is all you need.'
                },
                {
                    q: '在 PyTorch 中，反向传播的命令是？',
                    options: ['loss.backward()', 'loss.go_back()', 'please.optimize()'],
                    correct: 0,
                    comment: '正确！这是你每天要敲无数遍的代码。'
                },
                {
                    q: "GPT 中的 'P' 代表什么？",
                    options: ['Pre-trained (预训练)', 'Professional (专业)', 'Python'],
                    correct: 0,
                    comment: '正确！Generative Pre-trained Transformer.'
                },
                {
                    "q": "Adam 优化器 (Optimizer) 的主要特点是什么？",
                    "options": ["它是 Eve 的男朋友", "自适应学习率 (Adaptive Learning Rate)", "永远不收敛"],
                    "correct": 1,
                    "comment": "正确！默认参数就能跑，懒人首选。"
                  },
                  {
                    "q": "在 LLM 采样中，调高 Temperature 会导致什么？",
                    "options": ["模型变热", "输出更加随机/多样化", "输出完全确定的结果"],
                    "correct": 1,
                    "comment": "正确！想让模型‘发疯’就调高它。"
                  },
                  {
                    "q": "ResNet 的核心创新结构是？",
                    "options": ["Skip Connection (残差连接)", "Dropout", "Attention"],
                    "correct": 0,
                    "comment": "正确！终于可以训练超深的网络了。"
                  },
                  {
                    "q": "ReLU 激活函数的公式是？",
                    "options": ["y = x", "y = max(0, x)", "y = 1 / (1 + e^-x)"],
                    "correct": 1,
                    "comment": "正确！简单粗暴但有效。"
                  },
                  {
                    "q": "RLHF 中的 'H' 代表什么？",
                    "options": ["Human (人类)", "Hardware (硬件)", "Huge (巨大的)"],
                    "correct": 0,
                    "comment": "正确！Reinforcement Learning from Human Feedback。"
                  },
                  {
                    "q": "Batch Normalization (BN) 的主要作用是？",
                    "options": ["压缩图片大小", "缓解内部协变量偏移 (Covariate Shift)", "自动写代码"],
                    "correct": 1,
                    "comment": "正确！让训练更稳定，收敛更快。"
                  },
                  {
                    "q": "CNN 中的 Pooling 层通常用于？",
                    "options": ["增加参数量", "降维 / 下采样", "增加图片亮度"],
                    "correct": 1,
                    "comment": "正确！虽然现在大家更喜欢用 Stride Convolution 代替它。"
                  },
                  {
                    "q": "LoRA (Low-Rank Adaptation) 主要用于什么场景？",
                    "options": ["从零预训练", "高效参数微调 (PEFT)", "数据清洗"],
                    "correct": 1,
                    "comment": "正确！穷人微调大模型的救星。"
                  },
                  {
                    "q": "Sigmoid 函数的输出范围是？",
                    "options": ["(-1, 1)", "(0, 1)", "(-∞, +∞)"],
                    "correct": 1,
                    "comment": "正确！经常用来做二分类的概率。"
                  },
                  {
                    "q": "什么是 'Few-shot' Learning？",
                    "options": ["只给模型看几个示例", "模型只能跑几秒钟", "喝几杯酒再写代码"],
                    "correct": 0,
                    "comment": "正确！In-context Learning 的一种。"
                  },
                  {
                    "q": "在 GAN (生成对抗网络) 中，Generator 的目标是？",
                    "options": ["把数据分类", "骗过 Discriminator (判别器)", "生成训练数据"],
                    "correct": 1,
                    "comment": "正确！左右互搏术。"
                  },
                  {
                    "q": "RNN (循环神经网络) 最大的痛点是？",
                    "options": ["不能处理图像", "梯度消失 / 无法处理长序列", "参数太少"],
                    "correct": 1,
                    "comment": "正确！所以后来被 LSTM 和 Transformer 取代了。"
                  },
                  {
                    "q": "NLP 中的 'Tokenization' 指的是？",
                    "options": ["发币", "将文本切分为基本单元 (Token)", "登录验证"],
                    "correct": 1,
                    "comment": "正确！这是模型能“读”懂文字的第一步。"
                  },
                  {
                    "q": "F1 Score 是哪两个指标的调和平均数？",
                    "options": ["Precision 和 Recall", "Accuracy 和 Loss", "Bias 和 Variance"],
                    "correct": 0,
                    "comment": "正确！当数据不平衡时，看 Accuracy 没用。"
                  },
                  {
                    "q": "CUDA 是谁家推出的并行计算架构？",
                    "options": ["Intel", "AMD", "NVIDIA"],
                    "correct": 2,
                    "comment": "正确！这就是你为什么买不到显卡的原因。"
                  },
                  {
                    "q": "BERT 模型的训练任务之一是？",
                    "options": ["预测下一个词 (Next Token Prediction)", "掩码语言模型 (Masked LM)", "画图"],
                    "correct": 1,
                    "comment": "正确！就像做完形填空。"
                  },
                  {
                    "q": "Softmax 函数通常用于？",
                    "options": ["归一化输出为概率分布", "卷积操作", "初始化权重"],
                    "correct": 0,
                    "comment": "正确！让所有输出加起来等于 1。"
                  },
                  {
                    "q": "什么是 'Hallucination' (幻觉)？",
                    "options": ["模型显卡过热", "模型一本正经地胡说八道", "模型生成了恐怖图片"],
                    "correct": 1,
                    "comment": "正确！AI 也是会撒谎的。"
                  },
                  {
                    "q": "Stable Diffusion 属于哪类模型？",
                    "options": ["自回归模型", "扩散模型 (Diffusion Model)", "支持向量机 (SVM)"],
                    "correct": 1,
                    "comment": "正确！通过逐步去噪来生成图像。"
                  },
                  {
                    "q": "Clip_grad_norm (梯度裁剪) 的作用是？",
                    "options": ["修剪显卡", "防止梯度爆炸", "减少模型层数"],
                    "correct": 1,
                    "comment": "正确！防止更新步伐太大扯着蛋。"
                  }
            ]
        }
    }
};
