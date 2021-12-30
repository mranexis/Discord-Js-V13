const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('يرد ب بونق'),

 async execute(interaction){
     interaction.reply({
         content:"pong",
         ephemeral : false,
     })
 }
}