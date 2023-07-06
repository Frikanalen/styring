import "./App.css";
import { MonitoringStream } from "./MonitoringStream";
import { ATEM_INPUTS, ATEMButtons, ATEMControl } from "./AtemControl";
import { TextSlideEditorDialog } from "./TextSlideEditor";
import { useState } from "react";
import { Playout } from "./Playout.js";

function App() {
  const [isOpen, setOpen] = useState<boolean>(false);

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
                index: 0,
              },
              {
                name: "PVW",
                index: 1,
              },
              {
                name: "Multi",
                index: 2,
              },
            ]}
            activeIndex={undefined}
            onChange={() => {}}
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
