const Block = require('./Block');

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, new Date().toUTCString(), 'Genesis block', '0');
    }

    getPreviousHash(){
        return this.chain[this.chain.length - 1].hash;
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const index = this.chain.length;
        const timestamp = new Date().toUTCString();
        const previousHash = this.getPreviousHash();
        const newBlock = new Block(index, timestamp, data, previousHash);
        newBlock.mineBlock(this.difficulty);
        if(this.isBlockValid(newBlock)){
            this.chain.push(newBlock);
        }
    }

    isBlockValid(newBlock) {
        const currentBlock = this.chain[this.chain.length -1];

        if(currentBlock.index + 1 !== newBlock.index){
            return false;
        }

        if(newBlock.previousHash !== currentBlock.hash){
            return false;
        }

        return true;
    }

    printChain(){
        console.log(this.chain);
    }
}

module.exports = Blockchain;