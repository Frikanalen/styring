import { itemProgress } from "./ItemProgress.js";

import { TimelineItem } from "./types.js";

it("should return 0 if the item is in the past", () => {
  const now = new Date("2020-01-01T00:00:00.000Z");
  const item: TimelineItem = {
    startsAt: new Date("2019-01-01T00:00:00.000Z"),
    endsAt: new Date("2019-01-01T00:00:00.000Z"),
    label: "test",
    itemType: "scheduledVideo",
  };

  expect(itemProgress(now, item)).toEqual(0);
});

it("should return 0 if the item is in the future", () => {
  const now = new Date("2020-01-01T00:00:00.000Z");
  const item: TimelineItem = {
    startsAt: new Date("2021-01-01T00:00:00.000Z"),
    endsAt: new Date("2021-01-01T00:00:00.000Z"),
    label: "test",
    itemType: "scheduledVideo",
  };

  expect(itemProgress(now, item)).toEqual(0);
});

it("should return 0.25 if one-quarter of the way through the item", () => {
  const now = new Date("2020-01-01T00:15:00.000Z");
  const item: TimelineItem = {
    startsAt: new Date("2020-01-01T00:00:00.000Z"),
    endsAt: new Date("2020-01-01T01:00:00.000Z"),
    label: "test",
    itemType: "scheduledVideo",
  };

  expect(itemProgress(now, item)).toEqual(0.25);
});

it("should return 0.5 if half-way through the item", () => {
  const now = new Date("2020-01-01T00:30:00.000Z");
  const item = {
    startsAt: new Date("2020-01-01T00:00:00.000Z"),
    endsAt: new Date("2020-01-01T01:00:00.000Z"),
    label: "test",
    itemType: "scheduledVideo" as const,
  };

  expect(itemProgress(now, item)).toEqual(0.5);
});
