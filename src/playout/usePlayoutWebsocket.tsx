import useWebSocket, { ReadyState } from "react-use-websocket";
import { useMemo, useState } from "react";
import { PlayoutStatus, PlayoutStatusSchema } from "./types.js";

export const usePlayoutWebsocket = () => {
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080",
  );

  const lastUpdate: PlayoutStatus | undefined = useMemo(() => {
    if (!lastMessage) return;

    try {
      return PlayoutStatusSchema.parse(JSON.parse(lastMessage.data));
    } catch (e) {
      if (e instanceof Error) setSchemaError(e.message);
      console.error(e);
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Kobler til",
    [ReadyState.OPEN]: "Tilkoblet",
    [ReadyState.CLOSING]: "Lukker...",
    [ReadyState.CLOSED]: "Lukket",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const loading = readyState === ReadyState.CONNECTING;
  const error =
    readyState === ReadyState.CLOSED ? "Tilkobling lukket" : schemaError;

  return { lastUpdate, connectionStatus, error, loading };
};
