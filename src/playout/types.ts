import * as z from "zod";

const TimelineItemSchema = z.object({
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  itemType: z.enum(["scheduledVideo", "graphics"]),
  label: z.string(),
});
export const PlayoutStatusSchema = z.object({
  time: z.coerce.date(),
  timeline: TimelineItemSchema.array(),
});
export type TimelineItem = z.infer<typeof TimelineItemSchema>;
export type PlayoutStatus = z.infer<typeof PlayoutStatusSchema>;
