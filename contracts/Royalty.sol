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

  struct slice {
    uint256 _len;
    uint256 _ptr;
  }

  uint256[] allSoftware;
  uint256[] allEvents;

  uint256 softwareCount;

  address _daoAddress;

  struct Software {
    string id;
    string parent;
    uint256 level;
    uint256 children;
    uint256 price;
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

  function getChildren(string memory targetId)
    public
    view
    returns (uint256[] memory)
  {
    bool[] memory ids = new bool[](allSoftware.length);
    uint256 trueCount = 0;
    for (uint256 i = 0; i < allSoftware.length; i++) {
        string memory id = software[allSoftware[i]].id;
        if (startsWith(toSlice(id), toSlice(targetId))) {
            ids[i] = true;
            trueCount++;
        } else {
            ids[i] = false;
        }
    }

    uint256[] memory childrenIds = new uint256[](trueCount);
    uint256 trackTrue = 0;
    for (uint256 i = 0; i < ids.length; i++) {
        if (ids[i] == true) {
            childrenIds[trackTrue] = i;
            trackTrue++;
        }
    }

    return childrenIds;
  }

  function getSoftwareDetails(uint256 id)
    public
    view
    returns (
      address,
      string memory,
      string memory,
      uint256,
      uint256,
      uint256,
      string memory
    )
  {
    Software memory targetSoftware = software[id];
    string memory uri = ERC721URIStorage.tokenURI(id);
    address owner = ERC721.ownerOf(id);

    return (
      owner,
      Strings.toString(id),
      targetSoftware.parent,
      targetSoftware.level,
      targetSoftware.children,
      targetSoftware.price,
      uri
    );
  }

  function mintTopLevelSoftware(address recipient, string memory tokenURI)
    public
    payable
    returns (uint256)
  {
    Software memory newSoftware = Software(
      Strings.toString(_topLevels.current()),
      Strings.toString(0),
      1,
      0,
      0
    );

    software[softwareCount] = newSoftware;
    softwareCount += 1;

    uint256 newItemId = _softwareIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    _softwareIds.increment();
    _topLevels.increment();

    allSoftware.push(newItemId);

    return newItemId;
  }

  function mintSoftware(address recipient, uint256 parent, uint256 price, string memory tokenURI)
    public
    payable
    returns (uint256)
  {
    require(price > 0, "price must be > 0");

    Software memory parentSoftware = software[parent];
    string memory parentId = parentSoftware.id;

    string memory children = Strings.toString(parentSoftware.children);

    string memory newSoftwareId = string(bytes.concat(bytes(parentId), bytes(children)));

    Software memory newSoftware = Software(
      newSoftwareId,
      Strings.toString(parent),
      softwareCount + 1,
      0,
      price
    );
    
    software[softwareCount] = newSoftware;
    uint256 newItemId = _softwareIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);

    parentSoftware.children += 1;
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

    address owner = ERC721.ownerOf(id);

    (bool success, ) = owner.call{value: msg.value}("");

    // TODO: Don't send full msg.value to owner of software
    // here is where we will call the distribute function to traverse
    // up the parents and calculate how much is reserved for each parent
    // then we send the remaining to the id given here

    // distribute function thoughts:
    // two ways to do this...
    // 1: keep eth in contract and require distribute function to be called by a user for their software
    // ^^^ this would run the calculation adhoc for the software and distribute to all other software in the tree (naive approach)
    // 2: call distribute automagically at the time of sale and do the distributions
    // ^^^ this would probably require us to emit distribute events (like a psuedo event struct... not a solidity event)
    // so that we can display each of the distribute amounts to the parent software owner

    require(success, "Transaction failed");

    return id;
  }

  // function distribute(uint256 id, uint256 price) public payable returns (string[] memory) {
  //   Software memory child = software[id];
  //   string[] memory parents = new string[](child.level - 1);

  //   parents[0] = child.parent;

  //   for (uint256 i = 1; i <= child.level - 2; i++) {
  //     string memory currentParent = parents[i-1];
  //     Software memory current = software[currentParent];
  //     // console.log(current.parent);
  //     // parents[i] = current.parent;
  //   }

  //   return parents;
  // }


  /*
    * @dev Returns a slice containing the entire string.
    * @param self The string to make a slice from.
    * @return A newly allocated slice containing the entire string.
    */
  function toSlice(string memory self) internal pure returns (slice memory) {
      uint256 ptr;
      assembly {
          ptr := add(self, 0x20)
      }
      return slice(bytes(self).length, ptr);
  }

  /*
    * @dev Returns true if `self` starts with `needle`.
    * @param self The slice to operate on.
    * @param needle The slice to search for.
    * @return True if the slice starts with the provided text, false otherwise.
    */
  function startsWith(slice memory self, slice memory needle)
      internal
      pure
      returns (bool)
  {
      if (self._len < needle._len) {
          return false;
      }

      if (self._ptr == needle._ptr) {
          return true;
      }

      bool equal;
      assembly {
          let length := mload(needle)
          let selfptr := mload(add(self, 0x20))
          let needleptr := mload(add(needle, 0x20))
          equal := eq(
              keccak256(selfptr, length),
              keccak256(needleptr, length)
          )
      }
      return equal;
  }


}