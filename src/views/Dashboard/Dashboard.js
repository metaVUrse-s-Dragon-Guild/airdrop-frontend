import React from "react";
import { Column, Header, Row } from "../../components";
import { InfoBox, Progress, SaleInfo, ThreeBoxes } from "./components";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard">
        <ThreeBoxes />
        <Row className="dashboard-bottom" style={{ width: "100%" }}>
          <InfoBox />
          <Column className='right-column'>
            <Progress />
            <SaleInfo />
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
