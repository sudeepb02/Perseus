import Portis from "@portis/web3";
import Web3 from "web3";
import SubdomainRegistrar from "../contracts/EthRegistrarSubdomainRegistrar.json";
import { default as contract } from "truffle-contract";
import { keccak_256 as sha3 } from "js-sha3";

export const portis = new Portis(
  "48aa2d1e-41b8-4688-b5a0-416252c5b82e",
  "ropsten",
  // { gasRelay: true }
);

// export const web3 = new Web3(portis.provider);
export const web3 = new Web3(window.web3.currentProvider);

export const subdomainContractAdress = "0xb478d80d850f1e8bd1322f9ecdcf24e4ec941684";

async function SubdomainContract() {
  let contr = contract(SubdomainRegistrar);
  contr.setProvider(portis.provider);
  contr = contr.at(subdomainContractAdress);

  return contr;
}

export async function SubdomainContractMetamask() {
  let contr = contract(SubdomainRegistrar);
  contr.setProvider(window.web3.currentProvider);
  contr = contr.at(subdomainContractAdress);

  return contr;
}

export async function registerSubdomain(
  label,
  subdomain,
  subdomainOwner,
  referrer,
  resolver,
  contentHash
) {
  let contr = await SubdomainContract();

  const accounts = await portis.provider.enable();

  await contr.register(
    "0x" + sha3(label),
    subdomain,
    subdomainOwner,
    referrer,
    resolver,
    contentHash,
    {
      from: accounts[0]
    }
  );
}

export async function registerSubdomainMetamask(
  label,
  subdomain,
  subdomainOwner,
  referrer,
  resolver,
  contentHash
) {
  let contr = await SubdomainContractMetamask();

  // const accounts = await portis.provider.enable();

  await contr.register(
    "0x" + sha3(label),
    subdomain,
    subdomainOwner,
    referrer,
    resolver,
    contentHash,
    {
      from: web3.eth.currentProvider.selectedAddress
    }
  ).then(tx => tx)
}