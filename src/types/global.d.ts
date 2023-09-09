declare global {

  type ITeam = IPlayer[];
  type ISort = "all" | "firstTeams";
  type TVisible = "game" | "players" | "teams" | "payment" | "history"

  interface IAction {
    type: string,
    payload?: object
  }

  interface IPlayer {
    name: string,
    playing: boolean
  }

  interface IOptions {
    vs: number
  }

  interface IGame {
    options: IOptions,
    list: string[],
    players: IPlayer[],
    teams: ITeam[]
  }

  interface IList {
    sendList(players: string[]): void,
    sort: ISort,
    vs: number
  }

  interface IGetList {
    list: string,
    sort?: ISort,
    vs?: number
  }

  interface IButton {
    label: string,
    click(): void
  }

  export {
    TVisible,
    IAction,
    IPlayer,
    IOptions,
    IGame,
    ITitle,
    IList,
    IGetList,
    IButton
  }
}

export { }