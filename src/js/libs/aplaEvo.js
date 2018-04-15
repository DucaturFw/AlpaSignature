export default class AplaEva {
  constructor({ stream }) {
    this.stream = stream;
  }

  isAuth() {}
  getUser() {}
  sendTransaction({ name, data, text }) {
    this.stream.write({
      type: "tx_send",
      payload: {
        name,
        data,
        text
      }
    });
  }
  sendVote(to) {}
}
