import React, { Component } from "react";
import QrReader from "react-qr-reader";

import GridItem from "components/Grid/GridItem.js";
import "../../assets/css/ArriveInfo.css";
import { string } from "prop-types";

export default class ArriveInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: "No result",
      hometeamarrivetime: "",
      ishometeamarrived: false,
      hometeamlateminute: 0,
      awayteamarrivetime: "",
      isawayteamarrived: false,
      awayteamlateminute: 0,
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    // console.log("scaning...");
    const { homeTeamID, awayTeamID, matchhour } = this.props;
    if (homeTeamID === Number(data) && !this.state.ishometeamarrived) {
      // QR에서 찍은 결과와 homeTeamID가 같고, 처음 QR 찍은 경우만 실행
      console.log("홈팀 도착!");
      const homedateInfo = new Date();
      var homehour = String(homedateInfo.getHours());
      var homeminute = String(homedateInfo.getMinutes());
      // 17시 '8'분 : 너무 안예뻐서 String으로 바꿔서 데이터 형태 수정
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
      // 6분부터 지각으로 처리
      if (Number(homehour) > matchhour && Number(homeminute) > 5) {
        this.setState({
          hometeamlateminute: homeminute,
        });
        console.log(`${this.state.hometeamlateminute}분 지각!`);
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
      if (Number(awayhour) > matchhour && Number(awayminute) > 5) {
        this.setState({
          awayteamlateminute: awayminute,
        });
        console.log(`${this.state.awayteamlateminute}분 지각!`);
      }
    }
    this.setState({
      result: data,
    });
    // console.log(data);
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
              <h3>{this.state.hometeamarrivetime}</h3>
            </GridItem>
          </GridItem>
          <GridItem xs={12} className="arrive-content">
            <GridItem xs={3} className="arrive-content-team">
              <h3>Away</h3>
            </GridItem>
            <GridItem xs={9} className="arrive-content-time">
              <h3>{this.state.awayteamarrivetime}</h3>
            </GridItem>
          </GridItem>
        </GridItem>
      </GridItem>
    );
  }
}
