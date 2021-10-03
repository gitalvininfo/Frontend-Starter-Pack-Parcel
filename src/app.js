import * as RegisterContract from "../build/contracts/Register.json"


document.getElementById("set").addEventListener("click", function () {
    set()
});

document.getElementById("get").addEventListener("click", function () {
    get()
});

const set = () => {
    let info = $("#newInfo").val();
    App.contracts.methods.setInfo(info).send({ from: App.account })
        .on('receipt', receipt => {
            console.log('receipt 1', receipt)
        });
    $("#newInfo").val('');
}

const get = () => {
    App.contracts.methods.getInfo().call()
        .then(function (info) {
            console.log("info: ", info);
            document.getElementById('lastInfo').innerHTML = info;
        });
}


let App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    accounts: [],
    init: () => {
        console.log('app initialized');
        return App.initWeb3();
    },
    initWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = window.ethereum;
            web3 = new Web3(window.ethereum);

        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContracts()
    },
    initContracts: async () => {
        const id = await web3.eth.net.getId();

        const accounts = await web3.eth.getAccounts();
        App.account = accounts[0];
        App.accounts = accounts;

        const deployedNetwork = RegisterContract.networks[id];
        App.contracts = new web3.eth.Contract(RegisterContract.abi, deployedNetwork.address);

    }

}

$(function () {
    $(window).load(function () {
        App.init();
    })
})