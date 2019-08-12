pragma solidity ^0.5.0;

import "@ensdomains/ens/contracts/ENS.sol";
import "@ensdomains/ens/contracts/ENSRegistry.sol";

/**
 * @dev A basic interface for ENS resolvers.
 */
contract Resolver {
    function supportsInterface(bytes4 interfaceID) public pure returns (bool);

    function contenthash(bytes32 node) public view returns (bytes memory);
    function setContenthash(bytes32 node, bytes memory hash) public;
}
