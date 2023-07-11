import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_ATEM_URL;
export const useAtemAux = (auxIndex: number) => {
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
