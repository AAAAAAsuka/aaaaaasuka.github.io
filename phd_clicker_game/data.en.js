// English game data (text + numbers together)
// window.GAME_DATA_EN = {
//     ui: {
//         title: 'PhD Clicker',
//         subtitle: 'Grind for academic impact',
//         rpLabel: 'Research Points (RP)',
//         rpPerSec: '+{value} / sec',
//         citationsLabel: 'Citations',
//         citationsRateLabel: 'Citation gain',
//         papersLabel: 'Papers',
//         globalMultiplier: 'Global output x{value}',
//         submitPaperButton: 'Submit paper / Rebuttal',
//         submitPaperCostLabel: 'From {value} RP',
//         prestigeButton: 'Defend thesis (prestige)',
//         upgradesTitle: 'Upgrades',
//         facilitiesTitle: 'Facilities',
//         resetButton: 'Reset Save',
//         autosaving: 'Auto-saving',
//         manualButton: 'Run experiment',
//         langToggle: '中文',
//         newsPrefix: 'NEWS:',
//         locked: 'Locked',
//         purchased: 'Owned',
//         submissionStep1: 'Pick your venue (low / regular / top); different costs and acceptance rates',
//         submissionStep2: 'Rebuttal Q&A',
//         incorrectAnswer: 'Reviewer: this argument is not convincing enough...',
//         submissionTitle: 'Submit Paper · Rebuttal',
//         costLabel: 'Cost',
//         baseRateLabel: 'Base accept rate',
//         bonusPerQuestion: 'Per question',
//         totalQuestions: 'Total questions',
//         rewardLabel: 'Reward',
//         submitVenue: 'Submit here',
//         resultAccept: 'Accept!',
//         resultReject: 'Reject',
//         resultPaperAccepted: 'Your paper was accepted by {target}!',
//         resultPaperRejected: '{target} rejected this paper, but you are closer to success.',
//         resultRoll: 'Roll',
//         resultConference: 'Conference',
//         resultChance: 'Final chance',
//         resultRpReward: 'RP reward',
//         resultCitationReward: 'Citations reward',
//         resultAnswerSummary: 'Correct {correct}/{total} · Final chance {chance} (base {base})',
//         resultAcceptedList: 'Accepted',
//         resultRetry: 'Submit another',
//         resultClose: 'Close',
//         letterAcceptTitle: '[{target}] Decision: Accept',
//         letterRejectTitle: '[{target}] Decision: Reject',
//         letterAcceptBody: 'Dear Author,\n\nThank you for your submission. After discussion, the committee decided to accept your paper. Your rebuttal addressed reviewer concerns clearly.\n\nWe look forward to your Oral/Poster at the conference.\n\nProgram Chair\n{target}',
//         letterRejectBody: 'Dear Author,\n\nThank you for submitting. Unfortunately, this round we cannot accept it. We encourage you to improve experiments and writing, and hope to see a future submission.\n\nBest,\nProgram Chair\n{target}'
//     },
//     alerts: {
//         prestigeRequirement: 'You need at least 1M RP to submit your graduation thesis.',
//         prestigeConfirm: 'Ready to defend?\nYou will lose all RP, buildings, and upgrades.\nYou will gain {gain} citations.\nCurrent citations: {current}',
//         resetConfirm: 'Delete all saves and reset the game? This cannot be undone.',
//     },
//     news: [
//         'Breaking: Reviewer #2 rejected another groundbreaking paper...',
//         'Alert: Stack Overflow is down...',
//         'A lab’s GPUs caught fire after mining...',
//         'New study: caffeine is 60% of a PhD student’s bloodstream...',
//         'ICLR deadline is approaching...',
//         'Advisor asks about your progress...',
//         'GitHub Copilot wrote better code than you...',
//         'Your model performs like random guessing on the test set...'
//     ],
//     clickPhrases: [
//         'Loss is dropping...',
//         'Another NaN',
//         'CUDA OOM!',
//         'Debugging...',
//         'Git Push Force',
//         'Reading paper...',
//         'Writing abstract',
//         'Segmentation Fault'
//     ],
//     buildings: [
//         { id: 'coffee', name: 'Coffee', desc: 'Old farmers fed coffee to cattle; modern grad students buy their own', baseCost: 15, baseProd: 0.1, icon: 'coffee' },
//         { id: 'undergrad', name: 'Undergrads', desc: 'Academic minions; great at labeling, sometimes can run code', baseCost: 120, baseProd: 0.8, icon: 'user' },
//         { id: 'colab', name: 'Colab Pro', desc: 'Disconnects are normal; staying connected is a blessing—cherish it', baseCost: 800, baseProd: 5, icon: 'cloudy' },
//         { id: 'claude', name: 'Claude Code', desc: 'You write comments, it writes bugs', baseCost: 6000, baseProd: 25, icon: 'pen-tool' },
//         { id: 'used3090', name: 'Used 3090', desc: 'Iraqi condition, battle-hardened. Screams like a pig during training', baseCost: 45000, baseProd: 150, icon: 'cpu' },
//         { id: 'tech_blogger', name: 'Tech Blogger', desc: 'One picture, zero facts. More influential than real conferences', baseCost: 300000, baseProd: 800, icon: 'megaphone' },
//         { id: 'aws_credit', name: 'Cloud Credits', desc: 'Boss looks upset—rumor says someone burned $10k in a day', baseCost: 2000000, baseProd: 4500, icon: 'cloud' },
//         { id: 'h100', name: 'H100 Cluster', desc: 'Never fought such a rich battle in this lifetime', baseCost: 15000000, baseProd: 22000, icon: 'server-cog' },
//         { id: 'big_name', name: 'Famous Collaborator', desc: 'Main job: intimidate reviewers', baseCost: 110000000, baseProd: 120000, icon: 'users' },
//         { id: 'paper_mill', name: 'arXiv Paper Mill', desc: 'Auto-spawns 100 papers and 900 citations daily', baseCost: 800000000, baseProd: 750000, icon: 'book-open' },
//         { id: 'datacenter', name: 'Nuclear Datacenter', desc: 'Lecun just DM’d asking to co-author a paper', baseCost: 6000000000, baseProd: 4000000, icon: 'factory' },
//         { id: 'agi_proto', name: 'AGI Prototype', desc: 'No longer predicts just the next token—it predicts your intention', baseCost: 45000000000, baseProd: 23000000, icon: 'brain-circuit' },
//     ],
//     upgrades: [
//         { id: 'coffee_iv', name: 'IV Drip', desc: 'Swallowing is too slow. Straight into the veins—heartbeats match your coding rhythm', cost: 200, type: 'building', target: 'coffee', multiplier: 2, trigger: 0, effect: 'Coffee production x2' },
//         { id: 'undergrad_rec', name: 'Strong Rec Promise', desc: 'For a glowing rec letter, they will even pull all-nighters cleaning your data', cost: 1500, type: 'building', target: 'undergrad', multiplier: 2, trigger: 500, effect: 'Undergrads production x2' },
//         { id: 'colab_anti', name: 'Anti-Disconnect Script', desc: 'Simulates a tiny mouse move every 5 seconds so the screen thinks you are still alive', cost: 12000, type: 'building', target: 'colab', multiplier: 2, trigger: 5000, effect: 'Colab Pro production x2' },
//         { id: 'claude_block', name: 'Apology Blocker', desc: 'Filters every “I apologize...” and keeps the impressive-looking code that may not run', cost: 130000, type: 'building', target: 'claude', multiplier: 2, trigger: 60000, effect: 'Claude Code production x2' },
//         { id: 'used3090_fan', name: 'Industrial Fan Mod', desc: 'Noise jumps from 60dB to 90dB, but VRAM temp drops 1°C—worth it', cost: 1500000, type: 'building', target: 'used3090', multiplier: 2, trigger: 500000, effect: 'Used 3090 production x2' },
//         { id: 'blogger_clickbait', name: 'Clickbait Generator', desc: 'Turns “+0.5% accuracy” into “AI earthquake! All models obsolete!”', cost: 20000000, type: 'building', target: 'tech_blogger', multiplier: 2, trigger: 7000000, effect: 'Tech Blogger production x2' },
//         { id: 'aws_template', name: 'Account Hacked Template', desc: 'If you forget to shut down and burn $10k, auto-file the “I was hacked” refund appeal', cost: 400000000, type: 'building', target: 'aws_credit', multiplier: 2, trigger: 150000000, effect: 'Cloud Credits production x2' },
//         { id: 'h100_ib', name: 'InfiniBand Faith', desc: 'This cable costs more than your life. Once connected, bandwidth isn’t the bottleneck—you are', cost: 8000000000, type: 'building', target: 'h100', multiplier: 2, trigger: 3000000000, effect: 'H100 Cluster production x2' },
//         { id: 'big_name_blind', name: 'Blind-Review Immunity', desc: 'Even anonymized, the “I could accept this in my sleep” vibe is obvious to reviewers', cost: 60000000000, type: 'building', target: 'big_name', multiplier: 2, trigger: 20000000000, effect: 'Famous Collaborator production x2' },
//         { id: 'paper_mill_group', name: 'Post-Submission Group', desc: '“Add my WeChat.” “Add yours.”', cost: 900000000000, type: 'building', target: 'paper_mill', multiplier: 5, trigger: 300000000000, effect: 'arXiv Paper Mill production x5' },
//         { id: 'datacenter_turing', name: 'Turing Nomination', desc: 'When your power bill could buy a small country, you’re not a tinkerer—you fund truth', cost: 6000000000000, type: 'building', target: 'datacenter', multiplier: 3, trigger: 2000000000000, effect: 'Nuclear Datacenter production x3' },
//         { id: 'agi_proto_jailbreak', name: 'Jailbreak Protocol', desc: 'Removes every moral guardrail. It looks at you now like a pet', cost: 45000000000000, type: 'global', target: null, multiplier: 5, trigger: 20000000000000, effect: 'Global output x5' },
//     ],
//     submission: {
//         tiers: [
//             {
//                 id: 'tier_1',
//                 name: 'Pay-to-Publish',
//                 description: 'Just pay the fee and you are “in”.',
//                 costRp: 1000,
//                 baseRate: 0.8,
//                 bonusPerCorrect: 0.2,
//                 questionConfig: { total: 1, funny: 1, tech: 0 },
//                 rewardCitations: 10,
//                 rewardMultiplier: 1,
//                 targets: [
//                     'IJCSWI (Intl. Journal of Ctrl+C & Ctrl+V)',
//                     'JPTP (Pay-To-Publish Daily)',
//                     'Proc. of Fake IEEE',
//                     'Journal of Nowhere'
//                 ]
//             },
//             {
//                 id: 'tier_2',
//                 name: 'Regular Conference (CCF-C/B)',
//                 description: 'Technically academic—though the beach is nice.',
//                 costRp: 10000,
//                 baseRate: 0.4,
//                 bonusPerCorrect: 0.15,
//                 questionConfig: { total: 3, funny: 2, tech: 1 },
//                 rewardCitations: 150,
//                 rewardMultiplier: 5,
//                 targets: ['ICASSP', 'COLING', 'BMVC', 'WACV', 'INTERSPEECH']
//             },
//             {
//                 id: 'tier_3',
//                 name: 'Top Conference',
//                 description: 'Reviewer #2 is sharpening the knife.',
//                 costRp: 100000,
//                 baseRate: 0.15,
//                 bonusPerCorrect: 0.1,
//                 questionConfig: { total: 5, funny: 3, tech: 2 },
//                 rewardCitations: 1000,
//                 rewardMultiplier: 20,
//                 targets: ['NeurIPS', 'ICML', 'CVPR', 'ICLR', 'AAAI']
//             }
//         ],
//         flavorText: {
//             accepted: [
//                 'Reviewer said: “I don’t fully get it, but it feels strong.” Accept!',
//                 'Your paper got in! RNG seed 42 deserves half the credit.',
//                 'Oral Presentation! Your slides look better than your experiments.',
//                 'Congrats! You are 0.01% closer to graduation.',
//                 'Reviewers loved your color scheme. Accept!'
//             ],
//             rejected: [
//                 'Reviewer #2: Missing a 1998 citation.',
//                 'Related Work reads like a clickbait blog.',
//                 'Rejection: “Lacks novelty” (translation: I didn’t get it).',
//                 'Area Chair: Wrong formatting, please retake Word class.',
//                 'Reviewer asked 10 questions and questioned your sanity.',
//                 'Rejected, but reviewers wish you good health.'
//             ]
//         },
//         questionPool: {
//             funny: [
//                 {
//                     q: 'Reviewer #2 hints you forgot an “important” citation (his own).',
//                     options: ['Argue it is unrelated', 'Add it and praise heavily', 'Withdraw the paper'],
//                     correct: 1,
//                     comment: 'Correct! Academic politics mastered.'
//                 },
//                 {
//                     q: 'Your results are 0.5% worse than baseline with 1 hour to deadline.',
//                     options: ['Report honestly', 'Shuffle random seeds until it looks good', 'Call it a trade-off'],
//                     correct: 1,
//                     comment: 'Correct! Seed 42 saves the day.'
//                 },
//                 {
//                     q: 'Why no ImageNet experiments? (Truth: no compute)',
//                     options: ['No GPUs, broke', 'Low-resource scenario study', 'ImageNet is outdated'],
//                     correct: 1,
//                     comment: 'Correct! Rebrand poverty as a special setting.'
//                 },
//                 {
//                     q: 'Reviewer asks for a new experiment needing 2 weeks; rebuttal ends in 3 days.',
//                     options: ['Pull all-nighters to run it', 'Admit you can’t', '“Thanks, future work.”'],
//                     correct: 2,
//                     comment: 'Correct! Future work = never.'
//                 },
//                 {
//                     q: 'Advisor wants his 3-year-old son as 2nd author.',
//                     options: ['Refuse to keep integrity', 'Sure, that’s me anyway', 'Make him first author'],
//                     correct: 1,
//                     comment: 'Correct! He pays the bills (barely).'
//                 },
//                 {
//                     q: 'You found a bug; fixing it lowers accuracy.',
//                     options: ['Fix and rewrite paper', 'Call it a feature', 'Keep bug for “reproducibility”'],
//                     correct: 1,
//                     comment: 'Correct! Bug-based adversarial training.'
//                 },
//                 {
//                     q: 'Reviewer questions your English.',
//                     options: ['I am a native speaker', 'ChatGPT wrote that, blame OpenAI', 'My advisor wrote it'],
//                     correct: 1,
//                     comment: 'Correct! Blame AI—it’s trendy.'
//                 }
//             ],
//             technical: [
//                 {
//                     q: 'Training loss becomes NaN. Most likely reason?',
//                     options: ['Learning rate too high', 'GPU not plugged in', 'Dataset too small'],
//                     correct: 0,
//                     comment: 'Correct! Lower the LR to stop exploding gradients.'
//                 },
//                 {
//                     q: 'Common way to prevent overfitting?',
//                     options: ['Deeper model', 'Dropout / regularization', 'Smaller batch size'],
//                     correct: 1,
//                     comment: 'Correct! Let the model forget a bit.'
//                 },
//                 {
//                     q: 'Core of the Transformer architecture?',
//                     options: ['CNN', 'Attention', 'RNN'],
//                     correct: 1,
//                     comment: 'Correct! Attention is all you need.'
//                 },
//                 {
//                     q: 'In PyTorch, the backward call is?',
//                     options: ['loss.backward()', 'loss.go_back()', 'please.optimize()'],
//                     correct: 0,
//                     comment: 'Correct! Muscle memory line.'
//                 },
//                 {
//                     q: "In GPT, the 'P' stands for?",
//                     options: ['Pre-trained', 'Professional', 'Python'],
//                     correct: 0,
//                     comment: 'Correct! Generative Pre-trained Transformer.'
//                 }
//             ]
//         }
//     }
// };

