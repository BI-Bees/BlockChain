const Web3 = require('web3')
const contract = require('truffle-contract')

const fs = require('fs');
const fileContents = fs.readFileSync('./build/contracts/SmartContractDemo.json', 'utf8');
const contractArtifacts = JSON.parse(fileContents);
const SmartContract = contract(contractArtifacts);

const deployer = '0x0b707d4A7b4741eCc29b2678EDA55A07bc31E0ae'
const client   = '0x83E93122d4782896e5B650EE79032fA2AA9D2a1D'
const tasker   = '0x1449f8bBce765d5DB07b20ED7Ac456947D1544fe'

const web3Provider = new Web3.providers.HttpProvider(
  'http://localhost:8545' // address of the Parity node
)

const web3 = new Web3(web3Provider)

SmartContract.setProvider(web3.currentProvider);
if (typeof SmartContract.currentProvider.sendAsync !== "function") {
  SmartContract.currentProvider.sendAsync = function() {
        return SmartContract.currentProvider.send.apply(
          SmartContract.currentProvider, arguments
        );
    };
}

web3.eth.getAccounts(error => {
  if (error) {
    throw new Error(`
      Error while fetching accounts from RPC!
      Check RPC address! The problem may be there!
    `)
  }
})

const fetchBalanceByAddress = async address => {
  return new Promise(resolve => {
    web3.eth.getBalance(address, (_, balance) => {
      resolve(web3.utils.fromWei(balance, 'ether').toString())
    })
  })
}

const printBalancesToConsole = async () => {
  const deployerBalance = await fetchBalanceByAddress(deployer)
  const clientBalance   = await fetchBalanceByAddress(client)
  const taskerBalance   = await fetchBalanceByAddress(tasker)

  console.log(`Deployer: ${deployerBalance}; Client: ${clientBalance}; Tasker: ${taskerBalance}`)
}

const run = async () => {
  await printBalancesToConsole()

  SmartContract.setProvider(web3.currentProvider);

  const smartContract = await SmartContract.new(
    client, tasker, { gas: 1000000, from: deployer }
  )

  console.log(`Deploying Smart contract...`)
  console.log(`Current balances in all accounts`)
  await printBalancesToConsole()
  console.log(`Sending payment to contract...`)  
  await smartContract.sendPaytoDeployer({ from: client, value: web3.utils.toWei("1", 'ether'), gas: "60000" })
  console.log(`Transaction is complete. Payment has been successfully processed`)
  
  console.log(`Wait...1...2...3...`)
  console.log(`After completing job`)
  console.log(`Sending payment to Tasker...`)
  await smartContract.sendPayAmountToTasker({ from: deployer })
  console.log(`Transaction is complete. Payment has been successfully processed`)
  console.log(`Balances after completing the contract`)
  await printBalancesToConsole()
}

run()
