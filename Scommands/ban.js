const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("حظر شخص ما")
    .addUserOption((option) => option.setName('user').setDescription('الشخص الذي سوف تقوم بحظره').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('اكتب سبب الحظر').setRequired(false)),

    async execute(Bot, interaction){
        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({
            content: "لا تملك الصلاحية لذلك",
            ephemeral: true,
        })
        const user = interaction.options.getUser('user')

        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.cache.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply({
            content: "لم اجد الشخص",
            ephemeral: true,
        })
        
        var reason = interaction.options.getString('reason')
        if(!reason) reason = 'لا سبب مصرح'
        if(!member.bannable || member.user.id === Bot.user.id) return interaction.reply({
            content: "لا يمكن حظر هاذا الشخص",
            ephemeral: true,
        })
        if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply('الشخص المطلوب حظره رتبته اعلى منك')

        const embed = new MessageEmbed()
        .setDescription(`${member.user.tag} تم حظر
        لسبب : ${reason}`)
        .setFooter('الحظر')
        await member.user.send('تم حظرك من سيرفر')

        member.ban({reason})
        return interaction.reply({embeds: [embed]})
    }

}
