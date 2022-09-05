import * as types from "../actionTypes/userActionTypes";

const initialState = {
  signerAddress: false,
  tokenBalance: false,
  ethBalance: false,
  transactions: false,
  ethSentTotal: false,
  nltReceivedTotal: false,
  ethPrice: false,
  closingTime: false,
  currentTime: false,
  ethRaised: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        signerAddress: action.payload.signerAddress,
        tokenBalance: action.payload.tokenBalance,
        ethBalance: action.payload.ethBalance,
        ethRaised: action.payload.weiRaised,
        closingTime: action.payload.closingTime,
      };

    case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        ethSentTotal: action.payload.ethSentTotal,
        nltReceivedTotal: action.payload.nltReceivedTotal,
      };

    case types.SET_ETH_PRICE:
      return {
        ...state,
        ethPrice: action.payload,
      };

    case types.UNSET_USER:
      return {
        signerAddress: false,
        tokenBalance: false,
        ethBalance: false,
        transactions: false,
        ethSentTotal: false,
        nltReceivedTotal: false,
        closingTime: false,
        currentTime: false,
      };

    case types.SET_DISCONNECTED_USER:
      return {
        ...state,
        ethRaised: action.payload.balances.weiRaised,
        closingTime: action.payload.closingTime,
      };

    case types.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };

    default:
      return state;
  }
};
