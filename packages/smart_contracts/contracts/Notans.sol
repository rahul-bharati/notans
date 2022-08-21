// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Notans {
    struct Userdata {
        string username;
        address payable recipient_address;
        string profile_uri;
    }
    mapping(string => Userdata) usermapping;

    constructor () {}

    event UserdataSaved(
        string indexed username,
        address indexed recipient_address,
        string profile_uri
    );

    function create_user(string memory _username, string memory _profile_uri)
        public
    {
        usermapping[_username] = Userdata(
            _username,
            payable(msg.sender),
            _profile_uri
        );

        emit UserdataSaved(_username, msg.sender, _profile_uri);
    }

    function get_user_address(string memory _username)
        public
        view
        returns (Userdata memory)
    {
        return usermapping[_username];
    }
}