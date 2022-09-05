import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import logo from "../../assets/logo/logo.png";
import logo2 from "../../assets/logo/logo@2x.png";
import logo3 from "../../assets/logo/logo@3x.png";
import dashboard from "../../assets/navigation/icon-dashboard.svg";
import transaction from "../../assets/navigation/icon-transaction.svg";
import buy from "../../assets/navigation/icon-buy.svg";
import term from "../../assets/navigation/icon-term.svg";
import faq from "../../assets/navigation/icon-faq.svg";
import Button from "../Button/Button";
import {
  createNotification,
  setWalletModal,
} from "../../store/actions/uiActions";
import { Link, withRouter } from "react-router-dom";
import "./header.scss";
import { useWeb3React } from "@web3-react/core";
import { disconnectUserAccount } from "../../store/actions/userActions";
import connectIcon from "../../assets/wallet/connect.svg";
import disconnectIcon from "../../assets/wallet/disconnect.svg";

const Header = ({ signerAddress, setWalletModal, disconnectUserAccount }) => {
  const { deactivate } = useWeb3React();

  const [currentSite, setCurrentSite] = useState();

  useEffect(() => {
    let url = window.location.href;
    if (url.includes("3000")) {
      // development
      url = url.split("3000/")[1];
    } else {
      // production
      url = url.split("umi.finance/")[1];
    }
    setCurrentSite(url);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <Link
            to="/"
            className={`header__link__${
              currentSite === "" ? "clicked" : "unclicked"
            }`}
          >
            <img src={dashboard} alt="icon" className="nav-icon" />
            Dashboard
          </Link>

          <Link
            to="/transaction"
            className={`header__link__${
              currentSite === "transaction" ? "clicked" : "unclicked"
            }`}
          >
            <img src={transaction} alt="icon" className="nav-icon" />
            Transactions
          </Link>

          <Link
            to="/buy"
            className={`header__link__${
              currentSite === "buy" ? "clicked" : "unclicked"
            }`}
          >
            <img src={buy} alt="icon" className="nav-icon" />
            Buy Token
          </Link>

          <Link
            to="/claim"
            className={`header__link__${
              currentSite === "claim" ? "clicked" : "unclicked"
            }`}
          >
            <img src={buy} alt="icon" className="nav-icon" />
            Claim
          </Link>

          <Link
            to="/terms"
            className={`header__link__${
              currentSite === "terms" ? "clicked" : "unclicked"
            }`}
          >
            <img src={term} alt="icon" className="nav-icon" />
            Term & Conditions
          </Link>

          <Link
            to="/faq"
            className={`header__link__${
              currentSite === "faq" ? "clicked" : "unclicked"
            }`}
          >
            <img src={faq} alt="icon" className="nav-icon" />
            FAQ
          </Link>
          <Button
          className='connect-button'
            style={{
              ...(signerAddress && {
                border: "solid 1px #8cf29f",
                backgroundColor: "#342d47",
              }),
            }}
            onClick={() => {
              if (!signerAddress) {
                setWalletModal(true);
              } else {
                createNotification('success', 'Wallet Disconnected Successfully', 4000)
                deactivate();
                disconnectUserAccount();
              }
            }}
            text={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ...(signerAddress && { color: "#fff" }),
                }}
              >
                <img
                  style={{ marginRight: ".8rem" }}
                  src={signerAddress ? disconnectIcon : connectIcon}
                  alt="connect icon"
                />
                {signerAddress ? "Disconnect" : "Connect"}
              </div>
            }
          />
        </ul>
        <img
          src={logo}
          srcSet={`
      ${logo2} 2x,
      ${logo3} 3x
    `}
          alt="logo"
          className="logo"
        />
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
  };
};

export default connect(mapStateToProps, {
  createNotification,
  setWalletModal,
  disconnectUserAccount,
})(withRouter(Header));
