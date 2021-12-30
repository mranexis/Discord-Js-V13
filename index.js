const { Client, Collection } = require('discord.js');
const Bot = new Client({
    intents: ["GUILD_MESSAGES", "GUILDS"],   
});
const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v9')
const prefix = '?';
const fs = require('fs');




Bot.commands = new Collection();
const Files = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
Files.forEach(file => {
    const command = require(`./commands/${file}`);
    Bot.commands.set(command.name, command);
})

Bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix)) return;
    if(!message.content.startsWith(prefix) && message.author.bot) return;
    const user = message.mentions.users.first();
    const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase()
    Files.forEach(file => {
        if(command + '.js' === file){
            Bot.commands.get(`${command}`).execute(message, MessageEmbed, args, user)
        } 
        
    })

})

Bot.Scommands = new Collection();
const CMD = [];
const SFiles = fs.readdirSync(`./Scommands/`).filter(file => file.endsWith('.js'));
SFiles.forEach(file => {
    const Scommand = require(`./Scommands/${file}`);
    CMD.push(Scommand.data.toJSON());
    Bot.Scommands.set(Scommand.data.name, Scommand);
})

Bot.once('ready', () => {
    console.log('Bot is online')
    Bot.user.setActivity(`Free Fire`)

    const clientId = "886553363901218856" 
    const guildId = "864850195359727637"

    const rest = new REST({
        version: "9"
    }).setToken("ODg2NTUzMzYzOTAxMjE4ODU2.YT3RKQ.SWWXnT7oquiU92GRUy8heE6bC5Y");

    (async () => {
        try{

            await rest.put(
                Routes.applicationCommands(clientId),
                {
                    body: CMD
                },

            );
            console.log('COMMANDS FOR GUILD ONLY')
        } catch(err){
            if(err){
                console.error(err)
            }
        }
    })();

})

Bot.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    const command = Bot.Scommands.get(interaction.commandName)

    if(!command) return

    try{
        await command.execute(Bot, interaction)
    }
    catch(err){
        if(err){
            console.error(err)
        }
    }
})




Bot.login("ODg2NTUzMzYzOTAxMjE4ODU2.YT3RKQ.SWWXnT7oquiU92GRUy8heE6bC5Y")
