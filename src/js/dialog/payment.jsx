import React from "react";

import messaging from "./message";
import storage from "./../models/storage";
import "../../img/apla.png";

export default class Payment extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {};
  }

  submit = () => {
    this.props.onSubmit(this.props);
  };

  render() {
    const { name, text, data, onSubmit, onReject } = this.props;
    console.log({ name, text, data })

    return (
      <div className="dialog">
        <header className="header">
          <img src="apla.png" />
        </header>
        <div className="dialog-title">
          Call contracts:
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>Contract:</td>
              <td className="value">
                <span>{name}</span>
              </td>
            </tr>
            <tr className="amount">
              <td>Data:</td>
              <td className="value">
                <div>
                  <span className="value">{text.title}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td className="value">
                <span>{text.description}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="actions">
          <div className="btn" onClick={onReject}>
            Reject
          </div>
          <div className="btn primary" onClick={this.submit}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}
