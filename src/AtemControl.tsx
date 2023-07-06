import { useEffect, useState } from "react";

const API_BASE = import.meta.env.DEV
  ? "http://localhost:8089"
  : "/api/playout/atem";
/// /api/playout/atem
export const ATEM_INPUTS: MixEffectsBusInput[] = [
  { index: 2, name: "TX1" },
  { index: 3, name: "TX2" },
  { index: 1, name: "TX3" },
  { index: 5, name: "RX1" },
  { index: 3010, name: "Still 1" },
  { index: 1000, name: "Color bars" },
];

export type MixEffectsBusInput = { index: number; name: string };

export type ATEMControlsProps = {
  inputs: MixEffectsBusInput[];
  activeIndex: number | undefined;
  onChange: (index: number) => void;
};

export function ATEMButtons(props: ATEMControlsProps) {
  const { inputs, activeIndex, onChange } = props;

  const containerStyle = "flex gap-1 lg:gap-4";

  const baseStyle =
    "block border-2 border-black lg:p-2 font-mono w-14 lg:w-20 font-bold";
  const activeStyle = "bg-[#ee6666]";
  const inactiveStyle = "text-gray-600 bg-gray-300";
  const buttonStyle = (buttonIndex: number) =>
    [baseStyle, buttonIndex === activeIndex ? activeStyle : inactiveStyle].join(
      " ",
    );

  return (
    <div className={containerStyle}>
      {inputs.map((input) => (
        <button
          className={buttonStyle(input.index)}
          key={input.index}
          onClick={() => onChange(input.index)}
        >
          {input.name}
        </button>
      ))}
    </div>
  );
}

export const ATEMControl = () => {
  const [programInput, setProgramInput] = useState<number>(-1);
  const [previewInput, setPreviewInput] = useState<number>(-1);

  useEffect(() => {
    fetch(API_BASE + "/program")
      .then((res) => res.json())
      .then(({ inputIndex }) => setProgramInput(inputIndex));
    fetch(API_BASE + "/preview")
      .then((res) => res.json())
      .then(({ inputIndex }) => setPreviewInput(inputIndex));
  }, []);

  const setProgram = async (index: number) => {
    await fetch(API_BASE + "/program", {
      method: "post",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inputIndex: index }),
    });
    setProgramInput(index);
  };

  const setPreview = async (index: number) => {
    await fetch(API_BASE + "/preview", {
      method: "post",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inputIndex: index }),
    });
    setPreviewInput(index);
  };

  return (
    <div className={"flex lg:mx-auto flex-col lg:gap-4"}>
      <div className={"bg-red-300 p-2 lg:p-4"}>
        Program
        <ATEMButtons
          inputs={ATEM_INPUTS}
          activeIndex={programInput}
          onChange={setProgram}
        />
      </div>

      <div className={"bg-green-300 p-2 lg:p-4"}>
        Preview
        <ATEMButtons
          inputs={ATEM_INPUTS}
          activeIndex={previewInput}
          onChange={setPreview}
        />
      </div>
    </div>
  );
};
