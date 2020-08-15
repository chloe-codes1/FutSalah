import React, { Component } from "react";
import QrReader from "react-qr-reader";

import GridItem from "components/Grid/GridItem.js";
import "../../assets/css/ArriveInfo.css";

export default class ArriveInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: "No result",
      hometeamarrivetime: "2020-08-03 17:58",
      awayteamarrivetime: "2020-08-03 17:49",
    };
    const { homeTeamID, awayTeamID } = props;
    console.log(homeTeamID);
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    console.log("scaning...");
    if (this.hometeamID === data) {
      console.log("홈팀 도착!");
      const dateInfo = new Date();
      const year = dateInfo.getFullYear();
      const month = dateInfo.getMonth();
      const date = dateInfo.getDate();
      const hour = dateInfo.getHours();
      const minute = dateInfo.getMinutes();
      this.setState({
        hometeamarrivetime: `${year}-${month + 1}-${date} ${hour}:${minute}`,
      });
    }
    this.setState({
      result: data,
    });
    console.log(data);
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    return (
      <GridItem xs={12} className="arrive-info-container">
        <GridItem xs={4} className="QR-reader-container">
          <QrReader
            delay={this.state.delay}
            style={{ width: "100%" }}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p style={{ height: "10px" }}>{this.state.result}</p>
        </GridItem>
        <GridItem xs={8} className="arrive-contents">
          <GridItem xs={12} className="arrive-content">
            <h2>도착 정보</h2>
          </GridItem>
          <GridItem xs={12} className="arrive-content">
            <GridItem xs={3} className="arrive-content-team">
              <h3>Home</h3>
            </GridItem>
            <GridItem xs={9} className="arrive-content-time">
              <p>{this.state.hometeamarrivetime}</p>
            </GridItem>
          </GridItem>
          <GridItem xs={12} className="arrive-content">
            <GridItem xs={3} className="arrive-content-team">
              <h3>Away</h3>
            </GridItem>
            <GridItem xs={9} className="arrive-content-time">
              <p>{this.state.awayteamarrivetime}</p>
            </GridItem>
          </GridItem>
        </GridItem>
      </GridItem>
    );
  }
}
