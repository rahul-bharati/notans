// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Notans {
    struct Userdata {
        string name;
        string username;
        address payable recipient_address;
        string profile_uri;
    }
    mapping(string => Userdata) public usermapping;
    mapping(bytes32 => address) public tokens;

    event UserdataSaved(
        string name,
        string indexed username,
        address indexed recipient_address,
        string profile_uri
    );

    function create_user(
        string memory _name,
        string memory _username,
        string memory _profile_uri
    ) public {
        usermapping[_username] = Userdata(
            _name,
            _username,
            payable(msg.sender),
            _profile_uri
        );

        emit UserdataSaved(_name, _username, msg.sender, _profile_uri);
    }

    function get_user_address(string memory _username)
        public
        view
        returns (Userdata memory)
    {
        return usermapping[_username];
    }

    function addToken(bytes32 symbol, address tokenAddress) external {
        tokens[symbol] = tokenAddress;
    }

    function send_token(
        bytes32 symbol,
        uint amount,
        address _to
    ) external {
        ERC20(tokens[symbol]).approve(msg.sender, amount);
        ERC20(tokens[symbol]).transfer(_to, amount);
    }
}
