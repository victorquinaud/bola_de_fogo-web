import { useContext } from 'react';
import { GameContext } from "../../store/GameProvider";

const History = ({ setVisible }) => {

    const { history, state } = useContext(GameContext);
    const { vs } = state.options;

    const tr = new Array(vs).fill(null);
    const thRed = <th className="w-1/2 bg-rose-400">VERMELHO</th>;
    const thBlue = <th className="w-1/2 bg-sky-400">AZUL</th>;

    return (
        <div className="history flex flex-col pb-10">
            <button
                className="bg-sky-700 px-4 py-2 rounded-xl self-end mx-4 mb-1 text-white"
                onClick={() => setVisible("teams")}
            >
                Voltar
            </button>

            <div className='bg-sky-300 flex justify-around pl-4 pr-4 text-xl mb-2'>
                <span>VENCEDOR</span>
                <span>PERDEDOR</span>
            </div>

            {
                history.current.map((game, i) =>
                    <table 
                        key={`table${i}`}
                        className='mt-2'
                    >
                        <thead>
                            {game.winnerColor === "red"
                                ? <tr>{thRed}{thBlue}</tr>
                                : <tr>{thBlue}{thRed}</tr>}
                        </thead>
                        <tbody>
                            {
                                tr.map((e, i) =>
                                    <tr key={`tr${i}`}>
                                        <td
                                            key={`tdW${i}`}
                                            className={`text-left pl-4
                                            ${game.winnerColor === "red"
                                                    ? (i % 2 === 0 ? "bg-rose-50" : "bg-rose-100")
                                                    : (i % 2 === 0 ? "bg-sky-50" : "bg-sky-100")
                                                }
                                        `}
                                        >{game.winner[i]}</td>

                                        <td
                                            key={`tdL${i}`}
                                            className={`text-right pr-4
                                            ${game.winnerColor === "blue"
                                                ? (i % 2 === 0 ? "bg-rose-50" : "bg-rose-100")
                                                : (i % 2 === 0 ? "bg-sky-50" : "bg-sky-100")
                                            }
                                        `}
                                        >{game.looser[i]}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    );
};

export default History;