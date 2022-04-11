import { Server } from "socket.io";

class ServerClass {
    io = new Server(8081);
    socket = null

    constructor() {
        console.log('Proxy server 8081 portundan başlatıldı.')
        this.io.on("connection", (socket) => {
            this.socket = socket
            console.log(`bağlantı başarılı id: ${socket.id}`)

            socket.on("request", (payload) => {
                // Burada işlemler yapılacak
                console.log(`Gelen data: ${payload}`)
                this.io.to(this.socket.id).emit('response', {data:'Geri Dön', id: this.socket.id})
            });
            socket.on("disconnect", this.on_disconncet);
        });

    }

    on_disconncet() {
        console.log(`Bağlantı sonlandırlıyor.Sonlandırlan bağlantı id: ${this.id}`);
    }

}

const server = new ServerClass()