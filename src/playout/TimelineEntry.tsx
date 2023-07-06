import { TimelineItem } from "./types.js";
import { ProgressBar } from "./ProgressBar.js";
import { format } from "date-fns";
import React from "react";

export const TimelineEntry = ({
  time,
  item,
}: {
  time: Date;
  item: TimelineItem;
}) => {
  return (
    <div className={"w-full border-2 border-black relative bg-transparent"}>
      <ProgressBar time={time} item={item} />
      <div className={"p-1 relative flex justify-between"}>
        <div className={"font-mono"}>{format(item.startsAt, "HH:mm")}</div>
        <div className={"text-center"}>{item.label}</div>
        <div className={"font-mono"}>{format(item.endsAt, "HH:mm")}</div>
      </div>
    </div>
  );
};
