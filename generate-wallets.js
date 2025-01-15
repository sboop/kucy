const fs = require('fs');
const { ethers } = require('ethers');

const NUMBER_OF_WALLETS = 10; // Количество кошельков для создания
const OUTPUT_FILE = 'wallets.json'; // Файл для сохранения

function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase
  };
}

function main() {
  const wallets = [];
  for (let i = 0; i < NUMBER_OF_WALLETS; i++) {
    wallets.push(generateWallet());
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(wallets, null, 2));
  console.log(`Generated ${NUMBER_OF_WALLETS} wallets and saved to ${OUTPUT_FILE}`);
}

main();
