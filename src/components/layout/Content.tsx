import { useState } from "react";
import { TVisible } from "../../interfaces";

import Game from '../views/Game';
import Teams from "../views/Teams";
import Payment from "../views/Payment";
import Players from '../views/Players';
import Button from '../Button';
import History from "../views/History";

const Content = () => {

    const [visible, setVisible] = useState<TVisible>("game");

    return (
        <div className={`
            w-screen max-w-screen-sm mx-5 rounded-md overflow-hidden
            bg-gray-100 shadow-xl
            flex flex-col
        `} >
            <div>
                <h1 className="text-xl text-center m-3"
                >
                    BOLA DE FOGO
                </h1>
                <hr className="bg-gradient-to-r from-sky-400 to-sky-600 pb-1 mb-1" />
            </div>

            <div className={`${visible !== "game" ? "hidden" : ""}`}>
                <Game setVisible={setVisible} />
            </div>
            <div className={`${visible !== "teams" ? "hidden" : ""}`}>
                <Teams setVisible={setVisible} />
            </div>
            <div className={`${visible !== "payment" ? "hidden" : ""}`}>
                <Payment />
            </div>
            <div className={`${visible !== "players" ? "hidden" : ""}`}>
                <Players setVisible={setVisible} />
            </div>
            <div className={`${visible !== "history" ? "hidden" : ""}`}>
                <History setVisible={setVisible} />
            </div>
            <div className={`
                ${visible === "game" || visible === "history" ? "hidden" : ""}
                buttons flex justify-around mt-10
            `}>
                <Button label="Jogadores" click={() => setVisible("players")} />
                <Button label="Pagamento" click={() => setVisible("payment")} />
                <Button label="Times" click={() => setVisible("teams")} />
            </div>
        </div>
    );
};

export default Content;