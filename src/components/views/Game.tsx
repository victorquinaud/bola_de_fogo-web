import { useContext, useState } from 'react';
import { GameContext } from "../../store/GameProvider";

import InputList from '../InputList';

const Game = ({ setVisible }) => {

    const { setGame } = useContext(GameContext);

    const [vs, setVs] = useState<number>(4);
    const [list, setList] = useState<string[]>([]);
    const [random, setRandom] = useState<"firstTeams" | "all">();

    const submit = () => {
        if (list.length && vs) {
            setGame(list, { vs });
            setVisible("players");
        } else
            console.log("submith failed");
    };

    return (
        <div className='Game flex flex-col'>
            <div className='flex justify-around bg-gray-500 text-center'>
                <div className='flex flex-col'>
                    <h2 className='text-xl'>VERSUS</h2>
                    
                    <div className="flex justify-between mb-1">
                        <input type="tel" name="vs" value={vs} onChange={e => setVs(+e.target.value)} className="text-white text-center w-10 ml-3" />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h2 className="text-xl">ALEATÓRIO</h2>

                    <div>
                        <input type="radio" name="random" value={random} onChange={e => setRandom("firstTeams")} /> <span>2 Times</span>
                        <input type="radio" name="random" value={random} onChange={e => setRandom("all")} className="ml-5" /> <span>Todos</span>
                    </div>
                </div>
            </div>

            <InputList sendList={setList} sort={random} vs={vs} />

            <button
                onClick={submit}
                className="py-4 bg-sky-700 text-white active:bg-sky-500"
            >
                INICIAR
            </button>
        </div>
    );
};

export default Game;