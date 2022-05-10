import Web3 from "web3";
import { TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS } from "./config";

class ConnectWeb3 {
  web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  todoList = new this.web3.eth.Contract(TO_DO_LIST_ABI, TO_DO_LIST_ADDRESS);

  async getAllTodoTask() {
    const taskCount = await this.todoList.methods.taskCount().call();
    let listResult = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await this.todoList.methods.tasks(i).call();
      listResult.push(task);
    }
    return listResult;
  }

  async createTask(content) {
    const account = await this.web3.eth.getAccounts();
    await this.todoList.methods
      .createTask(content)
      .send({ from: account.toString() });
  }

  async checkCompleteTask(id) {
    try {
      const account = await this.web3.eth.getAccounts();
      await this.todoList.methods
        .toggleCompleted(id)
        .send({ from: account.toString() });
    } catch (err) {
      console.log(err);
    }
  }
}

export default ConnectWeb3;
