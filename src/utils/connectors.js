import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { rinkebyInfuraNode, rinkebyInfurSecret } from "./constants";

export const CoinbaseWallet = new WalletLinkConnector({
  url: rinkebyInfuraNode,
  appName: "Web3-react Demo",
  supportedChainIds: [1],
});

export const WalletConnect = new WalletConnectConnector({
  rpc: {
    1: `https://rinkeby.infura.io/v3/${rinkebyInfurSecret}`,
  },
  supportedChainIds: [1],
  infuraId: rinkebyInfurSecret,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const Injected = new InjectedConnector({
  supportedChainIds: [1],
});
