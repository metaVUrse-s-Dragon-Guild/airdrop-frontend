import { useWeb3React } from "@web3-react/core";

import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Column,
  H1,
  H2,
  Header,
  Row,
  Text,
} from "../../components";
import { createNotification } from "../../store/actions/uiActions";
import { setUser } from "../../store/actions/userActions";
import { publicSaleAbi, publicSaleAddress } from "../../utils/constants";
import { txHandler } from "../../utils/txHandler";
import { getContract } from "../../utils/web3-helper-functions";
import "./claim.scss";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Text text="Sale ended - tokens are claimable now" />;
  } else {
    // Render a countdown
    return (
      <Box className="time-box">
        <Row>
          <Row center className="time-row">
            <H1 text={days} />
            <Text text="DAY" />
          </Row>

          <Row center className="time-row">
            <H1 text={hours} />
            <Text text="HOUR" />
          </Row>

          <Row center className="time-row">
            <H1 text={minutes} />
            <Text text="MIN" />
          </Row>

          <Row center className="time-row">
            <H1 text={seconds} />
            <Text text="SEC" />
          </Row>
        </Row>
      </Box>
    );
  }
};

const Claim = ({
  nltReceivedTotal,
  signerAddress,
  createNotification,
  setUser,
  closingTime,
  currentTime,
}) => {
  const { library, account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const claimTokens = async () => {
    if (!account) {
      createNotification("error", "Your wallet needs to be connected", 4000);
      return;
    }
    setLoading(true);
    try {
      const saleContract = getContract(
        publicSaleAddress,
        publicSaleAbi,
        library,
        account
      );
      await txHandler(saleContract, "withdrawTokens", [signerAddress]);

      setUser(library, account);

      createNotification("success", "Congratulations - successful claim", 4000);
    } catch (error) {
      createNotification(
        "error",
        "Something went wrong. Please try again",
        4000
      );
      debugger;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="claim-page">
      <Header />

      <Column className="claim">
        <H1 text="Claim Your Tokens" />
        <Text>
          This page is for those who purchased NLT tokens in the Presale
        </Text>

        <Box className="claim-box">
          <H2 text="Presale" />

          <Row className="progress-bottom" style={{ justifyContent: 'flex-start'}}>
            <Text text="Sale Ends in: " style={{marginRight: "2rem"}}/>
            {typeof closingTime === "string" &&
            typeof currentTime === "number" ? (
              <Countdown
                date={
                  Date.now() +
                  (new Date(closingTime * 1000) - new Date(currentTime * 1000))
                }
                renderer={renderer}
              />
            ) : null}
          </Row>

          <Row className="claim-row">
            <Text text="Total tokens" />
            <Text
              className="claim-value"
              text={
                nltReceivedTotal ? nltReceivedTotal : "Please connect wallet"
              }
            />
          </Row>
          {loading ? (
            <Oval height="100" width="100" color="grey" ariaLabel="loading" />
          ) : (
            <Button className="claim-button" onClick={claimTokens}>
              Claim
            </Button>
          )}
        </Box>
      </Column>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
    tokenBalance: state.user.tokenBalance,
    ethBalance: state.user.ethBalance,
    nltReceivedTotal: state.user.nltReceivedTotal,
    currentTime: state.user.currentTime,
    closingTime: state.user.closingTime,
  };
};

export default connect(mapStateToProps, { createNotification, setUser })(Claim);
