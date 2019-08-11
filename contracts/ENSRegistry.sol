pragma solidity >=0.4.21 < 0.6.0;

/**
  * @title ENSRegistry
  * @dev Extract of the interface for ENS ENSRegistry
  */

contract ENSRegistry {
  function setOwner(bytes32 node, address owner) public;
  function setSubnodeOwner(bytes32 node, bytes32 label, address owner) public;
  function setResolver(bytes32 node, address resolver) public;
  function owner(bytes32 node) public view returns (address);
  function resolver(bytes32 node) public view returns (bytes);  
}
