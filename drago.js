const Discord = require('discord.js');

const client = new Discord.Client();
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

client.on('message', async (message) => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;

    

    if (command === 'blacklist') {
        await mongo().then(async mongoose => {
            let personName = args[0]
            let reason = args[1]
            if (!personName) return message.reply('You must state the personName')
            if (!reason) return message.reply('You must state the reason why you\'re blacklisting this guy')
            await blacklist.create({
                blname: personName.toLowerCase(),
                blacklister: message.author.id,
                date: dateMaker(new Date()),
                reason: reason
            })
            message.reply(`${personName} has been blacklisted! <:jennielove:844893922634235904>`)
        })
        
    } else if (command === 'start') {
        await mongo().then(async mongoose => {
            let falter = m => m.author.id === message.author.id;
            await message.channel.send('Aight! can u tell me the date? and the ls \n\n`example: 24-01-2021-ls1`');
            await message.channel.awaitMessages(falter, {max: 1, time: 60000})
            .then(async collected => {
                let date = collected.first().content;
                let channelLocation = message.channel.id
                let filter = m => {
                    if (m.author.id === message.author.id) {
                        if (m.content.toLowerCase() === 'done') collector.stop();
                        else return true;
                    }
                    else return false;
                }
                message.channel.send('Alright! whose the participants? \n\n`type done if u are finish`')
                let collector = message.channel.createMessageCollector(filter, {max: 25})
                
                collector.on('collect', async m => {
                    console.log(m.content)
                    await person.create({
                        personName: m,
                        liquidateID: date,
                        locationChannel: channelLocation,
                        status: 'Pending'
                    })
                })
                collector.on('end',async  m => {
                    message.channel.send('Thank you sire, your liquidating has been confirmed!')
                    await splitz.create({
                        liquidatorID: message.author.id,
                        date: date,
                        location: channelLocation,
                        status: "Pending"
                    })
                })

            }).catch(() => {
                return message.channel.send('You\'re out of time bruh, please restart from the beginning')
            })
        })
        
    } else if (command === 'info') {
        await mongo().then(async mongoose => {
            let firstArgument = args[0];
            let parti = await person.find({ liquidateID: firstArgument})
            let ls = await splitz.findOne({ date: firstArgument})
            let Strang = parti.map(u => u.personName).join('\n');
            if (!ls) {
                return message.channel.send('Sorry..., I cannot find lootsplit with that ID')
            }
            const embed = new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setAuthor(`Loot Split for ${firstArgument}`)
            .setDescription(`Participants: \n${Strang}`)
            message.channel.send(embed)
        })
    } else if (command === 'regear') {
        await mongo().then(async mongoose => {
            let regearId = args[0];
            let price = args[1];
            let NickName = message.guild.members.cache.get(message.author.id).nickname
            const errorembed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor('Error')
            .setDescription('Hello. you need to provide me the correct information so I can return the data for you :heart: \n\n\```!regear [regearID] [estimatedValue]\``` \n\nOr you can just check ur regear queue by typing\n\n\```!regear me\``` \nHave fun =)')
            .setFooter('If you believe this is wrong please contact the admin')
            .setTimestamp(new Date())
            
            if (regearId.toLowerCase() === 'me') {
                let description = 'This player has no regear running =)'
                let nicknameasli;
                if (NickName === null) {
                    nicknameasli = message.author.username
                } else {
                    nicknameasli = NickName
                }
                let regearExistable = regear.findOne({ personName: nicknameasli});
                if (regearExistable) {
                    let regearData = await regear.find({ personName: nicknameasli})
                    
                    description = regearData.filter(m => m.status === 'Pending').map(item => '**Regear ID:**' + " " + item.regearID + '\n' + '**Estimated:**' + ' ' + item.estimated + '\n' + '**Date:**' + ' ' + item.date + '\n' + `[Validation link](https://albiononline.com/en/killboard/kill/${item.regearID})`).join('\n\n')
                }
                const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Regear queue for ${nicknameasli}`)
                .setDescription(description)
                .setFooter('If you believe this is wrong please contact the admin')
                .setTimestamp(new Date())
                message.channel.send(embed)
                console.log(regearExistable)
            } else if (regearId.toLowerCase() === 'quest') {
                if (message.member.roles.cache.has('804972129421492224') | message.member.hasPermission(['ADMINISTRATOR'])) {
                    let regeared = await regear.find({ status: 'Pending'})
                    let regearString = regeared.map((event, i) => `**#${i + 1}**` + ' ' + '**Name:**' + ' ' + event.personName + '\n' + '**Estimated:**' + event.estimated)
                    const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`List of regear`)
                .setDescription(regearString)
                .setFooter('If you believe this is wrong please contact the admin')
                .setTimestamp(new Date())
                message.channel.send(embed)
                } else {
                    return message.reply('You don\'t have permission :Yikes:')
                }
            } else if (regearId.toLowerCase() === 'clear') {
                let state = args[1];
                if (!state) return message.reply('U must state the person u want to clear');
                let drago = await regear.findOne({ personName: state})
                if (!drago) return message.channel.send(`I'm sorry but I cannot find this \`${state}\`'s regear, it's either cleared or he never ask for regear :P`)
                await regear.updateMany({ personName: state}, { status: 'Regeared',
            regearOfficer: message.author.tag})
                message.channel.send('`MrGremory`\'s regear has been cleared')

            } else if (regearId === 'check') {
                let state = args[1]
                if (!state) return message.reply('U must state the person to check their regears')
                let description = 'This player has no regear running =)'
                let regearExistable = regear.findOne({ personName: state});
                let nicknameasli;
                if (regearExistable) {
                    let regearData = await regear.find({ personName: NickName})
                    description = regearData.map(item => '**Regear ID:**' + " " + item.regearID + '\n' + '**Estimated:**' + ' ' + item.estimated + '\n' + '**Date:**' + ' ' + item.date + '\n' + `[Validation link](https://albiononline.com/en/killboard/kill/${item.regearID})`).join('\n\n')
                }
                const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Regear queue for ${state}`)
                .setDescription(Boolean(regearExistable) ? description : 'There\'s no regear running for u =)')
                .setFooter('If you believe this is wrong please contact the admin')
                .setTimestamp(new Date())
                message.channel.send(embed)
            } else if (regearId === 'info') {
                let ID = args[1];
                if (!ID) return message.reply('You must state the regear ID')
                const regearexisz = await regear.findOne({ regearID: ID})
                if (!regearexisz) return message.reply("I'm sorry but I cannot find a regear with this ID :pepehands:")
                const regearembed = new Discord.MessageEmbed()
                .setAuthor('Regear INFO')
                .setColor('BLUE')
                .setDescription(`Showing the info of regear with \`${ID}\` ID \n\n**Regear status:** ${regearexisz.status} \n**Date:** ${regearexisz.date} \n**Regear Officer:** ${regearexisz.regearOfficer} \n**Death fame:** ${regearexisz.deathFame} \n[Validation link](https://albiononline.com/en/killboard/kill/${regearexisz.regearID})`)
                .addFields([
                    {name: '**Killer**', value: `Name: ${regearexisz.killerName} \nGuild: [${regearexisz.killerAlliance}] ${regearexisz.killerGuild} \nAverage IP: ${regearexisz.killeravg}`, inline: true},
                    { name: '**Victim**', value: `Name: ${regearexisz.personName} \nGuild: [${regearexisz.victimAlliance}] ${regearexisz.victimGuild} \nAverage IP: ${regearexisz.victimavg}`, inline: true}
                ])
                .setFooter('Enjoy sir!')
                .setTimestamp(new Date())
                message.channel.send(regearembed)
            } else {
                if (!regearId | !price) return message.channel.send(errorembed)
                let regearex = await regear.findOne({ regearID: regearId})
                let nicknameasli;
                if (regearex) {
                    if (regearex.status === 'Regeared') {
                        return message.channel.send("It seems that this regear request has been fulfilled by one of the regear officer, please check your regear by typing \n\n`regear info [regearId]`")
                    } else {
                        return message.channel.send(`I'm sorry but it seems that you're alreade requested regear for this ID\`${regearId}\``)
                    }
                } 
                let nickname = message.guild.members.cache.get(message.author.id).nickname
                if (nickname === null) {
                    nicknameasli = message.author.username
                } else {
                    nicknameasli = nickname
                }
                let testArray = [
                    { EventId: 44006,
                    Location: 'Indonesia'},
                    {
                        EventId: 44887,
                        Location: 'America'
                    }
                ]
                console.log(nicknameasli)
                axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${nicknameasli}`)
                .then(async res => {
                    let dragonz = res.data.players[0].Id
                    axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${dragonz}/deaths`)
                    .then(async response => {
                        let regearz = response.data.find(event => event.EventId === parseInt(regearId))
                        if (!regearz) return message.reply('Your regear are not approved because u need to insert the legit Death ID')
                        console.log(regearz)
                        const tanggal = new Date()

                        var hari = tanggal.getDay()
                        var bulan = tanggal.getMonth()
                        var tahun = tanggal.getFullYear()
                        let tanggalfix = `${hari}/${bulan}/${tahun}`
                        message.channel.send(`Regear has been approved \nhttps://albiononline.com/en/killboard/kill/${regearId}`)
                        await regear.create({
                            personName: nicknameasli,
                            regearID: regearId,
                            estimated: price,
                            killerName: regearz.Killer.Name,
                            deathFame: regearz.Victim.DeathFame,
                            killerGuild: regearz.Killer.GuildName,
                            killerAlliance: regearz.Killer.AllianceName,
                            victimAlliance: regearz.Victim.AllianceName,
                            regearOfficer: 'Still in queue',
                            victimGuild: regearz.Victim.GuildName,
                            killeravg: Math.ceil(regearz.Killer.AverageItemPower),
                            victimavg: Math.ceil(regearz.Victim.AverageItemPower),
                            status: "Pending",
                            date: tanggalfix
                        })
                    })
                })
            }
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
            const embed = new Discord.MessageEmbed()
            .setColor('#EC330B ')
            .setTitle('List of Battle ID links for fast check:')
            .setDescription(`[Alliance][GuildName] KillerName | DeathFame | Death Timestamp | BattleID
            of ${personName} \n\n${kematian}`)
            message.author.send(embed)
        })
    }).catch(e => {
        return message.channel.send('I think you might insert the wrong name')
    })
    } else if (command === 'death') {
        let personName = args[0]
        let DeathID = args[1];
        let testarray = [
            { EventId: 192933029,
            Equipment: 'Dragon'}, {
                EventId: 192933089,
                Equipment: 'Zkai'
            }
        ]
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${personName}`)
        .then(responz => {
            let personNama = responz.data.players[0].Id
            console.log('Generating List....')
        
        if (!DeathID) return message.reply('You must state your death ID!');
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${personNama}/deaths`)
        .then(res => {
            
            console.log(res.data.find((item) => item.EventId.toString() === DeathID))
        })
    })
    } else if (command === 'halp') {
       
        const embed = new Discord.MessageEmbed()
        .setTitle('SGMY')
        .setDescription(`Hello there! I'm just an ordinary bot, made by gato to help community's job. Nice to meet you! my prefix is ${prefix}`)
        .setColor('GREEN')
        .addFields([
            {name: '__**Commands**__', value: '```halp \ndeaths [playerName]```', inline: true},
            { name: '__**Regear Commands**__', value: '```regear [deathID] [estimated] \nregear me \nregear clear [PlayerName] \nregear check [playerName] \nregear quest```', inline: true}
        ])
        .setFooter('Hell yea boi')
        .setTimestamp(new Date())
        message.channel.send(embed)
    
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

                            const embed = new Discord.MessageEmbed()
                            .setColor('BLACK')
                            .setDescription(` \`\`\`css\n[${res.data.players[0].GuildName}] ${nicknameasli}                      ${y}\`\`\``)
                            .setFooter(`Total gear lost -${sum / 1000}`)
                            message.channel.send(embed)

                        }
                    })
                });
            })
        })
    } else if (command === 'lost') {
        let PlayerName = args[0]
        let deathId = args[1]
        if (!PlayerName) return message.reply("You must state the PlayerName!")
        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${PlayerName}`)
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
                        var quality = event[m].Quality;
                        prices.push( event[m])
                        priceRequest.push( axios.get(`https://www.albion-online-data.com/api/v2/stats/Prices/${Type}?locations=Martlock&qualities=${quality}`));
                        axios.get(`https://www.albion-online-data.com/api/v2/stats/Prices/T3_MOUNT_HORSE?locations=Martlock&qualities=0`)
                        .then(price => {
                        })
                    }
                })
                Promise.all(priceRequest).then(priceResults => {
                    let equipmentLastIndex =Object.keys(priceResults).length-1;
                    priceResults.forEach(function(priceResult,curIndex){
                        let z =  priceResult.data.map(i => i.sell_price_min);
                        let b = Math.min(...z)
                        console.log(z)
                        sum += b;
                        if(curIndex === equipmentLastIndex){
                            console.log(sum)
                            let y;
                            if (sum.toString().length < 7) {
                                 y = (sum / 1000).toFixed(0) + 'k'
                            } else if (sum.toString().length > 6){
                                 y = (sum / 1000000).toFixed(2) + 'm'
                            } 

                            const embed = new Discord.MessageEmbed()
                            .setColor('BLACK')
                            .setDescription(` \`\`\`css\n[${res.data.players[0].GuildName}] ${PlayerName}                      ${y}\`\`\``)
                            .setFooter(`Total gear lost -${sum / 1000}`)
                            message.channel.send(embed)

                        }
                    })
                });
            })
        })
    } else if (command === 'help') {
        let firstArgument = args[0];
        if (firstArgument === 'ava' | firstArgument === 'avalonian') {
            const embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setAuthor('Avalonian Help')
            .setDescription('Hello! are you wondering about Avalonian Dungeon? \n\nWell..Avalonian dungeon is a elite group dungeon designed for 20man which can be found around the outlands of Albion')
            .addFields([
                {name: '**Document! -- Important!**', value: '[https://docs.google.com/document/d/16hPCbs-dh_WGYRV3DUhks-Yqx4C9TXUhZrqxdb5Ghj4/edit#heading=h.qvpgenfrjvum](https://docs.google.com/document/d/16hPCbs-dh_WGYRV3DUhks-Yqx4C9TXUhZrqxdb5Ghj4/edit#heading=h.qvpgenfrjvum)'},
                {name: '**Builds**', value: `- Weeping Repeater \n- Permafrost \n- Bear Paws \n- Cursed staff \n- Blackmonk Stave \n- Second Tank \n- Ironroot Staff \n- Arcane \n- Party Heal \n- Main heal \n- Ava axe \nYou can search for more information by typing \`!build [buildName]\``}
            ])
            message.channel.send(embed)
        }
    } else if (command === 'checkbl') {
        await mongo().then(async mongoose => {
            let channel = message.guild.channels.cache.get('760731834354499585')
            let existable = await blacklist.findOne({ blname: args[0].toLowerCase()})
            const embedz = new Discord.MessageEmbed()
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
                        const embed = new Discord.MessageEmbed()
                        .setColor('AQUA')
                        .setAuthor('Singapore Police', 'https://cdn.discordapp.com/icons/703862691608920114/669f0e6605601754a64fbb829ede2c00.webp?size=256')
                        .setDescription('**This player is blacklisted! by ARCH** Please dont invite him over to the guild or just kick him directly! Please look into ARCH main discord for more info')
                        .setFooter('If this is wrong please contact the officers :D')
                        message.channel.send(embed)
                    } else if (existable) {
                        const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor('Singapore Police', client.user.displayAvatarURL())
                        .setTitle('Warning! Player blacklisted! by SG')
                        .addFields(
                            {name: '**Player**', value: existable.blname, inline: true},
                            {name: "**Blacklisted by**", value: `<@${existable.blacklister}> ${existable.date}`, inline: true},
                            {name: '**Reason**', value: `\`\`\`${existable.reason} \`\`\``}
                        )
                        message.channel.send(embed)
                    } else {
                        message.reply(`${result.data.name} is not blacklisted :D`)
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
            const embed = new Discord.MessageEmbed()
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
                    message.reply(`${personMention} has been added to ${channelMention}`)
                } else {
                   return message.reply('This command only works for ticket channels, thank you', '<:jennielove:844893922634235904>')
                }
            })
        } else {
            return message.reply('You don\'t have permission to use this command')
        }
    } else if (command === 'checkbattle') {
        let battleId = args[0];
        if (!battleId) return message.reply('You must state the battle Id!')
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
                            const embed = new Discord.MessageEmbed()
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
                            message.channel.send(embed)
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
                            const embed = new Discord.MessageEmbed()
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
                            message.channel.send(embed)
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
                            const embed = new Discord.MessageEmbed()
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
                            message.channel.send(embed)
                            }

                        }
                        eventKiller.forEach(async (m, i) => {
                            let gear = m.Killer.Equipment
                            let test =  Object.keys(gear).filter(m => gear[m] != null && m !== 'Bag' && m !== 'Potion' && m !== 'Cape' && m !== 'Mount' && m !== 'Food')
                                if (gear.MainHand == null| gear.Head == null | gear.Armor == null | gear.Shoes == null) {
                                    hasTriggered = false
                                    console.log(test)
                                    let MainHand;
                                    let OffHand;
                                    let Head;
                                    let Armor;
                                    let Shoes;
                                    if (m.Killer.Equipment.MainHand == null) {
                                        MainHand = ''
                                    } else {
                                        MainHand = m.Killer.Equipment.MainHand.Type
                                    }
                                    if (m.Killer.Equipment.OffHand == null) {
                                        OffHand = ''
                                    } else {
                                        OffHand = m.Killer.Equipment.OffHand.Type
                                    }
                                    if (m.Killer.Equipment.Head == null) {
                                        Head = ''
                                    } else {
                                        Head = m.Killer.Equipment.Head.Type
                                    }
                                    if (m.Killer.Equipment.Armor == null) {
                                        Armor = ''
                                    } else {
                                        Armor = m.Killer.Equipment.Armor.Type
                                    }
                                    if (m.Killer.Equipment.Shoes == null) {
                                        Shoes = ''
                                    } else {
                                        Shoes = m.Killer.Equipment.Shoes.Type
                                    }
                                    let person = events.players[m.Killer.Id]
                                    const time = (param) => {
                                        let z = new Date(param)
                                        let timeFix = z.toLocaleTimeString()
                                        let dateFix = z.toLocaleDateString()
                                        let final = dateFix + ' ' + timeFix
                                        return final;
                                    }
                                    const embed = new Discord.MessageEmbed()
                                    .setAuthor('SIngapore ZvZ Tool', client.user.displayAvatarURL())
                                    .setColor('RED')
                                    .setTitle('Bad ZvZ Build!')
                                    .setDescription(`Bad ZvZ build detected! Battle: ${events.id} \n**Reason:** Not using proper ZvZ Build`)
                                    .addFields(
                                    {name: '__**PLAYER INFO**__', value: `**Player Name:** ${person.name} \n**Guild:** ${person.guildName} \n**IP:** ${Math.round(m.Killer.AverageItemPower)} \n**Aliance:** ${person.allianceName} \n**Kills:** ${person.kills} | **Deaths:** ${person.deaths} \n**Killboard:** [click the link](https://albiononline.com/en/killboard/kill/${m.EventId})`, inline: true},
                                    { name: '__**BATTLE INFO**__', value: `**Battleboard:** [${events.id}](https://kill-board.com/battles/${events.id}) \n**Start time:** ${time(events.startTime)} \n**End time:** ${time(events.startTime)} \n**Total kills:** ${events.totalKills} \n**Total fame:** ${events.totalFame}`, inline: true}
                                     )
                                    .setFooter('Singapore on top', client.user.displayAvatarURL())
                                    .setTimestamp(new Date())
                                    .setImage(`https://aolootlog.com/api/api.php?image=yes&main=${MainHand}&off=${OffHand}&head=${Head}&armor=${Armor}&shoes=${Shoes}`)
                                    message.channel.send(embed)
                                } else if (parseInt(m.Killer.AverageItemPower) < 1100) {
                                    hasTriggered = false
                                    console.log(test)
                                    let MainHand;
                                    let OffHand;
                                    let Head;
                                    let Armor;
                                    let Shoes;
                                    if (m.Killer.Equipment.MainHand == null) {
                                        MainHand = ''
                                    } else {
                                        MainHand = m.Killer.Equipment.MainHand.Type
                                    }
                                    if (m.Killer.Equipment.OffHand == null) {
                                        OffHand = ''
                                    } else {
                                        OffHand = m.Killer.Equipment.OffHand.Type
                                    }
                                    if (m.Killer.Equipment.Head == null) {
                                        Head = ''
                                    } else {
                                        Head = m.Killer.Equipment.Head.Type
                                    }
                                    if (m.Killer.Equipment.Armor == null) {
                                        Armor = ''
                                    } else {
                                        Armor = m.Killer.Equipment.Armor.Type
                                    }
                                    if (m.Killer.Equipment.Shoes == null) {
                                        Shoes = ''
                                    } else {
                                        Shoes = m.Killer.Equipment.Shoes.Type
                                    }
                                    let person = events.players[m.Killer.Id]
                                    const time = (param) => {
                                        let z = new Date(param)
                                        let timeFix = z.toLocaleTimeString()
                                        let dateFix = z.toLocaleDateString()
                                        let final = dateFix + ' ' + timeFix
                                        return final;
                                    }
                                    const embed = new Discord.MessageEmbed()
                                    .setAuthor('SIngapore ZvZ Tool', client.user.displayAvatarURL())
                                    .setColor('RED')
                                    .setTitle('Bad ZvZ Build!')
                                    .setDescription(`Bad ZvZ build detected! Battle: ${events.id} \n**Reason:** Low IP`)
                                    .addFields(
                                    {name: '__**PLAYER INFO**__', value: `**Player Name:** ${person.name} \n**Guild:** ${person.guildName} \n**IP:** ${Math.round(m.Killer.AverageItemPower)} \n**Aliance:** ${person.allianceName} \n**Kills:** ${person.kills} | **Deaths:** ${person.deaths} \n**Killboard:** [click the link](https://albiononline.com/en/killboard/kill/${m.EventId})`, inline: true},
                                    { name: '__**BATTLE INFO**__', value: `**Battleboard:** [${events.id}](https://kill-board.com/battles/${events.id}) \n**Start time:** ${time(events.startTime)} \n**End time:** ${time(events.startTime)} \n**Total kills:** ${events.totalKills} \n**Total fame:** ${events.totalFame}`, inline: true}
                                     )
                                    .setFooter('Singapore on top', client.user.displayAvatarURL())
                                    .setTimestamp(new Date())
                                    .setImage(`https://aolootlog.com/api/api.php?image=yes&main=${MainHand}&off=${OffHand}&head=${Head}&armor=${Armor}&shoes=${Shoes}`)
                                    message.channel.send(embed)
                                } else {
                                    if (compareSet(gear.MainHand, gear.OffHand, gear.Head, gear.Armor, gear.Shoes) == true) {
                                        hasTriggered = false
                                        let MainHand;
                                    let OffHand;
                                    let Head;
                                    let Armor;
                                    let Shoes;
                                    if (m.Killer.Equipment.MainHand == null) {
                                        MainHand = ''
                                    } else {
                                        MainHand = m.Killer.Equipment.MainHand.Type
                                    }
                                    if (m.Killer.Equipment.OffHand == null) {
                                        OffHand = ''
                                    } else {
                                        OffHand = m.Killer.Equipment.OffHand.Type
                                    }
                                    if (m.Killer.Equipment.Head == null) {
                                        Head = ''
                                    } else {
                                        Head = m.Killer.Equipment.Head.Type
                                    }
                                    if (m.Killer.Equipment.Armor == null) {
                                        Armor = ''
                                    } else {
                                        Armor = m.Killer.Equipment.Armor.Type
                                    }
                                    if (m.Killer.Equipment.Shoes == null) {
                                        Shoes = ''
                                    } else {
                                        Shoes = m.Killer.Equipment.Shoes.Type
                                    }
                                    let person = events.players[m.Killer.Id]
                                    const time = (param) => {
                                        let z = new Date(param)
                                        let timeFix = z.toLocaleTimeString()
                                        let dateFix = z.toLocaleDateString()
                                        let final = dateFix + ' ' + timeFix
                                        return final;
                                    }
                                    const embed = new Discord.MessageEmbed()
                                    .setAuthor('SIngapore ZvZ Tool', client.user.displayAvatarURL())
                                    .setColor('RED')
                                    .setTitle('Bad ZvZ Build!')
                                    .setDescription(`Bad ZvZ build detected! Battle: ${events.id} \n**Reason:** Not using proper ZvZ Build`)
                                    .addFields(
                                    {name: '__**PLAYER INFO**__', value: `**Player Name:** ${person.name} \n**Guild:** ${person.guildName} \n**IP:** ${Math.round(m.Killer.AverageItemPower)} \n**Aliance:** ${person.allianceName} \n**Kills:** ${person.kills} | **Deaths:** ${person.deaths} \n**Killboard:** [click the link](https://albiononline.com/en/killboard/kill/${m.EventId})`, inline: true},
                                    { name: '__**BATTLE INFO**__', value: `**Battleboard:** [${events.id}](https://kill-board.com/battles/${events.id}) \n**Start time:** ${time(events.startTime)} \n**End time:** ${time(events.startTime)} \n**Total kills:** ${events.totalKills} \n**Total fame:** ${events.totalFame}`, inline: true}
                                     )
                                    .setFooter('Singapore on top', client.user.displayAvatarURL())
                                    .setTimestamp(new Date())
                                    .setImage(`https://aolootlog.com/api/api.php?image=yes&main=${MainHand}&off=${OffHand}&head=${Head}&armor=${Armor}&shoes=${Shoes}`)
                                    message.channel.send(embed)
                                    }
        
                                }
                                
                            
                        })
                        
                    if (hasTriggered) {
                        message.author.send('All clear!')
                    }
                })
            })
        })
        
    } else if (command === 'helpofficer') {
        const embed = new Discord.MessageEmbed()
        .setAuthor('Singapore Police', client.user.displayAvatarURL())
        .setColor('ORANGE')
        .setDescription('List of admin commands for officers')
        .addFields(
            { name: '__**Commands**__', value: "```!add [playerMention] [ticketChannel] \n!checkbl [IGN] \n!checkbattle [battleID] \n!deaths [IGN] \n!fastcheck [KillboardID]```"}
        )
        .setFooter('If this is wrong please contact the officers', client.user.displayAvatarURL())
        .setTimestamp(new Date())
        message.channel.send(embed)
    } else if (command === 'ask') {
        let question = args.slice(0).join(' ')
        if (!question) return message.reply("You didn't specify your question!")
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
        let answer = responses[Math.floor(Math.random() * responses.length-1)]
        message.reply(answer)
    } else if (command === 'unblacklist') {
        await mongo().then(async mongoose => {
            let personName = args[0]
            if (!personName) return message.reply('You must state the person')
            let isPersonBlacklisted = await blacklist.findOne({ blname: personName.toLowerCase()})
            if (!isPersonBlacklisted) return message.reply(`I cannot find a person with \`${personName}\` inside the blacklist :D`)
            await blacklist.findOneAndDelete({ blname: personName.toLowerCase()})
            message.reply(`Player **${personName}** has been unblacklisted`)
        })
    }
}) 
const emojis = {
    white_check_mark: 'Recruit'
}
const handleReactions = (reaction, user, add) => {
    if (user.id === '805976602864386059') {
        return
    }
    const emoji = reaction._emoji.name
    const { guild } = reaction.message

    const roleName = 'Recruit'
    const role = guild.roles.cache.find(role => role.name === roleName)
    const member = guild.members.cache.find(member => member.id === user.id)
    if (add) {
        member.roles.remove(role)
    } 
}
client.on('guildMemberAdd', (member) => {
   member.send(`**[ARCH] Singapore are recruiting for S13**
   Do apply now on our discord at application: https://discord.gg/2UvYbWc7m3
   
   
   We are an **established guild** for [ARCH] who has **Achieved Silver rank in S11** and are looking forward to keeping up the momentum in **S12.**
   
   
   Singapore is not only open to Singaporeans if you're wondering and we're looking for players from all over the WORLD who would like to look for content within Albion during 12 and 15 UTC.
   
   
   We mainly speak English in game but we do speak other languages as well as we have players across SEA.
   
   **What we offer:**
   
   :one:Fame Farming efficiently in T8 Zones (solo, group and ava dungeons)
   :two:Provide :free: Maps for new members for fame farming.
   :three:Safe Gathering Zones with multiple hideouts in the black zone.
   :four:Daily Avalonian Buff, Full Clear 8.2+
   :five:Hideout in T8 Zone
   :six:Gathering Contents in Royals & Roads
   :seven:Organized Faction Fights
   :eight:Organized Scrims for Practice
   :nine:Tax Rebate for HCE players
   :one::zero: Weekly Give Away : 8.3 Gears & Mounts
   
   
   **Min Requirements:**
   2M PvE Fame
   Mature
   Willing to Learn
   Able to speak and understand basic English
   :heart:
   
   Contact our friendly officers in game for more information:
   **LongLiveLuai**
   **Gnamo**
   **Kuukimonster**
   **LightDragneel**
   **Aruthal**
   **MrGremory**
   **Fatmeow**
   
   Discord:
   **LongLiveLuai#9032**
   **Gnamo#8066**
   **scorpion0378#4436**
   **Lohit#5260**
   **Leiz#9629**
   **fatmeowbutthin#4147**
   **Fatmeow#3662**`)
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
        client.user.setActivity(status, { type: 'WATCHING'}).catch(console.error)
        index++;
    }, 3000);
})
client.login(process.env.token)

