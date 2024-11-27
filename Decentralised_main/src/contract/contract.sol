// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedSocialMedia {
    struct Post {
        uint256 id;
        string content;
        address author;
        uint256 timestamp;
    }

    struct UserProfile {
        string username;
        uint256 reputation;
    }

    uint256 public postCount;
    mapping(uint256 => Post) public posts;
    mapping(address => UserProfile) public profiles;

    event PostCreated(uint256 id, string content, address author, uint256 timestamp);
    event ReputationUpdated(address user, uint256 newReputation);

    // Create a user profile
    function createProfile(string memory _username) public {
        profiles[msg.sender].username = _username;
        profiles[msg.sender].reputation = 0; // Start reputation at 0
    }

    // Create a new post
    function createPost(string memory _content) public {
        require(bytes(profiles[msg.sender].username).length > 0, "Profile does not exist");
        
        postCount++;
        posts[postCount] = Post(postCount, _content, msg.sender, block.timestamp);

        // Increase reputation
        profiles[msg.sender].reputation++;

        emit PostCreated(postCount, _content, msg.sender, block.timestamp);
        emit ReputationUpdated(msg.sender, profiles[msg.sender].reputation);
    }

    // Mint NFT for a post
    function mintNFT(uint256 _postId) public view returns (string memory) {
        require(posts[_postId].author == msg.sender, "Not the author of the post");
        return string(abi.encodePacked("Post minted as NFT: ", posts[_postId].content));
    }

    // View user profile
    function getProfile(address _user) public view returns (string memory, uint256) {
        return (profiles[_user].username, profiles[_user].reputation);
    }
}
