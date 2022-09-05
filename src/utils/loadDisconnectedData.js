import { ethers, utils } from "ethers";
import { loadContract } from "./loadContract";
import {
  publicSaleAbi,
  publicSaleAddress,
  rinkebyWebsocktedInfuraNode,
} from "./constants";
import { contractReader } from "./contractReader";

const loadDisconnectedData = async () => {
  try {
    const provider = new ethers.providers.WebSocketProvider(
      rinkebyWebsocktedInfuraNode,
      "rinkeby"
    );

    const saleContract = loadContract(
      publicSaleAddress,
      publicSaleAbi,
      provider
    );

    let weiRaised = await contractReader(saleContract, "weiRaised");

    const closingTime = await contractReader(saleContract, "closingTime");

    weiRaised = weiRaised ? Number(utils.formatEther(weiRaised)).toFixed(2) : 0;

    const balances = {
      weiRaised: weiRaised,
    };

    return { balances, provider, closingTime };
  } catch (error) {
    debugger;
    console.log(error);
  }
};

export default loadDisconnectedData;
