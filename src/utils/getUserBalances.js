// import { store } from "../index";
// import { createNotification } from "../store/actions/uiActions";
import { loadBalances } from "./loadBalances";
import {
  publicSaleAbi,
  publicSaleAddress,
  tokenAbi,
  tokenAddress,
} from "./constants";
import { getContract } from "./web3-helper-functions";

export const getUserBalances = async (library, account) => {
  try {
    const tokenContract = getContract(tokenAddress, tokenAbi, library, account);
    const saleContract = getContract(
      publicSaleAddress,
      publicSaleAbi,
      library,
      account
    );
    const balances = await loadBalances(
      library,
      account,
      tokenContract,
      saleContract
    );

    return { signerAddress: account, balances };
  } catch (error) {
    debugger;
    return { error: true };
  }
};
