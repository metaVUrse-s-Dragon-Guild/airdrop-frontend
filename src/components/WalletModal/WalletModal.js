import React, { useEffect, useState } from "react";
import { Row, Box, Column } from "../index";
import { connect } from "react-redux";
import { hexStripZeros } from "@ethersproject/bytes";
import { BigNumber } from "@ethersproject/bignumber";
import closeIcon from "../../assets/wallets/x.png";
import {
  createNotification,
  setError,
  setWalletModal,
} from "../../store/actions/uiActions";
import metamaskIcon from "../../assets/wallets/metamask.png";
import walletconnectIcon from "../../assets/wallets/walletconnect.png";
import coinbaseIcon from "../../assets/wallets/coinbase.png";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  CoinbaseWallet,
  Injected,
  WalletConnect,
} from "../../utils/connectors";
import "./wallet-modal.scss";
import Button from "../Button/Button";
import { setUser } from "../../store/actions/userActions";

const WalletModal = ({ setWalletModal, setUser, createNotification }) => {
  const { library, connector, account, activate, chainId } = useWeb3React();

  const [walletProvider, setWalletProvider] = useState("");

  useEffect(() => {
    if (library && account && chainId === 4) {
      createNotification("success", "Wallet Connected Successfully", 4000);
      setUser(library, account);
      setWalletModal(false);
    } else if (chainId && chainId !== 4) {
      switchNetwork(connector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, account, setUser, setWalletModal, chainId]);

  useEffect(() => {
    if (connector && !library) {
      activate(connector, undefined, true)
        .then(async () => {
          // const walletAddress = await connector.getAccount()
          // logMonitoringEvent({ walletAddress })
        })
        .catch(async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            // if wrong network, switch to target network
            await switchNetwork(connector);
          } else {
            // setPendingError(true)
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, library, activate, chainId]);

  const switchNetwork = async (connector) => {
    const provider =
      walletProvider === "metamask" ? window.ethereum : connector.provider;
    const formattedChainId = hexStripZeros(BigNumber.from(4).toHexString()); // 4 for rinkeby
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: formattedChainId }],
      });
    } catch (switchError) {
      // 4902 error code indicates the chain is missing on the wallet
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: formattedChainId,
                rpcUrls: [
                  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
                ],
                chainName: "Rinkeby Testnet",
                nativeCurrency: {
                  name: "Ethereum",
                  decimals: 18,
                  symbol: "ETH",
                },
                blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
                // iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <Box className="wallet-modal">
      <Row className="wallet-modal__header">
        <img
          onClick={() => setWalletModal(false)}
          className="wallet-modal__close"
          src={closeIcon}
          alt="close-icon"
        />
      </Row>
      <Column center className="wallet-column">
        <Button
          onClick={() => {
            setWalletProvider("metamask");
            activate(Injected);
          }}
          className="wallet-button"
        >
          <img className="wallet-img" src={metamaskIcon} alt="metamask" />
          Metamask
        </Button>
        <Button
          onClick={() => {
            setWalletProvider("walletconnect");
            activate(WalletConnect);
          }}
          className="wallet-button"
        >
          <img
            className="wallet-img"
            src={walletconnectIcon}
            alt="wallet connect"
          />
          WalletConnect
        </Button>
        <Button
          onClick={() => {
            setWalletProvider("coinbase");
            activate(CoinbaseWallet);
          }}
          className="wallet-button"
        >
          <img
            className="wallet-img"
            src={coinbaseIcon}
            alt="coinbase connect"
          />
          Coinbase
        </Button>
      </Column>
    </Box>
  );
};

export default connect(null, {
  setError,
  setWalletModal,
  setUser,
  createNotification,
})(WalletModal);
