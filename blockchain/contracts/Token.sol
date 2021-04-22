//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint256 faucetLimit;

    constructor() ERC20("haipro", "HPR") {
        setFaucetLimit(100);
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function setFaucetLimit(uint256 _limit) public onlyOwner {
        faucetLimit = _limit;
    }

    function mint(uint256 _amount) external {
        require(balanceOf(msg.sender) + _amount < faucetLimit);
        _mint(msg.sender, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
