const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const recentlyRan = [];
const AvArow = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomID("avabuilds")
    .setPlaceholder("Search ava builds")
    .addOptions([
      {
        label: "Realmbreaker",
        description: "Melee dps, reduces mobs health percentage",
        value: "ava-realmbreaker",
        emoji: "<:realmbreaker:861440819689291796>",
      },
      {
        label: "Weeping Repeater",
        description: "Ranged dps, big magic dmg burst on the E",
        value: "ava-weeping",
        emoji: "<:weeping:861440820531560448>",
      },
      {
        label: "Light Crossbow",
        description: "Ranged dps, big dps if know the combo",
        value: "ava-lightcrossbow",
        emoji: "<:lightcrossbow:861440820287504404>",
      },
      {
        label: "Permafrost",
        description: "Ranged magic dps, big magic dmg burst on the E",
        value: "ava-permafrost",
        emoji: "<:permafrost:861440819747356672>",
      },
      {
        label: "Frost staves",
        description: "Ranged magic dps.",
        value: "ava-frost",
        emoji: "<:greatfrost:861440817746411532>",
      },
      {
        label: "Blazing Staff",
        description: "Ranged magic dps, big dps if have big brain",
        value: "ava-blazing",
        emoji: "<:blazingstaff:861440820040564746>",
      },
      {
        label: "Ironroot",
        description: "Support dps, link mobs together",
        value: "ava-ironroot",
        emoji: "<:ironroot:861440822700146688>",
      },
      {
        label: "Cursed Staff",
        description: "Curse support, reduces mobs resistance",
        value: "ava-shadowcaller",
        emoji: "<:shadowcaller:861440816568336404>",
      },
      {
        label: "Arcane",
        description: "Arcane support, timefreeze the mob",
        value: "ava-arcane",
        emoji: "<:arcane:861440815284355073>",
      },
      {
        label: "Party Healer",
        description: "Holy healer, heal the party",
        value: "ava-partyhealer",
        emoji: "<:fallenstaff:861440819805421579>",
      },
      {
        label: "Main Healer",
        description: "Holy healer, heal the party",
        value: "ava-mainhealer",
        emoji: "<:holystaff:861440820250935338>",
      },
      {
        label: "Blackmonk",
        description: "Quarterstaff support, kick mobs and reduce dmg",
        value: "ava-bms",
        emoji: "<:bms:861440820124581928>",
      },
      {
        label: "Second Tank/Off Tank",
        description: "Second tank, taunt and pull mobs",
        value: "ava-secondtank",
        emoji: "<:incubus:861440822489776159>",
      },
      {
        label: "Main Tank",
        description: "Person who leads the Ava",
        value: "ava-maintank",
        emoji: "<:hammer:861440821735718932>",
      },
    ])
);
const avalist = {
  "ava-realmbreaker": {
    pic: "https://i.imgur.com/iU9Lh1c.jpg",
    string: `Don't use your E during the arcane. \nYou may use roast pork for more survivability, but beef stew is preferrable \nFor bosses change to Q1 and W1 \n\nWhen fighting the **Knight Captain** Boss, you sholdn't use your E except when it's channeling for explosion or reflect \n\nOther melee DPS builds viable in ava: **Spirit hunter, Bearpaws** \nKeep in Note that melee dps is for experienced raiders of maximum of 2 per raid \nThe second Melee dps can use druid robe instead of specter jacket `,
    name: "Realmbreaker",
    icon: "https://i.imgur.com/pGPQtCf.png",
  },
  "ava-weeping": {
    pic: "https://i.imgur.com/oH0BPwv.jpg",
    string: `This build is designed for **AOE damage** so your focus is to drop your damage on as many mobs as you possible. \nUse Druid robe to gain damage stacks, you need to keep on eye on your Q stacks, and maximize your _Well Prepared_ passive skill \n\nYou can switch to dodging shoes **Royal Shoes, Assassin Shoes**, etc if you are not comfortable with dodging the mobs or bosses skill \n\nPlease eat **Beef stew** for higher damage as you don't depend on cast speed`,
    name: "Weeping Repeater",
    icon: "https://i.imgur.com/CwCxNhV.png",
  },
  "ava-lightcrossbow": {
    pic: "https://i.imgur.com/LRfKUZX.jpg",
    string: `This build is designed for **AOE damage** so your focus is to drop your damage on as many mobs as you possible. \nUse Druid robe to gain damage stacks, you need to keep on eye on your Q stacks, and maximize your _Well Prepared_ passive skill \n\nYou can switch to dodging shoes **Royal Shoes, Assassin Shoes**, etc if you are not comfortable with dodging the mobs or bosses skill \n\nPlease eat **Beef stew** for higher damage as you don't depend on cast speed \n\n**It's mandatory** to use **Cryptcandle** as the offhand of this build to boost the damage`,
    name: "Light Crossbow",
    icon: "https://i.imgur.com/HeYMK8E.png",
  },
  "ava-mainhealer": {
    pic: "https://i.imgur.com/xDKltW9.jpg",
    string:
      "Your role as **Main Healer** is to keep the **Raid Leader (Main Tank)** alive. This means main responsibility is to heal the Raid Leader, **not the party**. \nYou will also be responsible to use **Holy Blessing (W)** on Raid Leader. This role should be played at high spec and by experienced raiders. \n\n**Note:** use **Holy Blessing** on mobs, **Holy Beam** on bosses and **Reawaken** for Dancing Queen(Archmage Boss)",
    name: "Main Healer",
    icon: "https://i.imgur.com/oP8x7o3.png",
  },
  "ava-partyhealer": {
    pic: "https://i.imgur.com/MZxbFVw.jpg",
    string:
      "Your role as **Party Healer** is to keep all dps and supports alive. You may be designated to heal Off Tank in addition to the party. \nYou are **not allowed** to heal **Main Tank** at all, because it will cause healing sickness. \nParty Healer is also responsible to use Reawaken on bosses so lvl 85 mastery is expected. \n\n**Note:** Royal robe with Druid cowl is preferred for heals \n\nOne party healer might also be designated to heal the specter jacket \n\nPlease eat **Pork omelette** for cooldown and cast speed",
    name: "Party Healer",
    icon: "https://i.imgur.com/ce3OT8s.png",
  },
  "ava-permafrost": {
    pic: "https://i.imgur.com/wIJUVEX.jpg",
    string:
      "**Permafrost** is high magic burst weapon, and its focus mainly on **AOE damage**, thus your focus should be to drop your damage on as many mobs as possible. \nThis build focuses on **2 burst combo:** \n1. Use your E ability to activate morgana cape and Q spam with Royal Cowl active. \n2. Use Scholar robe to continue Q spam. \n\n**Note:** \n1. Perma E **must not be used** before the **Raid Leader stun**, because it will fuck up the cc \n2. **Dont use** Scholar robe when the Morgana cape is proc \n\nPlease eat **Pork omelette** for cooldowns and cast speed",
    name: "Permafrost prism",
    icon: "https://i.imgur.com/S8Mk6S6.png",
  },
  "ava-frost": {
    pic: "https://i.imgur.com/uQMhVvx.jpg",
    string:
      "**Frost Staves** is high magic burst weapon, and its focus mainly on **AOE damage**, thus your focus should be to drop your damage on as many mobs as possible. \nThis build focuses on **2 burst combo:** \n1. Use your E ability to activate morgana cape and Q spam with Royal Cowl active. \n2. Use Scholar robe to continue Q spam. \n\n**Note:** \n1. Exception for **Hoarfrost Staff** dont ever ever try to touch your E keyboard when killing mobs \n2. **Dont use** Scholar robe when the Morgana cape is proc \n\nPlease eat **Pork omelette** for cooldowns and cast speed",
    name: "Frost Staves",
    icon: "https://i.imgur.com/a1iCHcW.png",
  },
  "ava-blazing": {
    pic: "https://i.imgur.com/mwp5Jd1.jpg",
    string:
      "**Blazing** is high burst fire DPS \nYou will become **highest DPS** if you play correctly and you will need **2 Separate** build \n\n**Note:** \n1. **Time your E** on final boss so as not to get reflected and die \n2. The spell **changes** during bosses \n\nPlease eat **Beef stew** for more damage",
    name: "Blazing Staff",
    icon: "https://i.imgur.com/jqNg3Ai.png",
  },
  "ava-ironroot": {
    pic: "https://i.imgur.com/XC6pTTG.jpg",
    name: "Ironroot Support",
    icon: "https://i.imgur.com/K82Lc9m.png",
    string:
      "Your role as a **Ironroot** is to link mobs together. \nYou should always linked by using E then use **Royal jacket** and **Assassin hood** to reset cooldowns, you will generate so much aggro - use **Shoes of Tenacity** to get rid of the aggro. \nThis role should be played by **Experienced players** because mobs clearing speed is depending on how good is the **ironroot** in linking mobs \n\n**Note:** \n1. Swap weapons for bosses is **mandatory** as you can't link the boss to any mob ",
  },
  "ava-arcane": {
    pic: "https://i.imgur.com/dx5E354.jpg",
    name: "Arcane",
    icon: "https://i.imgur.com/uUm8ip7.png",
    string:
      "Your role as **Great Arcane** is to use E when called for by **Raid leader**. \nOnce you use your E - use **Royal jacket** and **Assassin hood** to reset cooldowns and get ready for the **next arcane call**. \nIf second arcane has **Judicator armor** it can be used if rotation is missed or any other case mobs may cast spells. \nYou will be designated as first or second arcane by Raid Leader based on **gear and/or experience**. \n\nFor final boss Arcane is responsible to **use Enigmatic staff** to shield the party member chosen by beam or if swords spawn on party. \n\n**Note:** \n1. Any debuffs **won't work** during the Timefreeze (Great Arcane's E) \n2. Always bring **Occult staff** for Lizard boss and **Enigmatic staff** \n3. First arcane always on **Cleanse** and second arcane on **Frazzle** \n\nPlease eat **Pork Omelette** for cooldowns",
  },
  "ava-shadowcaller": {
    pic: "https://i.imgur.com/schEIU9.jpg",
    name: "Cursed Staff Support",
    icon: "https://i.imgur.com/hGFf2KE.png",
    string:
      "**Cursed Support** job is to debuff mobs to increase their damage received. \nUse all the debuffs (Stalker hood, W, and E) after the **second arcane** or in between **first and second arcane** \n\n**HP Cut:** \n1. **Final boss HP cut** \nHP cut is something that is very important to do at final boss. \nSo basically, you are preventing the **Last boss** from healing himself to Max HP, instruction: \na. **Demonic staff** E should be used at about **50% channel**. \nb. **Hood of Tenacity** sholuld be used at about **80% channel** \n\n2. **High Priestess HP Cut** \nyou will  hp cut when 2nd tank air compresses all the shadows out and takes them out and they vanish. \n\n**Note:** \n1. **Hood of Tenacity** is self area cast so you should proc it near the boss \n2. **Cursed support players** are expected to be able to **bait the swords** at final boss. \n3. If you are using **Shadowcaller** always pop E on the **Plate armor** user \n\nPlease eat **Pork omelette** for cooldowns",
  },
  "ava-bms": {
    pic: "https://i.imgur.com/ohQhKwW.jpg",
    name: "Blackmonk (BMS)",
    icon: "https://i.imgur.com/XLf6QF2.png",
    string:
      "Your job as **Blackmonk** is to **fix the pulls** and **reduce damage dealt by mobs**. \nAlso during the Spearmen jump, you need to go **TOWARDS** the person on which spearman about to jump, and then **use ENFEEBLE first** then either **Q** or **W** to cancel the jump \n\n**Dancing Queen (Archmage)** \nOn dancing queen blackmonk is doing the reduce damage for the laser, **instruction:** \n1. **Main tank's** blades (for opening). \n2. **Blackmonk** blades. \n3. **Blackmonk** enfeeble \n4. **Second tank** enfeeble \n5. Back to **Blackmonk** blades and repeat. \n\n**Note:** \n1. Please bring **Knight and Guardian Helmet** \n2. Pop your knight helmet on dancing queen when you're using enfeeble \n\nPlease eat **Pork omelette** for cooldowns",
  },
  "ava-secondtank": {
    pic: "https://i.imgur.com/YuFJ30S.jpg",
    name: "Second Tank | Off Tank",
    icon: "https://i.imgur.com/OAovFtV.png",
    string:
      "Your main job as **Second tank** is to **Taunt** the mobs and use **Sacred ground** to silence the mobs. \n **Listen** to the **Raid Leader's call** when to drop silence and Taunt any mob that **may walk out of the silence.** \nOff Tank is also **responsible to Taunt any mobs that may switch agro** (drones, warrior, knight, archer). \nYou will use **Blackmonk Staff** for some bosses for **damage reduction** or to **slow auto attack speed** with **forceful swing**. \n\n**PS:** Second tank can use any plate armor nowadays since they only expected to taunt the mobs \n\nPlease eat **Pork omelette** for cooldowns",
  },
  "ava-maintank": {
    pic: "https://i.imgur.com/qEPy5BE.jpg",
    name: "Main Tank | Raid Leader",
    icon: "https://i.imgur.com/cyejSwC.png",
    string:
      "This build is **exclusively** for **Raid Leaders**. \nYou will play **1 handed Hammer + Leering Cane** for mob pulls with all armor on **Authority passive (more cc duration)** and swap to **Blackmonk Stave** for bosses \n\nPlease eat **River Sturgeon fish** for more CC duration",
  },
};
const row = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomID("dps")
    .setPlaceholder("ZvZ DPS builds")
    .addOptions([
      {
        label: "Dual Swords",
        description: "Melee dps build, good for clumps",
        value: "zvz-dualswords",
        emoji: "<:dualswords:860679052309299210>",
      },
      {
        label: "Permafrost Prism",
        description: "Ranged magic dps build, good for escaping",
        value: "zvz-permafrost",
        emoji: "<:perma:860679051617107968>",
      },
      {
        label: "Halberd",
        description: "Melee dps build, spread the healing sickness",
        value: "zvz-halberd",
        emoji: "<:halberd:860679050468917258>",
      },
      {
        label: "Energy Shaper",
        description: "Ranged dps build, same party lazer doesnt stack",
        value: "zvz-energyshaper",
        emoji: "<:shaper:860679052142182400>",
      },
      {
        label: "Mistpiercer",
        description: "Ranged magic dps build, straight line narrow aoe",
        value: "zvz-mistpiercer",
        emoji: "<:avabow:860679049973465098>",
      },
      {
        label: "Clarent Blade",
        description: "Melee dps build, huge round AoE",
        value: "zvz-clarent",
        emoji: "<:clarent:860679051445796895>",
      },
      {
        label: "Realmbreaker",
        description: "Melee dps build, clap enemy and reduce their hp %",
        value: "zvz-realmbreaker",
        emoji: "<:realmbreaker:860679051667701810>",
      },
      {
        label: "Daybreaker",
        description: "Melee dps build, straight AoE purge",
        value: "zvz-daybreaker",
        emoji: "<:daybreaker:860679051353915482>",
      },
      {
        label: "Galatine Pair",
        description: "Melee dps build, this build CLAPS PPL",
        value: "zvz-galatine",
        emoji: "<:galatine:860679051038556160>",
      },
      {
        label: "Brimstone",
        description: "Ranged magic build, medium size circle AoE BIG DPS",
        value: "zvz-brimstone",
        emoji: "<:brimstone:860679049901637633>",
      },
      {
        label: "Siegebow",
        description: "Ranged dps build, huge AoE weapon",
        value: "zvz-siegebow",
        emoji: "<:siegebow:860679051786453052>",
      },
      {
        label: "Spirithunter",
        description: "Melee dps build, reduce enemy's resistance",
        value: "zvz-spirithunter",
        emoji: "<:spirithunter:860679050363142155>",
      },
      {
        label: "Shadowcaller",
        description: "Ranged magic support dps, shed enemies",
        value: "zvz-shadowcaller",
        emoji: "<:shadowcaller:860813033105915945>",
      },
      {
        label: "Dawnsong",
        description: "Ranged magic dps, big fire AoE",
        value: "zvz-dawnsong",
        emoji: "<:dawnsong:860679051295326208>",
      },
      {
        label: "Bridled Fury",
        description: "Melee magic dps, hit and run CLAP",
        value: "zvz-bridled",
        emoji: "<:bridledfury:860687946868981820>",
      },
      {
        label: "Cursed Skull",
        description: "Ranged magic dps, huge circle true damage AoE",
        value: "zvz-cursedskull",
        emoji: "<:cursedskull:860687944960835624>",
      },
      {
        label: "Damnation",
        description: "Ranged magic semi support dps, HUGE AoE shred",
        value: "zvz-damnation",
        emoji: "<:damnation:860687946905812992>",
      },
      {
        label: "Greataxe",
        description: "Harcore melee dps, uninterruptable high dps spin",
        value: "zvz-greataxe",
        emoji: "<:greataxe:860687945119563786>",
      },
    ])
);
const tankRow = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomID("tanks")
    .setPlaceholder("ZvZ TANK builds")
    .addOptions([
      {
        label: "Camlaann",
        description: "Melee tank build, good for initiating clump",
        value: "zvz-camlann",
        emoji: "<:camlann:860681322879385621>",
      },
      {
        label: "Grailseeker",
        description: "Melee tank build, hold enemy engages",
        value: "zvz-grailseeker",
        emoji: "<:grailseeker:860691643971665921>",
      },
      {
        label: "Soulscythe",
        description: "Melee tank build, good for initiating engage",
        value: "zvz-soulscythe",
        emoji: "<:soulscythe:860691644211134484>",
      },
      {
        label: "Grovekeeper",
        description: "Melee tank build, big aoe stun",
        value: "zvz-grovekeeper",
        emoji: "<:grovekeeper:860691643593523200>",
      },
      {
        label: "Morningstar",
        description: "Melee tank build, roots enemy in long duration",
        value: "zvz-morningstar",
        emoji: "<:morningstar:860691643250638928>",
      },
    ])
);
const healRow = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomID("heals")
    .setPlaceholder("ZvZ Heal and Supports builds")
    .addOptions([
      {
        label: "Fallen Staff",
        description: "Casual holy healer, big pp circle + cleanse heal",
        value: "zvz-fallen",
        emoji: "<:Fallen:860679051308171266>",
      },
      {
        label: "Wild Staff",
        description: "Nature healer, big AOE circle heal",
        value: "zvz-wildstaff",
        emoji: "<:wildstaff:860693853652910100>",
      },
      {
        label: "Great Holy",
        description: "Holy Healer, increase allies resistance",
        value: "zvz-greatholy",
        emoji: "<:greatholy:860693852611411999>",
      },
      {
        label: "Rampant",
        description: "Nature Healer, straight narrow line AOE heals",
        value: "zvz-rampant",
        emoji: "<:rampant:860693853849518100>",
      },
      {
        label: "Malevolent Locus",
        description: "Arcane support, used to cleanse allies",
        value: "zvz-locus",
        emoji: "<:locus:860822902547283969>",
      },
      {
        label: "One Handed Arcane",
        description: "Arcane support, silences and purges enemies in AOE",
        value: "zvz-arcane",
        emoji: "<:onehandarcane:860822902134538250>",
      },
      {
        label: "Occult Staff",
        description: "Arcane support, increase allies movement speed",
        value: "zvz-occult",
        emoji: "<:occult:860823088475013131>",
      },
      {
        label: "Enigmatic Staff",
        description: "Arcane support, gives AOE shield to allies",
        value: "zvz-enigmatic",
        emoji: "<:enigmatic:860822901184004146>",
      },
    ])
);
const dpsList = {
  "zvz-siegebow": [
    "https://i.imgur.com/s5kBpr1.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101093",
    "https://discord.com/channels/200746010102726657/807319001234407504/807658296416665621",
  ],
  "zvz-permafrost": [
    "https://i.imgur.com/VY91AFv.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101097",
    "https://discord.com/channels/200746010102726657/807319001234407504/807675958097477672",
  ],
  "zvz-mistpiercer": [
    "https://i.imgur.com/MMIyALt.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101099",
    "https://discord.com/channels/200746010102726657/807319001234407504/807679039275139102",
  ],
  "zvz-energyshaper": [
    "https://i.imgur.com/qDdKBSB.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101101",
    "https://discord.com/channels/200746010102726657/807319001234407504/807700941457063986",
  ],
  "zvz-brimstone": [
    "https://i.imgur.com/1k8FJlp.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101179",
    "https://discord.com/channels/200746010102726657/807319001234407504/807675595797823488",
  ],
  "zvz-dawnsong": [
    "https://i.imgur.com/61o9SVr.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101102",
    "https://discord.com/channels/200746010102726657/807319001234407504/807701098026106930",
  ],
  "zvz-halberd": [
    "https://i.imgur.com/Z66GRfX.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101103",
    "https://discord.com/channels/200746010102726657/807319001234407504/807781638494486548",
  ],
  "zvz-realmbreaker": [
    "https://i.imgur.com/oOUnwKo.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101106",
    "https://discord.com/channels/200746010102726657/807319001234407504/807781876571308042",
  ],
  "zvz-daybreaker": [
    "https://i.imgur.com/KAag4qz.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101108",
    "https://discord.com/channels/200746010102726657/807319001234407504/807782187550244884",
  ],
  "zvz-galatine": [
    "https://i.imgur.com/cU4Y1Og.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101109",
    "https://discord.com/channels/200746010102726657/807319001234407504/807786585302368266",
  ],
  "zvz-clarent": [
    "https://i.imgur.com/p8ElKkd.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101112",
    "https://discord.com/channels/200746010102726657/807319001234407504/808048332256968714",
  ],
  "zvz-spirithunter": [
    "https://i.imgur.com/rxFjtVy.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101113",
    "https://discord.com/channels/200746010102726657/807319001234407504/808051545865715722",
  ],
  "zvz-dualswords": [
    "https://i.imgur.com/9jDIX7D.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101116",
    "https://discord.com/channels/200746010102726657/807319001234407504/808053999471034368",
  ],
  "zvz-bridled": [
    "https://i.imgur.com/ylc2jgp.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101147",
    "https://discord.com/channels/200746010102726657/807319001234407504/816410289292967947",
  ],
  "zvz-greataxe": [
    "https://i.imgur.com/jD5hSJ0.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101150",
    "https://discord.com/channels/200746010102726657/807319001234407504/843587604413808680",
  ],
  "zvz-damnation": [
    "https://i.imgur.com/SoSgWnJ.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101125",
    "https://discord.com/channels/200746010102726657/807319001234407504/808440044594659389",
  ],
  "zvz-shadowcaller": [
    "https://i.imgur.com/LUAPvmA.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101138",
    "https://discord.com/channels/200746010102726657/807319001234407504/815692980673445888",
  ],
  "zvz-cursedskull": [
    "https://i.imgur.com/jePPweD.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101152",
    "https://discord.com/channels/200746010102726657/807319001234407504/843590654676303942",
  ],
};
const healList = {
  "zvz-occult": [
    "https://i.imgur.com/iqEZaeO.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101117",
    "https://discord.com/channels/200746010102726657/807319001234407504/808320638447124500",
  ],
  "zvz-enigmatic": [
    "https://i.imgur.com/4Ixgf2O.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101120",
    "https://discord.com/channels/200746010102726657/807319001234407504/808324352961544223",
  ],
  "zvz-locus": [
    "https://i.imgur.com/BV3fNwg.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101121",
    "https://discord.com/channels/200746010102726657/807319001234407504/808337336198889472",
  ],
  "zvz-arcane": [
    "https://i.imgur.com/RDJRDw5.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101124",
    "https://discord.com/channels/200746010102726657/807319001234407504/808382611004719134",
  ],
  "zvz-fallen": [
    "https://i.imgur.com/voOcedm.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101129",
    "https://discord.com/channels/200746010102726657/807319001234407504/809525705406808115",
  ],
  "zvz-greatholy": [
    "https://i.imgur.com/qA4VqIr.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101132",
    "https://discord.com/channels/200746010102726657/807319001234407504/809525850487259156",
  ],
  "zvz-wildstaff": [
    "https://i.imgur.com/7c1HlRw.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101133",
    "https://discord.com/channels/200746010102726657/807319001234407504/809526032712335370",
  ],
  "zvz-rampant": [
    "https://i.imgur.com/laJJaSW.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101135",
    "https://discord.com/channels/200746010102726657/807319001234407504/809526200036622386",
  ],
};
const list = {
  "zvz-grailseeker": [
    "https://i.imgur.com/p3e1S9u.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101137",
    "https://discord.com/channels/200746010102726657/807319001234407504/810357183257509898",
  ],
  "zvz-soulscythe": [
    "https://i.imgur.com/zbIHNd4.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101140",
    "https://discord.com/channels/200746010102726657/807319001234407504/810356814134509589",
  ],
  "zvz-grovekeeper": [
    "https://i.imgur.com/C0t25qT.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101146",
    "https://discord.com/channels/200746010102726657/807319001234407504/810356518288490496",
  ],
  "zvz-morningstar": [
    "https://i.imgur.com/S9JfLza.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101151",
    "https://discord.com/channels/200746010102726657/807319001234407504/810356339485835296",
  ],
  "zvz-camlann": [
    "https://i.imgur.com/Pwlqi2E.jpg",
    "https://albiononline.com/en/characterbuilder/solo-builds/view/101156",
    "https://discord.com/channels/200746010102726657/807319001234407504/810356123470921749",
  ],
};
module.exports = {
  recentlyRan,
  AvArow,
  avalist,
  row,
  tankRow,
  healRow,
  dpsList,
  healList,
  list,
};
