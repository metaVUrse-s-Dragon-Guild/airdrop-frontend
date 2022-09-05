import React from "react";
import "./progressbar.scss";
import styled from "styled-components";
import Row from "../Row/Row";
import Text from "../Text/Text";
import { connect } from "react-redux";
import { publicSaleRate } from "../../utils/constants";
import raisedIcon from "../../assets/progress/raised.svg";
import soldIcon from "../../assets/progress/sold.svg";

export const Slider = styled.input`
  &::-webkit-slider-thumb {
    margin-left: ${(props) => props.marginLeft}rem;
  }
`;

export const Fill = styled.div`
  width: ${(props) => props.progress}%;
  height: 15px;
  border-radius: 5px;
  background: ${(props) => (!props.raisedImage ? "#8cf29f" : "#ff6cdd")};
  position: absolute;
  z-index: 9;
`;

export const Container = styled.div`
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background-color: #1c1532;
  position: relative;
`;

const Progress = styled.div`
  width: ${(props) => props.progress}%;
  background: ${(props) => (!props.raisedImage ? "#8cf29f" : "#ff6cdd")};
`;

const ProgressIcon = styled.img`
  right: ${(props) => props.progress}%;
`;

const ProgressBar = ({ progress, raisedImage, ethRaised }) => {
  console.log(progress)
  if (progress === 0) {
    progress = 1
  }
  return (
    // <Container className="progressbar-container">
    //   <Fill
    //     className="fill"
    //     progress={Number(progress) < 30 ? Number(progress) + 5 : progress}
    //     raisedImage={raisedImage}
    //   />
    //   <Slider
    //     className={raisedImage ? "raised-slider" : "sold-slider"}
    //     marginLeft={Number(progress) > 60 ? 1.5 : 0}
    //     type="range"
    //     min="1"
    //     max="100"
    //     value={progress}
    //     id="myRange"
    //     readOnly
    //   />
    //   <Row className="bubble">
    //     <Text style={{ color: 'black'}} text={raisedImage ? `${ethRaised} ETH raised` : `${Number(ethRaised * publicSaleRate).toFixed(0)} NLT sold`}></Text>{" "}
    //   </Row>
    // </Container>
    <div className="progress">
      <Progress
        raisedImage={raisedImage}
        progress={progress}
        className="progress-done"
      />
      <ProgressIcon
        progress={(100 - (Number(progress) + 5))}
        src={raisedImage ? raisedIcon : soldIcon}
        className="progress-icon"
        alt="progress icon"
      />
       <Row className="bubble">
        <Text style={{ color: 'black'}} text={raisedImage ? `${ethRaised} ETH raised` : `${Number(ethRaised * publicSaleRate).toFixed(0)} NLT sold`}></Text>{" "}
       </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ethRaised: state.user.ethRaised,
  };
};

export default connect(mapStateToProps, null)(ProgressBar);
