import { io } from "socket.io-client";

class Client {
    socket = null
    sid = null

    constructor() {
        this.socket = io("http://localhost:8080");
        this.socket.on("connect", this.on_connect);
        this.socket.on("connect_error", this.on_error_handling);
        this.socket.on("response", this.on_response);
        this.socket.on("disconnect", this.on_disconnect);
    }

    on_connect() {
        console.log(`Bağlantı başarılı id: ${this.id}`);
        this.sid = this.id
        this.emit('request', 'www.google.com')
    }

    on_response(payload) {
        console.log(`Gelen data: ${payload}`)
    }

    on_error_handling(err) {
        console.log(`Bağlantı hatası:  ${err.message}`);
    }

    on_disconnect() {
        console.log(`Bağlantı sonlandırılıyor. Sonlandırılan bağlantı id: ${this.sid}`);
    }

}

const client = new Client();