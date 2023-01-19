// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.2;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GossipRegistry is Initializable {
    address private admin;
    // Operator auth : indexer => operator
    mapping(address => address) public operatorAuth;
    // Operator registered : operator => registered
    mapping(address => bool) public operatorReg;

    /**
     * @dev Emitted when `admin` role changes.
     */
    event AdminChange(address admin);

    /**
     * @dev Emitted when `indexer` sets `operator` access.
     */
    event SetGossipOperator(address indexed indexer, address indexed operator);

    // Only run at initial deployment
    function initialize(address _admin) public initializer {
        admin = _admin;
    }

    function getAdmin() public view returns (address) {
        return admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    // Only current admin can transfer to new Admin
    function changeAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }

    /**
     * @dev Authorize an address to be a gossip operator. (unauthorize by setting address 0)
     * @param _operator Address to authorize
     */
    function setGossipOperator(address _operator) external {
        require(_operator != msg.sender, "operator == sender");
        require(_operator == address(0) || !operatorReg[_operator], "operator reg");
        // unset previous operator
        if (operatorAuth[msg.sender] != address(0)){
            operatorReg[operatorAuth[msg.sender]] = false;
        }
        operatorAuth[msg.sender] = _operator;
        operatorReg[_operator] = true;
        emit SetGossipOperator(msg.sender, _operator);
    }
}
