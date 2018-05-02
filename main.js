class Block{
    constructor(position, date_creation, infos, precedantHash = ''){
        this.position = position;
        this.date_creation = date_creation;
        this.infos = infos;
        this.precedantHash = precedantHash;
        this.hash = '';
    }

    blockHash(){
        
    }
}