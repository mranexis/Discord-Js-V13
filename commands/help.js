module.exports = {
    name:'help',
    description: 'a help command. for tests',

    execute(message, MessageEmbed){
        const helpEmbed = new MessageEmbed()
        .setTitle('امبد المساعدة')
        //.setURL('https://www.google.com')
        .setAuthor(message.author.username, message.author.avatarURL(), 'https://www.instagram.com/its.anis05')
        .setDescription('مرحبا بك يا مستعمل البوت هنا وصف للبوت بشكل مختصر و هاذا الامر عبارة عن امر للمساعدة و خريطة الاوامر')
        .addFields({
            name: "embed simple", value: "hihieheihe", inline: true
        },
        {
            name: "blabla", value: "beblelel", inline:true
        }
        )
        .addField('عنوان', 'المحتوى', true)
        .setThumbnail(message.author.avatarURL())
        //.setImage('')
        .setFooter(message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setColor('BLACK')
        message.channel.send({embeds: [helpEmbed]})
    }
}
