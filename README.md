# ProxyServer
Socket client ve server lerin kullanım bilgisini, okunabilir kod yazımını ve git kullanımının anlaşılması için hazırlanmıştır.

## Mimari
<p align="center">
<img src="https://github.com/Minexora/ProxyServer/blob/master/image/schema.png" />
</p>

Socket Proxy, ws-server ve ws-client dan oluşmaktadır. Kendisine gelen istediği diğer sunucudan aldığı cevapla döndürür.
Proje de static olarak client üzerinde bağlanır bağlanmaz 'www.google.com' datası emit edilmekte. Proxy üzerinden servera gönderilmektedir.
Servedan cevapta static olarak verilmiştir.

## İsterler
- Sunucu, client ve proxy server aynı ortamda çalışmalıdır.
- ws-proxy, port 8080’i dinler.
- ws-server, port 8081’i dinler.
- ws-client ws-proxy (:8080)’e bağlanır, ancak dönen cevap ws-server (:8081)’den ws-proxy üzerinden aktarılarak gelir.
- ws-client, bağlantı kesilme durumunda tekrar bağlanmaya çalışır.
- ws-proxy, ws-client in bağlantısı kesildiği durumda ws-server ile olan socket i de sonlandırır, tam tersi durum için de aynı şekilde,
  ws-server ile bağlantının kesilmesi durumunda ws-client ile olan socket i de sonlandırmalıdır.
  
## Kurulum
- Projenin gerekliliklerinin yüklenilmesi için terminale ```npm install ``` yazılması yeterlidir.
- Projenin başlatılması için;
  ``` 
    // Server başlatılması için;
    npm run server 
    
    // Proxy Server başlatılması için;
    npm run proxy_server
    
    // Clientin başlatılması için;
    npm run client
  ```
  yazılmadılır.
 
