import React from "react";
import "./progress.scss";
import styled from "styled-components";
// import Row from '../Row/Row';
// import Text from '../Text/Text';
// import { publicSaleRate, publicSaleTotalTokens } from '../../utils/constants';
import { connect } from "react-redux";

export const Slider = styled.input``;

export const Fill = styled.div`
  width: ${(props) => props.progress}%;
  height: 15px;
  border-radius: 5px;
  background: #8cf29f;
  position: absolute;
  z-index: 90;
`;

export const Container = styled.div`
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background-color: #1c1532;
  position: relative;
`;

const ProgressBar = ({ progress, ethRaised }) => {
  return (
    <Container>
      <Fill progress={progress} />
      <Slider
        className="rais-slider"
        type="range"
        min="1"
        max="100"
        value={progress}
        id="myRange"
        readOnly
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    signerAddress: state.user.signerAddress,
    tokenBalance: state.user.tokenBalance,
    ethBalance: state.user.ethBalance,
    ethRaised: state.user.ethRaised,
  };
};

export default connect(mapStateToProps, null)(ProgressBar);
