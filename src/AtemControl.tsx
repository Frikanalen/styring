import { useEffect, useState } from "react";
import cx from "classnames";

const API_BASE = import.meta.env.VITE_ATEM_URL;

export const ATEM_INPUTS: MixEffectsBusInput[] = [
  { index: 1, name: "TX1" },
  { index: 2, name: "TX2" },
  { index: 3, name: "TX3" },
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

export const ATEMButtons = ({
  inputs,
  activeIndex,
  onChange,
}: ATEMControlsProps) => (
  <div className={"flex gap-1 lg:gap-4"}>
    {inputs.map(({ index, name }) => (
      <button
        className={cx(
          "block border-2 border-black lg:p-2 font-mono w-14 lg:w-20 font-bold",
          {
            "bg-[#ee6666]": index === activeIndex,
            "text-gray-600 bg-gray-300": index !== activeIndex,
          }
        )}
        key={index}
        onClick={() => onChange(index)}
      >
        {name}
      </button>
    ))}
  </div>
);

export const ATEMControl = () => {
  const [programInput, setProgramInput] = useState<number>(-1);
  const [previewInput, setPreviewInput] = useState<number>(-1);

  useEffect(() => {
    fetch(API_BASE + "/program")
      .then((res) => res.json())
      .then(({ programInput }) => setProgramInput(programInput));
    fetch(API_BASE + "/preview")
      .then((res) => res.json())
      .then(({ previewInput }) => setPreviewInput(previewInput));
  }, []);

  const setProgram = async (index: number) => {
    await fetch(API_BASE + "/program", {
      method: "put",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inputId: index }),
    });
    setProgramInput(index);
  };

  const setPreview = async (index: number) => {
    await fetch(API_BASE + "/preview", {
      method: "put",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inputId: index }),
    });
    setPreviewInput(index);
  };
  console.log({ programInput, previewInput });

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
