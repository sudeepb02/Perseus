import Portis from '@portis/web3';
import Web3 from 'web3';

export const portis = new Portis('48aa2d1e-41b8-4688-b5a0-416252c5b82e', 'ropsten');
export const web3 = new Web3(portis.provider);