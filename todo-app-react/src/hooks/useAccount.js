import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import ConnectWeb3 from "../ConnectWeb3";
import { TO_DO_LIST_ADDRESS } from "../config";
const useAccount = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [charities, setCharities] = useState([]);
  const conn = useRef(new ConnectWeb3());
  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        console.log({ balance });
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const accountChangedHandler = async (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };
  const charityDeposit = async (value = 10, message) => {
    // conn.current.todoList.methods.deposit(defaultAccount, 1, 25);
    console.log(conn.current.todoList);
    // createCharity;
    conn.current.todoList.methods.createCharity(message).send({
      from: defaultAccount,
      value: value,
    });
    // .call({ from: TO_DO_LIST_ADDRESS, value: 50 });
  };
  const getAllCharity = async () => {
    const charityCount = await conn.current.todoList.methods
      .charityCount()
      .call();
    let listResult = [];
    for (let i = 1; i <= charityCount; i++) {
      const task = await conn.current.todoList.methods.charities(i).call();
      listResult.push(task);
    }
    setCharities(listResult);
    return listResult;
  };
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);

          getAccountBalance(result[0]);
          // charityDeposit();
          console.log("alo");
        })
        .catch((error) => {
          //   setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      //   setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };
  useEffect(() => {
    window.ethereum.on("accountsChanged", accountChangedHandler);

    //  window.ethereum.on("chainChanged", chainChangedHandler);

    return () => {
      // window.ethereum.off("accountsChanged", accountChangedHandler);
    };
  }, []);

  useEffect(() => {
    connectWalletHandler();
  }, []);

  return {
    account: defaultAccount,
    balance: userBalance,
    charityDeposit,
    charities,
    getAllCharity,
  };
};

export default useAccount;
