import { TimelineItem } from "./types.js";
import { itemProgress } from "./ItemProgress.js";
import React from "react";

export const ProgressBar = ({
  time,
  item,
}: {
  time: Date;
  item: TimelineItem;
}) => (
  <div
    className={"absolute bg-green-200 h-full "}
    style={{
      width: `${itemProgress(time, item) * 100}%`,
    }}
  >
    &nbsp;
  </div>
);
