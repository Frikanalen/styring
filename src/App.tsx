import "./App.css";
import { MonitoringStream } from "./MonitoringStream";
import { ATEMButtons, ATEMControl } from "./AtemControl";
import { TextSlideEditorDialog } from "./TextSlideEditor";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Playout } from "./Playout.js";
import { MuteIcon } from "./MuteIcon";
import cx from "classnames";

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

const MonitoringStreamControl = ({
  muted,
  setMuted,
}: {
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
}) => {
  const { input: aux1Input, setInput: setAux1Input } = useAtemAux(1);
  return (
    <div
      className={"bg-gray-300 p-2 lg:p-4 flex items-center gap-4 select-none"}
    >
      <div
        className={"rounded-md p-3 h-12 w-12 cursor-pointer "}
        onClick={() => {
          setMuted((muted) => !muted);
        }}
      >
        <MuteIcon
          className={cx("aspect-square h-full w-full", {
            "stroke-gray-800": !muted,
            "stroke-red-400": muted,
          })}
        />
      </div>
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
            index: 8,
          },
        ]}
        activeIndex={aux1Input}
        onChange={async (idx) => await setAux1Input(idx)}
      />
    </div>
  );
};

function App() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);

  return (
    <div className={"bg-gray-200 lg:p-8 flex-col flex lg:gap-4 lg:flex-row"}>
      <div className={"grow"}>
        <div className={"text-center py-1 text-2xl"}>Monitor</div>
        <MonitoringStream muted={muted} />
        <MonitoringStreamControl muted={muted} setMuted={setMuted} />
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
