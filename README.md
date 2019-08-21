# Perseus

*** We're still working out some kinks in the platform...you may need to add ```window.ethereum.enable()``` on line 11 of ```src/components/Steps.jsx``` ***

> Perseus is the simplest gateway to the decentralized web. With the benefit of Arweave, ENS and IPFS, users can post and host and share with others seamlessly.

## Why did we build Perseus?

The potential of the decentralized web is clear. It's uncensorable and, in the case of Arweave and IPFS, permanent. But deploying to Arweave and using ENS and IPFS can be intimidating. We wanted to build the simplest, most straightforward user experience for deploying to Arweave and registering on ENS. Users can deploy their site to arweave, and register a subdomain for their site in just a single transaction thus saving gas costs.

There is also a market for users/domain owners to sell subdomains for their domain and earn commission.

## What is Perseus?

Perseus is supposed to be fun. We wanted users to be able to deploy easily and cheaply, so we offer the opportunity to register subdomains to avoid the pain points of the full-fledged ENS experience. 

The following domains are available currently on the ropsten network:
* beanbag.eth (our first successful domain name, we ran out of names while testing, lol)
* arweave.eth
* perseus.eth
* nemesis.eth

## Operation

The EthRegistrarSubdomainRegistrar implements a contract that takes ownership of multiple .eth domains, and sells the subdomain to users. The domain owners can choose to sell subdomains for free or set a one-time fee for a subdomain. When users register a subdomain, it is automatically configured with a default resolver and pointed to their arweave deployed site through IPFS. This permits easy one-transaction claiming and assignment of an ENS domain for users, significantly improving the user-experience.

The `EthRegistrarSubdomainRegistrar` contract is deployed on the ropsten network at the address `0xb478D80d850f1E8BD1322F9ECDcF24E4ec941684` 

### Adding a domain

Any .eth domain owner may use this contract by:

* Transferring ownership of the Deed to the deployed contract.
* Calling `configureDomain(name, price, referralFeePPM)`, where name is the name of the domain (without .eth), price is the price in wei to charge for a subdomain registration, and referralFeePPM is the referral fee to offer to frontends, in parts-per-million.

    
## What's Next?

- Building on Arweave's more dynamic features, like packaging
- Offering users to register full domains (Users will need to pay a fee of $5/year in ETH as required by ENS)
- Add Portis Gas Relayers for easy onboarding of new users
- Making Perseus social

## Running Perseus

Perseus is deployed and running [here](http://68.183.80.178:3000).

You can run it locally with 
```
npm install
npm start
``` 
For now, Perseus is only deployed on Ropsten.

![perseus-1](./src/assets/perseus-1.png)
![perseus-2](./src/assets/perseus-2.png)
![perseus-3](./src/assets/perseus-3.png)
![perseus-4](./src/assets/perseus-4.png)

## Team Members
- Michael Cohen @michaelcohen716
- Sudeep Biswas @sudeepb02

## Built with
* [Truffle](https://github.com/trufflesuite/truffle)
* [Arweave](https://arweave.org)
* [Ethereum Name Service (ENS)](https://github.com/ensdomains)

## License
This project is licensed under the BSD 2-clause "Simplified" License - see the [LICENSE](https://github.com/sudeepb02/Perseus/blob/master/LICENSE) file for details
