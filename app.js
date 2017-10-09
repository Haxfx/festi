const Blockchain = require('./blockchain');

const festChain = new Blockchain();

festChain.addBlock("Secondblock");
festChain.addBlock("Thirdblock");
festChain.printChain();