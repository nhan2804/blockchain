import React, {useCallback,  useState} from 'react'
import {ethers} from 'ethers'
import '../css/WalletCard.css'
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import TodoList from "./TodoList";
import ConnectWeb3 from "../ConnectWeb3";

const WalletCard = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const [todoList, setTodoList] = useState([]);
    const [textInput, setTextInput] = useState("");


    const onTextInputChange = useCallback((e) => {
        setTextInput(e.target.value);
    }, []);

    const onAddBtnClick = useCallback((e) => {
        const conn = new ConnectWeb3();
        conn.createTask(textInput).then(async r => {
            const listResult = await conn.getAllTodoTask();
            setTodoList(listResult);
            setTextInput("");
        });
    }, [textInput]);

    const onCheckBtnClick = useCallback((id) => {
        const conn = new ConnectWeb3();
        conn.checkCompleteTask(id).then(async r => {
            const listResult = await conn.getAllTodoTask();
            setTodoList(listResult);
        });
    }, []);

    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
                    getAccountBalance(result[0]);
                })
                .catch(error => {
                    setErrorMessage(error.message);

                });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    // update account, will cause component re-render
    const accountChangedHandler = async (newAccount) => {
        setDefaultAccount(newAccount);
        getAccountBalance(newAccount.toString());
        const conn = new ConnectWeb3();
        const todoListResult = conn.getAllTodoTask();
        setTodoList(await todoListResult);
    }

    const getAccountBalance = (account) => {
        window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance));
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
        // getAccountBalance(defaultAccount);
    }


    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler);

    return (
        <div className='walletCard'>
            <button className="btnConnect" onClick={connectWalletHandler}>{connButtonText}</button>
            <div className='accountDisplay'>
                <h3 className="labelText">Address: </h3><h2>{defaultAccount}</h2>
            </div>
            <div className='balanceDisplay'>
                <h3>Balance: {userBalance}</h3>
            </div>
            {errorMessage}
            <h3>Todo List</h3>
            <Textfield
                name='add-todo'
                placeholder='Add task...'
                elemAfterInput={
                    <Button
                        isDisabled={!textInput}
                        appearance='primary'
                        onClick={onAddBtnClick}
                    >
                        Add
                    </Button>
                }
                css={{padding: "2px 4px 2px"}}
                value={textInput}
                onChange={onTextInputChange}
            ></Textfield>
            <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
        </div>
    );
}

export default WalletCard;