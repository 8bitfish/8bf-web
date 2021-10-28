var GenerateFish = artifacts.require("./GenerateFish.sol");

module.exports = function (deployer) {
  deployer.deploy(GenerateFish);
};
