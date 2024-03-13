import "./App.css";
import CompressVideo from "./components/compress";
import { appWindow } from '@tauri-apps/api/window'

function App() {

  return (
    <div className="h-screen ">
      {/* <div data-tauri-drag-region className="absolute top-0 bg-white/40 w-full p-2 flex">
        <div className="titlebar-button" id="titlebar-minimize" onClick={() => {
          appWindow.minimize()
        }}>
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </div>
        <div className="titlebar-button" id="titlebar-maximize">
          <img
            src="https://api.iconify.design/mdi:window-maximize.svg"
            alt="maximize"
          />
        </div>
        <div className="titlebar-button" id="titlebar-close" onClick={() => {
          appWindow.close()
        }}>
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </div>
      </div> */}
      <CompressVideo />
    </div>
  );
}

export default App;
