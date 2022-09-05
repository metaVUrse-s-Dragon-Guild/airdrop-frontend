import React, { useState } from "react";
import {
  Box,
  Button,
  Column,
  H1,
  H2,
  H3,
  Header,
  Row,
  Text,
  ClickableFormInput,
  Progress,
} from "../../components";
import "./buytoken.scss";
import backIcon from "../../assets/buytoken/back.svg";
import lockIcon from "../../assets/buytoken/lock.svg";
import creditIcon from "../../assets/buytoken/credit.svg";
import { connect } from "react-redux";
import bg from "../../assets/box/bg.svg";
import {
  airdropAbi,
  airdropContractAddress,
  nftContractAddress,
  publicSaleAbi,
  publicSaleAddress,
  publicSaleRate,
  publicSaleTotalTokens,
} from "../../utils/constants";
import { txHandler } from "../../utils/txHandler";
import { utils } from "ethers";
import { Oval } from "react-loader-spinner";
import { getContract } from "../../utils/web3-helper-functions";
import { useWeb3React } from "@web3-react/core";
import { createNotification } from "../../store/actions/uiActions";
import { setUser } from "../../store/actions/userActions";

const BuyToken = ({
  signerAddress,
  tokenBalance,
  ethRaised,
  ethSentTotal,
  createNotification,
  setUser,
  ethPrice,
}) => {
  const { library, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [ethValue, setEthValue] = useState(0);
  const [nltValue, setNltValue] = useState(0);
  const [termsValue, setTermsValue] = useState(false);
  const [countryValue, setCountryValue] = useState(false);

  const onCheckboxChange = (event) => {
    if (event.target.id === "country") {
      setCountryValue(event.target.checked);
    } else if (event.target.id === "terms") {
      setTermsValue(event.target.checked);
    }
  };

  const onChangeEthHandler = (event) => {
    let value = event.target.value;
    setEthValue(value);
    setNltValue(value * publicSaleRate);
  };

  const onChangeNltHandler = (event) => {
    const value = event.target.value;
    setNltValue(value);
    setEthValue(value / publicSaleRate);
  };

  const buyTokens = async () => {
    let copyOfEthValue = ethValue;
    if (!account) {
      createNotification("error", "No wallet connected", 4000);
      return;
    }
    if (!ethValue) {
      createNotification("error", "Please specify amount of tokens", 4000);
      return;
    }
    if (!termsValue || !countryValue) {
      createNotification(
        "error",
        "Tick the box to Accept the Terms & Conditions to proceed with purchase.",
        4000
      );
      return;
    }
    // Split string if longer than 18 decimals
    if (ethValue.includes(".") && ethValue.split(".")[1].length > 18) {
      const splitCopyOfEthValue = copyOfEthValue.split(".");
      const fullNumber = splitCopyOfEthValue[0];
      const decimals = splitCopyOfEthValue[1];
      const newDecimals = decimals.substring(0, 18);
      copyOfEthValue = `${fullNumber}.${newDecimals}`;
    }
    setLoading(true);
    try {
      const saleContract = getContract(
        publicSaleAddress,
        publicSaleAbi,
        library,
        account
      );
      await txHandler(saleContract, "buyTokens", [
        signerAddress,
        { value: utils.parseEther(copyOfEthValue.toString()) },
      ]);

      setUser(library, account);

      createNotification(
        "success",
        "Congratulations - Your purchase was successful",
        4000
      );
    } catch (error) {
      createNotification("error", "Purchase failed", 4000);
      debugger;
    } finally {
      setLoading(false);
    }
  };

  const airdropTokens = async () => {
    if (!account) {
      createNotification("error", "No wallet connected", 4000);
      return;
    }

    console.log(JSON.parse(addresses), JSON.parse(tokenIds))

    try {
      const saleContract = getContract(
        airdropContractAddress,
        airdropAbi,
        library,
        account
      );

      await txHandler(saleContract, "bulkAirdropERC721", [
        nftContractAddress, 
        JSON.parse(addresses),
        JSON.parse(tokenIds)
      ]);

      createNotification(
        "success",
        "Congratulations - Your purchase was successful",
        4000
      );
    } catch (error) {
      createNotification("error", "failed", 4000);
      debugger;
    }
  }

  const onAddressChange = (event) => {
    const value = event.target.value;
    setAddresses(value);

  };

  const onTokenIdChange = (event) => {
    const value = event.target.value;
    setTokenIds(value);
  };

  const [tokenIds, setTokenIds] = useState("");
  const [addresses, setAddresses] = useState("");
  return (
    <div className="buytoken-page">
      <Header />
      <Column className="buytoken">
      <input
                  
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Addresses array here"
                  onChange={onAddressChange}
                  value={addresses}
                />

<input
                  
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Token ids array here"
                  onChange={onTokenIdChange}
                  value={tokenIds}
                />

<Button
                onClick={airdropTokens}
                className=""
                style={{ width: "100%" }}
                text="Airdrop Token"
              />
        <Row style={{ alignSelf: "baseline" }}>
          <img src={backIcon} alt="back icon" />
          <H1 text="Buy Token" />
        </Row>

        <Row className="box-row" style={{ width: "100%" }}>
          <Box className="sale-box">
            <H2 text="NLT Presale" />
            <Row
              className="two-box-container"
              style={{ justifyContent: "space-between" }}
            >
              <Box style={{ marginRight: "1rem" }} className="sale-mini-box">
                <Row spaceBetween>
                  <Text className="label-text" text="Token Name" />
                  <Text className="label-value" text="Northern Lights Token" />
                </Row>
                <Row spaceBetween>
                  <Text className="label-text" text="Symbol" />
                  <Text className="label-value" text="NLT" />
                </Row>
                <Row spaceBetween>
                  <Text className="label-text" text="Decimals" />
                  <Text className="label-value" text="18" />
                </Row>
                <Row spaceBetween>
                  <Text className="label-text" text="Blockchain" />
                  <Text className="label-value" text="Ethereum Mainnet" />
                </Row>
              </Box>

              <Box className="sale-mini-box">
                <Row spaceBetween>
                  <Text className="label-text" text="1 NLT" />
                  <Text
                    className="label-value"
                    text={(1 / publicSaleRate).toFixed(6)}
                  />
                </Row>
                <Row spaceBetween>
                  <Text className="label-text" text="Minimum Purchase" />
                  <Text className="label-value" text="0.2 ETH" />
                </Row>
                <Row spaceBetween>
                  <Text className="label-text" text="Maximum Purchase" />
                  <Text className="label-value" text="50 ETH" />
                </Row>
                <Row spaceBetween>
                  <Text className="label-text" text="Token Lockup Period" />
                  <Text className="label-value" text="6 Months" />
                </Row>
              </Box>
            </Row>

            <Row>
              <img src={lockIcon} alt="lock icon" />
              <Text text="Reminder: tokens are locked for 6 months and cannot be withdrawn, transferred or traded during this period" />
            </Row>

            <H3 text="Contribution Amount" />
            <Text text="Enter the amount you wish to contribute below" />
            <Row className="credit-container">
              <Text
                style={{ width: "60%" }}
                text="Credit card payments are processed by our third party payment processor. Please proceed to the Ramp.Network website to complete purchase."
              />

              <Button
                className="credit-button"
                text={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{ marginRight: ".8rem" }}
                      src={creditIcon}
                      alt="connect icon"
                    />{" "}
                    Buy with credit card
                  </div>
                }
              />
            </Row>

            <Progress
              progress={
                ethRaised
                  ? (ethRaised * publicSaleRate * 100) / publicSaleTotalTokens
                  : 0
              }
            />
            <Row
              spaceBetween
              display={{ justifyContent: "space-between", width: "100%" }}
            >
              <Row>
                <Text className="label-text" text="Tokens sold: " />
                <Text
                  className="label-value"
                  text={`${ethRaised ? ethRaised * publicSaleRate : 0} NLT`}
                />
              </Row>

              <Row>
                <Text className="label-text" text="Total Token: " />
                <Text
                  className="label-value"
                  text={`${publicSaleTotalTokens} NLT`}
                />
              </Row>
            </Row>
            <Row>
              <ClickableFormInput
                text="ETH"
                className="details-form__input"
                value={ethValue}
                onChange={onChangeEthHandler}
                placeholder="From 2,5000"
                type="number"
                name="NLT"
                min="1"
                // max='100'
              />
              <H2 text="=" />
              <ClickableFormInput
                text="NLT"
                className="details-form__input"
                value={nltValue}
                onChange={onChangeNltHandler}
                placeholder="From 2,5000"
                type="number"
                name="NLT"
                min="1"
                disabled
                // max='100'
              />
            </Row>
            <Text text="0.2 ETH Minimum contribution amount is required" />
            <Text text="To proceed with the NLT purchase, please verify the following is true:" />

            <Row className="checkbox-row">
              <Row className="checkbox-single-row">
                <input
                  className="checkbox-input"
                  style={{ marginRight: "1rem" }}
                  type="checkbox"
                  id="terms"
                  onChange={onCheckboxChange}
                />
                <a
                  className="checkbox-text"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ipfs.io/ipfs/QmQ9gyNwn2WeHRXzXqKHTEM1LbddR11ZUNhRRRYB6Tv5zv"
                >
                  <Text text="I accept the Terms & Conditions" />
                </a>
              </Row>

              <Row className="checkbox-single-row">
                <input
                  className="checkbox-input"
                  style={{ marginRight: "1rem" }}
                  type="checkbox"
                  id="country"
                  onChange={onCheckboxChange}
                />
                <a
                  className="checkbox-text"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ipfs.io/ipfs/QmNxYXCTaXFfhLbHrburWQKvYXTU5AMjTR9VD97UZDz97J"
                >
                  <Text text="I am not a resident from the prohibited country list" />
                </a>
              </Row>
            </Row>

            {loading ? (
              <Oval height="100" width="100" color="grey" ariaLabel="loading" />
            ) : (
              <Button
                onClick={buyTokens}
                className=""
                style={{ width: "100%" }}
                text="Buy Token"
              />
            )}
          </Box>

          <Column className="right-boxes">
            <Box
              center
              className="dashboard-top-box"
              style={{
                backgroundImage: `url(${bg})`,
                objectFit: "cover",
                width: "100%",
                backgroundSize: "cover",
              }}
            >
              <Column className="first-half" center>
                <Text style={{ color: "#1c1532" }} text="Token balance" />
                <Row center>
                  <H1
                    text={tokenBalance ? tokenBalance : "-"}
                    style={{ marginRight: ".5rem", color: "#1c1532" }}
                  />{" "}
                  <Text text="NLT" style={{ color: "#1c1532" }} />
                </Row>
              </Column>

              <Column center className="second-half">
                <Text
                  style={{ color: "#1c1532" }}
                  text="Your contribution in"
                />

                <Row className="contribution-stats">
                  <Column>
                    <H1
                      style={{ color: "#1c1532" }}
                      text={
                        ethSentTotal && ethPrice
                          ? Number(ethSentTotal * ethPrice.usd).toFixed(0)
                          : "-"
                      }
                    />
                    <Text style={{ color: "#1c1532" }} text="USD" />
                  </Column>
                  <Column>
                    <H1
                      style={{ color: "#1c1532" }}
                      text={ethSentTotal ? ethSentTotal : "-"}
                    />
                    <Text style={{ color: "#1c1532" }} text="ETH" />
                  </Column>
                </Row>
              </Column>
            </Box>

            <Box className="token-sale-end" style={{ width: "100%" }}>
              <H2 text="Token Sales" />

              <Text className="token-subtitle" text="NLT Token Price" />
              <Row center spaceBetween>
                <H2 className="token-number" text="1" />{" "}
                <Text className="token-unit" text="NLT" />{" "}
                <H2 className="token-number" text="=" />{" "}
                <H1
                  className="token-number"
                  text={(1 / publicSaleRate).toFixed(6)}
                />{" "}
                <Text className="token-unit" text="ETH" />
              </Row>

              <Text className="token-subtitle" text="Exchange Rate" />
              <Row center spaceBetween>
                <Text className="exchange-number" text="1" />{" "}
                <Text className="exchange-unit" text="ETH" />{" "}
                <Text className="exchange-equal-sign" text="=" />{" "}
                <Text
                  className="exchange-number"
                  text={ethPrice ? ethPrice.usd.toFixed(0) : "2900"}
                />{" "}
                <Text className="exchange-unit" text="USD" />{" "}
                <Text className="exchange-equal-sign" text="=" />{" "}
                <Text
                  className="exchange-number"
                  text={ethPrice ? ethPrice.eur.toFixed(0) : "2800"}
                />{" "}
                <Text className="exchange-unit" text="EUR" />{" "}
                <Text className="exchange-equal-sign" text="=" />{" "}
                <Text
                  className="exchange-number"
                  text={ethPrice ? ethPrice.gbp.toFixed(0) : "2600"}
                />{" "}
                <Text className="exchange-unit" text="GBP" />
              </Row>

              <Text className="token-subtitle" text="Token Sale will End on" />

              <Text className="token-date" text="30, November, 2022" />

              <Text className="token-days" text="36 Day" />
            </Box>
          </Column>
        </Row>
      </Column>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
    tokenBalance: state.user.tokenBalance,
    ethBalance: state.user.ethBalance,
    ethRaised: state.user.ethRaised,
    ethSentTotal: state.user.ethSentTotal,
    ethPrice: state.user.ethPrice,
  };
};

export default connect(mapStateToProps, {
  createNotification,
  setUser,
})(BuyToken);
