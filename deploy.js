document.getElementById('deploy-contract').addEventListener('click', async () => {
    const contractAddress = document.getElementById('contract-address').value.trim();
    const contractABI = document.getElementById('contract-abi').value.trim();
    const contractBytecode = document.getElementById('contract-bytecode').value.trim();
    const constructorParams = document.getElementById('constructor-params').value.trim();

    const statusMessage = document.getElementById('status-message');

    if (!window.ethereum) {
        statusMessage.innerText = 'Ethereum provider not found. Please install MetaMask.';
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
        const factory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
        const contract = await factory.deploy(...parseConstructorParams(constructorParams));
        await contract.deployTransaction.wait();

        statusMessage.innerText = `Contract deployed at address: ${contract.address}`;
    } catch (error) {
        console.error('Deployment failed', error);
        statusMessage.innerText = 'Deployment failed. Check console for details.';
    }
});

function parseConstructorParams(params) {
    try {
        return params.split(',').map(param => param.trim());
    } catch {
        return [];
    }
}
