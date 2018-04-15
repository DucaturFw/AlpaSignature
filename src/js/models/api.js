const axios = require('axios');
const formData = require('form-data-urlencoded');

const host = 'http://192.168.25.19:17301';

module.exports = {
    getuid: function () {
        return new Promise((resolve) => {
            axios.get(`${host}/api/v2/getuid`).then(res => resolve(res.data));
        })
    },

    sign: function (pk, str) {
        const data = formData({
            private: pk,
            forsign: str
        });

        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: `${host}/api/v2/signtest`,
            data
        };

        return new Promise((resolve) => {
            axios(options).then(res => resolve(res.data));
        })
    },

    login: function (token, signature, pubkey) {
        const data = formData({
            signature,
            pubkey
        });

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            url: `${host}/api/v2/login`,
            data
        };

        return new Promise((resolve) => {
            axios(options).then(res => resolve(res.data));
        })
    },

    balance(token, addr) {
        let options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            url: `${host}/api/v2/balance/${addr}`,
        };

        return new Promise((resolve) => {
            axios(options).then(res => resolve(res.data));
        })
    },

    contractInfo(token, contractName) {
        let options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            url: `${host}/api/v2/contract/${contractName}`,
        };

        return new Promise((resolve) => {
            axios(options).then(res => resolve(res.data));
        })
    },

    prepare(token, name, data) {
        const payload = formData({
            ...data
        });

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            url: `${host}/api/v2/prepare/${name}`,
            data: payload
        };

        return new Promise((resolve) => {
            axios(options).then(res => resolve(res.data));
        })
    },

    execContract(token, name, data) {
        const payload = formData({
            ...data
        });

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            url: `${host}/api/v2/contract/${name}`,
            data: payload
        };

        return new Promise((resolve) => {
            axios(options).then(res => resolve(res.data));
        })
    }
}