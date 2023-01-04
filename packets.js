function getcolourforid(cid){
    switch(cid){
        case 1:
            return '#CCCCFF';
            break;
        case 2:
            return '#FFCCFF';
            break;
        case 3:
            return '#FFCCCC';
            break;
        case 4:
            return '#660066';
            break;
    }
}
class PlayerColourIdentifiers{
    constructor(){
        this.kNone = 0;
        this.kBlue = 1;
        this.kBlack = 2;
        this.kRed = 3;
        this.kGreen = 4;
        this.kNoMoreColours = 5;
    }
    
}
class PacketIdentifiers{
    constructor(){
        this.kNothing = 0;
        this.kUuid = 5;
        this.kGameUuid = 6;
        this.kMove = 7;
        this.kInQue = 8;
        this.kInLobby = 9;
        this.kQueLeave = 10;
        this.kInGame = 11;
        this.kTurn = 12;
        this.kMyId = 13;
        this.kAllPlayers = 14;
        this.kGameTerminated = 15;
        this.kGameOver = 16;
        this.kToggleRequests = 17;
        this.kChallenge = 18;
        this.kChallengeAccept = 19;
    }
}
class IdentifierConstants{
    constructor(){
        this.packet = new PacketIdentifiers();
        this.colours = new PlayerColourIdentifiers();
    }
}