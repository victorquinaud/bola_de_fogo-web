import { createContext, useEffect, useReducer, useRef } from "react"
import { Reducer } from "react";

const initialState: IGame = {
    options: {
        vs: null,
    },
    list: null,
    players: null,
    teams: null
}

export const GameContext = createContext<any>(initialState);

export const reducer: Reducer<IGame, IAction> = (state, action) => {
    switch (action.type) {
        case "setGame":
            return { ...state, ...action.payload };
        case "setPlayers":
            return { ...state, ...action.payload };
        case "setTeams":
            return { ...state, ...action.payload };
        case "reorderList":
            return { ...state, ...action.payload };
        default:
            return { ...state };
    };
};

export const GameProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useRef([]);

    const setGame = (list: string[], options: IOptions) => {
        if (list && options) {
            dispatch({ type: "setGame", payload: { list, options } });
        };
    };

    useEffect(() => {
        // set players
        if (state.list) {
            const names = state.list;
            const players: IPlayer[] = names.reduce((final, name) =>
                [...final, { name, playing: true }]
            , []);

            // console.log("players: ", players);
            dispatch({ type: "setPlayers", payload: { players } });
        };

    }, [state.list]);

    useEffect(() => {
        // set teams
        const players = state.players;
        const vs = state.options.vs;

        if (players && vs) {
            const teamsNum = Math.ceil((players.length + 1) / vs);
            let teams = new Array(teamsNum).fill([]);

            let lastAdded = 0;
            teams = teams.map(() => {
                const team = [];
                while (team.length < vs) {
                    if (!players[lastAdded]) break;
                    team.push(players[lastAdded]);
                    lastAdded++;
                };
                return team;
            });

            // console.log("teams: ", teams);
            dispatch({ type: "setTeams", payload: { teams } });
        };

    }, [state.players, state.options.vs]);

    const reorderList = (players: IPlayer[]): void => {
        const playing = players.flat().filter(player => player.playing).map(player => player.name);
        const noPlaying = players.flat().filter(player => !player.playing).map(player => player.name)

        const list = playing.concat(noPlaying);

        dispatch({ type: "reorderList", payload: { list } })
    };

    return (
        <GameContext.Provider
            value={{
                state,
                setGame,
                reorderList,
                history
            }}
        >
            {children}
        </GameContext.Provider>
    );
};