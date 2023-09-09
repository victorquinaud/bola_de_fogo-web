import { useState } from "react";
import { IList, IGetList } from "../interfaces";

const getList = ({ list, sort, vs }: IGetList): Promise<string[]> => {
    return new Promise((resolve, reject) => {

        if (!list) {
            reject(`the list is empty`);
            return;
        };

        // getting lines
        let names: string[] = list.split("\n")
            //getting words
            .map(line => line.split(" ")
                // getting letters
                .map(word => word.split("")
                    .map(letter => {
                        // removeing "-", "\n" and numbers
                        if (letter === "-" || letter === "_" || letter === "\n" || Number.isInteger(Math.floor(parseInt(letter))))
                            return "";
                        else
                            return letter.toUpperCase();
                        // joining letters to word
                    }).join("")
                    // joing word to phrase
                ).join(" ").trim()
                // filtering empty lines
            ).filter(Boolean);

        // removing duplicated cases with Set and destructuring
        names = [...new Set(names)];

        if (sort) {
            const list_length = names.length;
            let list_temp = [...names];
            
            switch (sort) {
                case "all":
                    names = [];

                    while (names.length < list_length) {
                        const calc = Math.floor(Math.random() * list_temp.length);
        
                        if (!names.includes(list_temp[calc])) {
                            names.push(list_temp[calc]);
                            list_temp.splice(calc, 1);
                        };
                    };
                    break;
                case "firstTeams":
                    const firstTeams = vs * 2;
                    list_temp = names.slice(0, firstTeams);
                    const list_temp_rest = names.slice(firstTeams, list_length);
                    names = [];

                    while (names.length < firstTeams) {
                        const calc = Math.floor(Math.random() * list_temp.length);
        
                        if (!names.includes(list_temp[calc])) {
                            names.push(list_temp[calc]);
                            list_temp.splice(calc, 1);
                        };
                    };
                    names = names.concat(list_temp_rest);
                    break;
            };
        };

        resolve(names);
    });
};

const playersArrToString = (players: string[]) => {
    let str = "";
    const length = players.length;
    players.filter(Boolean).forEach((name, i) => {
        if (name !== "\n")
            if (i !== length - 1)
                str += `${i + 1} - ${name}\n`;
            else
                str += `${i + 1} - ${name}`;
    })
    return str;
};

const tempList = "1 - Pedro\n2 - Lucas\n3- João\n4- Marcos\n5 -Paula\n6 -Secão\n7 Gui\n8 Manu\n9Fernando\n10Maurício\nFelipe\nVitor\n- Kátia\n- Laura\n-Júlia\n-Joaquim\n -Negão\n -Matheusinho\n\n \n  \n-\n";

const List = (props: IList) => {

    const { sendList, sort, vs } = props;

    const [list, setList] = useState<string>(tempList);

    const submit = async () => {
        const players = await getList({ list, sort, vs });
        const playersString = playersArrToString(players);
        setList(playersString);
        sendList(players);
    };

    return (
        <div className="InputList flex flex-col">
            <textarea
                placeholder="Cole a lista aqui."
                autoFocus
                rows={20}
                value={list}
                onChange={e => setList(e.target.value)}
                className="text-white py-2 pl-4 flex-grow text-xl"
            />

            <button
                onClick={_ => submit()}
                className="py-2 active:bg-sky-200 rounded-md"
            >
                Corrigir lista
            </button>
        </div>
    );
};
export default List;