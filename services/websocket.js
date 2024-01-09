const socketService = (socket) =>{
    socket.on('new-common-messsage', ()=>{
        socket.broadcast.emit('common-message',"new common message received")
    })
    socket.on('new-group-message',(groupId)=>{
        socket.broadcast.emit('group-message',groupId)
    })
}

module.exports = socketService;