import { useEffect, useState } from "react";

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
  activeIndex: number;
  onChange: (index: number) => void;
};

export function ATEMButtons(props: ATEMControlsProps) {
  const { inputs, activeIndex, onChange } = props;

  const containerStyle = "flex gap-4";

  const baseStyle = "block border-2 border-black p-2 font-mono w-20 font-bold";
  const activeStyle = "bg-[#ee6666]";
  const inactiveStyle = "bg-[#666666]";
  const buttonStyle = (buttonIndex: number) =>
    [baseStyle, buttonIndex === activeIndex ? activeStyle : inactiveStyle].join(
      " "
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
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    fetch("/api/playout/atem/program")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIndex(data.InputIndex);
      });
  }, []);

  const setProgram = async (index: number) => {
    await fetch("/api/playout/atem/program", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ inputIndex: index }),
    });
    setIndex(index);
  };

  return (
    <ATEMButtons
      inputs={ATEM_INPUTS}
      activeIndex={index}
      onChange={setProgram}
    />
  );
};
