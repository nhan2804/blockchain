import {useCallback, useState, useEffect} from "react";
import {v4} from "uuid";
import WalletCard from "./components/WalletCard";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
    return (
        <>
            <div className="main">
                <WalletCard/>
            </div>
        </>
    );
}

export default App;