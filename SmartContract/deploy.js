const Web3 = require('web3')
const contract = require('truffle-contract')
//const SmartContract = contract(require('./build/contracts/OddjobPayContract'))

const fs = require('fs');
const fileContents = fs.readFileSync('./build/contracts/OddjobPayContract.json', 'utf8');
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
    client, tasker, { gas: 10, from: deployer }
  )

  await printBalancesToConsole()
    console.log(`here1`)
  await smartContract.sendTransaction({ from: client, value: web3.utils.toWei(0.1, 'ether') })
  console.log(`here2`)
  await printBalancesToConsole()
  console.log(`here3`)
  await smartContract.sendPayAmountToTasker({ from: deployer })
  console.log(`here4`)
  await printBalancesToConsole()
  console.log(`here5`)
}

run()
