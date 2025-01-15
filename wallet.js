// wallet.js

let provider = null;
let walletAddress = null;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            walletAddress = accounts[0];
            provider = new ethers.providers.Web3Provider(window.ethereum);
            updateWalletInfo();
        } catch (error) {
            console.error('Failed to connect wallet', error);
            alert('Failed to connect wallet. Check console for details.');
        }
    } else {
        alert('Ethereum provider is not installed. Please install it to use this feature.');
    }
}

function disconnectWallet() {
    walletAddress = null;
    provider = null;
    updateWalletInfo();
}

function updateWalletInfo() {
    const walletInfo = document.getElementById('wallet-info');
    if (walletInfo) {
        walletInfo.innerHTML = walletAddress 
            ? `Connected: <span class="wallet-address">${formatAddress(walletAddress)}</span>`
            : 'Wallet not connected';
    }
}

function formatAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Ensure to call this on page load to update wallet info
window.addEventListener('load', updateWalletInfo);

document.getElementById('connect-button')?.addEventListener('click', connectWallet);
document.getElementById('disconnect-button')?.addEventListener('click', disconnectWallet);
