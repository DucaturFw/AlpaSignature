const api = require('./api');

class Apla_Wallet {

    constructor({ priv }) {
        this.priv = priv;
    }

    init() {
        return this.login().then(res => {
            console.log(this.info);
        });
    }

    async login() {
        const { uid, token } = await api.getuid();
        const { signature, pubkey } = await api.sign(this.priv, uid);
        const login = await api.login(token, signature, pubkey);

        if (token) {
            this.token = login.token;
            this.info = login;
            return true;
        } else {
            return false;
        }
    }

    getInfo() {
        return this.balance(this.info.address).then(res => {
            return {
                ...this.info,
                ...res
            }
        })
    }

    balance(addr) {
        return api.balance(this.token, addr);
    }

    contactInfo(contractName) {
        return api.contractInfo(this.token, contractName);
    }

    async execContract(contractName, data) {
        const { forsign, time } = await api.prepare(this.token, contractName, data);
        const { signature, pubkey } = await api.sign(this.priv, forsign);
        const { tx } = api.execContract(this.token, contractName, {
            ...data,
            signature,
            time,
            pubkey
        });

        return tx;
    }
}

const wallet = new Apla_Wallet({
    priv: '947653f9f9552a4207f176b3f2d74c412c574f8ff8d5400b89a75f9c90b5d7d3',
});

export default wallet;