import "./App.css";
import { MonitoringStream } from "./MonitoringStream";
import { ATEMControl } from "./AtemControl";
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
