module.exports = {
    connect: function(io,PORT){
        io.on('connection',(socket)=>{
            //when a connection request comes in output to the server console
            console.log("User connection on port " + PORT + " : " + socket.id);
            //when a msg comes in emit it back to all sockets with the message
            socket.on('message',(message)=>{
                io.emit('message',message);
            })
        });
    }
}