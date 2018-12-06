# Teknisk Dokument
Vi har udarbejdet en demo for Smart Contract og vist demoen til vores business gruppe for at demonstrere hvordan smart 
contract fungerer. 

## Setup
For at kunne køre demo, skal man pre-install en række packages via npm: 
1. Node.js
2. Truffle - Ethereum udviklingsværktøj for smart contract
3. Ganache CLI - TestRPC for smart contract, fungerer bedst med Truffle
4. Web3.js - Ethereum API
5. Parity - Ethereum client APP
6. Parity UI - Parity client UI for multi-OS. Da parity har pt. ikke et client UI for macOS, anbefales for macOS.

For IDE har vi valgt Visual Studio Code, men kan sagtens bruge andre IDE.

## Deploy
For at kunne køre demo korrekt, skal man ifølge instruktion:
1. Parity UI skal køres i baggrund og er forbundet til Ropsten testnet. <br/>
**Bemærk**, Parity vil synkronisere blockchain, derfor kan det tage op til flere timer før man kunne køre demo. Ca. 40 GB(4,5 mio. blocks) skal hentes fra blockchain.
2. Skriver `node deploy.js` i terminal under mappe `SmartContract`.
3. Ifølge pop up-vinduer i Pariry UI indtaster de rigtige kodeord til brugere. <br/>
*Kodeord for Deployer: passwordfordepolyer* <br/>
*Kodeord for Client: passwordforclient* <br/>
*Kodeord for Tasker: passwordfortasker* <br/>
**Bemærk**, man skal vælge den rigtig keyfil og derefter indtaste kodeord. Alle keyfile ligger under mappe `Keys`.

Nu har man lavet en smart kontrakt på blockchain <br/>
**Bemærk**, for at ikke give fejl i programmet, skal man huske at tjekke saldo på brugere. Man kan ikke lave en kontrakt heller ikke en transaktion på blockchain.

## Sources
Vi har ved hjælpe af følge links, programmeret demo. <br/>
Links: https://remix.ethereum.org <br/>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;https://rubygarage.org/blog/ethereum-smart-contract-tutorial <br/>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;https://medium.com/coinmonks/test-a-smart-contract-with-truffle-3eb8e1929370 <br/>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;https://medium.com/coinmonks/how-to-deploy-a-smart-contract-to-ethereum-testnet-e34fa5b10dd6 <br/>
