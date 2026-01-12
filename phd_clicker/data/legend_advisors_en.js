/**
 * PhD Clicker - English Legend Advisors Data
 * Converted from legend_advisors_en.json to ES Module
 */

export const LEGEND_ADVISORS_EN = {
    jinghui: {
        id: "jinghui",
        name: "Jinghui Chen",
        title: "The Advisor",
        desc: "He glanced at your Loss curve and said faintly: 'Try running a few more epochs.'",
        unlock_connection: "jinghui",
        traits: [
            { id: "jinghui_001", name: "Adversarial Robustness", rarity: "gold", description: "Specializes in Adversarial Robustness; your papers have a natural buff against Reviewer #2.", effect: { type: "multiplier", target: "rebuttal_penalty", value: 0.50 }, effect_text: "Rebuttal failure penalty halved" },
            { id: "jinghui_002", name: "Online at Dawn", rarity: "purple", description: "Email timestamps are always 2:47 AM, making you suspect he might be an AI.", effect: { type: "multiplier", target: "offline", value: 1.25 }, effect_text: "Offline income +25%" },
            { id: "jinghui_003", name: "Run It Again", rarity: "blue", description: "No matter the issue, the answer is 'try running a few more epochs', and it often actually works.", effect: { type: "multiplier", target: "manual_click", value: 1.18 }, effect_text: "Manual click output +18%" },
            { id: "jinghui_004", name: "The Safety Net", rarity: "purple", description: "Even if your paper is trash, he will always find a venue to get it published.", effect: { type: "additive", target: "submission_rate_floor", value: 0.20 }, effect_text: "Minimum submission success rate guaranteed at 20%" }
        ]
    },

    hinton: {
        id: "hinton",
        name: "Geoffrey Hinton",
        title: "The Godfather",
        desc: "He just quit Google, so now he has time to mentor you.",
        unlock_connection: "hinton",
        traits: [
            { id: "hinton_001", name: "Ancestral Blessing", rarity: "gold", description: "Turing Award aura; reviewers silence themselves the moment they see your advisor's name.", effect: { type: "additive", target: "submission_rate", value: 0.12 }, effect_text: "Submission success rate +12%" },
            { id: "hinton_002", name: "Backpropagation", rarity: "gold", description: "Upon rebirth, a portion of your academic legacy is strictly preserved.", effect: { type: "multiplier", target: "rebirth_rp_retain", value: 0.05 }, effect_text: "Retain 5% of RP upon Rebirth" },
            { id: "hinton_003", name: "Doomsday Prophecy", rarity: "purple", description: "Constantly warns that AI will destroy humanity, but that doesn't stop him from publishing papers.", effect: { type: "multiplier", target: "global_rp", value: 1.15 }, effect_text: "Global RP output +15%" },
            { id: "hinton_004", name: "Global Network", rarity: "purple", description: "His students are everywhere; pick any random person and they could be your reviewer.", effect: { type: "multiplier", target: "collaborator", value: 1.25 }, effect_text: "Legend Collaborator output +25%" }
        ]
    },

    jensen: {
        id: "jensen",
        name: "Jensen Huang",
        title: "The Supplier",
        desc: "The more you buy, the more you save.",
        unlock_connection: "jensen",
        traits: [
            { id: "jensen_001", name: "Leather Jacket Buff", rarity: "gold", description: "Putting on the leather jacket boosts GPU performance by 100% (Placebo effect).", effect: { type: "multiplier", target: "compute_facilities", value: 2.0 }, effect_text: "Compute facility output x2" },
            { id: "jensen_002", name: "Buy More Save More", rarity: "purple", description: "This is mathematically incorrect, yet you cannot resist the urge to buy more.", effect: { type: "multiplier", target: "facility_cost", value: 0.88 }, effect_text: "Facility purchase discount 12%" },
            { id: "jensen_003", name: "Moore's Law", rarity: "blue", description: "Your compute power doubles every 18 months (if you can afford it).", effect: { type: "multiplier", target: "h100", value: 1.30 }, effect_text: "H100 Cluster output +30%" },
            { id: "jensen_004", name: "Stock to the Moon", rarity: "red", description: "NVDA stock skyrockets, but your lab budget gets tighter.", effect: { positive: { type: "multiplier", target: "compute_facilities", value: 1.35 }, negative: { type: "multiplier", target: "academic_facilities", value: 0.85 } }, effect_text: "Compute facility output +35%, but Academic/HR facility output -15%" }
        ]
    },

    lecun: {
        id: "lecun",
        name: "Yann LeCun",
        title: "The Skeptic",
        desc: "That is not AGI, that is just a statistical parrot.",
        unlock_connection: "lecun",
        traits: [
            { id: "lecun_001", name: "World Model", rarity: "gold", description: "Firm believer that World Models are the way and Autoregressive is heresy.", effect: { type: "multiplier", target: "global_rp", value: 1.20 }, effect_text: "Global RP output +20% (Independent Multiplier)" },
            { id: "lecun_002", name: "Twitter Warrior", rarity: "purple", description: "Online beefing daily, sparing no one from Gary Marcus to Elon Musk.", effect: { type: "multiplier", target: "arxiv", value: 1.35 }, effect_text: "arXiv Spammer output +35%" },
            { id: "lecun_003", name: "Father of CNN", rarity: "purple", description: "Founder of Convolutional Neural Networks, even though everyone uses Transformers now.", effect: { type: "additive", target: "submission_rate", value: 0.08 }, effect_text: "Submission success rate +8%" },
            { id: "lecun_004", name: "Soft-Hearted Skeptic", rarity: "blue", description: "Calls LLMs parrots, but honestly builds LLaMA at Meta.", effect: { type: "multiplier", target: "manual_click", value: 1.15 }, effect_text: "Manual click output +15%" }
        ]
    },

    altman: {
        id: "altman",
        name: "Sam Altman",
        title: "The Capitalist",
        desc: "7 Trillion.",
        unlock_connection: "altman",
        traits: [
            { id: "altman_001", name: "Fundraising God", rarity: "gold", description: "Opens with $7 Trillion, making your grant application look like pocket change.", effect: { type: "additive", target: "inflation_reduction", value: -0.02 }, effect_text: "Inflation coefficient -0.02 (1.15 → 1.13)" },
            { id: "altman_002", name: "Boardroom Crisis", rarity: "red", description: "Occasionally fired by the board, but always respawns within 48 hours.", effect: { positive: { type: "multiplier", target: "global_rp", value: 1.25 }, negative: { type: "multiplier", target: "rebuttal_bonus", value: 0.80 } }, effect_text: "Global RP +25%, but Rebuttal success bonus -20%" },
            { id: "altman_003", name: "Safety Theater", rarity: "purple", description: "Preaches AI Safety while accelerating GPT-5 training.", effect: { type: "multiplier", target: "compute_facilities", value: 1.22 }, effect_text: "Compute facility output +22%" },
            { id: "altman_004", name: "Business Instinct", rarity: "blue", description: "Knows which research gets funding, even if it's not strictly 'good' research.", effect: { type: "multiplier", target: "submission_cost", value: 0.85 }, effect_text: "Submission RP cost -15%" }
        ]
    },

    kaiming: {
        id: "kaiming",
        name: "Kaiming He",
        title: "The Architect",
        desc: "Let's make your network a bit deeper.",
        unlock_connection: "kaiming",
        traits: [
            { id: "kaiming_001", name: "Residual Connection", rarity: "gold", description: "Prevents gradient vanishing and paper rejection.", effect: { type: "multiplier", target: "upgrade_cost", value: 0.70 }, effect_text: "All upgrade costs -30%" },
            { id: "kaiming_002", name: "Citation Bomb", rarity: "gold", description: "ResNet has 100k+ citations; reference it to leech some popularity.", effect: { type: "additive", target: "paper_bonus", value: 0.05 }, effect_text: "Each paper grants extra +5% global output" },
            { id: "kaiming_003", name: "Simplicity is Key", rarity: "purple", description: "The simpler the method, the better. Batch Norm is proof.", effect: { type: "multiplier", target: "global_rp", value: 1.12 }, effect_text: "Global RP output +12%" },
            { id: "kaiming_004", name: "Career Leapfrog", rarity: "blue", description: "From MSRA to FAIR to MIT, every job hop is a significant upgrade.", effect: { type: "multiplier", target: "facility_cost", value: 0.92 }, effect_text: "Facility purchase discount 8%" }
        ]
    },

    vaswani: {
        id: "vaswani",
        name: "Ashish Vaswani",
        title: "Attention Author",
        desc: "Attention is all you need.",
        unlock_connection: "vaswani",
        traits: [
            { id: "vaswani_001", name: "Attention Mechanism", rarity: "gold", description: "Every click has a chance to trigger a Self-Attention Crit.", effect: { type: "crit_chance", target: "manual_click", value: 0.10, crit_multiplier: 10 }, effect_text: "Manual clicks have 10% chance to trigger 10x Crit" },
            { id: "vaswani_002", name: "Legend of the Eight", rarity: "purple", description: "The myth of 8 first authors proves a good idea makes everyone a winner.", effect: { type: "multiplier", target: "collaborator", value: 1.30 }, effect_text: "Legend Collaborator output +30%" },
            { id: "vaswani_003", name: "World Changer", rarity: "purple", description: "One paper started the LLM era; you hope to replicate this miracle.", effect: { type: "additive", target: "submission_rate", value: 0.07 }, effect_text: "Submission success rate +7%" },
            { id: "vaswani_004", name: "The Exodus", rarity: "blue", description: "The Google Brain 8 all left to build startups—the ultimate academic clout.", effect: { type: "multiplier", target: "manual_click", value: 1.20 }, effect_text: "Manual click output +20%" }
        ]
    },

    ilya: {
        id: "ilya",
        name: "Ilya Sutskever",
        title: "The Believer",
        desc: "Feel the AGI.",
        unlock_connection: "ilya",
        traits: [
            { id: "ilya_001", name: "Feel the Gradient", rarity: "gold", description: "Rumor has it he can feel the shape of the loss landscape directly.", effect: { type: "additive", target: "tier3_submission_rate", value: 0.10 }, effect_text: "Top-tier conference base acceptance rate +10%" },
            { id: "ilya_002", name: "Superalignment", rarity: "purple", description: "Left OpenAI to found SSI, focusing on keeping AGI from killing us.", effect: { type: "multiplier", target: "global_rp", value: 1.18 }, effect_text: "Global RP output +18%" },
            { id: "ilya_003", name: "Mysticism", rarity: "purple", description: "Speaks in riddles, making you wonder if he has already seen AGI.", effect: { type: "multiplier", target: "agi", value: 1.40 }, effect_text: "AGI Prototype output +40%" },
            { id: "ilya_004", name: "Coup Veteran", rarity: "red", description: "Participated in a board coup, though he apologized later.", effect: { positive: { type: "additive", target: "submission_rate", value: 0.08 }, negative: { type: "multiplier", target: "rebuttal_penalty", value: 1.30 } }, effect_text: "Submission success rate +8%, but Rebuttal failure penalty +30%" }
        ]
    },

    linus: {
        id: "linus",
        name: "Linus Torvalds",
        title: "Open Source God",
        desc: "Show me the code.",
        unlock_connection: "linus",
        traits: [
            { id: "linus_001", name: "God of Open Source", rarity: "gold", description: "Linux + Git: The architect of modern computing infrastructure.", effect: { type: "multiplier", target: "claude_code", value: 1.60 }, effect_text: "Claude Code output +60%" },
            { id: "linus_002", name: "Toxic Reviewer", rarity: "purple", description: "He'll roast you if your code sucks, but you know he's right.", effect: { type: "multiplier", target: "rebuttal_bonus", value: 1.25 }, effect_text: "Rebuttal success bonus +25%" },
            { id: "linus_003", name: "Code is Law", rarity: "purple", description: "No PPTs, no papers. Show me the code.", effect: { type: "multiplier", target: "compute_facilities", value: 1.18 }, effect_text: "Compute facility output +18%" },
            { id: "linus_004", name: "Lifetime Maintainer", rarity: "blue", description: "Maintaining the Linux kernel for 30 years—grit you can't simply learn.", effect: { type: "multiplier", target: "offline", value: 1.20 }, effect_text: "Offline income +20%" }
        ]
    },

    karpathy: {
        id: "karpathy",
        name: "Andrej Karpathy",
        title: "The Teacher",
        desc: "Let's build GPT from scratch.",
        unlock_connection: "karpathy",
        traits: [
            { id: "karpathy_001", name: "From Scratch", rarity: "gold", description: "'Let's build GPT from scratch.' Teaches you Transformers in two hours.", effect: { type: "multiplier", target: "academic_facilities", value: 3.0 }, effect_text: "Academic/HR facility output x3" },
            { id: "karpathy_002", name: "Internet's Teacher", rarity: "purple", description: "Millions of views on YouTube, with students across the globe.", effect: { type: "multiplier", target: "undergrad", value: 1.50 }, effect_text: "Undergraduate output +50%" },
            { id: "karpathy_003", name: "Career Parkour", rarity: "blue", description: "OpenAI → Tesla → OpenAI → Independent. Every move is breaking news.", effect: { type: "multiplier", target: "manual_click", value: 1.15 }, effect_text: "Manual click output +15%" },
            { id: "karpathy_004", name: "Vibe Coding", rarity: "purple", description: "Invented Vibe Coding: writing code using natural language and vibes.", effect: { type: "multiplier", target: "claude_code", value: 1.35 }, effect_text: "Claude Code output +35%" }
        ]
    }
};
