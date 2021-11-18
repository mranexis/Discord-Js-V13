const { Client, Collection, MessageEmbed } = require('discord.js');
const Bot = new Client({
    intents: ["GUILD_MESSAGES", "GUILDS"],   
});
const prefix = '?';
const fs = require('fs');
const { brotliCompressSync } = require('zlib');

Bot.once('ready', () => {
    console.log('Bot is online')
    Bot.user.setActivity(`Free Fire`)
})

Bot.commands = new Collection();
const Files = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

Files.forEach(file => {
    const command = require(`./commands/${file}`);
    Bot.commands.set(command.name, command);
})

Bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) && message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase()
    if(command === 'ping') {
        Bot.commands.get('ping').execute(message, args);
    }
    else if(command === 'help'){
        Bot.commands.get('help').execute(message, MessageEmbed)
    }

})


Bot.login("توكن")
