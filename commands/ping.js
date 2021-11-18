module.exports = {
    name:'ping',
    description: 'a ping command. for tests',

    execute(message, args){
        message.channel.send({ content: "Hello ! Pong"})
    }
}
