import React, { Component } from "react";
import QrReader from "react-qr-reader";

export default class Qrreader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    // console.log("scaning...");
    this.setState({
      result: data,
    });
    // console.log(data);
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div>
        <QrReader
          delay={this.state.delay}
          previewStyle={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p style={{ height: "10px" }}>{this.state.result}</p>
      </div>
    );
  }
}
