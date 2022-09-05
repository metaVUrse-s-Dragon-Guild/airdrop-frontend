import { contractReader } from "./contractReader";
import { utils } from 'ethers';

// used to load ETH UMI and LpUniswap balance of user
export const loadBalances = async (
    provider,
    signerAddress,
    tokenContract,
    saleContract
  ) => {
    // create promise
    const tokenBalancePromise = contractReader(
      tokenContract,
      'balanceOf',
      [signerAddress],
    );
  
    const ethBalancePromise = contractReader(
      provider,
      'getBalance',
      [signerAddress],
    );

     const weiRaisedPromise = contractReader(
      saleContract,
      'weiRaised',
    );

    const closingTimePromise = contractReader(
      saleContract,
      'closingTime',
    );
  
    // resolve promises
    let [tokenBalance, ethBalance, weiRaised, closingTime] = await Promise.all([
      tokenBalancePromise,
      ethBalancePromise,
      weiRaisedPromise,
      closingTimePromise
    ]);
    // format balances
    tokenBalance = tokenBalance ? Number(utils.formatEther(tokenBalance)).toFixed(2) : 0;
    ethBalance = ethBalance ? Number(utils.formatEther(ethBalance)).toFixed(2) : 0;
    weiRaised = weiRaised ? Number(utils.formatEther(weiRaised)).toFixed(2) : 0;
    
    return {
      ethBalance,
      tokenBalance,
      weiRaised,
      closingTime
    };
  };