import React from "react";
import { connect } from "react-redux";
import {
  Box,
  H1,
  Row,
  Text,
  ProgressBar,
} from "../../../../components";
import {
  publicSaleRate,
  publicSaleTotalTokens,
} from "../../../../utils/constants";
import "./progress.scss";
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

const Progress = ({ ethRaised, currentTime, closingTime }) => {
  let amountOfTokensSold;
  let percentageOfTokensSold = 0;

  if (ethRaised) {
    amountOfTokensSold = ethRaised * publicSaleRate;

    percentageOfTokensSold = (amountOfTokensSold * 100) / publicSaleTotalTokens;
  }

  return (
    <Box className="progress-box">
      <H1 text="Token Sales Progress" />

      <Row center>
        <Text style={{ marginRight: ".5rem"}} className="progress-text" text="Northern Lights Tokens Sold" />
        <ProgressBar progress={percentageOfTokensSold} raisedImage={false} />
      </Row>

      <Row center className="raised-container">
        <Text style={{ marginRight: ".5rem"}} className="progress-text" text="Ethereum Raised" />
        <ProgressBar progress={percentageOfTokensSold} raisedImage={true} />
      </Row>

      <Row className="progress-bottom">
        <Text text="Sale Ends in" />
        {typeof closingTime === "string" && typeof currentTime === "number" ? (
          <Countdown
            date={
              Date.now() +
              (new Date(closingTime * 1000) - new Date(currentTime * 1000))
            }
            renderer={renderer}
          />
        ) : null}
      </Row>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
    tokenBalance: state.user.tokenBalance,
    ethBalance: state.user.ethBalance,
    transactions: state.user.transactions,
    ethRaised: state.user.ethRaised,
    currentTime: state.user.currentTime,
    closingTime: state.user.closingTime,
  };
};

export default connect(mapStateToProps)(Progress);
