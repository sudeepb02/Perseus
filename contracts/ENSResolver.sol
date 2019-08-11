pragma solidity >=0.4.21 <0.6.0;

/**
  * @title ENSResolver
  * @dev Extract of interface for ENS ENSResolver
  */

contract ENSResolver {
  function setContenthash(bytes32 node, bytes hash) public;
  function contenthash(bytes32 node) public view returns (bytes);
}
