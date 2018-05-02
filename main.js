const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(position, date_creation, infos, precedantHash = ''){
        this.position = position;
        this.date_creation = date_creation;
        this.infos = infos;
        this.precedantHash = precedantHash;
        this.hash = this.blockHash();
    }

    blockHash(){
        return SHA256(this.position + this.precedantHash + this.date_creation + JSON.stringify(this.infos)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.bigbangGenesisBlock()];
    }

    bigbangGenesisBlock(){
        return new Block(0, "01/05/2018", "Cointelegraph:CFTC Chairman On Crypto Regulation: ‘I Don’t See It Being Resolved Anytime Soon’", "0");
    }

    quelDernierBlock(){
        return this.chain[this.chain.length -1];
    }

    ajouterBlock(nouveauBlock){
        nouveauBlock.precedantHash = this.quelDernierBlock().hash;
        nouveauBlock.hash = nouveauBlock.blockHash();
        this.chain.push(nouveauBlock);
    }
}

let CryptoDox_JEE_COIN = new Blockchain();
CryptoDox_JEE_COIN.ajouterBlock(new Block(1, "02/05/2018", { montant: 5}));
CryptoDox_JEE_COIN.ajouterBlock(new Block(2, "03/05/2018", { montant: 12}));

console.log(JSON.stringify(CryptoDox_JEE_COIN, null, 4));