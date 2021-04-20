//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor() ERC20("haipro", "HPR") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }

    function mint(address user, uint256 amount) external onlyOwner {
        _mint(user, amount);
    }

    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}
