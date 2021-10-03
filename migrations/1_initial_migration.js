const Migrations = artifacts.require("Migrations");
const Register = artifacts.require("Register");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Register);
};
