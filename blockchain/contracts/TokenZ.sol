//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TRC21.sol";

contract TokenZ is MyTRC21Mintable, Ownable {
    uint256 private _mintLimit;

    constructor() MyTRC21Mintable("haipro", "HPR", 18, 100000000000, 0) {
        setMintLimit(100);
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function setMintLimit(uint256 _limit) public onlyOwner {
        _mintLimit = _limit;
    }

    function mint(uint256 _amount) external {
        require(balanceOf(msg.sender) + _amount < _mintLimit);
        _mint(msg.sender, _amount);
    }
}
