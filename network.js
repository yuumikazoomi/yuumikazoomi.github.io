class Network{
    constructor(callback){
        this.callback = callback;
        this.ws = new WebSocket("ws://localhost:8080");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            callback(received_msg);
          };
          this.ws.onopen = function(evt){
              console.log('sending uuid');
            if(localStorage.hasOwnProperty('uid')){
                //key exists, check if it's null
                let selfuid = localStorage.getItem('uid');
                if(selfuid=="null" || selfuid == "undefined"){
                    this.send(JSON.stringify({pid:1,myuuid:"null"}));
                    console.log('uuid does not exist');
                }else{
                    this.send(JSON.stringify({pid:1,myuuid:selfuid}));
                    console.log('found uuid:'+selfuid);
                }
            }else{
                this.send(JSON.stringify({pid:1,myuuid:"null"}));
                console.log('uuid does not exist');
                
            }
          }
    }
    sendwrapper(packet){
        let p = JSON.stringify(packet);
        console.log(packet);
        console.log(p);
        this.ws.send(p);
    }
}