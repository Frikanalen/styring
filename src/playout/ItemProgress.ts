// Using the playout time, returns the progress of an item in the timeline in percent.
// If the item is not currently active, returns 0.

import { TimelineItem } from "./types.js";

export const itemProgress = (now: Date, item: TimelineItem) => {
  const total = item.endsAt.getTime() - item.startsAt.getTime();
  const elapsed = now.getTime() - item.startsAt.getTime();
  if (elapsed < 0) return 0;
  if (elapsed / total > 1) return 0;

  return elapsed / total;
};
