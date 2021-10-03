pragma solidity >=0.4.22 <0.8.0;

contract Register {
    string private info;
    uint256 nextId;

    event MyEvent(uint256 indexed id, uint256 indexed date, string value);

    function setInfo(string memory _info) public {
        info = _info;
        emit MyEvent(nextId, block.timestamp, _info);
        nextId++;
    }

    function getInfo() public view returns (string memory) {
        return info;
    }
}
