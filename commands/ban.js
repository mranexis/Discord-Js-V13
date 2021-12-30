module.exports = {
    name:'ban',
    description: 'a ban command. for tests',

    execute(message, MessageEmbed, args, user){
        if(!message.author.permissions.has("BAN_MEMBERS")) return message.reply({
            content: "لا تملك الصلاحية لذلك"
        })

        if(user){

            const member = message.guild.members.resolve(user);
            if(member){
                if(!member.bannable || member.user.id === Bot.user.id) return message.reply({
                    content: "لا يمكن حظر هاذا الشخص"
                                })
                if(message.author.roles.highest.position <= member.roles.highest.position) return reply.reply('الشخص المطلوب حظره رتبته اعلى منك');
                member.ban({reason : 'كود باند'}).then(()=> {

                    const embed = new MessageEmbed()
                    .setDescription(`${member.user.tag} تم حظر`)
                    .setFooter('الحظر')
                     member.user.send('تم حظرك من سيرفر')
            
                    message.channel.send({embeds: [embed]})
                }).catch(err => {
                    message.channel.send('لا يمكنني حظر هاذا الشخص');
                    console.error(err)
                })
            } else {
                message.channel.send("لم اتمكن من ايجاد الشخص");
            }
        } else {
            message.channel.send("قم بمنشن شخص من فضلك");
        }
        
    }
}
