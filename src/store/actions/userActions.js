import * as actionTypes from "../actionTypes/userActionTypes";
import { getUserBalances } from "../../utils/getUserBalances";
import axios from "axios";
import { utils } from "ethers";
import {
  blockOfPublicSaleDeployment,
  etherscanKey,
  publicSaleAddress,
  publicSaleRate,
} from "../../utils/constants";
import loadDisconnectedData from "../../utils/loadDisconnectedData";

export const loadGmtTime = () => async (dispatch) => {
  try {
    const gmtTimeResponse = await axios.get(
      `https://worldtimeapi.org/api/timezone/Europe/London`
    );

    if (gmtTimeResponse.data) {
      const gmtUnixTimestamp = gmtTimeResponse.data.unixtime;

      dispatch({
        type: actionTypes.SET_CURRENT_TIME,
        payload: gmtUnixTimestamp,
      });
    }
  } catch (error) {
    debugger;
    return;
  }
};

export const loadEthPrice = () => async (dispatch) => {
  try {
    const ethPriceResponse = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD,EUR,GBP`
    );

    if (ethPriceResponse.data?.ethereum) {
      dispatch({
        type: actionTypes.SET_ETH_PRICE,
        payload: ethPriceResponse.data?.ethereum,
      });
    }
  } catch (error) {
    debugger;
    return;
  }
};

export const setUser = (library, account) => async (dispatch) => {
  try {
    const { signerAddress, balances, error } = await getUserBalances(
      library,
      account,
      library,
      account
    );

    if (error) {
      return;
    }

    dispatch({
      type: actionTypes.SET_USER,
      payload: {
        signerAddress,
        ...balances,
      },
    });

    dispatch(loadEthPrice());
    dispatch(loadGmtTime());
    return dispatch(loadTransactions(signerAddress));
  } catch (error) {
    debugger;
    return;
  }
};

export const loadTransactions =
  (signerAddress) => async (dispatch, getState) => {
    try {
      // get block of deployment of sale contract
      // RINKEBY = https://api-rinkeby.etherscan.io/api
      // MAINNET = https://api.etherscan.io/api

      const transactionsResponse = await axios.get(
        `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&contractaddress=${publicSaleAddress}&address=${signerAddress}&startblock=${blockOfPublicSaleDeployment}&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${etherscanKey}`
      );
      let transactions = transactionsResponse?.data?.result?.filter(
        (tx) => tx.to.toLowerCase() === publicSaleAddress.toLowerCase()
      );
      if (transactions.length) {
        transactions = transactions.map((tx, index) => {
          return {
            number: index + 1,
            date: new Date(tx.timeStamp * 1000).toUTCString(),
            isSuccess: tx.isError === "0",
            txHash: tx.hash,
            ethSent: Number(utils.formatEther(tx.value)).toFixed(2),
            nltReceived:
              Number(Number(utils.formatEther(tx.value))) * publicSaleRate, // !! IMPORTANT !! Change according to sale
          };
        });

        // sum eth together
        const ethSum = transactions.reduce(
          (partialSum, a) => partialSum + Number(a.ethSent),
          0
        );

        // sum nlt together
        const nltSum = transactions.reduce(
          (partialSum, a) => partialSum + a.nltReceived,
          0
        );

        dispatch({
          type: actionTypes.SET_TRANSACTIONS,
          payload: {
            transactions,
            ethSentTotal: ethSum.toFixed(2),
            nltReceivedTotal: nltSum.toFixed(2),
          },
        });
      }
    } catch (error) {
      debugger;
      return;
    }
  };

export const unconnectedDataLoad = () => async (dispatch, getState) => {
  const { balances, error, closingTime } = await loadDisconnectedData();

  if (error) {
    return;
  }

  dispatch({
    type: actionTypes.SET_DISCONNECTED_USER,
    payload: { balances, closingTime },
  });
};

export const disconnectUserAccount = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.UNSET_USER,
  });
};
