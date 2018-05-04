const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(position, date_creation, infos, precedantHash = ''){
        this.position = position;
        this.date_creation = date_creation;
        this.infos = infos;
        this.precedantHash = precedantHash;
        this.hash = this.hashBlock();
    }

    hashBlock(){
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

    dernierBlock(){
        return this.chain[this.chain.length -1];
    }

    ajoutBlock(nouveauBlock){
        nouveauBlock.precedantHash = this.dernierBlock().hash;
        nouveauBlock.hash = nouveauBlock.hashBlock();
        this.chain.push(nouveauBlock);
    }

    secureChain(){
        for(let i = 1; i < this.chain.length; i++){
            const ceBlock = this.chain[i];
            const precedantBlock = this.chain[i - 1];

            if(ceBlock.hash !== ceBlock.hashBlock()){
                return false;
            }

            if(ceBlock.precedantHash !== precedantBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let CryptoDox_JEE_COIN = new Blockchain();
CryptoDox_JEE_COIN.ajoutBlock(new Block(1, "02/05/2018", { montant: 5}));
CryptoDox_JEE_COIN.ajoutBlock(new Block(2, "03/05/2018", { montant: 12}));

console.log(JSON.stringify(CryptoDox_JEE_COIN, null, 4));

console.log('Intégrité Blockchain ? ' + CryptoDox_JEE_COIN.secureChain());

CryptoDox_JEE_COIN.chain[1].infos = { montant: 100};
CryptoDox_JEE_COIN.chain[1].hash = CryptoDox_JEE_COIN.chain[1].hashBlock();

console.log(JSON.stringify(CryptoDox_JEE_COIN, null, 4));

console.log('Intégrité Blockchain ? ' + CryptoDox_JEE_COIN.secureChain());
