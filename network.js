class Network{
    constructor(callback){
        this.callback = callback;
        this.ws = new WebSocket("ws://8.168.115.193:8090");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            callback(received_msg);
          };
          this.ws.onopen = function(evt){
            if(localStorage.hasOwnProperty('uid')){
                //key exists, check if it's null
                let selfuid = localStorage.getItem('uid');
                if(selfuid=="null" || selfuid == "undefined"){
                    this.send({pid:1,myuuid:"null"});
                }else{
                    this.send({pid:1,myuuid:selfuid});
                }
            }else{
                this.send({pid:1,myuuid:"null"});
            }
          }
    }
    send(packet){
        this.ws,this.send(JSON.stringify(packet));
    }
}