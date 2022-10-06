// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.7.6;
pragma abicoder v2;

contract GossipRegistry {
    // Operator auth : indexer => operator
    mapping(address => mapping(address => bool)) public operatorAuth;

    /**
     * @dev Emitted when `indexer` sets `operator` access.
     */
    event SetGossipOperator(address indexed indexer, address indexed operator, bool allowed);

    /**
     * @dev Authorize or unauthorize an address to be a gossip operator.
     * @param _operator Address to authorize
     * @param _allowed Whether authorized or not
     */
    function setGossipOperator(address _operator, bool _allowed) external {
        require(_operator != msg.sender, "operator == sender");
        operatorAuth[msg.sender][_operator] = _allowed;
        emit SetGossipOperator(msg.sender, _operator, _allowed);
    }
}
