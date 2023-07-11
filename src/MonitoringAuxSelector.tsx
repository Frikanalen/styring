import { useAtemAux } from "./hooks/useAtemAux.js";
import { ATEMButtons } from "./AtemControl.js";

export const MonitoringAuxSelector = () => {
  const { input: aux1Input, setInput: setAux1Input } = useAtemAux(2);

  return (
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
            index: 10,
          },
        ]}
        activeIndex={aux1Input}
        onChange={async (idx) => await setAux1Input(idx)}
      />
    </div>
  );
};
