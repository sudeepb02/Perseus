pragma solidity >=0.4.21 < 0.6.0;

import './ENSRegistry.sol';

/**
  * @title ENSRegistryMock
  */

contract ENSRegistryMock is ENSRegistry {
  mapping(bytes32 => address) owners;
  mapping(bytes32 => bytes) public resolvers;

  function setOwner(bytes32 _node, addresss _owner) public {
    owners[_node] = _owner;
  }

  function setSubnodeOwner(bytes32 _node, bytes32 _label, address _owner) public {
    owners[keccak256(abi.encodePacked(_node, _label))] = _owner;
  }

  function setResolver(bytes32 _node, addresss _resolver) public {
    resolvers[_node] = _resolver;
  }

  function owner(bytes32 _node) public view returns (address) {
    return owners[_node];
  }

  function resolver(bytes32 _node) public view returns (bytes) {
    return resolvers[_node];
  }
}
