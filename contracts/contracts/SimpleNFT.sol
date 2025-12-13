// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("LoyaltyNFT", "LNFT") {}

    function mint(
        address to,
        string memory tokenURI
    ) external onlyOwner returns (uint256) {
        uint256 tid = ++nextTokenId;
        _mint(to, tid);
        _tokenURIs[tid] = tokenURI;
        return tid;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "No token");
        return _tokenURIs[tokenId];
    }
}
