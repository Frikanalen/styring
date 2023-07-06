import React from "react";
import { format } from "date-fns";
import { TimelineItem } from "./playout/types.js";
import { usePlayoutWebsocket } from "./playout/usePlayoutWebsocket.js";
import { TimelineEntry } from "./playout/TimelineEntry.js";

export const Playout = () => {
  const { lastUpdate, connectionStatus, loading, error } =
    usePlayoutWebsocket();

  if (error) return <div>{error}</div>;

  if (loading) return <div>Connecting...</div>;

  if (!lastUpdate) return <div>No last update</div>;

  // Returns the index of the currently active timeline item,
  // using lastUpdate.time as the current time.
  const activeItemIndex = (now: Date) =>
    lastUpdate.timeline.findIndex(
      (item) =>
        item.startsAt.getTime() <= now.getTime() &&
        now.getTime() <= item.endsAt.getTime(),
    );

  // Filters out items that are not currently active, and the three
  // items before the currently active item.
  const truncatePast =
    (now: Date, previousItems: number) => (item: TimelineItem, idx: number) => {
      const activeIdx = activeItemIndex(now);
      return idx >= activeIdx - previousItems;
    };

  return (
    <div>
      <pre>
        {connectionStatus}, siste status{" "}
        {format(lastUpdate.time, "HH:mm:ss.SSS")}
      </pre>
      <div>
        {lastUpdate.timeline
          .filter(truncatePast(lastUpdate.time, 2))
          .map((item, idx) => (
            <TimelineEntry time={lastUpdate.time} key={idx} item={item} />
          ))}
      </div>
      <h1>Playout</h1>
    </div>
  );
};
