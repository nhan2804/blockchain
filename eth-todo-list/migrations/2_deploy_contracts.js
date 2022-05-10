// const TodoList = artifacts.require("./TodoList.sol");
const CharityList = artifacts.require("./CharityList.sol");

module.exports = function (deployer) {
  deployer.deploy(CharityList);
};
// module.exports = function (deployer, network, addresses) {
//   deployer.deploy();
// };
