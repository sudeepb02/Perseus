var HashRegistrar = artifacts.require("HashRegistrar");
var TestResolver = artifacts.require("TestResolver");
var ENS = artifacts.require("@ensdomains/ens/contracts/ENSRegistry.sol");
var SubdomainRegistrar = artifacts.require("SubdomainRegistrar");
var EthRegistrar = artifacts.require("EthRegistrarSubdomainRegistrar");

var namehash = require('eth-ens-namehash');
var sha3 = require('js-sha3').keccak_256;
var Promise = require('bluebird');


module.exports = function (deployer, network, accounts) {
    return deployer.then(async () => {
        if (network == "test") {

            await deployer.deploy(ENS);

            const ens = await ENS.deployed();

            await deployer.deploy(HashRegistrar, ens.address, namehash.hash('eth'), 1493895600);
            await deployer.deploy(TestResolver, ens.address);

            await ens.setSubnodeOwner('0x0', '0x' + sha3('eth'), accounts[0]);
            await ens.setSubnodeOwner(namehash.hash('eth'), '0x' + sha3('resolver'), accounts[0]);

            const resolver = await TestResolver.deployed();
            await ens.setResolver(namehash.hash('resolver.eth'), resolver.address);

            const dhr = await HashRegistrar.deployed();
            await ens.setSubnodeOwner('0x0', '0x' + sha3('eth'), dhr.address);

            await deployer.deploy(SubdomainRegistrar, ens.address);
            const registrar = await SubdomainRegistrar.deployed();

        } else {
			//await deployer.deploy(TestResolver);
            //const resolver = await TestResolver.deployed();
            //ENS Registry contract address on Ropsten testnet - 0x112234455C3a32FD11230C42E7Bccd4A84e02010
            //await deployer.deploy(SubdomainRegistrar, "0x112234455C3a32FD11230C42E7Bccd4A84e02010");
            await deployer.deploy(EthRegistrar, "0x112234455C3a32FD11230C42E7Bccd4A84e02010");
        }
    });
};
