import React from "react";
import "./threeboxes.scss";
import { disconnectUserAccount } from "../../../../store/actions/userActions";
import { connect } from "react-redux";
import { Button, Column, H1, Row, Box, Text } from "../../../../components";
import { publicSaleRate } from "../../../../utils/constants";
import { setWalletModal } from "../../../../store/actions/uiActions";
import { Link } from "react-router-dom";

const ThreeBoxes = ({
  setWalletModal,
  signerAddress,
  ethBalance,
  tokenBalance,
  disconnectUserAccount,
  ethSentTotal,
  nltReceivedTotal,
  ethPrice,
}) => {
  return (
    <Row className="three-boxes">
      <Box center className="dashboard-top-box background-image-box">
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
          <Text style={{ color: "#1c1532" }} text="Your contribution in" />

          <Row className="contribution-stats">
            <Column center>
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
            <Column center>
              <H1
                style={{ color: "#1c1532" }}
                text={ethSentTotal ? ethSentTotal : "-"}
              />
              <Text style={{ color: "#1c1532" }} text="ETH" />
            </Column>
          </Row>
        </Column>
      </Box>

      <Box
        className="dashboard-top-box"
        center
        style={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <H1 text="Presale Price" />
        <Row
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <H1 text="1" /> <Text text="NLT" /> <H1 text="=" />{" "}
          <H1 text={(1 / publicSaleRate).toFixed(6)} /> <Text text="ETH" />
        </Row>
        <Text text={`1 ETH = ${ethPrice ? ethPrice.usd : "2900"} USD`} />
        <Link style={{ width: "100%", textDecoration: "none" }} to="/buy">
          <Button style={{ width: "100%" }} text="Buy Token Now" />
        </Link>
      </Box>

      <Box
        className="dashboard-top-box"
        center
        style={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <H1 text="Account Details" />
        <Text style={{ fontSize: "1.2rem" }} text="Receiving Wallet" />
        {signerAddress ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://rinkeby.etherscan.io/address/${signerAddress}`}
          >
            <Text
              style={{ fontSize: "1.6rem", opacity: 1 }}
              text={`${signerAddress.slice(0, 12)}...`}
            />
          </a>
        ) : (
          <Text
            style={{ fontSize: "1.6rem", opacity: 1 }}
            text="No wallet address"
          />
        )}
        {signerAddress && (
          <Row style={{ justifyContent: "space-between", width: "100%" }}>
            <Text text="Balance" />{" "}
            <Row>
              <Text style={{ opacity: 1 }} text={ethBalance} />{" "}
              <Text text="ETH" />{" "}
            </Row>
          </Row>
        )}
        <Row style={{ justifyContent: "space-between", width: "100%" }}>
          <Text text="Network" />{" "}
          <Text text={signerAddress ? "ETH Rinkeby" : "Not connected"} />{" "}
        </Row>
      </Box>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
    tokenBalance: state.user.tokenBalance,
    ethBalance: state.user.ethBalance,
    transactions: state.user.transactions,
    ethSentTotal: state.user.ethSentTotal,
    nltReceivedTotal: state.user.nltReceivedTotal,
    ethPrice: state.user.ethPrice,
  };
};

export default connect(mapStateToProps, {
  disconnectUserAccount,
  setWalletModal,
})(ThreeBoxes);
