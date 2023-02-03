// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @notice Collision of indexer address and operator address. Setting operator address to self but a different address required.
/// @param _operator Address to register as the gossip operator.
error InvalidOperatorAddress(address _operator);
/// @notice Occupied operator address - The address has been already been registered.
/// @param _operator Address to register as the gossip operator
error OccupiedOperatorAddress(address _operator);

/// @title A Registry for Graphcast Gossip Operators
/// @author GraphOps
/// @notice You can use this contract to register an address as a Gossip Operator for your Graph Account
/// @dev This contract utilizes Openzepplin Ownable and Transparent Upgradeable Proxy contracts
contract GossipRegistry is Initializable, OwnableUpgradeable {
    /// @notice Track mapping from indexer address to its registered operator address
    /// @dev Restricted to 1:1 mapping
    mapping(address => address) public operatorAuthorized;
    
    /// @notice Track mapping of addresseas to registration status as an operator
    /// @dev Initially all false, update status within `setGossipOperator`
    mapping(address => bool) public operatorRegistered;

    /**
     * @dev Emitted when `indexer` sets `operator` access.
     */
    event SetGossipOperator(address indexed indexer, address indexed operator);

    /**
     * @notice Function to register operator address
     * @dev Authorize an address to be a gossip operator. (unauthorize by setting address 0)
     * @param _operator Address to authorize as the gossip operator
     */
    function setGossipOperator(address _operator) external {
        if (_operator == msg.sender)
            revert InvalidOperatorAddress(_operator);
        if (_operator != address(0) && operatorRegistered[_operator])
            revert OccupiedOperatorAddress(_operator);
        // unset previous operator
        if (operatorAuthorized[msg.sender] != address(0)){
            operatorRegistered[operatorAuthorized[msg.sender]] = false;
        }
        operatorAuthorized[msg.sender] = _operator;
        operatorRegistered[_operator] = true;
        emit SetGossipOperator(msg.sender, _operator);
    }

    /**
     * @notice Initial contract deployment that sets the owner
     * @dev Default owner passed in is the deployer address
     */    
    function initialize() external initializer {
        __Ownable_init();
    }
}
