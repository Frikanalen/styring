import "./App.css";
import { MonitoringStream } from "./MonitoringStream";
import { ATEMButtons, ATEMControl } from "./AtemControl";
import { TextSlideEditorDialog } from "./TextSlideEditor";
import { useEffect, useState } from "react";
import { Playout } from "./Playout.js";

const API_BASE = import.meta.env.VITE_ATEM_URL;
const useAtemAux = (auxIndex: number) => {
  const [input, setInputState] = useState<number>(-1);

  useEffect(() => {
    fetch(API_BASE + "/aux/" + auxIndex)
      .then((res) => res.json())
      .then(({ inputId }) => setInputState(inputId));
  }, []);

  const setInput = async (index: number) => {
    await fetch(API_BASE + "/aux/" + auxIndex, {
      method: "put",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inputId: index }),
    });
    setInputState(index);
  };

  return { input, setInput };
};

function App() {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { input: aux1Input, setInput: setAux1Input } = useAtemAux(2);

  return (
    <div className={"bg-gray-200 lg:p-8 flex-col flex lg:gap-4 lg:flex-row"}>
      <div className={"grow"}>
        <div className={"text-center py-1 text-2xl"}>Monitor</div>
        <MonitoringStream />
        <div className={"bg-gray-300 p-2 lg:p-4 flex items-center gap-4"}>
          Kildevalg
          <ATEMButtons
            inputs={[
              {
                name: "PGM",
                index: 10010,
              },
              {
                name: "PVW",
                index: 10011,
              },
              {
                name: "Multi",
                index: 2,
              },
            ]}
            activeIndex={aux1Input}
            onChange={async (idx) => await setAux1Input(idx)}
          />
        </div>
      </div>
      <div>
        <div className={"text-center py-1 text-2xl"}>Bildemiks</div>
        <ATEMControl />
        <div className={"text-center py-1 text-2xl"}>Playout</div>
        <Playout />
        <div onClick={() => setOpen(true)}>Plakat</div>
      </div>
      <TextSlideEditorDialog open={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;
