const SmartContractDemo = artifacts.require('SmartContractDemo')

module.exports = (deployer, _, accounts) => {
  deployer.deploy(SmartContractDemo, accounts[1], accounts[2], { from: accounts[0] })
}