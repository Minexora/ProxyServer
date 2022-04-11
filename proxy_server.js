import { Server } from "socket.io";
import { io } from "socket.io-client";

class ProxyServerClass {
    proxy_server_socket = new Server(8080);
    socket = null
    server_socket = null
    sids = {}

    constructor() {
        console.log('Proxy server 8080 portundan başlatıldı.')
        this.proxy_server_socket.on("connection", (socket) => {
            this.socket = socket
            console.log(`Bağlantı başarılı id: ${socket.id}`)
            this.server_connect()

            socket.on("request", (payload) => {
                this.server_socket.emit('request', payload)
            });

            socket.on("disconnect", () => {
                console.log(`Bağlantı sonlandırlıyor.Sonlandırlan bağlantı id: ${this.socket.id}`);
                let keys = Object.keys(this.sids)

                keys.forEach(item => {
                    if (this.sids[item] == this.socket.id){
                        delete this.sids[item]
                    }
                });
            });

        });
    }

    server_connect() {
        this.server_socket = io("http://localhost:8081");
        this.server_socket.on("connect", () => {
            console.log(`Server bağlantı başarılı id: ${this.server_socket.id}`);
            this.sids[this.server_socket.id] = this.socket.id
        });

        this.server_socket.on("response", (payload) => {
            console.log(`Response: ${JSON.stringify(payload)}`);
            this.proxy_server_socket.to(this.sids[payload.id]).emit('response', payload.data)
        });

        this.server_socket.on("connect_error", (err) => {
            console.log(`Server bağlantı hatası:  ${err.message}`);
        });

        this.server_socket.on("disconnect", () => {
            console.log(`Server bağlantı sonlandırılıyor. Sonlandırılan bağlantı id: ${this.sid}`);
        });
    }
}

const proxy_server = new ProxyServerClass()