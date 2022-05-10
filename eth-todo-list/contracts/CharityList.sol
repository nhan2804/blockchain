pragma solidity >=0.6.0 <0.9.0;

contract CharityList {
    uint256 public charityCount = 0;
    address _owner;
    struct Charity {
        uint256 id;
        string message;
        address donor;
        uint256 value;
    }
    mapping(uint256 => Charity) public charities;

    // event TaskCreated(uint256 id, string content, bool completed);

    // event TaskCompleted(uint256 id, bool completed);

    constructor() public {
        _owner = msg.sender;
    }

    function createCharity(string memory _message) public payable {
        charityCount++;
        charities[charityCount] = Charity(
            charityCount,
            _message,
            msg.sender,
            msg.value
        );
        payable(_owner).transfer(msg.value);
        // emit TaskCreated(taskCount, _message, false);
    }

    modifier validateTransferAmount() {
        require(msg.value > 0, "Transfer amount has to be greater than 0.");
        _;
    }
    modifier validateCharity(uint256 charityIndex) {
        require(
            // charityIndex <= charityAddresses.length - 1,
            false,
            "Invalid charity index."
        );
        _;
    }
    modifier validateTransferdAmount() {
        require(msg.value > 0, "Transfer amount has to be greater than 0.");
        _;
    }

    // function toggleCompleted(uint256 _id) public {
    //     Task memory _task = tasks[_id];
    //     _task.completed = true;
    //     tasks[_id] = _task;
    //     emit TaskCompleted(_id, _task.completed);
    // }
}
