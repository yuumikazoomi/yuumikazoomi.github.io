class Network{
    constructor(callback){
        this.callback = callback;
        this.ws = new WebSocket("ws://8.168.115.193:8090");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            callback(received_msg);
          };
    }
    send(packet){
        this.ws,this.send(JSON.stringify(packet));
    }
}