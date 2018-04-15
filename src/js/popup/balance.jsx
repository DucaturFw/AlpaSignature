import React from "react";
import moment from "moment";
import axios from "axios";

import messaging from "./message";

export default class Balance extends React.Component {

  constructor(opts) {
    super(opts);

    this.state = {}
  }

  componentDidMount() {
    messaging.send({
      type: 'wallet_info'
    })

    messaging.on('wallet_info_result', (data) => {
      console.log(data);

      this.setState(state => ({
        ...state,
        ...data
      }))
    });
  }

  onSendClick = () => {
    if (this.props.onSend) {
      this.props.onSend();
    }
  };

  getBalance() {
    if (this.state.money && parseInt(this.state.money)) {
      return parseInt(this.state.money).toFixed(2);
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="balance">
        <header className="balance__header" />
        <main className="balance__content">
          <div className="balance__logo">
            <img src="apla.png" />
          </div>
          <div className="balance__data">
            <div className="title">Address:</div>
            <div className="balance__address">
              <div className="value">{this.state.address}</div>
            </div>
          </div>
        </main>
        <div className="balance__actions">
          {/* <div className="btn" onClick={this.onSendClick}>
            send
          </div> */}
        </div>
      </div>
    );
  }
}
