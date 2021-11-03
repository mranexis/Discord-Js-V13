module.exports = {
    name:'ban',
    description: 'a ban command. for tests',

    execute(message, MessageEmbed, args, user){
        if(user){
            const member = message.guild.members.resolve(user);
            if(member){
                member.ban({reason : 'كود باند'}).then(()=> {
                    message.channel.send("تم حظر الشخص" + `<@${member.id}>`)
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
