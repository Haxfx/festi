const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash= ''){
        this.index = index;
        this.timestamp = timestamp;
        this.dat = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return flase;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let festi = new Blockchain();

console.log("Mining block 1....");
festi.addBlock(new Block(1, "09/10/2017", { amount: 5}));

console.log("Mining block 2....");
festi.addBlock(new Block(2, "10/10/2017", { amount: 10}));


// console.log("Is blockchain valid? " + festi.isChainValid());

// festi.chain[1].data = { amount: 100};
// festi.chain[1].hash = festi.chain[1].calculateHash();

// console.log("Is blockchain valid? " + festi.isChainValid());

//console.log(JSON.stringify(RDM, null, 4));