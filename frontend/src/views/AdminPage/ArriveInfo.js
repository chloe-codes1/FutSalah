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
      hometeamlatestatus: 0,
      ishometeamarrived: false,
      awayteamlatestatus: 0,
      isawayteamarrived: false,
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    const { homeTeamID, awayTeamID, matchhour } = this.props;
    if (homeTeamID === Number(data) && !this.state.ishometeamarrived) {
      console.log("홈팀 도착!");
      const homedateInfo = new Date();
      var homehour = String(homedateInfo.getHours());
      var homeminute = String(homedateInfo.getMinutes());
      if (homehour < 10) {
        homehour = "0" + homehour;
      }
      if (homeminute < 10) {
        homeminute = "0" + homeminute;
      }
      this.setState({
        hometeamarrivetime: `${homehour}시 ${homeminute}분`,
        ishometeamarrived: true,
      });
      if (Number(homehour) >= matchhour && 0 < Number(homeminute) < 10) {
        this.setState({
          hometeamlatestatus: 1,
        });
        console.log(`약간 지각! (state: 1)`);
      } else if (Number(homehour) >= matchhour && Number(homeminute) >= 10) {
        this.setState({
          hometeamlatestatus: 2,
        });
        console.log(`완전 지각! (state: 2)`);
      }
    }
    if (awayTeamID === Number(data) && !this.state.isawayteamarrived) {
      console.log("원정팀 도착!");
      const awaydateInfo = new Date();
      var awayhour = String(awaydateInfo.getHours());
      var awayminute = String(awaydateInfo.getMinutes());
      if (awayhour < 10) {
        awayhour = "0" + awayhour;
      }
      if (awayminute < 10) {
        awayminute = "0" + awayminute;
      }
      this.setState({
        awayteamarrivetime: `${awayhour}시 ${awayminute}분`,
        isawayteamarrived: true,
      });
      if (Number(awayhour) >= matchhour && 0 < Number(awayminute) < 10) {
        this.setState({
          awayteamlatestatus: 1,
        });
        console.log(`약간 지각! (state: 1)`);
      } else if (Number(awayhour) >= matchhour && Number(awayminute) >= 10) {
        this.setState({
          awayteamlatestatus: 2,
        });
        console.log(`완전 지각! (state: 2)`);
      }
    }
    this.setState({
      result: data,
    });
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
            style={{ width: "70%", margin: "auto" }}
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
            <GridItem xs={4} className="arrive-content-team">
              <h3>{this.props.homeName}</h3>
            </GridItem>
            <GridItem xs={8} className="arrive-content-time">
              <h4>{this.state.hometeamarrivetime}</h4>
            </GridItem>
          </GridItem>
          <GridItem xs={12} className="arrive-content">
            <GridItem xs={4} className="arrive-content-team">
              <h3>{this.props.awayName}</h3>
            </GridItem>
            <GridItem xs={8} className="arrive-content-time">
              <h4>{this.state.awayteamarrivetime}</h4>
            </GridItem>
          </GridItem>
        </GridItem>
      </GridItem>
    );
  }
}
