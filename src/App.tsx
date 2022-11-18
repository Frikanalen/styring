import "./App.css";
import { MonitoringStream } from "./MonitoringStream";
import { ATEMControl } from "./AtemControl";
import { TextSlideEditorDialog } from "./TextSlideEditor";
import { useState } from "react";

function App() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className={"bg-gray-200 p-8 flex-col flex gap-4"}>
      <div className={"text-xl"}>Styring</div>
      <MonitoringStream />
      <div>Utgang</div>
      <ATEMControl />
      <div onClick={() => setOpen(true)}>Plakat</div>
      <TextSlideEditorDialog open={isOpen} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App;
