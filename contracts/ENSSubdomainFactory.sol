pragma solidity ^0.4.24;

import './ENSRegistry.sol';
import './ENSResolver.sol';

/**
 * @title ENSSubdomainFactory
 * @dev Allows to point subdomain to an ipfs content hash.
 * The deployed contract must be the owner of the main domain
 */

contract ENSSubdomainFactory {
  address public owner;
  ENSRegistry public registry;
  ENSResolver public resolver;
  bool public locked;
  bytes32 emptyNamehash = 0x00;

  event SubdomainCreated(address indexed creator, address indexed owner, string subdomain, string domain, string topdomain);
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
  event RegistryUpdated(address indexed previousRegistry, address indexed newRegistry);
  event ResolverUpdated(address indexed previousResolver, address indexed newResolver);
  event DomainTransfersLocked();

  constructor(ENSRegistry _registry, ENSResolver _resolver) public {
    owner = msg.sender;
    registry = _registry;
    resolver = _resolver;
    locked = false;
  }

  /**
   * @dev Throws if called by any account other than the owner
   */
  modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }

  /**
   * @dev Allows to create a subdomain
   * @param _subdomain - Subdomain name only
   * @param _domain - Main domanin name
   * @param _topdomain - Top level domain
   * @param _owner - Address that will become the owner of the Subdomain
   * @param _target - Contenthash that the subdomain will point to
   */
   function newSubdomain(string _subdomain, string _domain, string _topdomain, address _owner, bytes _target) public {

      //Create namehash for the topdomain
      bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, keccak256(abi.encodePacked(_topdomain))));

      //Create namehash for the domain
      bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, keccak256(abi.encodePacked(_domain))));

      //Verify that this contract owns the Subdomain
      require(registry.owner(domainNamehash) == address(this), "This contract should own this domain");

      //Create labelhash for  Subdomain
      bytes32 subdomainLabelhash = keccak256(abi.encodePacked(_subdomain));

      //Create namehash for subdomain
      bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, subdomainLabelhash));

      //Verify if it is free
      require(registry.owner(subdomainNamehash) == address(0) ||
          registry.owner(subdomainNamehash) == msg.sender, "Subdomain already registered");

      //Create new subdomain and set this contract as the owners
      registry.setSubnodeOwner(domainNamehash, subdomainNamehash, address(this));

      //Set Public resolver for this subdomainNamehash
      registry.setResolver(subdomainNamehash, resolver);

      //Set destination hash
      resolver.setContenthash(subdomainNamehash, _target);

      //Set the owner to requested owner
      registry.setOwner(subdomainNamehash, owner);

      //Emit event
      emit SubdomainCreated(msg.sender, _owner, _subdomain, _domain, _topdomain);
   }

   /**
   * @dev Return the owner of a domain
   * @param _domain - Domain name 
   * @param _topdomain - Top level domain name
   */
   function domainOwner(string _domain, string _topdomain) public view returns (address) {
      bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, keccak256(abi.encodePacked(_topdomain))));
      bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, keccak256(abi.encodePacked(_domain))));
      return registry.owner(domainNamehash);
   }

   /**
   * @dev Returns the owner of a subdomain
   * @param _subdomain - SUbdomain name
   * @param _domain - Main domain name
   * @param _topdomain - Top level domain name
   */
   function subdomainOwner(string _subdomain, string _domain, string _topdomain) public view returns (address) {
      bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, keccak256(abi.encodePacked(_topdomain))));
      bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, keccak256(abi.encodePacked(_domain))));
      bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, keccak256(abi.encodePacked(_subdomain))));
      return registry.owner(subdomainNamehash);
   }

   /**
   * @dev Returns the target contenthash
   * @param _subdomain - Subdomain name
   * @param _domain - Main domain name
   * @param _topdomain - Top level domain name
   */
   function subdomainTarget(string _subdomain, string _domain, string _topdomain) public view returns (bytes) {
      bytes32 topdomainNamehash = keccak256(abi.encodePacked(emptyNamehash, keccak256(abi.encodePacked(_topdomain))));
      bytes32 domainNamehash = keccak256(abi.encodePacked(topdomainNamehash, keccak256(abi.encodePacked(_domain))));
      bytes32 subdomainNamehash = keccak256(abi.encodePacked(domainNamehash, keccak256(abi.encodePacked(_subdomain))));

      address currentResolver = registry.resolver(subdomainNamehash);
      return ENSResolver(currentResolver).contenthash(subdomainNamehash);
   }

   /*
   * @dev Contract owner can change ownership using this function
   * @param _node - namehash of the domainN
   * @param _owner - address of new owner
   */
   function transferDomainOwnership(bytes32 _node, address _owner) public onlyOwner {
      require(!locked);
      registry.setOwner(_node, _owner);
   }

   /*
   * @dev Contract owner can lock and prevent any future domain transfers
   */
   function lockDomainOwnershipTransfers() public onlyOwner {
      require(!locked);
      locked = true;
      emit DomainTransfersLocked();
   }

   /*
   * @dev Allows to update to new ENS registry
   * @param _registry - Address of the new ENS Registry
   */
   function updateRegistry(ENSRegistry _registry) public onlyOwner {
      require(registry != _registry, "New registry should be different from old");
      emit RegistryUpdated(registry, _registry);
      registry = _registry;
   }

   /*
   * @dev Allows to update to new ENS resolver
   * @param _resolver - Address of the new ENS Resolver
   */
   function updateResolver(ENSResolver _resolver) public onlyOwner {
      require(resolver != _resolver, "New resolver should be different from old");
      emit ResolverUpdated(resolver, _resolver);
      resolver = _resolver;
   }

   /*
   * @dev Allows the current owner to transfer the ownership to new owner
   * @param _owner - Address of the new owner of Contract
   */
   function transferContractOwnership(address _owner) public onlyOwner {
      require(_owner != address(0), "Cannot transfer to address(0)");
      emit OwnershipTransferred(owner, _owner);
      owner = _owner;
   }
}
