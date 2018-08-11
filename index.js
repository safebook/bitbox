const readline = require('readline')
const bip32 = require('bip32-ascii')
const bip39 = require('bip39')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Debug generateMnemonic:", bip39.generateMnemonic())

rl.question('Mnemonic:', (mnemonic) => {
  if (bip39.validateMnemonic(mnemonic)) {
    let seed = bip39.mnemonicToSeed(mnemonic)
    let root = bip32.fromSeed(seed)
    rl.question('Account:', (account) => {
      rl.close()
      if (/[^a-zA-Z0-9]/.test(account)) {
        console.log("Error: Account isn't alphanumeric")
      } else {
        let node = root.derivePath2("m/43'/bitbox'/0'/password'/0'/"+account+"'")
        console.log(node.privateKey.toString('hex'))
      }
    })
  }
  else
  {
    rl.close()
    console.log("Error: Invalid mnemonic")
  }
});
