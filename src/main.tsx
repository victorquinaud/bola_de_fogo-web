import ReactDOM from 'react-dom/client'

import { GameProvider } from "./store/GameProvider"
import Content from './components/layout/Content'

import  "./types/global.d.ts"
import "./styles/globals.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <div className={`App
        bg-gradient-to-r from-sky-600 to-sky-800 text-black
        min-h-screen max-h-full flex justify-center items-center py-5 font-mono
      `} >
      <Content />
    </div>
  </GameProvider>
)
