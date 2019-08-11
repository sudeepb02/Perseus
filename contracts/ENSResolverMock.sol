pragma solidity >=0.4.21 <0.6.0;

import './ENSResolver.sol';

/**
  * @title ENSResolverMock
  */

contract ENSResolverMock is ENSResolver {
  mapping(bytes32 => bytes) public targets;

  function setContenthash(bytes32 _node, bytes _hash) {
    targets[_node] = _hash;
  }

  function contenthash(bytes32 _node) public view returns (bytes) {
    return targets[_node];
  }
}
