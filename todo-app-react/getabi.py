import json

PATH_TRUFFLE_WK = '/Users/chicken/source/assignment/ki2nam3/blockchain/eth-todo-list'
truffleFile = json.load(open(PATH_TRUFFLE_WK + '/build/contracts/TodoList.json'))

abi = truffleFile['abi']
bytecode = truffleFile['bytecode']
print(abi)
