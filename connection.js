class Connection{
    constructor(packethandlercallback){
        this.packethandlercallback = packethandlercallback;
        this.ws = new WebSocket('wss://jdragon.digital:443');
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        this.identifiers = new IdentifierConstants();

    }
    onmessage(evt){
        let packet = evt.data;
        this.packethandlercallback(packet);
    }
    onopen(evt){
        console.log("connected");
        if(localStorage.hasOwnProperty('selfid')){
            //key exists, check if it's null
            let selfuid = localStorage.getItem('selfid');
            if(selfuid=="null" || selfuid == "undefined"){
                this.send({pid:this.identifiers.packet.kUuid,selfid:"null"});
            }else{
                this.send({pid:this.identifiers.packet.kUuid,selfid:selfuid});
            }
        }else{
            this.send({pid:this.identifiers.packet.kUuid,selfid:"null"});
        }
        if(localStorage.hasOwnProperty('gameid')){
            //key exists, check if it's null
            let gameuid = localStorage.getItem('gameid');
            if(gameuid=="null" || gameuid == "undefined"){
                console.log('game uid is null');
            }else{
                document.getElementById('session-id').innerText = 'Session Id: '+gameuid;
                this.send({pid:this.identifiers.packet.kGameUuid,gameid:gameuid});
            }
        }
    }
    onclose(evt){

    }
    send(packet){
        this.ws.send(JSON.stringify(packet));
    }
}