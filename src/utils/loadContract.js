import { Contract, ethers } from 'ethers';
// helper function to load contract
export const loadContract = (address, abi) => {
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const newContract = new Contract(
    address,
    abi,
    signer,
  );

  return newContract;
};