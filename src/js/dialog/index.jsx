import React from "react";

import messaging from "./message";
import storage from "./../models/storage";

import Payment from "./payment";

export default class App extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    messaging.send({
      type: "payment_init"
    });

    messaging.on("payment_tx", data => {
      console.log(data);
      this.setTxInfo(data);
    });
  }

  setTxInfo(data) {
    this.setState(state => ({
      ...state,
      ...data,
      isLoaded: true
    }));
  }

  onSubmit = payload => {
    const { name, data } = payload;

    const { id } = this.state;
    messaging.send({
      type: "payment_submit",
      payload: {
        id,
        name,
        data
      }
    });
    window.close();
  };

  onReject = () => {
    window.close();
  };

  render() {
    return (
      <div>
        {this.state.isLoaded && (
          <Payment
            name={this.state.name}
            text={this.state.text}
            data={this.state.data}
            editable={this.state.isNew}
            onSubmit={this.onSubmit}
            onReject={this.onReject}
          />
        )}
      </div>
    );
  }
}
