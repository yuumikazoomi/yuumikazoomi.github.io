class Network{
    constructor(callback){
        this.callback = callback;
        this.ws = new WebSocket("ws://localhost:8080");
        this.ws.onmessage = function (evt) {
            var received_msg = evt.data;
            callback(received_msg);
          };
          this.ws.onopen = function(evt){
            if(localStorage.hasOwnProperty('uid-private')){
                //key exists, check if it's null
                let selfuid = localStorage.getItem('uid-private');
                if(selfuid=="null" || selfuid == "undefined"){
                    this.send(JSON.stringify({pid:1,uidprivate:"null"}));
                    console.log('uuid does not exist');
                }else{
                    this.send(JSON.stringify({pid:1,uidprivate:selfuid}));
                    console.log('found uuid:'+selfuid);
                }
            }else{
                this.send(JSON.stringify({pid:1,uidprivate:"null"}));
                console.log('uuid does not exist');
                
            }
          }
          const style = 'color:red; font-size:30px; font-weight: bold; -webkit-text-stroke: 1px black; background-color: black;'
            console.log("%c DO NOT SHARE THE PRIVATE UID THAT IS ONLY FOR YOU", style);
            console.log("%c PRIVATE UID IS FOUND IN STORAGE", style);
    }
    sendwrapper(packet){
        let p = JSON.stringify(packet);
        this.ws.send(p);
    }
}