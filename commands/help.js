module.exports = {
    name:'help',
    description: 'a help command. for tests',

    execute(message, MessageEmbed, args, user){
        const helpEmbed = new MessageEmbed()
        .setTitle('امبد المساعدة')
        //.setURL('https://www.google.com') اذا كنت تريد رابط احذف الكلام هذا و ال '//'
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription('مرحبا بك يا مستعمل البوت هنا وصف للبوت بشكل مختصر و هاذا الامر عبارة عن امر للمساعدة و خريطة الاوامر')
        .addFields({
            name: "اسم الخانة", value: "قيمة الخانة", inline: true
        },
        {
            name: "اسم الخانة", value: "قيمة الخانة", inline:true 
        }
        )
        .addField('عنوان', 'المحتوى', true)
        .setThumbnail(message.author.avatarURL())
        //.setImage('') اذا كنت تريد صورة احذف الكلام هذا و ال '//'
        .setFooter(message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setColor('BLACK')
        message.channel.send({embeds: [helpEmbed]})
    }
}