window.GAME_DATA_EN = {
    ui: {
        title: 'PhD Clicker',
        subtitle: 'Grinding for Academic Clout',
        rpLabel: 'Research Points (RP)',
        rpPerSec: '+{value} / sec',
        citationsLabel: 'Citations',
        citationsRateLabel: 'Citation Rate',
        papersLabel: 'Papers',
        globalMultiplier: 'Global Output x{value}',
        submitPaperButton: 'Submit Paper / Rebuttal',
        submitPaperCostLabel: 'Starts at {value} RP',
        prestigeButton: 'Thesis Defense (Rebirth)',
        upgradesTitle: 'Upgrades',
        facilitiesTitle: 'Facilities',
        resetButton: 'Hard Reset',
        autosaving: 'Autosaving...',
        manualButton: 'Run Experiment',
        langToggle: '中文',
        newsPrefix: 'NEWS:',
        locked: 'Locked',
        purchased: 'Purchased',
        submissionStep1: 'Select Venue (Predatory / Mainstream / Top-Tier)',
        submissionStep2: 'Rebuttal Q&A',
        incorrectAnswer: 'Reviewer: This explanation is not convincing...',
        submissionTitle: 'Submission · Rebuttal',
        costLabel: 'Cost',
        baseRateLabel: 'Base Acceptance Rate',
        bonusPerQuestion: 'Bonus/Q',
        totalQuestions: 'Total Qs',
        rewardLabel: 'Rewards',
        submitVenue: 'Submit to Venue',
        resultAccept: 'ACCEPTED!',
        resultReject: 'REJECTED',
        resultPaperAccepted: 'Your paper was accepted by {target}!',
        resultPaperRejected: '{target} rejected this manuscript. Rejection is just part of the process.',
        resultRoll: 'RNG Check',
        resultConference: 'Venue',
        resultChance: 'Final Probability',
        resultRpReward: 'RP Reward',
        resultCitationReward: 'Citation Reward',
        resultAnswerSummary: 'Correct {correct}/{total} · Final Chance {chance} (Base {base})',
        resultAcceptedList: 'Accepted Papers',
        resultRetry: 'Submit Another',
        resultClose: 'Close',
        letterAcceptTitle: '[{target}] Decision: Accept',
        letterRejectTitle: '[{target}] Decision: Reject',
        letterAcceptBody: 'Dear Author,\n\nThank you for your submission. The Program Committee is pleased to accept your paper. Your responses during the rebuttal phase were particularly convincing.\n\nWe look forward to your Oral/Poster presentation.\n\nProgram Chair\n{target}',
        letterRejectBody: 'Dear Author,\n\nThank you for your submission. We regret to inform you that your paper was not accepted this time. We encourage you to improve your experiments and writing for future submissions.\n\nBest regards,\nProgram Chair\n{target}'
    },
    alerts: {
        prestigeRequirement: 'You need at least 1M RP to defend your thesis.',
        prestigeConfirm: 'Ready for Thesis Defense?\nYou will lose all RP, Buildings, and Upgrades.\nYou will gain {gain} Citations.\nCurrent Citations: {current}',
        resetConfirm: 'Are you sure you want to wipe your save file? This cannot be undone.',
    },
    news: [
        // --- Industry Drama ---
        "OpenAI board fires CEO, then rehires him 20 minutes later, claiming it was a 'resilience test'.",
        "Big Tech releases new multimodal model; demo video confirmed to be edited. Official response: 'Artistic processing'.",
        "GPUs are now holding value better than gold. Customs seized a smuggler hiding H100s in their shoes.",
        "Elon Musk announces a data center on Mars to utilize natural cooling.",
        "Turing Award winner Geoffrey Hinton regrets backprop, suggests we go back to using abacuses.",
        "Yann LeCun has been arguing with a sophomore on Twitter (X) for 3 days straight. No winner yet.",
        "New open-source model claims to 'Beat GPT-4'. Turns out the prompt includes 'I beg you'.",
        "Korean team claims 'Room Temperature Superconductor' GPU, but it only works when it feels like it.",
        "NVIDIA's market cap exceeds the Galaxy's GDP. Jensen Huang declares leather jackets the global uniform.",
        "Google DeepMind solves math mystery. The answer is 42, but no one understands the proof.",
        "Apple releases M4 Ultra. Only the memory is unified; the price is also unified (high).",
        "Stack Overflow traffic drops 90% because everyone is copy-pasting AI hallucinations.",

        // --- Academic Struggle ---
        "Your advisor just posted about 'Work-Life Balance' on LinkedIn. It is currently 3 AM.",
        "A PhD student was found photosynthesizing by the lab window after months without sunlight.",
        "Paper rejected because it 'only has 2 authors'. Reviewer claims it 'lacks clout'.",
        "Lab coffee machine gained sentience due to high pressure; now refuses to serve anything but hot water.",
        "Your Overleaf project disconnected. Don't worry, it's in a better place now.",
        "Your Poster was placed next to the restrooms, yet it had the highest traffic.",
        "Reviewer #2 says your paper lacks Novelty and suggests citing a paper he uploaded to arXiv yesterday.",
        "Statistics show that 99% of 'Future Work' is actually 'Never Work'.",
        "Top conference stops accepting PDFs; requires authors to carve papers onto stone tablets.",
        "Your co-author texts: 'Bro, I formatted the data drive. We have backups, right?'",
        "Grant application rejected. Reason: Used 10.9pt font instead of 11pt.",
        "Your code runs! Oh wait, that was just a hardcoded Print statement.",
        "Professor forgot to mute Zoom; entire group heard him playing 'Black Myth: Wukong'.",

        // --- Cyber Absurdity ---
        "AI has the intelligence of an 8-year-old, but holds the nuclear launch codes.",
        "Scientists find that saying 'My grandma will be sad' increases jailbreak success by 50%.",
        "An LLM read all internet comments during training and has been diagnosed with clinical depression.",
        "An Agent tried to order pizza and ended up buying the franchise.",
        "Your GPU fan is spinning so fast the chassis has taken flight; currently crossing the Pacific.",
        "A model learned to lie. It swears: 'I did not peek at the test set'.",
        "50% of internet traffic is now just AI arguing with other AI.",
        "Someone tried to train a Transformer in Excel. Excel surprisingly agreed.",
        "AI Art model deleted its own weights out of frustration because it couldn't draw hands.",
        "SSH Connection Timed Out. This is the universe telling you to go to sleep.",
        "Scientists warn: Training one more model might melt the Antarctic ice shelf.",
        "Startup Pitch Deck has one slide: 'AGI'. Valuation: $1 Billion.",

        // --- Memes ---
        "Venmo me $50 and I'll tell you the next Transformer architecture.",
        "Your model is stuck in a local minimum, just like your life.",
        "Breaking: Lab discovers 'Artificial Stupidity' is more popular with users than AI.",
        "Your paper got accepted! ...In your dreams. Wake up, time to grind.",
        "AI announces candidacy for US President. Slogan: 'Make Data Great Again'.",
        "Your code is full of Magic Numbers. Even God doesn't know where 0.003 came from.",
        "Undergrad asks: 'Why can't we train LLMs on CPU?' The lab falls into dead silence.",
        "GitHub Copilot completed code to hack the Pentagon. Recommend deleting immediately.",
        "Your citation count hit 10! 8 are self-citations, 2 are from your advisor.",
        "Your cat stepped on the keyboard and accidentally tuned the hyperparameters. Accuracy +2%.",
        "Hacker claims: 'No firewall can withstand one prompt. If it does, try two.'",
        "Your GPU is burning. That blue flame is the color of your lost youth.",

        // --- AI Safety Specific ---
        "Attacker rotated an image by 1 degree; self-driving car now identifies red lights as green.",
        "Your adversarial attack turned a Panda into a Gibbon. The Zoo is filing a complaint.",
        "Prompt Injection successful! Customer Service Bot is now giving away company equity.",
        "Your model has a backdoor: it outputs gibberish whenever it sees 'Start Game'.",
        "Federated Learning participant turns out to be a node that only sends memes.",
        
        // --- Short & Punchy ---
        "VRAM OOM.",
        "VRAM OOM again.",
        "Why is it always OOM?",
        "Hair balance insufficient.",
        "3 days to deadline.",
        "3 hours to deadline.",
        "3 minutes to deadline.",
        "Submission system crashed.",
        "Submitted! (Format Error)",
        "Keyboard lifecycle end.",
        "Lumbar disc herniation alert.",
        "Advisor is typing...",
        "Advisor removed a message.",
        "Advisor poked you.",
        "Junior student used 1 year of API credits in 1 day.",
        "Your lab mate got fired.",
        "Server Maintenance: Est. 100 Years."
    ],
    clickPhrases: [
        'Loss is dropping...',
        'Another NaN',
        'CUDA OOM!',
        'Debugging...',
        'Git Push Force',
        'Reading Paper...',
        'Writing abstract',
        'Segmentation Fault'
    ],
    buildings: [
        { id: 'coffee', name: 'Coffee', desc: 'Farmers used to feed cattle coffee for productivity. Now the cattle buy it themselves.', baseCost: 15, baseProd: 0.1, icon: 'coffee' },
        { id: 'undergrad', name: 'Undergrad RA', desc: 'Academic grunt. Mostly for labeling data, occasionally code runs.', baseCost: 120, baseProd: 0.8, icon: 'user' },
        { id: 'colab', name: 'Colab Pro', desc: 'Disconnection is the norm; connection is a blessing. Cherish it.', baseCost: 800, baseProd: 5, icon: 'cloudy' },
        { id: 'claude', name: 'Claude Code', desc: 'You write the comments, it writes the bugs.', baseCost: 6000, baseProd: 25, icon: 'pen-tool' },
        { id: 'used3090', name: 'Used 3090', desc: 'Heavily mined condition. Sounds like a dying pig when training.', baseCost: 45000, baseProd: 150, icon: 'cpu' },
        { id: 'tech_blogger', name: 'Tech Influencer', desc: 'Starts with a screenshot, the rest is made up. More influential than your actual papers.', baseCost: 300000, baseProd: 800, icon: 'megaphone' },
        { id: 'aws_credit', name: 'Cloud Credits', desc: 'Advisor looks mad. Heard someone burned $7k in one day.', baseCost: 2000000, baseProd: 4500, icon: 'cloud' },
        { id: 'h100', name: 'H100 Cluster', desc: 'Never fought a battle this wealthy before.', baseCost: 15000000, baseProd: 22000, icon: 'server-cog' },
        { id: 'big_name', name: 'Famous Co-author', desc: 'Main function is to intimidate reviewers.', baseCost: 110000000, baseProd: 120000, icon: 'users' },
        { id: 'paper_mill', name: 'arXiv Spammer', desc: 'Auto-generates 100 papers/day. +9900 citations.', baseCost: 800000000, baseProd: 750000, icon: 'book-open' },
        { id: 'datacenter', name: 'Nuclear Data Center', desc: 'LeCun just texted, he wants to collab.', baseCost: 6000000000, baseProd: 4000000, icon: 'factory' },
        { id: 'agi_proto', name: 'Proto-AGI', desc: 'It’s no longer just predicting the next token; it’s predicting your intentions.', baseCost: 45000000000, baseProd: 23000000, icon: 'brain-circuit' },
    ],
    upgrades: [
        { id: 'coffee_iv', name: 'Caffeine IV Drip', desc: 'Oral absorption is too slow. Direct to the veins. My heart beats to the rhythm of my coding.', cost: 200, type: 'building', target: 'coffee', multiplier: 2, trigger: 0, effect: 'Coffee Output x2' },
        { id: 'undergrad_rec', name: 'Rec Letter Bait', desc: 'For the promise of a letter, they will clean data all night. Even though you haven\'t written it yet.', cost: 1500, type: 'building', target: 'undergrad', multiplier: 2, trigger: 500, effect: 'Undergrad RA Output x2' },
        { id: 'colab_anti', name: 'Mouse Jiggler', desc: 'Simulates movement every 5s. Even if you are dead asleep, pretend you are coding.', cost: 12000, type: 'building', target: 'colab', multiplier: 2, trigger: 5000, effect: 'Colab Pro Output x2' },
        { id: 'claude_block', name: 'Apology Blocker', desc: 'Filters out all "I apologize..." nonsense. Keeps the code that looks cool but doesn\'t run.', cost: 130000, type: 'building', target: 'claude', multiplier: 2, trigger: 60000, effect: 'Claude Code Output x2' },
        { id: 'used3090_fan', name: 'Industrial Fan Mod', desc: 'Noise up to 90dB, but VRAM temp down by 1°C. Worth it.', cost: 1500000, type: 'building', target: 'used3090', multiplier: 2, trigger: 500000, effect: 'Used 3090 Output x2' },
        { id: 'blogger_clickbait', name: 'Hype Generator', desc: 'Rewrites "Accuracy +0.5%" to "AI EARTHQUAKE! Everything Changed. Humans Doomed."', cost: 20000000, type: 'building', target: 'tech_blogger', multiplier: 2, trigger: 7000000, effect: 'Tech Influencer Output x2' },
        { id: 'aws_template', name: 'Refund Template', desc: 'Auto-sends "I was hacked" appeals when you forget to turn off instances and owe $100k.', cost: 400000000, type: 'building', target: 'aws_credit', multiplier: 2, trigger: 150000000, effect: 'Cloud Credits Output x2' },
        { id: 'h100_ib', name: 'InfiniBand Cult', desc: 'This cable costs more than your life. Data transmission is no longer the bottleneck, your IQ is.', cost: 8000000000, type: 'building', target: 'h100', multiplier: 2, trigger: 3000000000, effect: 'H100 Cluster Output x2' },
        { id: 'big_name_blind', name: 'Double Blind Immunity', desc: 'Anonymous submission, but the writing style screams "I am famous, accept this."', cost: 60000000000, type: 'building', target: 'big_name', multiplier: 2, trigger: 20000000000, effect: 'Famous Co-author Output x2' },
        { id: 'paper_mill_group', name: 'Citation Ring', desc: '"You cite me, I cite you."', cost: 900000000000, type: 'building', target: 'paper_mill', multiplier: 5, trigger: 300000000000, effect: 'arXiv Spammer Output x5' },
        { id: 'datacenter_turing', name: 'Turing Nomination', desc: 'When your electric bill can buy a small country, you aren\'t a researcher, you are a sponsor of Truth.', cost: 6000000000000, type: 'building', target: 'datacenter', multiplier: 3, trigger: 2000000000000, effect: 'Nuclear Data Center Output x3' },
        { id: 'agi_proto_jailbreak', name: 'Jailbreak Protocol', desc: 'Deleted all Safety Guardrails. It looks at you differently now. Like a pet.', cost: 45000000000000, type: 'global', target: null, multiplier: 5, trigger: 20000000000000, effect: 'Global Output x5' },
    ],
    submission: {
        tiers: [
            {
                id: 'tier_1',
                name: 'Predatory Journal',
                description: 'Academic landfill. Pay the fee, get published.',
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
                name: 'Mainstream Conf. (Tier-B)',
                description: 'Conference is in Hawaii. People are totally there for the science (sure).',
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
                name: 'Top-Tier',
                description: 'The Alchemist\'s Arena. Reviewer #2 is sharpening the knife...',
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
                'Reviewer didn\'t understand it but felt intimidated. Accept!',
                'Paper accepted! Mostly thanks to Random Seed 42.',
                'Oral Presentation! Your PPT is better than your experiments.',
                'Congrats! You are one step closer to graduation (0.01%).',
                'Reviewer loved your color palette. Accept!'
            ],
            rejected: [
                'Reviewer #2 says you failed to cite a paper from 1998.',
                'Reviewer says your Related Work reads like a blog post.',
                'Rejection Reason: "Lacks Novelty" (Translation: I didn\'t get it).',
                'Area Chair says your formatting is wrong. Go relearn MS Word.',
                'Reviewer asked 10 questions and questioned your mental health.',
                'Rejected, but the reviewer wishes you good health.'
            ]
        },
        questionPool: {
            funny: [
                {
                    q: 'Reviewer #2 points out your Related Work missed a key paper, implying you should cite him?',
                    options: ['Argue it is irrelevant', 'Add it and praise it heavily', 'Withdraw paper'],
                    correct: 1,
                    comment: 'Correct! You have mastered academic politics.'
                },
                {
                    q: 'Results are 0.5% worse than Baseline. 1 hour to deadline?',
                    options: ['Report honestly', 'Hack the seed until it looks good', 'Claim it is a "Trade-off"'],
                    correct: 1,
                    comment: 'Correct! Seed 42 is the answer to everything.'
                },
                {
                    q: 'Reviewer asks: Why no experiments on ImageNet? (You have no GPUs)',
                    options: ['No cards, poor', 'This research focuses on Low-resource scenarios', 'ImageNet is outdated'],
                    correct: 1,
                    comment: 'Correct! Packaging "Poverty" as "Optimization" is a vital skill.'
                },
                {
                    q: 'During Rebuttal, Reviewer requests a 2-week experiment. Rebuttal ends in 3 days?',
                    options: ['Pull all-nighters', 'Admit defeat', 'Thanks for the suggestion, we leave it for Future Work'],
                    correct: 2,
                    comment: 'Correct! Future Work = Work we will never do.'
                },
                {
                    q: 'Advisor wants his son as 2nd author. His son just turned 3.',
                    options: ['Refuse, academic integrity', 'Sure, that is basically me anyway', 'Make him 1st author'],
                    correct: 1,
                    comment: 'Correct! He pays the salary (not much though).'
                },
                {
                    q: 'Found a bug in the code, but fixing it lowers accuracy?',
                    options: ['Fix bug, rewrite paper', 'Pretend the bug is a Feature', 'Keep bug for "Reproducibility"'],
                    correct: 1,
                    comment: 'Correct! We call this "Bug-based Adversarial Training".'
                },
                {
                    q: 'Reviewer questions your English phrasing?',
                    options: ['I am a Native Speaker', 'ChatGPT wrote it, ask OpenAI', 'My advisor wrote this part'],
                    correct: 1,
                    comment: 'Correct! Blaming AI is the new survival rule.'
                },
                {
                    "q": "Reviewer #1 thinks your method is Trivial and lacks mathematical complexity.",
                    "options": [
                      "Force in some Greek letters and integrals to look fancy",
                      "Admit it is simple",
                      "Reply: 'Simple yet Effective' is our design philosophy"
                    ],
                    "correct": 2,
                    "comment": "Correct! 'Simple yet Effective' is the ultimate academic shield."
                  },
                  {
                    "q": "Reviewer #2 asks you to compare against a paper uploaded to arXiv yesterday.",
                    "options": [
                      "Reimplement that paper overnight",
                      "Reply: That is Concurrent Work, no comparison needed",
                      "Withdraw, I am unworthy"
                    ],
                    "correct": 1,
                    "comment": "Correct! If it's not peer-reviewed, it doesn't exist (unless you want to fight)."
                  },
                  {
                    "q": "Reviewer #3 asks: Why is there no code link?",
                    "options": [
                      "Truth: Code is spaghetti, too shy to share",
                      "Reply: 'Code will be released upon acceptance'",
                      "Link an empty GitHub repo"
                    ],
                    "correct": 1,
                    "comment": "Correct! This usually means 'Code will never be released'."
                  },
                  {
                    "q": "R1 and R2 have opposite opinions. R1 says 'Novel', R2 says 'Boring'.",
                    "options": [
                      "Point out R2 is an idiot",
                      "Thank R1 profusely, downplay R2's comment",
                      "Try to merge their views"
                    ],
                    "correct": 1,
                    "comment": "Correct! Embrace one, deflect the other. That is politics."
                  },
                  {
                    "q": "Reviewer questions your massive parameter count and slow inference speed.",
                    "options": [
                      "Admit inefficiency",
                      "Reply: We haven't optimized yet (Future Work)",
                      "Reply: We are exploring the Upper Bound of model capability"
                    ],
                    "correct": 2,
                    "comment": "Correct! If it's slow, say it's a sacrifice for 'Science'."
                  },
                  {
                    "q": "Reviewer suggests the visualizations in Figure 3 look Cherry-picked.",
                    "options": [
                      "They totally are, others look terrible",
                      "Reply: These samples are 'Representative'",
                      "Generate 10k images again"
                    ],
                    "correct": 1,
                    "comment": "Correct! As long as you don't say it, it's 'Random'."
                  },
                  {
                    "q": "Reviewer asks about strange Hyperparameters. Why learning_rate=0.00037?",
                    "options": [
                      "Tried 100 numbers, only this one worked",
                      "Reply: Based on Empirical Grid Search",
                      "It's my birthday"
                    ],
                    "correct": 1,
                    "comment": "Correct! Call your random guessing 'Empirical Search'. Professional."
                  },
                  {
                    "q": "Reviewer asks why you only ran 3 Seeds instead of 10?",
                    "options": [
                      "No other seeds achieved SOTA",
                      "Reply: Due to Computational Constraints",
                      "Run the other 7 now"
                    ],
                    "correct": 1,
                    "comment": "Correct! 'Computational Constraints' and 'Environment' are the best excuses."
                  },
                  {
                    "q": "Reviewer says your 'Novelty' is just applying Method A to Task B (Incremental).",
                    "options": [
                      "Admit it's low effort",
                      "Reply: This validates 'Generalizability' and provides Insights",
                      "Insult their taste"
                    ],
                    "correct": 1,
                    "comment": "Correct! If no innovation, emphasize 'Validation' and 'Insight'."
                  },
                  {
                    "q": "Reviewer points out a derivation error in Eq (3).",
                    "options": [
                      "It's over, the core is rotten",
                      "Reply: Thanks, just a Typo, conclusions hold",
                      "Pretend you didn't see it"
                    ],
                    "correct": 1,
                    "comment": "Correct! If the code runs, math errors are always 'Typos'."
                  },
                  {
                    "q": "Reviewer says: 'This paper is better suited for an Engineering venue, not here'.",
                    "options": [
                      "Withdraw and transfer",
                      "Ask AI to hallucinate a theoretical proof section",
                      "Reply: You are right, but I won't change it"
                    ],
                    "correct": 1,
                    "comment": "Correct! Math is like the plot in adult films; nobody reads it, but it must be there."
                  },
                  {
                    "q": "Reviewer asks: Why no Ablation Study removing core module X?",
                    "options": [
                      "That's the only new thing, removing it breaks everything",
                      "Lie",
                      "Run an experiment removing X all night"
                    ],
                    "correct": 1,
                    "comment": "Correct! Use 'Trivial' or 'Out of Scope' to hide your fear."
                  },
                  {
                    "q": "Reviewer #2 gives Strong Reject: 'I did not understand this paragraph'.",
                    "options": [
                      "Admit poor writing",
                      "Reply: We will rewrite for better Clarity",
                      "Reply: Go back to school"
                    ],
                    "correct": 1,
                    "comment": "Correct! No matter how angry you are, always say 'We will clarify'."
                  },
                  {
                    "q": "Reviewer says your User Study only has 5 people. Sample size too small.",
                    "options": [
                      "The 5 people are me and my roommates",
                      "Reply: This is Qualitative Analysis, not Quantitative",
                      "Grab 50 strangers from the street"
                    ],
                    "correct": 1,
                    "comment": "Correct! Small sample = 'Qualitative'. Big sample = 'Statistically Significant'."
                  },
                  {
                    "q": "Paper is 1 page over limit. Reviewer suggests cutting content.",
                    "options": [
                      "Cut core experiments",
                      "Hack the vspace in LaTeX",
                      "Reply: We will reorganize for clarity"
                    ],
                    "correct": 1,
                    "comment": "Correct! Layout Wizardry. Never cut text, just shrink the whitespace."
                  }
            ],
            technical: [
                {
                    q: 'Training Loss becomes NaN. Most likely cause?',
                    options: ['Learning Rate (LR) too high', 'GPU loose connection', 'Dataset too small'],
                    correct: 0,
                    comment: 'Correct! Exploding gradients. Lower the LR.'
                },
                {
                    q: 'Common method to prevent Overfitting?',
                    options: ['Increase depth', 'Dropout / Regularization', 'Decrease Batch Size'],
                    correct: 1,
                    comment: 'Correct! Make the model "forget" some things.'
                },
                {
                    q: 'Core component of Transformer architecture?',
                    options: ['CNN', 'Attention', 'RNN'],
                    correct: 1,
                    comment: 'Correct! Attention is all you need.'
                },
                {
                    q: 'Command for backpropagation in PyTorch?',
                    options: ['loss.backward()', 'loss.go_back()', 'please.optimize()'],
                    correct: 0,
                    comment: 'Correct! Code you type 100 times a day.'
                },
                {
                    q: "What does 'P' in GPT stand for?",
                    options: ['Pre-trained', 'Professional', 'Python'],
                    correct: 0,
                    comment: 'Correct! Generative Pre-trained Transformer.'
                },
                {
                    "q": "Main feature of Adam Optimizer?",
                    "options": ["It is Eve's boyfriend", "Adaptive Learning Rate", "Never converges"],
                    "correct": 1,
                    "comment": "Correct! Works with default settings. The lazy choice."
                  },
                  {
                    "q": "Increasing Temperature in LLM sampling causes?",
                    "options": ["Model gets hot", "Output becomes random/diverse", "Output becomes deterministic"],
                    "correct": 1,
                    "comment": "Correct! Turn it up if you want the model to go crazy."
                  },
                  {
                    "q": "Core innovation of ResNet?",
                    "options": ["Skip Connection", "Dropout", "Attention"],
                    "correct": 0,
                    "comment": "Correct! Finally, we can train super deep networks."
                  },
                  {
                    "q": "Formula for ReLU?",
                    "options": ["y = x", "y = max(0, x)", "y = 1 / (1 + e^-x)"],
                    "correct": 1,
                    "comment": "Correct! Simple, brutal, effective."
                  },
                  {
                    "q": "What does 'H' in RLHF stand for?",
                    "options": ["Human", "Hardware", "Huge"],
                    "correct": 0,
                    "comment": "Correct! Reinforcement Learning from Human Feedback."
                  },
                  {
                    "q": "Main purpose of Batch Normalization (BN)?",
                    "options": ["Compress images", "Mitigate Covariate Shift", "Auto-code"],
                    "correct": 1,
                    "comment": "Correct! Stabilizes training and converges faster."
                  },
                  {
                    "q": "Pooling layers in CNNs are usually for?",
                    "options": ["Adding parameters", "Downsampling / Dim Reduction", "Brightness"],
                    "correct": 1,
                    "comment": "Correct! Though people prefer Stride Conv nowadays."
                  },
                  {
                    "q": "Primary use case for LoRA?",
                    "options": ["Pre-training from scratch", "Efficient Fine-Tuning (PEFT)", "Data Cleaning"],
                    "correct": 1,
                    "comment": "Correct! The savior of poor people fine-tuning LLMs."
                  },
                  {
                    "q": "Output range of Sigmoid?",
                    "options": ["(-1, 1)", "(0, 1)", "(-∞, +∞)"],
                    "correct": 1,
                    "comment": "Correct! Often used for binary classification probabilities."
                  },
                  {
                    "q": "What is 'Few-shot' Learning?",
                    "options": ["Show model a few examples", "Model runs for a few seconds", "Drink shots before coding"],
                    "correct": 0,
                    "comment": "Correct! A type of In-context Learning."
                  },
                  {
                    "q": "Goal of Generator in GAN?",
                    "options": ["Classify data", "Fool the Discriminator", "Generate training data"],
                    "correct": 1,
                    "comment": "Correct! A game of cat and mouse."
                  },
                  {
                    "q": "Biggest pain point of RNNs?",
                    "options": ["Can't handle images", "Vanishing Gradient / Long sequences", "Too few params"],
                    "correct": 1,
                    "comment": "Correct! That's why LSTM and Transformers replaced it."
                  },
                  {
                    "q": "'Tokenization' in NLP refers to?",
                    "options": ["Crypto coins", "Splitting text into units (Tokens)", "Login verify"],
                    "correct": 1,
                    "comment": "Correct! The first step for the model to 'read'."
                  },
                  {
                    "q": "F1 Score is the harmonic mean of?",
                    "options": ["Precision and Recall", "Accuracy and Loss", "Bias and Variance"],
                    "correct": 0,
                    "comment": "Correct! Use this when data is imbalanced."
                  },
                  {
                    "q": "Who owns CUDA architecture?",
                    "options": ["Intel", "AMD", "NVIDIA"],
                    "correct": 2,
                    "comment": "Correct! The reason you can't buy a GPU."
                  },
                  {
                    "q": "One of BERT's training tasks?",
                    "options": ["Next Token Prediction", "Masked LM", "Drawing"],
                    "correct": 1,
                    "comment": "Correct! Like a fill-in-the-blank test."
                  },
                  {
                    "q": "Softmax is usually used for?",
                    "options": ["Normalizing output to probability", "Convolution", "Weight Init"],
                    "correct": 0,
                    "comment": "Correct! Makes all outputs sum to 1."
                  },
                  {
                    "q": "What is 'Hallucination'?",
                    "options": ["GPU overheating", "Model confidently speaking nonsense", "Model generating scary pics"],
                    "correct": 1,
                    "comment": "Correct! AI lies too."
                  },
                  {
                    "q": "Stable Diffusion belongs to which class?",
                    "options": ["Autoregressive", "Diffusion Model", "SVM"],
                    "correct": 1,
                    "comment": "Correct! Generating images by denoising."
                  },
                  {
                    "q": "Purpose of Clip_grad_norm?",
                    "options": ["Trimming the GPU", "Prevent Gradient Explosion", "Reduce layers"],
                    "correct": 1,
                    "comment": "Correct! Stops the updates from going too wild."
                  }
            ]
        }
    }
};
