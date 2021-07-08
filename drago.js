const Discord = require('discord.js');
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
const client = new Discord.Client({ "intents": ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", 'GUILD_MEMBERS'], "partials": ["MESSAGE", "CHANNEL", "REACTION"]});
const mongo = require('./mongo')
const splitz = require('./models/split-schema')
const person = require('./models/person')
const regear = require('./models/regear')
const report = require('./models/report')
const register = require('./models/register')
const axios = require('axios'); 
const prefix = '!'
const blacklist = require('./models/blacklist')
const dateMaker = (date) => {
    let timeFix = date.toLocaleTimeString()
    let dateFix = date.toLocaleDateString()
    let final = dateFix + ' ' + timeFix
    return final;
}
const sets = (mainHand, offHand, head, armor, shoes, array) => {
    if (offHand == null) {
        if (!mainHand.Type.toString().includes(array[0]) && !head.Type.toString().includes(array[1]) && !armor.Type.toString().includes(array[2]) && !shoes.Type.toString().includes(array[3])) return false
        
    } else {
        if (!mainHand.Type.toString().includes(array[0]) && !offHand.Type.toString().includes(array[1]) && !head.Type.toString().includes(array[2]) && !armor.Type.toString().includes(array[3]) && !shoes.Type.toString().includes(array[4])) return false
    }
}   
const compareSet = (mainHand, offHand, head, armor, shoes) => {
    let avaHammerTank = ['2H_ICECRYSTAL_UNDEAD', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_AVALON', 'SHOES_LEATHER_SET2']
    let oneHandFrost = ['MAIN_FROSTSTAFF', 'OFF_JESTERCANE_HELL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET2', 'SHOES_CLOTH_SET1']
    let oneHandFrost2 = ['MAIN_FROSTSTAFF', 'OFF_SHIELD_HELL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let cursedSkull = ['2H_SKULLORB_HELL', 'HEAD_LEATHER_SET3', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_ROYAL']
    let cursedSkull2 = ['2H_SKULLORB_HELL', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_LEATHER_SET2']
    let greatAxe1 = ['2H_AXE', 'HEAD_CLOTH_SET1', 'ARMOR_PLATE_SET1', 'SHOES_LEATHER_SET2']
    let greatAxe2 = ['2H_AXE', 'HEAD_CLOTH_SET1', 'ARMOR_LEATHER_HELL', 'SHOES_LEATHER_SET2']
    let greatAxe3 = ['2H_AXE', 'HEAD_CLOTH_SET1', 'ARMOR_LEATHER_UNDEAD', 'SHOES_LEATHER_SET2']
    let bridledFury = ['2H_DAGGER_KATAR_AVALON', 'HEAD_LEATHER_MORGANA', 'ARMOR_LEATHER_HELL', 'SHOES_LEATHER_SET2']
    let bridledFury2 = ['2H_DAGGER_KATAR_AVALON', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_ROYAL']
    let shadowCaller = ['MAIN_CURSEDSTAFF_AVALON', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let shadowCaller2 = ['MAIN_CURSEDSTAFF_AVALON', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let grailSeeker = ['2H_QUARTERSTAFF_AVALON', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET2', 'SHOES_LEATHER_SET2']
    let grailSeeker2 = ['2H_QUARTERSTAFF_AVALON', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_LEATHER_SET2']
    let soulscythe2 = ['2H_TWINSCYTHE_HELL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_LEATHER_SET2']
    let soulScythe = ['2H_TWINSCYTHE_HELL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET2', 'SHOES_LEATHER_SET2']
    let groveKeeper = ['2H_RAM_KEEPER', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET3', 'SHOES_LEATHER_SET2']
    let groveKeeper2 = ['2H_RAM_KEEPER', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_KEEPER', 'SHOES_LEATHER_SET2']
    let morningstar = ['2H_FLAIL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_KEEPER', 'SHOES_LEATHER_SET2']
    let morningstar2 = ['2H_FLAIL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_LEATHER_SET2']
    let camlaan = ['2H_MACE_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_KEEPER', 'SHOES_LEATHER_SET2']
    let camlaan2 = ['2H_MACE_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_LEATHER_SET2']
    let rampant = ['2H_NATURESTAFF_KEEPER', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let rampant2 = ['2H_NATURESTAFF_KEEPER', 'HEAD_LEATHER_SET1', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let wild = ['2H_WILDSTAFF', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let wild2 = ['2H_WILDSTAFF', 'HEAD_LEATHER_SET1', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let greatHoly = ['2H_HOLYSTAFF', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let greatHoly2 = ['2H_HOLYSTAFF', 'HEAD_LEATHER_SET1', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let fallen = ['2H_HOLYSTAFF_HELL', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let fallen2 = ['2H_HOLYSTAFF_HELL', 'HEAD_LEATHER_SET1', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let icicle = ['2H_ICEGAUNTLETS_HELL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let icicle2 = ['2H_ICEGAUNTLETS_HELL', 'HEAD_PLATE_KEEPER', 'ARMOR_PLATE_SET2', 'SHOES_CLOTH_SET1']
    let damnation = ['2H_CURSEDSTAFF_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_SET1']
    let damnation2 = ['2H_CURSEDSTAFF_MORGANA', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_ROYAL']
    let arcane1 = ['MAIN_ARCANESTAFF', 'OFF_HORN_KEEPER', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let arcane2 = ['MAIN_ARCANESTAFF', 'OFF_HORN_KEEPER', 'HEAD_LEATHER_SET1', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let arcane3 = ['MAIN_ARCANESTAFF', 'OFF_SHIELD_HELL', 'HEAD_PLATER_KEEPER', 'ARMOR_PLATE_SET2', 'SHOES_CLOTH_SET1']
    let locus = ['2H_ENIGMATICORB_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_KEEPER', 'SHOES_CLOTH_SET1']
    let locu2 = ['2H_ENIGMATICORB_MORGANA', 'HEAD_LEATHER_SET1', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let locus3 = ['2H_ENIGMATICORB_MORGANA', 'HEAD_LEATHER_SET3', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let enigma = ['2H_ENIGMATICSTAFF', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_KEEPER', 'SHOES_CLOTH_SET1']
    let enigma2 = ['2H_ENIGMATICSTAFF', 'HEAD_LEATHER_SET1', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let enigma3 = ['2H_ENIGMATICSTAFF', 'HEAD_LEATHER_SET3', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let occult = ['2H_ARCANESTAFF_HELL', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_KEEPER', 'SHOES_CLOTH_SET1']
    let occult2 = ['2H_ARCANESTAFF_HELL', 'HEAD_LEATHER_SET1', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let occult3 = ['2H_ARCANESTAFF_HELL', 'HEAD_LEATHER_SET3', 'ARMOR_PLATE_SET2', 'SHOES_CLOTH_SET1']
    let dual = ['2H_DUALSWORD', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET1', 'SHOES_CLOTH_SET1']
    let dual2 = ['2H_DUALSWORD', 'HEAD_PLATE_SET2', 'ARMOR_LEATHER_HELL', 'SHOES_CLOTH_SET1']
    let spiritHunter = ['2H_HARPOON_HELL', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let spiritHunter2 = ['2H_HARPOON_HELL', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_ROYAL']
    let clarent = ['MAIN_SCIMITAR_MORGANA', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET1', 'SHOES_LEATHER_SET2']
    let clarent2 = ['MAIN_SCIMITAR_MORGANA', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_LEATHER_MORGANA', 'ARMOR_LEATHER_HELL', 'SHOES_LEATHER_SET2']
    let clarent3 = ['MAIN_SCIMITAR_MORGANA', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_LEATHER_MORGANA', 'ARMOR_LEATHER_KEEPER', 'SHOES_LEATHER_SET2']
    let gala = ['2H_DUALSCIMITAR_UNDEAD', 'HEAD_LEATHER_MORGANA', 'ARMOR_LEATHER_HELL', 'SHOES_CLOTH_ROYAL']
    let gala2 = ['2H_DUALSCIMITAR_UNDEAD', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET3']
    let dayBreaker = ['MAIN_SPEAR_LANCE_AVALON', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_PLATE_SET1', 'ARMOR_LEATHER_HELL', 'SHOES_CLOTH_SET1']
    let dayBreaker2 = ['MAIN_SPEAR_LANCE_AVALON', 'OFF_SPIKEDSHIELD_MORGANA', 'HEAD_PLATE_SET1', 'ARMOR_PLATE_SET1', 'SHOES_CLOTH_SET1']
    let dayBreaker3 = ['MAIN_SPEAR_LANCE_AVALON', 'OFF_HORN_KEEPER', 'HEAD_LEATHER_SET1', 'ARMOR_PLATE_HELL', 'SHOES_CLOTH_SET1']
    let realmBreaker = ['2H_AXE_AVALON', 'HEAD_CLOTH_SET1', 'ARMOR_LEATHER_HELL', 'SHOES_CLOTH_SET1']
    let realmBreaker2 = ['2H_AXE_AVALON', 'HEAD_CLOTH_SET1', 'ARMOR_PLATE_SET1', 'SHOES_CLOTH_SET1']
    let halberd = ['2H_HALBERD', 'HEAD_PLATE_SET2', 'ARMOR_PLATE_SET1', 'SHOES_CLOTH_SET1']
    let halberd2 = ['2H_HALBERD', 'HEAD_CLOTH_SET1', 'ARMOR_LEATHER_HELL', 'SHOES_CLOTH_SET1']
    let halberd3 = ['2H_HALBERD', 'HEAD_CLOTH_SET1', 'ARMOR_LEATHER_KEEPER', 'SHOES_CLOTH_SET1']
    let dawnsong = ['2H_FIRE_RINGPAIR_AVALON', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_ROYAL']
    let dawnsong2 = ['2H_FIRE_RINGPAIR_AVALON', 'HEAD_LEATHER_SET3', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_SET1']
    let shaper = ['2H_CROSSBOW_CANNON_AVALON', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_ROYAL']
    let shaper2 = ['2H_CROSSBOW_CANNON_AVALON', 'HEAD_LEATHER_SET3', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let mistpiercer = ['2H_BOW_AVALON', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_ROYAL']
    let mistpiercer2 = ['2H_BOW_AVALON', 'HEAD_LEATHER_SET3', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_SET1']
    let perma = ['2H_ICECRYSTAL_UNDEAD', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_SET1']
    let perma2 = ['2H_ICECRYSTAL_UNDEAD', 'HEAD_CLOTH_ROYAL', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_ROYAL']
    let brimstone = ['2H_FIRESTAFF_HELL', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_SET1']
    let brimstone2 = ['2H_FIRESTAFF_HELL', 'HEAD_LEATHER_ROYAL', 'ARMOR_CLOTH_SET1', 'SHOES_CLOTH_ROYAL']
    let siegebow = ['2H_CROSSBOWLARGE_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_SET1']
    let siegebow2 = ['2H_CROSSBOWLARGE_MORGANA', 'HEAD_PLATE_SET2', 'ARMOR_CLOTH_SET2', 'SHOES_CLOTH_ROYAL']
    let weapon = mainHand.Type.toString()
    if (offHand == null) {
        if (weapon.includes(avaHammerTank[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, avaHammerTank) == false) return true
        } else if (weapon.includes(siegebow[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, siegebow) == false | sets(mainHand, offHand, head, armor, shoes, siegebow2) == false) return true
        } else if (weapon.includes(brimstone[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, brimstone) == false | sets(mainHand, offHand, head, armor, shoes, brimstone2) == false) return true
        } else if (weapon.includes(perma[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, perma) == false | sets(mainHand, offHand, head, armor, shoes, perma2) == false) return true
        } else if (weapon.includes(mistpiercer[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, mistpiercer) == false | sets(mainHand, offHand, head, armor, shoes, mistpiercer2) == false) return true
        } else if (weapon.includes(shaper[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, shaper) == false | sets(mainHand, offHand, head, armor, shoes, shaper2) == false) return true
        } else if (weapon.includes(dawnsong[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, dawnsong2) == false | sets(mainHand, offHand, head, armor, shoes, dawnsong2) == false) return true
        } else if (weapon.includes(halberd[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, halberd) == false | sets(mainHand, offHand, head, armor, shoes, halberd2) == false | sets(mainHand, offHand, head, armor, shoes, halberd3) == false) return true
        } else if (weapon.includes(realmBreaker[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, realmBreaker) == false | sets(mainHand, offHand, head, armor, shoes, realmBreaker2) == false) return true
        } else if (weapon.includes(gala[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, gala) == false | sets(mainHand, offHand, head, armor, shoes, gala2) == false) return true
        } else if (weapon.includes(spiritHunter[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, spiritHunter) == false | sets(mainHand, offHand, head, armor, shoes, spiritHunter2) == false) return true
        } else if (weapon.includes(dual[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, dual) == false | sets(mainHand, offHand, head, armor, shoes, dual2) == false) return true
        } else if (weapon.includes(occult[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, occult) == false | sets(mainHand, offHand, head, armor, shoes, occult2) == false | sets(mainHand, offHand, head, armor, shoes, occult3) == false) return true
        } else if (weapon.includes(enigma[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, enigma) == false | sets(mainHand, offHand, head, armor, shoes, enigma2) == false | sets(mainHand, offHand, head, armor, shoes, enigma3) == false) return true
        } else if (weapon.includes(locus[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, locus) == false | sets(mainHand, offHand, head, armor, shoes, locu2) == false | sets(mainHand, offHand, head, armor, shoes, locus3) == false) return true
        } else if (weapon.includes(damnation[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, damnation) == false | sets(mainHand, offHand, head, armor, shoes, damnation2) == false) return true
        } else if (weapon.includes(icicle[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, icicle) == false | sets(mainHand, offHand, head, armor, shoes, icicle2) == false) return true
        } else if (weapon.includes(fallen[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, fallen) == false | sets(mainHand, offHand, head, armor, shoes, fallen2) == false) return true
        } else if (weapon.includes(greatHoly[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, greatHoly) == false | sets(mainHand, offHand, head, armor, shoes, greatHoly2) == false) return true
        } else if (weapon.includes(wild[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, wild) == false | sets(mainHand, offHand, head, armor, shoes, wild2) == false) return true
        } else if (weapon.includes(rampant[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, rampant) == false | sets(mainHand, offHand, head, armor, shoes, rampant2) == false) return true
        } else if (weapon.includes(camlaan[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, camlaan) == false | sets(mainHand, offHand, head, armor, shoes, camlaan2) == false) return true
        } else if (weapon.includes(morningstar[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, morningstar) == false | sets(mainHand, offHand, head, armor, shoes, morningstar2) == false) return true
        } else if (weapon.includes(groveKeeper[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, groveKeeper) == false | sets(mainHand, offHand, head, armor, shoes, groveKeeper2) == false) return true
        } else if (weapon.includes(soulScythe[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, soulScythe) == false | sets(mainHand, offHand, head, armor, shoes, soulscythe2) == false) return true
        } else if (weapon.includes(grailSeeker[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, grailSeeker) == false | sets(mainHand, offHand, head, armor, shoes, grailSeeker2) == false) return true
        } else if (weapon.includes(bridledFury[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, bridledFury) == false | sets(mainHand, offHand, head, armor, shoes, bridledFury2) == false) return true
        } else if (weapon.includes(greatAxe1[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, greatAxe1) == false | sets(mainHand, offHand, head, armor, shoes, greatAxe2) == false | sets(mainHand, offHand, head, armor, shoes, greatAxe3) == false) return true
        } else if (weapon.includes(cursedSkull[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, cursedSkull) == false | sets(mainHand, offHand, head, armor, shoes, cursedSkull2) == false) return true
        } else {
            return true
        }
    } else {
        if (weapon.includes(oneHandFrost[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, oneHandFrost) == false | sets(mainHand, offHand, head, armor, shoes, oneHandFrost2) == false) return true
        } else if (weapon.includes(clarent[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, clarent) == false | sets(mainHand, offHand, head, armor, shoes, clarent2) == false | sets(mainHand, offHand, head, armor, shoes, clarent3) == false) return true
        } else if (weapon.includes(shadowCaller[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, shadowCaller) == false | sets(mainHand, offHand, head, armor, shoes, shadowCaller2) == false) return true
        } else if (weapon.includes(arcane1[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, arcane1) == false | sets(mainHand, offHand, head, armor, shoes, arcane2) == false | sets(mainHand, offHand, head, armor, shoes, arcane3) == false) return true
        } else if (weapon.includes(dayBreaker[0])) {
            if (sets(mainHand, offHand, head, armor, shoes, dayBreaker) == false | sets(mainHand, offHand, head, armor, shoes, dayBreaker2) == false | sets(mainHand, offHand, head, armor, shoes, dayBreaker3) == false) return true
        } else {
            return true
        }
    }
}
const AvArow = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
    .setCustomID('avabuilds')
    .setPlaceholder('Search ava builds')
    .addOptions([
        {
            label: 'Realmbreaker',
            description: 'Melee dps, reduces mobs health percentage',
            value: 'ava-realmbreaker',
            emoji: '<:realmbreaker:861440819689291796>'
        },
        {
            label: 'Weeping Repeater',
            description: 'Ranged dps, big magic dmg burst on the E',
            value: 'ava-weeping',
            emoji: '<:weeping:861440820531560448>'
        },
        {
            label: 'Light Crossbow',
            description: 'Ranged dps, big dps if know the combo',
            value: 'ava-lightcrossbow',
            emoji: '<:lightcrossbow:861440820287504404>'
        },
        {
            label: 'Permafrost',
            description: 'Ranged magic dps, big magic dmg burst on the E',
            value: 'ava-permafrost',
            emoji: '<:permafrost:861440819747356672>'
        },
        {
            label: 'Frost staves',
            description: 'Ranged magic dps.',
            value: 'ava-frost',
            emoji: '<:greatfrost:861440817746411532>'
        },
        {
            label: 'Blazing Staff',
            description: 'Ranged magic dps, big dps if have big brain',
            value: 'ava-blazing',
            emoji: '<:blazingstaff:861440820040564746>'
        },
        {
            label: 'Ironroot',
            description: 'Support dps, link mobs together',
            value: 'ava-ironroot',
            emoji: '<:ironroot:861440822700146688>'
        },
        {
            label: 'Cursed Staff',
            description: 'Curse support, reduces mobs resistance',
            value: 'ava-shadowcaller',
            emoji: '<:shadowcaller:861440816568336404>'
        },
        {
            label: 'Arcane',
            description: 'Arcane support, timefreeze the mob',
            value: 'ava-arcane',
            emoji: '<:arcane:861440815284355073>'
        },
        {
            label: 'Party Healer',
            description: 'Holy healer, heal the party',
            value: 'ava-partyhealer',
            emoji: '<:fallenstaff:861440819805421579>'
        },
        {
            label: 'Main Healer',
            description: 'Holy healer, heal the party',
            value: 'ava-mainhealer',
            emoji: '<:holystaff:861440820250935338>'
        },
        {
            label: 'Blackmonk',
            description: 'Quarterstaff support, kick mobs and reduce dmg',
            value: 'ava-bms',
            emoji: '<:bms:861440820124581928>'
        },
        {
            label: 'Second Tank/Off Tank',
            description: 'Second tank, taunt and pull mobs',
            value: 'ava-secondtank',
            emoji: '<:incubus:861440822489776159>'
        },
        {
            label: 'Main Tank',
            description: 'Person who leads the Ava',
            value: 'ava-maintank',
            emoji: '<:hammer:861440821735718932>'
        },
    ])
)
let avalist = {
    'ava-realmbreaker': {
        pic: 'https://i.imgur.com/iU9Lh1c.jpg',
        string: `Don't use your E during the arcane. \nYou may use roast pork for more survivability, but beef stew is preferrable \nFor bosses change to Q1 and W1 \n\nWhen fighting the **Knight Captain** Boss, you sholdn't use your E except when it's channeling for explosion or reflect \n\nOther melee DPS builds viable in ava: **Spirit hunter, Bearpaws** \nKeep in Note that melee dps is for experienced raiders of maximum of 2 per raid \nThe second Melee dps can use druid robe instead of specter jacket `,
        name: 'Realmbreaker',
        icon: 'https://i.imgur.com/pGPQtCf.png'
    },
    'ava-weeping': {
        pic: 'https://i.imgur.com/oH0BPwv.jpg',
        string: `This build is designed for **AOE damage** so your focus is to drop your damage on as many mobs as you possible. \nUse Druid robe to gain damage stacks, you need to keep on eye on your Q stacks, and maximize your _Well Prepared_ passive skill \n\nYou can switch to dodging shoes **Royal Shoes, Assassin Shoes**, etc if you are not comfortable with dodging the mobs or bosses skill \n\nPlease eat **Beef stew** for higher damage as you don't depend on cast speed`,
        name: 'Weeping Repeater',
        icon: 'https://i.imgur.com/CwCxNhV.png'
    },
    'ava-lightcrossbow': {
        pic: 'https://i.imgur.com/LRfKUZX.jpg',
        string: `This build is designed for **AOE damage** so your focus is to drop your damage on as many mobs as you possible. \nUse Druid robe to gain damage stacks, you need to keep on eye on your Q stacks, and maximize your _Well Prepared_ passive skill \n\nYou can switch to dodging shoes **Royal Shoes, Assassin Shoes**, etc if you are not comfortable with dodging the mobs or bosses skill \n\nPlease eat **Beef stew** for higher damage as you don't depend on cast speed \n\n**It's mandatory** to use **Cryptcandle** as the offhand of this build to boost the damage`,
        name: 'Light Crossbow',
        icon: 'https://i.imgur.com/HeYMK8E.png'
    },
    'ava-mainhealer': {
        pic: 'https://i.imgur.com/xDKltW9.jpg',
        string: 'Your role as **Main Healer** is to keep the **Raid Leader (Main Tank)** alive. This means main responsibility is to heal the Raid Leader, **not the party**. \nYou will also be responsible to use **Holy Blessing (W)** on Raid Leader. This role should be played at high spec and by experienced raiders. \n\n**Note:** use **Holy Blessing** on mobs, **Holy Beam** on bosses and **Reawaken** for Dancing Queen(Archmage Boss)',
        name: 'Main Healer',
        icon: 'https://i.imgur.com/oP8x7o3.png'
    },
    'ava-partyhealer': {
        pic: 'https://i.imgur.com/MZxbFVw.jpg',
        string: 'Your role as **Party Healer** is to keep all dps and supports alive. You may be designated to heal Off Tank in addition to the party. \nYou are **not allowed** to heal **Main Tank** at all, because it will cause healing sickness. \nParty Healer is also responsible to use Reawaken on bosses so lvl 85 mastery is expected. \n\n**Note:** Royal robe with Druid cowl is preferred for heals \n\nOne party healer might also be designated to heal the specter jacket \n\nPlease eat **Pork omelette** for cooldown and cast speed',
        name: 'Party Healer',
        icon: 'https://i.imgur.com/ce3OT8s.png'
    },
    'ava-permafrost': {
        pic: 'https://i.imgur.com/wIJUVEX.jpg',
        string: '**Permafrost** is high magic burst weapon, and its focus mainly on **AOE damage**, thus your focus should be to drop your damage on as many mobs as possible. \nThis build focuses on **2 burst combo:** \n1. Use your E ability to activate morgana cape and Q spam with Royal Cowl active. \n2. Use Scholar robe to continue Q spam. \n\n**Note:** \n1. Perma E **must not be used** before the **Raid Leader stun**, because it will fuck up the cc \n2. **Dont use** Scholar robe when the Morgana cape is proc \n\nPlease eat **Pork omelette** for cooldowns and cast speed',
        name: 'Permafrost prism',
        icon: 'https://i.imgur.com/S8Mk6S6.png'
    },
    'ava-frost': {
        pic: 'https://i.imgur.com/uQMhVvx.jpg',
        string: '**Frost Staves** is high magic burst weapon, and its focus mainly on **AOE damage**, thus your focus should be to drop your damage on as many mobs as possible. \nThis build focuses on **2 burst combo:** \n1. Use your E ability to activate morgana cape and Q spam with Royal Cowl active. \n2. Use Scholar robe to continue Q spam. \n\n**Note:** \n1. Exception for **Hoarfrost Staff** dont ever ever try to touch your E keyboard when killing mobs \n2. **Dont use** Scholar robe when the Morgana cape is proc \n\nPlease eat **Pork omelette** for cooldowns and cast speed',
        name: 'Frost Staves',
        icon: 'https://i.imgur.com/a1iCHcW.png'
    },
    'ava-blazing': {
        pic: 'https://i.imgur.com/mwp5Jd1.jpg',
        string: '**Blazing** is high burst fire DPS \nYou will become **highest DPS** if you play correctly and you will need **2 Separate** build \n\n**Note:** \n1. **Time your E** on final boss so as not to get reflected and die \n2. The spell **changes** during bosses \n\nPlease eat **Beef stew** for more damage',
        name: 'Blazing Staff',
        icon: 'https://i.imgur.com/jqNg3Ai.png'
    },
    'ava-ironroot': {
        pic: 'https://i.imgur.com/XC6pTTG.jpg',
        name: 'Ironroot Support',
        icon: 'https://i.imgur.com/K82Lc9m.png',
        string: 'Your role as a **Ironroot** is to link mobs together. \nYou should always linked by using E then use **Royal jacket** and **Assassin hood** to reset cooldowns, you will generate so much aggro - use **Shoes of Tenacity** to get rid of the aggro. \nThis role should be played by **Experienced players** because mobs clearing speed is depending on how good is the **ironroot** in linking mobs \n\n**Note:** \n1. Swap weapons for bosses is **mandatory** as you can\'t link the boss to any mob ' 
    },
    'ava-arcane': {
        pic: 'https://i.imgur.com/dx5E354.jpg',
        name: 'Arcane',
        icon: 'https://i.imgur.com/uUm8ip7.png',
        string: 'Your role as **Great Arcane** is to use E when called for by **Raid leader**. \nOnce you use your E - use **Royal jacket** and **Assassin hood** to reset cooldowns and get ready for the **next arcane call**. \nIf second arcane has **Judicator armor** it can be used if rotation is missed or any other case mobs may cast spells. \nYou will be designated as first or second arcane by Raid Leader based on **gear and/or experience**. \n\nFor final boss Arcane is responsible to **use Enigmatic staff** to shield the party member chosen by beam or if swords spawn on party. \n\n**Note:** \n1. Any debuffs **won\'t work** during the Timefreeze (Great Arcane\'s E) \n2. Always bring **Occult staff** for Lizard boss and **Enigmatic staff** \n3. First arcane always on **Cleanse** and second arcane on **Frazzle** \n\nPlease eat **Pork Omelette** for cooldowns'
    },
    'ava-shadowcaller': {
        pic: 'https://i.imgur.com/schEIU9.jpg',
        name: 'Cursed Staff Support',
        icon: 'https://i.imgur.com/hGFf2KE.png',
        string: '**Cursed Support** job is to debuff mobs to increase their damage received. \nUse all the debuffs (Stalker hood, W, and E) after the **second arcane** or in between **first and second arcane** \n\n**HP Cut:** \n1. **Final boss HP cut** \nHP cut is something that is very important to do at final boss. \nSo basically, you are preventing the **Last boss** from healing himself to Max HP, instruction: \na. **Demonic staff** E should be used at about **50% channel**. \nb. **Hood of Tenacity** sholuld be used at about **80% channel** \n\n2. **High Priestess HP Cut** \nyou will  hp cut when 2nd tank air compresses all the shadows out and takes them out and they vanish. \n\n**Note:** \n1. **Hood of Tenacity** is self area cast so you should proc it near the boss \n2. **Cursed support players** are expected to be able to **bait the swords** at final boss. \n3. If you are using **Shadowcaller** always pop E on the **Plate armor** user \n\nPlease eat **Pork omelette** for cooldowns'
    },
    'ava-bms': {
        pic: 'https://i.imgur.com/ohQhKwW.jpg',
        name: 'Blackmonk (BMS)',
        icon: 'https://i.imgur.com/XLf6QF2.png',
        string: 'Your job as **Blackmonk** is to **fix the pulls** and **reduce damage dealt by mobs**. \nAlso during the Spearmen jump, you need to go **TOWARDS** the person on which spearman about to jump, and then **use ENFEEBLE first** then either **Q** or **W** to cancel the jump \n\n**Dancing Queen (Archmage)** \nOn dancing queen blackmonk is doing the reduce damage for the laser, **instruction:** \n1. **Main tank\'s** blades (for opening). \n2. **Blackmonk** blades. \n3. **Blackmonk** enfeeble \n4. **Second tank** enfeeble \n5. Back to **Blackmonk** blades and repeat. \n\n**Note:** \n1. Please bring **Knight and Guardian Helmet** \n2. Pop your knight helmet on dancing queen when you\'re using enfeeble \n\nPlease eat **Pork omelette** for cooldowns'
    },
    'ava-secondtank': {
        pic: 'https://i.imgur.com/YuFJ30S.jpg',
        name: "Second Tank | Off Tank",
        icon: 'https://i.imgur.com/OAovFtV.png',
        string: 'Your main job as **Second tank** is to **Taunt** the mobs and use **Sacred ground** to silence the mobs. \n **Listen** to the **Raid Leader\'s call** when to drop silence and Taunt any mob that **may walk out of the silence.** \nOff Tank is also **responsible to Taunt any mobs that may switch agro** (drones, warrior, knight, archer). \nYou will use **Blackmonk Staff** for some bosses for **damage reduction** or to **slow auto attack speed** with **forceful swing**. \n\n**PS:** Second tank can use any plate armor nowadays since they only expected to taunt the mobs \n\nPlease eat **Pork omelette** for cooldowns'
    },
    'ava-maintank': {
        pic: 'https://i.imgur.com/qEPy5BE.jpg',
        name: 'Main Tank | Raid Leader',
        icon: 'https://i.imgur.com/cyejSwC.png',
        string: 'This build is **exclusively** for **Raid Leaders**. \nYou will play **1 handed Hammer + Leering Cane** for mob pulls with all armor on **Authority passive (more cc duration)** and swap to **Blackmonk Stave** for bosses \n\nPlease eat **River Sturgeon fish** for more CC duration'
    }
}
const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomID('dps')
            .setPlaceholder('ZvZ DPS builds')
            .addOptions([
                {
                    label: 'Dual Swords',
                    description: 'Melee dps build, good for clumps',
                    value: 'zvz-dualswords',
                    emoji: '<:dualswords:860679052309299210>'
                },
                {
                    label: 'Permafrost Prism',
                    description: 'Ranged magic dps build, good for escaping',
                    value: 'zvz-permafrost',
                    emoji: '<:perma:860679051617107968>'
                },
                {
                    label: 'Halberd',
                    description: 'Melee dps build, spread the healing sickness',
                    value: 'zvz-halberd',
                    emoji: '<:halberd:860679050468917258>'
                },
                {
                    label: 'Energy Shaper',
                    description: 'Ranged dps build, same party lazer doesnt stack',
                    value: 'zvz-energyshaper',
                    emoji: '<:shaper:860679052142182400>'
                },
                {
                    label: 'Mistpiercer',
                    description: 'Ranged magic dps build, straight line narrow aoe',
                    value: 'zvz-mistpiercer',
                    emoji: '<:avabow:860679049973465098>'
                },
                {
                    label: 'Clarent Blade',
                    description: 'Melee dps build, huge round AoE',
                    value: 'zvz-clarent',
                    emoji: '<:clarent:860679051445796895>'
                },
                {
                    label: 'Realmbreaker',
                    description: 'Melee dps build, clap enemy and reduce their hp %',
                    value: 'zvz-realmbreaker',
                    emoji: '<:realmbreaker:860679051667701810>'
                },
                {
                    label: 'Daybreaker',
                    description: 'Melee dps build, straight AoE purge',
                    value: 'zvz-daybreaker',
                    emoji: '<:daybreaker:860679051353915482>'
                },
                {
                    label: 'Galatine Pair',
                    description: 'Melee dps build, this build CLAPS PPL',
                    value: 'zvz-galatine',
                    emoji: '<:galatine:860679051038556160>'
                },
                {
                    label: 'Brimstone',
                    description: 'Ranged magic build, medium size circle AoE BIG DPS',
                    value: 'zvz-brimstone',
                    emoji: '<:brimstone:860679049901637633>'
                },
                {
                    label: 'Siegebow',
                    description: 'Ranged dps build, huge AoE weapon',
                    value: 'zvz-siegebow',
                    emoji: '<:siegebow:860679051786453052>'
                },
                {
                    label: 'Spirithunter',
                    description: 'Melee dps build, reduce enemy\'s resistance',
                    value: 'zvz-spirithunter',
                    emoji: '<:spirithunter:860679050363142155>'
                },
                {
                    label: 'Shadowcaller',
                    description: 'Ranged magic support dps, shed enemies',
                    value: 'zvz-shadowcaller',
                    emoji: '<:shadowcaller:860813033105915945>'
                },
                {
                    label: 'Dawnsong',
                    description: 'Ranged magic dps, big fire AoE',
                    value: 'zvz-dawnsong',
                    emoji: '<:dawnsong:860679051295326208>'
                },
                {
                    label: 'Bridled Fury',
                    description: 'Melee magic dps, hit and run CLAP',
                    value: 'zvz-bridled',
                    emoji: '<:bridledfury:860687946868981820>'
                },
                {
                    label: 'Cursed Skull',
                    description: 'Ranged magic dps, huge circle true damage AoE',
                    value: 'zvz-cursedskull',
                    emoji: '<:cursedskull:860687944960835624>'
                },
                {
                    label: 'Damnation',
                    description: 'Ranged magic semi support dps, HUGE AoE shred',
                    value: 'zvz-damnation',
                    emoji: '<:damnation:860687946905812992>'
                },
                {
                    label: 'Greataxe',
                    description: 'Harcore melee dps, uninterruptable high dps spin',
                    value: 'zvz-greataxe',
                    emoji: '<:greataxe:860687945119563786>'
                },
            ]),
            
        )
        const tankRow = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomID('tanks')
            .setPlaceholder('ZvZ TANK builds')
            .addOptions([
                {
                    label: 'Camlaann',
                    description: 'Melee tank build, good for initiating clump',
                    value: 'zvz-camlann',
                    emoji: '<:camlann:860681322879385621>'
                },
                {
                    label: 'Grailseeker',
                    description: 'Melee tank build, hold enemy engages',
                    value: 'zvz-grailseeker',
                    emoji: '<:grailseeker:860691643971665921>'
                },
                {
                    label: 'Soulscythe',
                    description: 'Melee tank build, good for initiating engage',
                    value: 'zvz-soulscythe',
                    emoji: '<:soulscythe:860691644211134484>'
                },
                {
                    label: 'Grovekeeper',
                    description: 'Melee tank build, big aoe stun',
                    value: 'zvz-grovekeeper',
                    emoji: '<:grovekeeper:860691643593523200>'
                },
                {
                    label: 'Morningstar',
                    description: 'Melee tank build, roots enemy in long duration',
                    value: 'zvz-morningstar',
                    emoji: '<:morningstar:860691643250638928>'
                },
            ])
        )
        const healRow = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomID('heals')
            .setPlaceholder('ZvZ Heal and Supports builds')
            .addOptions([
                {
                    label: 'Fallen Staff',
                    description: 'Casual holy healer, big pp circle + cleanse heal',
                    value: 'zvz-fallen',
                    emoji: '<:Fallen:860679051308171266>'
                },
                {
                    label: 'Wild Staff',
                    description: 'Nature healer, big AOE circle heal',
                    value: 'zvz-wildstaff',
                    emoji: '<:wildstaff:860693853652910100>'
                },
                {
                    label: 'Great Holy',
                    description: 'Holy Healer, increase allies resistance',
                    value: 'zvz-greatholy',
                    emoji: '<:greatholy:860693852611411999>'
                },
                {
                    label: 'Rampant',
                    description: 'Nature Healer, straight narrow line AOE heals',
                    value: 'zvz-rampant',
                    emoji: '<:rampant:860693853849518100>'
                },
                {
                    label: 'Malevolent Locus',
                    description: 'Arcane support, used to cleanse allies',
                    value: 'zvz-locus',
                    emoji: '<:locus:860822902547283969>'
                },
                {
                    label: 'One Handed Arcane',
                    description: 'Arcane support, silences and purges enemies in AOE',
                    value: 'zvz-arcane',
                    emoji: '<:onehandarcane:860822902134538250>'
                },
                {
                    label: 'Occult Staff',
                    description: 'Arcane support, increase allies movement speed',
                    value: 'zvz-occult',
                    emoji: '<:occult:860823088475013131>'
                },
                {
                    label: 'Enigmatic Staff',
                    description: 'Arcane support, gives AOE shield to allies',
                    value: 'zvz-enigmatic',
                    emoji: '<:enigmatic:860822901184004146>'
                },
            ])
        )
        let dpsList = {
            'zvz-siegebow': ['https://i.imgur.com/s5kBpr1.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101093', 'https://discord.com/channels/200746010102726657/807319001234407504/807658296416665621'],
            'zvz-permafrost': ['https://i.imgur.com/VY91AFv.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101097', 'https://discord.com/channels/200746010102726657/807319001234407504/807675958097477672'],
            'zvz-mistpiercer': ['https://i.imgur.com/MMIyALt.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101099', 'https://discord.com/channels/200746010102726657/807319001234407504/807679039275139102'],
            'zvz-energyshaper': ['https://i.imgur.com/qDdKBSB.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101101', 'https://discord.com/channels/200746010102726657/807319001234407504/807700941457063986'],
            'zvz-brimstone': ['https://i.imgur.com/1k8FJlp.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101179', 'https://discord.com/channels/200746010102726657/807319001234407504/807675595797823488'],
            'zvz-dawnsong': ['https://i.imgur.com/61o9SVr.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101102', 'https://discord.com/channels/200746010102726657/807319001234407504/807701098026106930'],
            'zvz-halberd': ['https://i.imgur.com/Z66GRfX.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101103', 'https://discord.com/channels/200746010102726657/807319001234407504/807781638494486548'],
            'zvz-realmbreaker': ['https://i.imgur.com/oOUnwKo.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101106', 'https://discord.com/channels/200746010102726657/807319001234407504/807781876571308042'],
            'zvz-daybreaker': ['https://i.imgur.com/KAag4qz.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101108', 'https://discord.com/channels/200746010102726657/807319001234407504/807782187550244884'],
            'zvz-galatine': ['https://i.imgur.com/cU4Y1Og.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101109', 'https://discord.com/channels/200746010102726657/807319001234407504/807786585302368266'],
            'zvz-clarent': ['https://i.imgur.com/p8ElKkd.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101112', 'https://discord.com/channels/200746010102726657/807319001234407504/808048332256968714'],
            'zvz-spirithunter': ['https://i.imgur.com/rxFjtVy.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101113', 'https://discord.com/channels/200746010102726657/807319001234407504/808051545865715722'],
            'zvz-dualswords': ['https://i.imgur.com/9jDIX7D.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101116', 'https://discord.com/channels/200746010102726657/807319001234407504/808053999471034368'],
            'zvz-bridled': ['https://i.imgur.com/ylc2jgp.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101147', 'https://discord.com/channels/200746010102726657/807319001234407504/816410289292967947'],
            'zvz-greataxe': ['https://i.imgur.com/jD5hSJ0.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101150', 'https://discord.com/channels/200746010102726657/807319001234407504/843587604413808680'],
            'zvz-damnation': ['https://i.imgur.com/SoSgWnJ.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101125', 'https://discord.com/channels/200746010102726657/807319001234407504/808440044594659389'],
            'zvz-shadowcaller': ['https://i.imgur.com/LUAPvmA.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101138', 'https://discord.com/channels/200746010102726657/807319001234407504/815692980673445888'],
            'zvz-cursedskull': ['https://i.imgur.com/jePPweD.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101152', 'https://discord.com/channels/200746010102726657/807319001234407504/843590654676303942']
        }
        let healList = {
            'zvz-occult': ['https://i.imgur.com/iqEZaeO.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101117', 'https://discord.com/channels/200746010102726657/807319001234407504/808320638447124500'],
            'zvz-enigmatic': ['https://i.imgur.com/4Ixgf2O.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101120', 'https://discord.com/channels/200746010102726657/807319001234407504/808324352961544223'],
            'zvz-locus': ['https://i.imgur.com/BV3fNwg.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101121', 'https://discord.com/channels/200746010102726657/807319001234407504/808337336198889472'],
            'zvz-arcane': ['https://i.imgur.com/RDJRDw5.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101124', 'https://discord.com/channels/200746010102726657/807319001234407504/808382611004719134'],
            'zvz-fallen': ['https://i.imgur.com/voOcedm.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101129', 'https://discord.com/channels/200746010102726657/807319001234407504/809525705406808115'],
            'zvz-greatholy': ['https://i.imgur.com/qA4VqIr.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101132', 'https://discord.com/channels/200746010102726657/807319001234407504/809525850487259156'],
            'zvz-wildstaff': ['https://i.imgur.com/7c1HlRw.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101133', 'https://discord.com/channels/200746010102726657/807319001234407504/809526032712335370'],
            'zvz-rampant': ['https://i.imgur.com/laJJaSW.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101135', 'https://discord.com/channels/200746010102726657/807319001234407504/809526200036622386']
        }
        let list = {
            'zvz-grailseeker': ['https://i.imgur.com/p3e1S9u.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101137', 'https://discord.com/channels/200746010102726657/807319001234407504/810357183257509898'],
            'zvz-soulscythe': ['https://i.imgur.com/zbIHNd4.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101140', 'https://discord.com/channels/200746010102726657/807319001234407504/810356814134509589'],
            'zvz-grovekeeper': ['https://i.imgur.com/C0t25qT.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101146', 'https://discord.com/channels/200746010102726657/807319001234407504/810356518288490496'],
            'zvz-morningstar': ['https://i.imgur.com/S9JfLza.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101151', 'https://discord.com/channels/200746010102726657/807319001234407504/810356339485835296'],
            'zvz-camlann': ['https://i.imgur.com/Pwlqi2E.jpg', 'https://albiononline.com/en/characterbuilder/solo-builds/view/101156', 'https://discord.com/channels/200746010102726657/807319001234407504/810356123470921749']
        }
client.on('message', async (message) => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;

    

    if (command === 'blacklist') {
        await mongo().then(async mongoose => {
            let personName = args[0]
            let isBlacklisted = await blacklist.findOne({ blname: personName.toLowerCase()})
            let reason = args.slice(1).join(' ')
            if (!personName) return message.reply('You must state the personName')
            if (!reason) return message.reply('You must state the reason why you\'re blacklisting this guy')
            if (isBlacklisted) return message.reply(`This \`${personName}\` has already blacklisted`)
            await blacklist.create({
                blname: personName.toLowerCase(),
                blacklister: message.author.id,
                date: dateMaker(new Date()),
                reason: reason
            })
            message.reply(`${personName} has been blacklisted! <:jennielove:844893922634235904>`)
        })
        
    } else if (command === 'register') {
        await mongo().then(async mongoose => {
            let personExistable = await register.findOne({ discordID: message.author.id})
            if (personExistable) {
                if (personExistable.guildName === 'CN') {
                    return message.reply(`对不起，但我认为你的 Discord account 已与 **${personExistable.personName}** 关联`)
                } else if (personExistable.guildName === 'SG') {
                    return message.reply(`Oof sorry, but it looks like your discord account has already linked with **${personExistable.personName}**`)
                } else {
                    return message.reply(`Oof sorry, but it looks like your discord account has already linked with **${personExistable.personName}**`)
                }
            } 
            let name = args[0];
            let tanggal = new Date()
            var hari = tanggal.getDay()
                        var bulan = tanggal.getMonth()
                        var tahun = tanggal.getFullYear()
                        let tanggalfix = `${hari}/${bulan}/${tahun}`
            if (!name) {
                return message.reply('I\'m sorry but you have to insert your IGN to register yourself \n\n')
            } 
            axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${name}`)
            .then(async (res) => {
                let playerId = res.data.players[0].Id
                let guildname = res.data.players[0].GuildName;
                console.log(res.data.players)
                if (guildname === 'CN Avalonian Company') {
                    message.reply('已注册，欢迎!')
                    message.guild.members.cache.get(message.author.id).setNickname(name)
                    message.guild.members.cache.get(message.author.id).roles.add('851706125065388042')
                    await register.create({ 
                        personName: name,
                        discordID: message.author.id,
                        personID: playerId,
                        guildName: 'CN'
                    })
                } else if (guildname !== 'Singapore') {
                    axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${playerId}`)
                    .then(async (playerInfo) => {
                        axios.get(`https://api.aotools.net/v2/blacklist/${name}`)
                        .then(async (blacklisted) => {
                            if (blacklisted.data.isBlacklisted === true) return message.channel.send("I'm sorry but looks like you're already blacklisted from ARCH Alliance, please contact them to remove your blacklist mark")
                            let fameAmount = parseInt(playerInfo.data.LifetimeStatistics.PvE.Total) + parseInt(playerInfo.data.KillFame); 
                            if (fameAmount > 2000000) {
                                message.channel.send(`<@${message.author.id}> Your name has been registered. you should be good soon =)`)
                                await register.create({
                                    personName: name,
                                    discordID: message.author.id,
                                    personID: playerId,
                                    guildName: 'SG'
                                })
                            } else {
                                message.channel.send('Oof looks like your pve and pvp fame are below requirement')
                                console.log(fameAmount)
                            }
                        })
                    })
                } else if (guildname === 'Singapore') {
                    message.reply('You\'re in singapore already -_-')
                    message.guild.members.cache.get(message.author.id).setNickname(name)
                    await register.create({
                        personName: name,
                        discordID: message.author.id,
                        personID: playerId,
                        guildName: 'SG'
                    })
                } 
                
            }).catch(e => {
                return message.channel.send(`That person isnt exist in this game bro`)
            })  
        })
    } else if (command === 'deaths') {
        let personName = args[0];
        if (!personName) return message.reply('U need to state the person')
        let test = [];
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${personName}`)
        .then((ress) => {
            console.log(ress.data.players)
            let drago = ress.data.players[0].Id
            message.channel.send('Hold on ah, I\'m sending u pm')
            message.author.send('Generating list...')
        
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${drago}/deaths`)
        .then((res) => {
            let kematian = res.data.map((redo, i) => `**Death #${i + 1}**` + '\n' + `Killed by [${redo.Killer.AllianceName}] [${redo.Killer.GuildName}] ${redo.Killer.Name}` + '\n' + `Death fame: ${redo.TotalVictimKillFame}` + '\n' + `Time: ${new Date('2021-02-20T11:45:04.342798700Z').toDateString()}` + '\n' + `Death ID: ${redo.EventId}` + '\n' + `[Link for validation](https://albiononline.com/en/killboard/kill/${redo.EventId})`).join('\n\n')
            console.log(kematian)
            const embed = new MessageEmbed()
            .setColor('#EC330B ')
            .setTitle('List of Battle ID links for fast check:')
            .setDescription(`[Alliance][GuildName] KillerName | DeathFame | Death Timestamp | BattleID
            of ${personName} \n\n${kematian}`)
            message.author.send(embed)
        })
    }).catch(e => {
        return message.channel.send('I think you might insert the wrong name')
    })
    } else if (command === 'calculate') {
        let deathId = args[0]
        if (!deathId) return message.reply("You must state the death ID!")
        let nicknameasli;
        let username = message.guild.members.cache.get(message.author.id).nickname;
        if (username === null) {
            nicknameasli = message.author.username
        } else {
            nicknameasli = username
        }
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${nicknameasli}`)
        .then(res => {
            let playerID = res.data.players[0].Id
            console.log(playerID)
            axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${playerID}/deaths`)
            .then( async response => {
                let data = response.data.find(m => m.EventId === parseInt(deathId))
                let event = data.Victim.Equipment;
                let finalPrice = []
                let sum = 0;
                let prices = [];
                let priceRequest = [];
                
                // console.log('event var length ='+ equipmentLastIndex);
                Object.keys(event).forEach(async function(m,curIndex){
                    if (event[m] != null) {
                        let Type = event[m].Type;
                        let quality = event[m].Quality;
                        priceRequest.push( axios.get(`https://www.albion-online-data.com/api/v2/stats/Prices/${Type}?locations=Martlock&qualities=${quality}`));
                        axios.get(`https://www.albion-online-data.com/api/v2/stats/Prices/T3_MOUNT_HORSE?locations=Martlock&qualities=0`)
                        .then(price => {
                           let z =  price.data.map(i => i.sell_price_min);
                           let b = Math.min(...z)
                            var min = price.data[0]
                            console.log(b)
                        })
                    }
                })
                Promise.all(priceRequest).then(priceResults => {
                    let equipmentLastIndex =Object.keys(priceResults).length-1;
                    priceResults.forEach(function(priceResult,curIndex){
                        let z =  priceResult.data.map(i => i.sell_price_min);
                        let b = Math.min(...z)
                        sum += b;
                        if(curIndex === equipmentLastIndex){
                            console.log(sum)
                            let y;
                            if (sum.toString().length < 7) {
                                 y = (sum / 1000).toFixed(0) + 'k'
                            } else if (sum.toString().length > 6){
                                 y = (sum / 1000000).toFixed(2) + 'm'
                            } 

                            const embed = new MessageEmbed()
                            .setColor('BLACK')
                            .setDescription(` \`\`\`css\n[${res.data.players[0].GuildName}] ${nicknameasli}                      ${y}\`\`\``)
                            .setFooter(`Total gear lost -${sum / 1000}`)
                            message.channel.send(embed)

                        }
                    })
                });
            })
        })
    } else if (command === 'checkbl') {
        await mongo().then(async mongoose => {
            let channel = message.guild.channels.cache.get('760731834354499585')
            let existable = await blacklist.findOne({ blname: args[0].toLowerCase()})
            const embedz = new MessageEmbed()
            .setColor('RED')
            .setAuthor('Singapore Police', 'https://cdn.discordapp.com/icons/703862691608920114/669f0e6605601754a64fbb829ede2c00.webp?size=256')
            .setDescription(`**ERROR** \nThis command is disabled in this channel to prevent clutter, please redo this command at ${channel}`)
            .setFooter('If this is wrong please contact the officers :D')
            if (message.channel.id === '779514684797091850' | message.channel.id === '760731834354499585') {
                let firstArgument = args[0];
                if (!firstArgument) return message.reply('Please state the person you want to check!')
                axios.get(`https://api.aotools.net/v2/blacklist/${firstArgument}`)
                .then(async result => {
                    if (result.data.isBlacklisted === true) {
                        const embed = new MessageEmbed()
                        .setColor('AQUA')
                        .setAuthor('Singapore Police', 'https://cdn.discordapp.com/icons/703862691608920114/669f0e6605601754a64fbb829ede2c00.webp?size=256')
                        .setDescription('**This player is blacklisted! by ARCH** Please dont invite him over to the guild or just kick him directly! Please look into ARCH main discord for more info')
                        .setFooter('If this is wrong please contact the officers :D')
                        message.channel.send({
                            embeds: [embed]
                        })
                    } else if (existable) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor('Singapore Police', client.user.displayAvatarURL())
                        .setTitle('Warning! Player blacklisted! by SG')
                        .addFields(
                            {name: '**Player**', value: existable.blname, inline: true},
                            {name: "**Blacklisted by**", value: `<@${existable.blacklister}> ${existable.date}`, inline: true},
                            {name: '**Reason**', value: `\`\`\`${existable.reason} \`\`\``}
                        )
                        message.channel.send({
                            embeds: [embed]
                        })
                    } else {
                        message.reply(`**${result.data.name}** is not blacklisted :D`)
                    }
                })
            } else {
                return message.channel.send(embedz)
            }
        })
    } else if (command === 'sadge') {
        if (message.author.id === '694488949980135444') {
            message.delete()
           message.channel.send('Life is hard, but you must keep going <:godbless:824231355331510274> \n**Gato2021**')
        } else if (message.author.id === '209607795505496065') {
            message.delete()
            message.channel.send('Life is hard, but you must keep going <:godbless:824231355331510274> \n**MightyG2021**')
         }
    } else if (command === 'handle') {
        await mongo().then(async mongoose => {
            if (message.member.roles.cache.has('759793776439984170') | message.member.roles.cache.has('855688610782248980') | message.member.roles.cache.has('855689169018814464')) {
            if (message.channel.parentID === '853522303811321876') {
                let isHandled = await report.findOne({ channelId: message.channel.id})
                if (isHandled) {
                    return message.author.send(`I'm sorry but ${message.guild.members.cache.get(isHandled.officerId).nickname} is handling this case`)
                } else {
                    if (message.author.id === '694488949980135444') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`gremory${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber) 
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'
                            
                        })
                    } else if (message.author.id === '382507136883621889') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`luai${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    } else if (message.author.id === '412598799081406465') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`amorkia${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    } else if (message.author.id === '229238295257677835') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`fatmeow${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    } else if (message.author.id === '590791325759045643') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`gnamo${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    } else if (message.author.id === '409717155035217922') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`lightdragneel${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    } else if (message.author.id === '263996887131095041') {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        message.channel.setName(`lightdragneel${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    } else {
                        const ticketNumber = message.channel.name.slice('ticket'.length);
                        const channel = message.guild.channels.cache.get('779514684797091850');
                        const channelID = message.channel.id;
                        const nickname = message.guild.members.cache.get(message.author.id).nickname
                        message.channel.setName(`${nickname}${ticketNumber}`)
                        channel.send(`<@${message.author.id}> is handling case <#${channelID}>`)
                        message.delete()
                        console.log(ticketNumber)
                        await report.create({
                            officer: message.guild.members.cache.get(message.author.id).nickname,
                            officerId: message.author.id,
                            channelId: message.channel.id,
                            status: 'Ongoing'

                        })
                    }
                }
            } else {
                message.author.send('This command is used to handle cases!')
                message.delete()
            }
        } else {
            message.delete()
            message.author.send('I\'m sorry but you don\'t have the right to use this command')
        }
        })
        
            
    } else if (command === 'fastcheck') {
        const eventId = args[0];
        if (!eventId) return message.reply('Please state the event Id')
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/events/${eventId}`)
        .then(async result => {
            let event = result.data
            const embed = new MessageEmbed()
            .setAuthor('Killboard Info', client.user.displayAvatarURL())
            .setColor('BLUE')
            .setDescription(`List to fast check killboard \n[Killboard link](https://albiononline.com/en/killboard/kill/${eventId}) \n**Deathfame:** ${parseInt(event.TotalVictimKillFame) / 1000}`)
            .addFields(
                {name: '__**Victim**__', value: `**Name:** ${event.Victim.Name} \n**Average IP:** ${Math.round(event.Victim.AverageItemPower)} \n**Guild:** ${event.Victim.GuildName} \n**Aliance:** ${event.Victim.AllianceName}`, inline: true},
                { name: '__**Killer**__', value: `**Name:** ${event.Killer.Name} \n**Average IP:** ${Math.round(event.Killer.AverageItemPower)} \n**Guild:** ${event.Killer.GuildName} \n**Alliance:** ${event.Killer.AllianceName}`, inline: true}
            )
            .setFooter('Singapore on top', client.user.displayAvatarURL())
            .setTimestamp(new Date())
            message.channel.send(embed)
            console.log(event)
        }).catch(e => {
            message.channel.send('Cannot find a killboard with that id')
        })
    } else if (command === 'add') {
        if (message.member.roles.cache.has('759793776439984170') | message.member.roles.cache.has('855688610782248980') | message.member.roles.cache.has('855689169018814464')) {
            let personMention = message.mentions.members.first()
            let channelMention = message.mentions.channels.first()
            message.delete().then(() => {
                if (!personMention) return message.reply(`Please state the person's mention`)
                if (!channelMention) return message.reply(`Please state the channel's mention`)
                if (channelMention.parentID === '853522303811321876' | channelMention.parentID === '853522605684686878') {
                    channelMention.updateOverwrite(personMention.user, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                    })
                    message.reply({
                        content: `${personMention} has been added to ${channelMention}`
                    })
                } else {
                   return message.reply({
                       content: 'This command only works for ticket channels, thank you, <:jennielove:844893922634235904>'
                   })
                }
            })
        } else {
            return message.reply({
                content: 'You don\'t have permission to use this command'
            })
        }
    } else if (command === 'checkbattle') {
        let battleId = args[0];
        if (!battleId) return message.reply({
            content: 'You must state the battle Id!'
        })
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/battles/${battleId}`)
        .then(async result => {
            let events = result.data
            await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/events/battle/${battleId}?ofset=0&limit=50`)
           .then(async result => {
            let event = result.data
            let eventVictim = event.filter(m => m.Victim.GuildName === 'Singapore')
            let eventKiller = event.filter(m => m.Killer.GuildName === 'Singapore')
            let hasTriggered = true;
                eventVictim.forEach(async (m, i) => {
                    let gear = m.Victim.Equipment
                    let test =  Object.keys(gear).filter(m => gear[m] != null && m !== 'Bag' && m !== 'Potion' && m !== 'Cape' && m !== 'Mount' && m !== 'Food')
                        if (gear.MainHand == null| gear.Head == null | gear.Armor == null | gear.Shoes == null) {
                            hasTriggered = false
                            console.log(test)
                            let MainHand;
                            let OffHand;
                            let Head;
                            let Armor;
                            let Shoes;
                            if (m.Victim.Equipment.MainHand == null) {
                                MainHand = ''
                            } else {
                                MainHand = m.Victim.Equipment.MainHand.Type
                            }
                            if (m.Victim.Equipment.OffHand == null) {
                                OffHand = ''
                            } else {
                                OffHand = m.Victim.Equipment.OffHand.Type
                            }
                            if (m.Victim.Equipment.Head == null) {
                                Head = ''
                            } else {
                                Head = m.Victim.Equipment.Head.Type
                            }
                            if (m.Victim.Equipment.Armor == null) {
                                Armor = ''
                            } else {
                                Armor = m.Victim.Equipment.Armor.Type
                            }
                            if (m.Victim.Equipment.Shoes == null) {
                                Shoes = ''
                            } else {
                                Shoes = m.Victim.Equipment.Shoes.Type
                            }
                            let person = events.players[m.Victim.Id]
                            const time = (param) => {
                                let z = new Date(param)
                                let timeFix = z.toLocaleTimeString()
                                let dateFix = z.toLocaleDateString()
                                let final = dateFix + ' ' + timeFix
                                return final;
                            }
                            const embed = new MessageEmbed()
                            .setAuthor('SIngapore ZvZ Tool', client.user.displayAvatarURL())
                            .setColor('RED')
                            .setTitle('Bad ZvZ Build!')
                            .setDescription(`Bad ZvZ build detected! Battle: ${events.id} \n**Reason:** Not using proper ZvZ build!`)
                            .addFields(
                            {name: '__**PLAYER INFO**__', value: `**Player Name:** ${person.name} \n**Guild:** ${person.guildName} \n**IP:** ${Math.round(m.Victim.AverageItemPower)} \n**Aliance:** ${person.allianceName} \n**Kills:** ${person.kills} | **Deaths:** ${person.deaths} \n**Killboard:** [click the link](https://albiononline.com/en/killboard/kill/${m.EventId})`, inline: true},
                            { name: '__**BATTLE INFO**__', value: `**Battleboard:** [${events.id}](https://kill-board.com/battles/${events.id}) \n**Start time:** ${time(events.startTime)} \n**End time:** ${time(events.startTime)} \n**Total kills:** ${events.totalKills} \n**Total fame:** ${events.totalFame}`, inline: true}
                             )
                            .setFooter('Singapore on top', client.user.displayAvatarURL())
                            .setTimestamp(new Date())
                            .setImage(`https://aolootlog.com/api/api.php?image=yes&main=${MainHand}&off=${OffHand}&head=${Head}&armor=${Armor}&shoes=${Shoes}`)
                            message.channel.send({
                                embeds: [embed]
                            })
                        } else if (parseInt(m.Victim.AverageItemPower) < 1100) { 
                            hasTriggered = false
                            console.log(test)
                            let MainHand;
                            let OffHand;
                            let Head;
                            let Armor;
                            let Shoes;
                            if (m.Victim.Equipment.MainHand == null) {
                                MainHand = ''
                            } else {
                                MainHand = m.Victim.Equipment.MainHand.Type
                            }
                            if (m.Victim.Equipment.OffHand == null) {
                                OffHand = ''
                            } else {
                                OffHand = m.Victim.Equipment.OffHand.Type
                            }
                            if (m.Victim.Equipment.Head == null) {
                                Head = ''
                            } else {
                                Head = m.Victim.Equipment.Head.Type
                            }
                            if (m.Victim.Equipment.Armor == null) {
                                Armor = ''
                            } else {
                                Armor = m.Victim.Equipment.Armor.Type
                            }
                            if (m.Victim.Equipment.Shoes == null) {
                                Shoes = ''
                            } else {
                                Shoes = m.Victim.Equipment.Shoes.Type
                            }
                            let person = events.players[m.Victim.Id]
                            const time = (param) => {
                                let z = new Date(param)
                                let timeFix = z.toLocaleTimeString()
                                let dateFix = z.toLocaleDateString()
                                let final = dateFix + ' ' + timeFix
                                return final;
                            }
                            const embed = new MessageEmbed()
                            .setAuthor('SIngapore ZvZ Tool', client.user.displayAvatarURL())
                            .setColor('RED')
                            .setTitle('Bad ZvZ Build!')
                            .setDescription(`Bad ZvZ build detected! Battle: ${events.id} \n**Reason:** Low IP`)
                            .addFields(
                            {name: '__**PLAYER INFO**__', value: `**Player Name:** ${person.name} \n**Guild:** ${person.guildName} \n**IP:** ${Math.round(m.Victim.AverageItemPower)} \n**Aliance:** ${person.allianceName} \n**Kills:** ${person.kills} | **Deaths:** ${person.deaths} \n**Killboard:** [click the link](https://albiononline.com/en/killboard/kill/${m.EventId})`, inline: true},
                            { name: '__**BATTLE INFO**__', value: `**Battleboard:** [${events.id}](https://kill-board.com/battles/${events.id}) \n**Start time:** ${time(events.startTime)} \n**End time:** ${time(events.startTime)} \n**Total kills:** ${events.totalKills} \n**Total fame:** ${events.totalFame}`, inline: true}
                             )
                            .setFooter('Singapore on top', client.user.displayAvatarURL())
                            .setTimestamp(new Date())
                            .setImage(`https://aolootlog.com/api/api.php?image=yes&main=${MainHand}&off=${OffHand}&head=${Head}&armor=${Armor}&shoes=${Shoes}`)
                            message.channel.send({
                                embeds: [embed]
                            })
                        }
                        else {
                            if (compareSet(gear.MainHand, gear.OffHand, gear.Head, gear.Armor, gear.Shoes) == true) {
                                hasTriggered = false
                                let MainHand;
                            let OffHand;
                            let Head;
                            let Armor;
                            let Shoes;
                            if (m.Victim.Equipment.MainHand == null) {
                                MainHand = ''
                            } else {
                                MainHand = m.Victim.Equipment.MainHand.Type
                            }
                            if (m.Victim.Equipment.OffHand == null) {
                                OffHand = ''
                            } else {
                                OffHand = m.Victim.Equipment.OffHand.Type
                            }
                            if (m.Victim.Equipment.Head == null) {
                                Head = ''
                            } else {
                                Head = m.Victim.Equipment.Head.Type
                            }
                            if (m.Victim.Equipment.Armor == null) {
                                Armor = ''
                            } else {
                                Armor = m.Victim.Equipment.Armor.Type
                            }
                            if (m.Victim.Equipment.Shoes == null) {
                                Shoes = ''
                            } else {
                                Shoes = m.Victim.Equipment.Shoes.Type
                            }
                            let person = events.players[m.Victim.Id]
                            const time = (param) => {
                                let z = new Date(param)
                                let timeFix = z.toLocaleTimeString()
                                let dateFix = z.toLocaleDateString()
                                let final = dateFix + ' ' + timeFix
                                return final;
                            }
                            const embed = new MessageEmbed()
                            .setAuthor('SIngapore ZvZ Tool', client.user.displayAvatarURL())
                            .setColor('RED')
                            .setTitle('Bad ZvZ Build!')
                            .setDescription(`Bad ZvZ build detected! Battle: ${events.id} \n**Reason:** Not using proper ZvZ Build`)
                            .addFields(
                            {name: '__**PLAYER INFO**__', value: `**Player Name:** ${person.name} \n**Guild:** ${person.guildName} \n**IP:** ${Math.round(m.Victim.AverageItemPower)} \n**Aliance:** ${person.allianceName} \n**Kills:** ${person.kills} | **Deaths:** ${person.deaths} \n**Killboard:** [click the link](https://albiononline.com/en/killboard/kill/${m.EventId})`, inline: true},
                            { name: '__**BATTLE INFO**__', value: `**Battleboard:** [${events.id}](https://kill-board.com/battles/${events.id}) \n**Start time:** ${time(events.startTime)} \n**End time:** ${time(events.startTime)} \n**Total kills:** ${events.totalKills} \n**Total fame:** ${events.totalFame}`, inline: true}
                             )
                            .setFooter('Singapore on top', client.user.displayAvatarURL())
                            .setTimestamp(new Date())
                            .setImage(`https://aolootlog.com/api/api.php?image=yes&main=${MainHand}&off=${OffHand}&head=${Head}&armor=${Armor}&shoes=${Shoes}`)
                            message.channel.send({
                                embeds: [embed]
                            })
                            }

                        }
                        
                        
                    if (hasTriggered) {
                        message.author.send({
                            content: 'All Clear!'
                        })
                    }
                })
            })
        })
        
    } else if (command === 'helpofficer') {
        const embed = new MessageEmbed()
        .setAuthor('Singapore Police', client.user.displayAvatarURL())
        .setColor('ORANGE')
        .setDescription('List of admin commands for officers')
        .addFields(
            { name: '__**Commands**__', value: "```!add [playerMention] [ticketChannel] \n!checkbl [IGN] \n!checkbattle [battleID] \n!deaths [IGN] \n!fastcheck [KillboardID]```"}
        )
        .setFooter('If this is wrong please contact the officers', client.user.displayAvatarURL())
        .setTimestamp(new Date())
        message.channel.send({
            embeds: [embed]
        })
    } else if (command === 'ask') {
        let question = args.slice(0).join(' ')
        if (!question) return message.reply({
            content: "You didn't specify your question!"
        })
        let responses = [
            'Yes definitely.',
            'Most likely',
            'I\'m not really sure, but he\'s gay',
            'Nope definitely not',
            'Ask again later.',
            'My reply is no.',
            'Better not tell you now.',
            'You may rely on it.'
        ]
        let answer = responses[Math.floor(Math.random() * responses.length)]
        message.reply({
            content: answer
        })
    } else if (command === 'unblacklist') {
        await mongo().then(async mongoose => {
            let personName = args[0]
            if (!personName) return message.reply({
                content: 'You must state the person'
            })
            let isPersonBlacklisted = await blacklist.findOne({ blname: personName.toLowerCase()})
            if (!isPersonBlacklisted) return message.reply({
                content: `I cannot find a person with \`${personName}\` inside the blacklist :D`
            })
            await blacklist.findOneAndDelete({ blname: personName.toLowerCase()})
            message.reply({
                content: `Player **${personName}** has been unblacklisted`
            })
        })
    } else if (command === 'attendance') {
        if (message.member.roles.cache.has('759793776439984170') | message.member.roles.cache.has('855689169018814464')) {
        let battleID = args[0]
        if (!battleID) return message.reply('Please state the battle ID!')
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/battles/${battleID}`)
        .then(async result => {
            let event1 = result.data
            const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor('Singapore Police', client.user.displayAvatarURL())
            .setDescription(`Player who attended ZvZ In Singapore for battle ${battleID}: \n ${Object.keys(event1.players).filter(m => event1.players[m].guildName === 'Singapore').map((m, i) => event1.players[m].name).join('\n')}`)
            message.channel.send({
                embeds: [embed]
            })
            
        })
    } else {
        return message.reply({
            content: `I'm sorry but you don't have the right to execute this command`})
    }
    } else if (command == 'zvz-builds') {
        if (message.channel.id === '760731834354499585' | message.channel.id === '779514684797091850' | message.member.roles.cache.has('759793776439984170') | message.member.permissions.has('ADMINISTRATOR')){
            message.delete()
            let deleteButton = new MessageButton()
                .setStyle('DANGER')
                .setCustomID('delete')
                .setLabel('Delete')
                .setEmoji('🚨')
            await message.channel.send({
                content: 'ZvZ build List! according to ARCH official zvz builds',
                components: [row,tankRow, healRow, [deleteButton]]
            })
        } else {
            const channel = message.guild.channels.cache.get('760731834354499585')
            const embedz = new MessageEmbed()
            .setColor('RED')
            .setAuthor('Singapore Police', 'https://cdn.discordapp.com/icons/703862691608920114/669f0e6605601754a64fbb829ede2c00.webp?size=256')
            .setDescription(`**ERROR** \nThis command is disabled in this channel to prevent clutter, please redo this command at ${channel}`)
            .setFooter('If this is wrong please contact the officers :D')
            message.reply({
                embeds: [embedz]
            })
        }
    } else if (command === 'deploy' && message.author.id === '694488949980135444') {
        const data = 
            [{
                name: 'zvz-builds',
                description: 'Shows you the list of approved zvz builds according to ARCH main discord'
            }, 
            {
                name: 'hi',
                description: 'saying hi lol'
            }]
            
        
        const command = await client.application?.commands.set(data)
        console.log(command)
    } else if (command === 'application') {
        let guildRulesChannel = message.guild.channels.cache.get('841918364863430666')
        let botCommandChannel = message.guild.channels.cache.get('760731834354499585')
        let registerButton = new MessageButton()
        .setCustomID('register')
        .setStyle('SUCCESS')
        .setEmoji('✅')
        .setLabel('I have read all the rules')
        message.channel.send({
            content: `Congratulations on joining the SINGAPORE Guild, we're happy to have you here! \nPlease take note and act on the following. \n\n> **1.** Join the Alliance Discord with this invite. \nhttps://discord.gg/TQcgeFjyw3`
        }).then(() => message.channel.send({
            content: `> **2.** Type '!register' here in the #register-here channel.`,
            files: ['https://media.discordapp.net/attachments/849925701988515851/849926763818778644/unknown.png']
        })).then(() => {
            message.channel.send({
                content: `> **3.** Read ${guildRulesChannel}. \n\n> **4.** ZvZ builds can be found in the Arch alliance discord or just simply type \`!zvz-builds\` in ${botCommandChannel}. \n\n> **5.** Please click the button below once you have read the rules to have access to all the server channels.`,
                components: [[registerButton]]
            })
        })
    } else if (command === 'ava-help') {
        let botCommandChannel = message.guild.channels.cache.get('760731834354499585')
        if (message.channel.id === '760731834354499585' | message.channel.id === '779514684797091850' | message.member.roles.cache.has('759793776439984170') | message.member.permissions.has('ADMINISTRATOR')) {
        message.delete()
        const listButton = new MessageButton()
        .setCustomID('avabuildsbutton')
        .setEmoji('🚀')
        .setLabel('Ava builds')
        .setStyle('SUCCESS')
        const closeButton = new MessageButton()
        .setCustomID('closebutton')
        .setEmoji('❌')
        .setLabel('Close')
        .setStyle('DANGER')
        let embed = new MessageEmbed()
        .setColor('ORANGE')
        .setAuthor('Singapore Ava Slave', client.user.displayAvatarURL())
        .setTitle('Introduction...')
        .setDescription(`Avalonian Elite Dungeon is a difficult dungeon which can only be finished with 20 men. \nYou can only find the **Avalonian Elite Dungeon** around the outlands, you can also find **Avalonian Elite Dungeon** inside the Avalonian Roads as well. The tier starts from T6. \n\nHowever, finding a natural spawn dungeon is a little bit difficult, that's why people used to pop it from a map. \nIn Singapore guild we always do **8.2+ Avalonian Elite Dungeon** that's why you are expected to wear **8.3 gears** and hit at least **1650 IP**. \n\nAs for the shape of the dungeon entrance is like the image below `)
        .setImage('https://i.imgur.com/vjQoBtm.png')
        .setFooter('Singapore', client.user.displayAvatarURL())
        message.channel.send({
            embeds: [embed],
            components: [[listButton, closeButton]]
        })
    }
    } else if (command === 'approved-scout') {
        let embed = new MessageEmbed()
        .setAuthor('Approved Scout', 'https://render.albiononline.com/v1/item/T6_MAIN_ROCKMACE_KEEPER.png')
        .setColor('ORANGE')
        .setDescription(`**Approved Scout** is a title given to trusted and tested scout, in order to be an **approved scout**, you must **follow the steps** explained below: \n\n**1.** Wear build that can buy time for the party to port out from the dungeon once the **divers/gankers** came in. (build example will show below) \n**2.** You must report the situation **regularly** to the party member. \n**3.** Turn on **mastery volume and combat log**, so you can hear gankers steps and whenever they pick stuff. \n**4.** After you have followed all the steps, contact one of the officers and send **a screenshot of your scout build**. \n**5.** The officer will add you into the **ARCH approved scout List** \n\n**Note:** \n**1.** If let's say your party got doved by divers. You **are not** responsible to regear / compensate the deaths, but they have the right **to not invite you** again in the future. \n**2.** If gankers came in, and you died when you are trying to hold them, it's **mandatory** to regear and come back to the dungeon asap. \n**3.** Not completing the task **means no PAYMENT** \n\n click this link below to see Singapore's approved scout list: \nhttps://arch.gay/scouts/g/singapore`)
        .setImage('https://i.imgur.com/eCq54NK.jpg')
        .setFooter('Singapore ontop baby', client.user.displayAvatarURL())
        message.channel.send({
            embeds: [embed]
        })
    } Object.keys(avalist).forEach((m, i) => {
        if (command.includes(m)) {
            let botCommandChannel = message.guild.channels.cache.get('760731834354499585')
            if (message.channel.id === '760731834354499585' | message.channel.id === '779514684797091850' | message.member.roles.cache.has('759793776439984170') | message.member.permissions.has('ADMINISTRATOR')){
                let listButton = new MessageButton()
                .setCustomID('listbutton')
                .setStyle('SUCCESS')
                .setLabel('Look for more builds!')
                .setEmoji('<:jennielove:844893922634235904>')
                let embed = new MessageEmbed()
                .setAuthor(avalist[m].name, avalist[m].icon)
                .setColor('ORANGE')
                .setImage(avalist[m].pic)
                .setDescription(avalist[m].string)
                .setFooter(`Requested by ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
                message.channel.send({
                    content: 'Processing...',
                    embeds: [embed],
                    components: [[listButton]]
                })
            } else {
                message.reply(`Please redo this command at ${botCommandChannel}`)
            }
        }
    })
     Object.keys(list).forEach((m, i) => {
         if (command.includes(m)) {
            let botCommandChannel = message.guild.channels.cache.get('760731834354499585')
            if (message.channel.id === '760731834354499585' | message.channel.id === '779514684797091850' | message.member.roles.cache.has('759793776439984170') | message.member.permissions.has('ADMINISTRATOR')){
                let zvzlistButton = new MessageButton()
                .setCustomID('listbuttonzvz')
                .setStyle('SUCCESS')
                .setLabel('Look for more builds!')
                .setEmoji('<:jennielove:844893922634235904>')
                let referenceButton = new MessageButton()
                .setStyle('LINK')
                .setURL(list[m][2])
                .setLabel('ARCH main discord reference')
                let embed = new MessageEmbed()
                .setAuthor(`'zl [SING] ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
                .setColor('ORANGE')
                .setImage(list[m][0])
                .setDescription('You must reach at least 1100 IP')
                .setFooter(`Requested by ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
                message.channel.send({
                    content: 'Processing...',
                    embeds: [embed],
                    components: [[zvzlistButton, referenceButton]]
                })
            } else {
                message.reply(`Please redo this command at ${botCommandChannel}`)
            }
         }
     })
     Object.keys(dpsList).forEach((m, i) => {
        if (command.includes(m)) {
           let botCommandChannel = message.guild.channels.cache.get('760731834354499585')
           if (message.channel.id === '760731834354499585' | message.channel.id === '779514684797091850' | message.member.roles.cache.has('759793776439984170') | message.member.permissions.has('ADMINISTRATOR')){
               let zvzlistButton = new MessageButton()
               .setCustomID('listbuttonzvz')
               .setStyle('SUCCESS')
               .setLabel('Look for more builds!')
               .setEmoji('<:jennielove:844893922634235904>')
               let referenceButton = new MessageButton()
               .setStyle('LINK')
               .setURL(dpsList[m][2])
               .setLabel('ARCH main discord reference')
               let embed = new MessageEmbed()
               .setAuthor(`'zl [SING] ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
               .setColor('ORANGE')
               .setImage(dpsList[m][0])
               .setDescription('You must reach at least 1100 IP')
               .setFooter(`Requested by ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
               message.channel.send({
                   content: 'Processing...',
                   embeds: [embed],
                   components: [[zvzlistButton, referenceButton]]
               })
           } else {
               message.reply(`Please redo this command at ${botCommandChannel}`)
           }
        }
    })
    Object.keys(healList).forEach((m, i) => {
        if (command.includes(m)) {
           let botCommandChannel = message.guild.channels.cache.get('760731834354499585')
           if (message.channel.id === '760731834354499585' | message.channel.id === '779514684797091850' | message.member.roles.cache.has('759793776439984170') | message.member.permissions.has('ADMINISTRATOR')){
               let zvzlistButton = new MessageButton()
               .setCustomID('listbuttonzvz')
               .setStyle('SUCCESS')
               .setLabel('Look for more builds!')
               .setEmoji('<:jennielove:844893922634235904>')
               let referenceButton = new MessageButton()
               .setStyle('LINK')
               .setURL(healList[m][2])
               .setLabel('ARCH main discord reference')
               let embed = new MessageEmbed()
               .setAuthor(`'zl [SING] ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
               .setColor('ORANGE')
               .setImage(healList[m][0])
               .setDescription('You must reach at least 1100 IP')
               .setFooter(`Requested by ${Boolean(message.guild.members.cache.get(message.author.id).nickname) ? message.guild.members.cache.get(message.author.id).nickname : message.author.username}`, message.author.displayAvatarURL())
               message.channel.send({
                   content: 'Processing...',
                   embeds: [embed],
                   components: [[zvzlistButton, referenceButton]]
               })
           } else {
               message.reply(`Please redo this command at ${botCommandChannel}`)
           }
        }
    })
}) 

client.on('guildMemberAdd', (member) => {
   member.send(`**[ARCH] Singapore are recruiting for S13** \nSingapore is not only open to Singaporeans if you're wondering and we're looking for players from all over the WORLD who would like to look for content within Albion during all time zone. **12 to 15 UTC** is our prime time. We mainly speak English in game but we do speak other languages as well as we have players across SEA. \n\n**What we offer:** \n**PvE Content:** \n:one: Fame Farming efficiently in T8 Zones (solo, group and ava dungeons). \n:two: Safe Gathering Zones with multiple hideouts in the black zone. \n:three: Daily Avalonian Buff, Full Clear 8.2+ \n:four: Hideout in T8 Zone. \n:five: Gathering Contents in Royals & Roads. \n:six: Tax Rebate for HCE players. \n:free: Weekly Give Away : **8.3 Gears & Mounts** \n\n**PvP Content:** \n\👍 Daily Police & Ganking Sessions \n\👍 Organized Faction Fights \n\👍 Organized Scrims for Practice \n\👍 Mandatory ZvZ when needed \n\n**Minimum Requirements:** \n:heart: 5M PvE Fame \n:heart:Mature \n:heart:Willing to Learn \n:heart:Able to speak and understand basic English \n\n**Do join our discord at** https://discord.gg/yXRWK8WDct \nApply at application and read rules & react after being accepted. \n**Thank you very much!**`)
})
client.on('interaction',async  interaction => {
    if (interaction.isButton()) {
        if (interaction.customID === 'back') {
            if (interaction.replied) {
                interaction.editReply({
                    content: 'ZvZ build list! According to ARCH main zvz gears',
                    components: [row, tankRow, healRow]
                })
            } else {
                let deleteButton = new MessageButton()
                .setStyle('DANGER')
                .setCustomID('delete')
                .setLabel('Delete')
                .setEmoji('🚨')
                interaction.update({
                    content: 'ZvZ build list! According to ARCH main zvz gears',
                    components: [row, tankRow, healRow, [deleteButton]],
                    embeds: []
                })
                
            }
        } else if (interaction.customID === 'delete') {
            interaction.message.delete()
        } else if (interaction.customID === 'register') {
            let registerButton = new MessageButton()
        .setCustomID('register')
        .setStyle('SUCCESS')
        .setEmoji('✅')
        .setLabel('I have read all the rules')
        let permissionGiven = new MessageButton()
        .setLabel('Permission Given!')
        .setCustomID('permissiongiven')
        .setDisabled(true)
        .setEmoji('🔓')
        .setStyle('PRIMARY')
            let role = interaction.guild.roles.cache.get('706471167971557447')
            let recruitRole = interaction.guild.roles.cache.get('849947414508863519')
            let botCommandChannel = interaction.guild.channels.cache.get('760731834354499585')
            if (interaction.member.roles.cache.has('849947414508863519')) {
                interaction.member.roles.add(role)
                interaction.member.roles.remove(recruitRole)
                interaction.user.send({
                    content: `Permission Given!, Welcome to Singapore Guild \n\nYou can check zvz builds by typing \`!zvz-builds\` in ${botCommandChannel}`,
                    files: ['https://media.discordapp.net/attachments/732059380685602857/861195481547931658/unknown.png', 'https://media.discordapp.net/attachments/732059380685602857/861195555543056384/unknown.png?width=646&height=498']
                })
            } 
            interaction.update({
                components: [[permissionGiven]]
            })
            setTimeout(() => {
                interaction.editReply({
                    components: [[registerButton]]
                })
            }, 1500);
        } else if (interaction.customID === 'avabuildsbutton') {
            const closeButton = new MessageButton()
        .setCustomID('closebutton')
        .setEmoji('❌')
        .setLabel('Close')
        .setStyle('DANGER')
        const homeButton = new MessageButton()
        .setCustomID('home')
        .setEmoji('🏘️')
        .setLabel('Home')
        .setStyle('PRIMARY')
            interaction.update({
                embeds: [],
                content: 'Listing avalonian builds...',
                components: [AvArow, [homeButton, closeButton]]
            })
        } else if (interaction.customID === 'closebutton') {
            interaction.message.delete()
        } else if (interaction.customID === 'home') {
            const listButton = new MessageButton()
        .setCustomID('avabuildsbutton')
        .setEmoji('🚀')
        .setLabel('Ava builds')
        .setStyle('SUCCESS')
        const closeButton = new MessageButton()
        .setCustomID('closebutton')
        .setEmoji('❌')
        .setLabel('Close')
        .setStyle('DANGER')
        let embed = new MessageEmbed()
        .setColor('ORANGE')
        .setAuthor('Singapore Ava Slave', client.user.displayAvatarURL())
        .setTitle('Introduction...')
        .setDescription(`Avalonian Elite Dungeon is a difficult dungeon which can only be finished with 20 men. \nYou can only find the **Avalonian Elite Dungeon** around the outlands, you can also find **Avalonian Elite Dungeon** inside the Avalonian Roads as well. The tier starts from T6. \n\nHowever, finding a natural spawn dungeon is a little bit difficult, that's why people used to pop it from a map. \nIn Singapore guild we always do **8.2+ Avalonian Elite Dungeon** that's why you are expected to wear **8.3 gears** and hit at least **1650 IP**. \n\nAs for the shape of the dungeon entrance is like the image below `)
        .setImage('https://i.imgur.com/vjQoBtm.png')
        .setFooter('Singapore', client.user.displayAvatarURL())
            interaction.update({
                embeds: [embed],
                components: [[listButton, closeButton]]
            })
        } else if (interaction.customID === 'listbutton') {
            const closeButton = new MessageButton()
        .setCustomID('closebutton')
        .setEmoji('❌')
        .setLabel('Close')
        .setStyle('DANGER')
        const homeButton = new MessageButton()
        .setCustomID('home')
        .setEmoji('🏘️')
        .setLabel('Home')
        .setStyle('PRIMARY')
            interaction.update({
                components: [AvArow, [closeButton]]
            })
        }
        
    } else if (interaction.isSelectMenu()) {
        if (interaction.customID === 'dps') {
            Object.keys(dpsList).forEach((m, i) => {
                if (interaction.values.includes(m)) {
                    let embed = new MessageEmbed()
                .setColor('ORANGE')
                .setAuthor('\'zl [SING] LongLiveLuai', client.user.displayAvatarURL())
                .setImage(dpsList[m][0])
                .setFooter('According to ARCH main discord zvz gears')
                let button = new MessageButton()
                .setStyle('LINK')
                .setURL(dpsList[m][1])
                .setLabel('Link to the Website')
                let buttonback = new MessageButton()
                .setStyle('SUCCESS')
                .setCustomID('back')
                .setLabel('Back to the List')
                .setEmoji('🚀')
                let deleteButton = new MessageButton()
                .setStyle('DANGER')
                .setCustomID('delete')
                .setLabel('Delete this message')
                .setEmoji('🚨')
                let referenceButton = new MessageButton()
                .setStyle('LINK')
                .setURL(dpsList[m][2])
                .setLabel('ARCH main discord reference')
                if (interaction.replied) {
                    interaction.editReply({
                        content: 'Hold on',
                        components: [[button, buttonback, referenceButton, deleteButton]],
                        embeds: [embed]
                    })
                    
                } else {
                    interaction.update({
                        content: 'Hold on',
                        components: [[button, buttonback, referenceButton, deleteButton]],
                        embeds: [embed]
                    })
                    
                }
                }
            })
            
        } else if (interaction.customID === 'tanks') {
            Object.keys(list).forEach((m, i) => {
                if (interaction.values.includes(m)) {
                    let embed = new MessageEmbed()
                .setColor('ORANGE')
                .setAuthor('\'zl [SING] LongLiveLuai', client.user.displayAvatarURL())
                .setImage(list[m][0])
                .setFooter('According to ARCH main discord zvz gears')
                let button = new MessageButton()
                .setStyle('LINK')
                .setURL(list[m][1])
                .setLabel('Link to the Website')
                let buttonback = new MessageButton()
                .setStyle('SUCCESS')
                .setCustomID('back')
                .setLabel('Back to the List')
                .setEmoji('🚀')
                let deleteButton = new MessageButton()
                .setStyle('DANGER')
                .setCustomID('delete')
                .setLabel('Delete this message')
                .setEmoji('🚨')
                let referenceButton = new MessageButton()
                .setStyle('LINK')
                .setURL(list[m][2])
                .setLabel('ARCH main discord reference')
                if (interaction.replied) {
                    interaction.editReply({
                        content: 'Hold on',
                        components: [[button, buttonback, referenceButton, deleteButton]],
                        embeds: [embed]
                    })
                    
                } else {
                    interaction.update({
                        content: 'Hold on',
                        components: [[button, buttonback, referenceButton, deleteButton]],
                        embeds: [embed]
                    })
                    
                }
                }
            })
        } else if (interaction.customID === 'heals') {
            Object.keys(healList).forEach((m, i) => {
                if (interaction.values.includes(m)) {
                    let embed = new MessageEmbed()
                .setColor('ORANGE')
                .setAuthor('\'zl [SING] LongLiveLuai', client.user.displayAvatarURL())
                .setImage(healList[m][0])
                .setFooter('According to ARCH main discord zvz gears')
                let button = new MessageButton()
                .setStyle('LINK')
                .setURL(healList[m][1])
                .setLabel('Link to the Website')
                let buttonback = new MessageButton()
                .setStyle('SUCCESS')
                .setCustomID('back')
                .setLabel('Back to the List')
                .setEmoji('🚀')
                let deleteButton = new MessageButton()
                .setStyle('DANGER')
                .setCustomID('delete')
                .setLabel('Delete this message')
                .setEmoji('🚨')
                let referenceButton = new MessageButton()
                .setStyle('LINK')
                .setURL(healList[m][2])
                .setLabel('ARCH main discord reference')
                if (interaction.replied) {
                    interaction.editReply({
                        content: 'Hold on',
                        components: [[button, buttonback,referenceButton, deleteButton]],
                        embeds: [embed]
                    })
                    
                } else {
                    interaction.update({
                        content: 'Hold on',
                        components: [[button, buttonback, referenceButton, deleteButton]],
                        embeds: [embed]
                    })
                    
                }
                }
            })
        } else if (interaction.customID === 'avabuilds') {
            Object.keys(avalist).forEach((m, i) => {
                if (interaction.values.includes(m)) {
                    let embed = new MessageEmbed()
                    .setAuthor(avalist[m].name, avalist[m].icon)
                    .setColor('ORANGE')
                    .setImage(avalist[m].pic)
                    .setDescription(avalist[m].string)
                    .setFooter(`Requested by ${Boolean(interaction.guild.members.cache.get(interaction.user.id).nickname) ? interaction.guild.members.cache.get(interaction.user.id).nickname : interaction.user.username}`, interaction.user.displayAvatarURL())
                    interaction.update({
                        content: 'Processing...',
                        embeds: [embed]
                    })
                }
            })
        }
    } else if (interaction.isCommand()) {
        if (interaction.commandName === 'zvz-builds') {
            if (interaction.channel.id === '760731834354499585' | interaction.channel.id === '779514684797091850' | interaction.member.roles.cache.has('759793776439984170') | interaction.member.permissions.has('ADMINISTRATOR')){
                let deleteButton = new MessageButton()
                    .setStyle('DANGER')
                    .setCustomID('delete')
                    .setLabel('Delete')
                    .setEmoji('🚨')
                await interaction.reply({
                    content: 'ZvZ build List! according to ARCH official zvz builds',
                    components: [row,tankRow, healRow, [deleteButton]]
                })
        }
    }
    }
})
client.on('channelDelete',async  (channel) => {
    const channelId = channel.id
    await mongo().then(async mongoose => {
        await report.findOneAndDelete({ channelId: channelId})
    })

})

client.on('ready', () => {
    const statusArray = [
        'Gato #1',
        'Luai is rich but gay',
        'Ybibaboo my god'
    ]
    console.log('The Bot is Online')
    let index = 0;
    setInterval(() => {
        if (index === statusArray.length) index = 0;
        const status = statusArray[index];
        client.user.setActivity(status, { type: 'WATCHING'})
        index++;
    }, 3000);
})
client.login(process.env.token)

