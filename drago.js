const Discord = require('discord.js');

const client = new Discord.Client();
const token = 'ODA1OTc2NjAyODY0Mzg2MDU5.YBiuNA.sAzmexbksdaEcwaGkXBBkMAkOeg'
const mongo = require('./mongo')
const splitz = require('./models/split-schema')
const person = require('./models/person')
const regear = require('./models/regear')
const register = require('./models/register')
const axios = require('axios'); 
const prefix = '!'

client.on('message', async (message) => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'splits') {
        await mongo().then(async mongoose => {
            let nama = args[0]
            let existable = await person.find({ personName: nama});
            let stringz = ''
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Lootsplits for ${message.author.username}`)
            .setColor('AQUA')
            .setDescription(`${existable.map(i => i.liquidateID + " " + "--" + " " +  "<#" + i.locationChannel + ">" + " " + "--" + " " + i.status).join('\n')}`)
            .setFooter('If you believe this is wrong please contact the admin')
            .setTimestamp(new Date())
            message.channel.send(embed)
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
        let channel = message.guild.channels.cache.get('760731834354499585')
        const embedz = new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor('Singapore Police', 'https://cdn.discordapp.com/icons/703862691608920114/669f0e6605601754a64fbb829ede2c00.webp?size=256')
        .setDescription(`**ERROR** \nThis command is disabled in this channel to prevent clutter, please redo this command at ${channel}`)
        .setFooter('If this is wrong please contact the officers :D')
        console.log(message.channel.id)
        if (message.channel.id === '779514684797091850' | message.channel.id === '760731834354499585') {
            let firstArgument = args[0];
            if (!firstArgument) return message.reply('Please state the person you want to check!')
            axios.get(`https://api.aotools.net/v2/blacklist/${firstArgument}`)
            .then(async result => {
                console.log(result.data.isBlacklisted)
                if (result.data.isBlacklisted === true) {
                    const embed = new Discord.MessageEmbed()
                    .setColor('AQUA')
                    .setAuthor('Singapore Police', 'https://cdn.discordapp.com/icons/703862691608920114/669f0e6605601754a64fbb829ede2c00.webp?size=256')
                    .setDescription('**This player is blacklisted!** Please dont invite him over to the guild or just kick him directly! Please look into ARCH main discord for more info')
                    .setFooter('If this is wrong please contact the officers :D')
                    message.channel.send(embed)
                } else {
                    message.reply(`${result.data.name} is not blacklisted :D`)
                }
            })
        } else {
            return message.channel.send(embedz)
        }
    } else if (command === 'sadge') {
        if (message.author.id === '694488949980135444' | message.author.id === '209607795505496065') {
           message.channel.send('Life is hard, but you must keep going <:godbless:824231355331510274> \n**Gato2021**')
        }
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

    const roleName = emojis[emoji]
    if (!roleName) {
        return
    }
    const role = guild.roles.cache.find(role => role.name === roleName)
    const member = guild.members.cache.find(member => member.id === user.id)
    if (add) {
        member.roles.add(role)
    } 
}
client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === '849925701988515851') {
        handleReactions(reaction, user, true)
    }
})
client.on('ready', () => {
    console.log('The Bot is Online')
})
client.login(process.env.token)

