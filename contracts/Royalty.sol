//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import 'hardhat/console.sol';


contract Royalty is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _softwareIds;
  Counters.Counter private _topLevels;

  uint256[] allSoftware;
  uint256[] allEvents;

  uint256 softwareCount;

  address _daoAddress;

  struct Software {
    uint256 id;
    uint256 parent;
    uint256 level;
    uint256[10] children;
    uint256 price;
    string name;
  }

  mapping(uint256 => Software) software;

  constructor() ERC721("Royalty", "RYLTY") {
    softwareCount = 0;
  }

  function getAllSoftware() public view returns (uint256) {
    return softwareCount;
  }

  // TODO: maybe add a view function to return all top level software? --> function getTopLevelSoftware()
  // probably better than iterating through every id and checking the level to see if
  // it's a parent software...

  function getChildren(uint256 targetId)
    public
    view
    returns (uint256[10] memory)
  {
    Software memory targetSoftware = software[targetId];

    return targetSoftware.children;
  }

  function getSoftwareDetails(uint256 id)
    public
    view
    returns (
      address,
      uint256,
      uint256,
      uint256,
      uint256[10] memory,
      uint256,
      string memory,
      string memory
    )
  {
    Software memory targetSoftware = software[id];
    string memory uri = ERC721URIStorage.tokenURI(id);
    address owner = ERC721.ownerOf(id);

    return (
      owner,
      id,
      targetSoftware.parent,
      targetSoftware.level,
      targetSoftware.children,
      targetSoftware.price,
      uri,
      targetSoftware.name
    );
  }

  function mintTopLevelSoftware(address recipient, string memory tokenURI, string memory name)
    public
    payable
    returns (uint256)
  {
    uint256[10] memory children = [
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99)
    ];
    uint256 newItemId = _softwareIds.current();
    Software memory newSoftware = Software(
      newItemId,
      uint256(999),
      1,
      children,
      0,
      name
    );

    software[softwareCount] = newSoftware;
    softwareCount += 1;

    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    _softwareIds.increment();
    _topLevels.increment();

    allSoftware.push(newItemId);

    return newItemId;
  }

  function mintSoftware(address recipient, uint256 parent, uint256 price, string memory tokenURI, string memory name)
    public
    payable
    returns (uint256)
  {
    require(price > 0, "price must be > 0");

    Software storage parentSoftware = software[parent];
    uint256 parentId = parentSoftware.id;

    uint256[10] memory children = [
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99),
      uint256(99)
    ];

    uint256 newSoftwareId = _softwareIds.current();

    Software memory newSoftware = Software(
      newSoftwareId,
      parentId,
      parentSoftware.level + 1,
      children,
      price,
      name
    );
    
    software[softwareCount] = newSoftware;
    uint256 newItemId = _softwareIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    for (uint256 i = 0; i < parentSoftware.children.length; i++) {
      if (parentSoftware.children[i] == uint256(99)) {
        parentSoftware.children[i] = newItemId;
        break;
      }
    }

    softwareCount += 1;

    allSoftware.push(newItemId);
    _softwareIds.increment();

    return newItemId;
  }

  function purchase(uint256 id) public payable returns (uint256) {
    Software memory forSaleSoftware = software[id];

    require(
      forSaleSoftware.price == msg.value,
      "Insufficient price for software"
    );

    distribute(id, msg.value);

    return id;
  }

  function distribute(uint256 id, uint256 price) public payable returns (uint256[] memory) {
    address softwareOwner = ERC721.ownerOf(id);
    Software memory child = software[id];
    uint256[] memory parents = new uint256[](child.level - 1);
    Software memory parent = software[child.parent];

    parents[0] = parent.id;
    
    for (uint256 i = 1; i <= child.level - 2; i++) {
      Software memory currentParent = software[i-1];
      parents[i] = currentParent.id;
    }

    uint256 forUser = price / 100 * 95;
    uint256 royalties = price / 100 * 5;
    uint256 singleRoyalty = royalties / parents.length;
    
    for (uint256 i = 0; i < parents.length; i++) {
      address owner = ERC721.ownerOf(parents[i]);
      (bool successRoyalty, ) = owner.call{value: singleRoyalty}("");
      console.log("Sending to %s", owner);
      require(successRoyalty, "Transaction failed");
    }

    (bool success, ) = softwareOwner.call{value: forUser}("");
    require(success, "Transaction failed");
    console.log("Sending to %s", softwareOwner);

    return parents;
  }

}