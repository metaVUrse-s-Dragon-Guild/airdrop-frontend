import React, { useState } from "react";
import "./infobox.scss";
import { Box, Column, H1, Row, Text } from "../../../../components";
import backImage from "../../../../assets/pagination/back.svg";
import nextImage from "../../../../assets/pagination/next.svg";
import sliderDiamond1 from "../../../../assets/infobox/slider1/1.svg";
import sliderDiamond2 from "../../../../assets/infobox/slider1/2.svg";
import sliderDiamond3 from "../../../../assets/infobox/slider1/3.svg";
import sliderDiamond4 from "../../../../assets/infobox/slider1/4.svg";
import sliderDiamond5 from "../../../../assets/infobox/slider1/5.svg";
import sliderDiamond6 from "../../../../assets/infobox/slider1/6.svg";
import sliderOne from "../../../../assets/infobox/slider-1.svg";
import sliderOne2 from "../../../../assets/infobox/slider-1@2x.png";
import sliderOne3 from "../../../../assets/infobox/slider-1@3x.png";
import sliderTwo from "../../../../assets/infobox/slider-2.png";
import sliderTwo2 from "../../../../assets/infobox/slider-2@2x.png";
import sliderTwo3 from "../../../../assets/infobox/slider-2@3x.png";
import sliderThree from "../../../../assets/infobox/slider-3.png";
import sliderThree2 from "../../../../assets/infobox/slider-3@2x.png";
import sliderThree3 from "../../../../assets/infobox/slider-3@3x.png";

const InfoBox = () => {
  const [currentInfoBox, setCurrentInfoBox] = useState(2);

  const back = () => {
    const newInfoBox = currentInfoBox - 1 < 1 ? 3 : currentInfoBox - 1;
    setCurrentInfoBox(newInfoBox);
  };

  const next = () => {
    const newInfoBox = currentInfoBox + 1 > 3 ? 1 : currentInfoBox + 1;
    setCurrentInfoBox(newInfoBox);
  };

  return (
    <Box className="infobox">
      <Row
        className="infobox-top"
        center
        style={{ justifyContent: "space-between" }}
      >
        <H1 className="infobox-title" text={infoText[currentInfoBox].title} />
        <Row className="pagination">
          <img
            className="slider-image"
            src={backImage}
            alt="pagination"
            onClick={back}
          />
          <img
            className="slider-image"
            src={nextImage}
            alt="pagination"
            onClick={next}
          />
        </Row>
      </Row>

      {currentInfoBox > 1 && (
        <Column>
          <Text text={infoText[currentInfoBox].description} />
          <img
            src={infoText[currentInfoBox].image}
            srcSet={`
          ${infoText[currentInfoBox].image2} 2x, 
          ${infoText[currentInfoBox].image3} 3x
          `}
            alt="slider grpahic"
            className="slider-graphic"
          />
        </Column>
      )}

      {currentInfoBox === 1 && (
        <Column>
          <Text text={infoText[currentInfoBox].description} />
          <Row className="allocation-image-row">
            <img
              src={infoText[currentInfoBox].image}
              srcSet={`
          ${infoText[currentInfoBox].image2} 2x, 
          ${infoText[currentInfoBox].image3} 3x
          `}
              alt="slider grpahic"
              className="slider1-img"
            />

            <Column
              className="slider1-col"
              spaceBetween
            >
              <Row className="allocation-row">
                <img
                  src={sliderDiamond1}
                  alt="diamond icon"
                  className="diamond-icon"
                />
                <Text className="percentage" text="35%" />
                <Text className="allocation-target" text="Public Sale" />
              </Row>
              <Row className="allocation-row">
                <img
                  src={sliderDiamond2}
                  alt="diamond icon"
                  className="diamond-icon"
                />
                <Text className="percentage" text="10%" />
                <Text className="allocation-target" text="Team Allocation" />
              </Row>
              <Row className="allocation-row">
                <img
                  src={sliderDiamond3}
                  alt="diamond icon"
                  className="diamond-icon"
                />
                <Text className="percentage" text="20%" />
                <Text
                  className="allocation-target"
                  text="Maketing Operations"
                />
              </Row>
              <Row className="allocation-row">
                <img
                  src={sliderDiamond4}
                  alt="diamond icon"
                  className="diamond-icon"
                />
                <Text className="percentage" text="22%" />
                <Text className="allocation-target" text="Ecosystem Rewards" />
              </Row>
              <Row className="allocation-row">
                <img
                  src={sliderDiamond5}
                  alt="diamond icon"
                  className="diamond-icon"
                />
                <Text className="percentage" text="5%" />
                <Text className="allocation-target" text="Partnerships" />
              </Row>
              <Row className="allocation-row">
                <img
                  src={sliderDiamond6}
                  alt="diamond icon"
                  className="diamond-icon"
                />
                <Text className="percentage" text="8%" />
                <Text className="allocation-target" text="Presale" />
              </Row>
            </Column>
          </Row>

          <Row center className="total-supply-row">
            <H1 text="1,000,000,000" className="total-supply" />
            <Text text="Tokens" className="token-text" />
          </Row>
        </Column>
      )}

      <Row className="box-indicator" center>
        <div className={currentInfoBox === 1 ? "rectangle" : "oval"} />
        <div className={currentInfoBox === 2 ? "rectangle" : "oval"} />
        <div className={currentInfoBox === 3 ? "rectangle" : "oval"} />
      </Row>
    </Box>
  );
};

export default InfoBox;

const infoText = {
  1: {
    title: "Token Distribution",
    image: sliderOne,
    image2: sliderOne2,
    image3: sliderOne3,
    diamond1: sliderDiamond1,
    diamond2: sliderDiamond2,
    diamond3: sliderDiamond3,
    diamond4: sliderDiamond4,
    diamond5: sliderDiamond5,
    diamond6: sliderDiamond6,
  },
  2: {
    title: "Disrupting and Decentralising the Energy Market",
    description:
      "The Northern Lights Token will disrupt and decentralise the entire energy market by creating millions of small home producers of renewable energy.",
    image: sliderTwo,
    image2: sliderTwo2,
    image3: sliderTwo3,
  },
  3: {
    title: `Bringing Together
        Governance, Utility and Stability`,
    description: `Northern Lights is a permission-less token that brings together governance, utility and a stabilising factor in the rapidly evolving European energy crisis. In 2021, we believe many of the available blockchain tokens are relying on nothing more than hype in order to sustain their market cap and overall position within the market. NLT is different.`,
    image: sliderThree,
    image2: sliderThree2,
    image3: sliderThree3,
  },
};
