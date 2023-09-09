import { useContext } from "react";
import { GameContext } from "../../store/GameProvider";

const Teams = ({ setVisible }) => {

    const { state, reorderList, history } = useContext(GameContext);
    const { vs } = state.options;
    const { teams } = state;
    
    const tr = new Array(vs).fill(null);
    const ul_next = new Array(teams?.length).fill(null);

    const setLooser = (looser: 0 | 1, color: "red" | "blue"): void => {
        const winner = looser === 0 ? 1 : 0;
        let history_temp = {
            winner: [],
            looser: [],
            winnerColor: ""
        };

        const newPlayers = teams.reduce((final, team, i) => {
            if (i === looser) {
                team.map(player => {
                    history_temp.looser.push(player.name);
                    player.playing = false;
                    final.push(player);
                });
            } else {
                team.map(player => {
                    if (i === winner) {
                        history_temp.winner.push(player.name);
                    };
                    final.push(player);
                });
            };

            return final;
        }, []);
        
        reorderList(newPlayers);
        history.current.push(history_temp);
        history.current[history.current.length - 1].winnerColor = color;
    };

    return (
        <>
            {teams ? (
                <div className="flex flex-col flex-grow">
                    <button className="bg-sky-700 px-4 py-2 rounded-xl self-end mx-4 mb-1 text-white"
                        onClick={() => setVisible("history")}
                    >
                        Histórico
                    </button>

                    <table className="flex-grow text-center text-xl">
                        <thead>
                            <tr>
                                <th className="w-1/2 bg-gradient-to-r from-rose-500 to-rose-200"
                                >VERMELHO</th>
                                <th className="w-1/2 bg-gradient-to-l from-sky-500 to-sky-200"
                                >AZUL</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tr.map<any>((e, i) => (
                                <tr key={`tbody${i}`}>
                                    <td key={`tbodytd1${i}`}
                                        className={`
                                            ${i % 2 === 0 ? "bg-rose-50" : "bg-rose-100"}
                                            text-left pl-5
                                        `}>
                                        {teams[0][i] && teams[0][i].name}
                                    </td>

                                    <td key={`tbodytd2${i}`}
                                        className={`
                                            ${i % 2 === 0 ? "bg-sky-50" : "bg-sky-100"}
                                            text-right pr-5
                                        `}>
                                        {teams[1][i] && teams[1][i].name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between px-4 mt-3 mb-1">
                        <button
                            onClick={() => setLooser(1, "red")}
                            className="bg-rose-300 hover:bg-rose-400 py-3 px-5 rounded-md"
                        >VENCEU</button>
                        <button
                            onClick={() => setLooser(0, "blue")}
                            className="bg-sky-300 hover:bg-sky-400 py-3 px-5 rounded-md"
                        >VENCEU</button>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        {ul_next.map<any>((e, i) => {
                            if (!(i === 0 || i === 1)) {
                                return (
                                    <>
                                        <label className="bg-gray-200 w-full mt-3 mb-1">{`PRÓXIMOS ${i - 1}`}</label>
                                        <ul
                                            className="w-1/2"
                                            key={`ul${Math.random() * i}`}
                                        >
                                            {teams[i] && teams[i].map(player => (
                                                <li key={`li${Math.random() * i}`}>
                                                    {player.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                );
                            };
                        })}
                    </div>
                </div>
            ) : false}
        </>
    );
};

export default Teams;