import { DateTime } from "luxon";
import { z } from "zod";

export const DateTimeType = z.custom<DateTime>(arg => arg instanceof DateTime);

export const DateTimeWithTransformer =  z.union([
  z.string(),
  z.custom<DateTime>(arg => arg instanceof DateTime),
  z.date(),
  z.number()
]).transform((value) => {
  if (typeof value === 'string') {
    return DateTime.fromISO(value);
  } if (typeof value === 'number') {
    return DateTime.fromMillis(value);
  }else if (value instanceof Date) {
    return DateTime.fromJSDate(value);
  } else if (value instanceof DateTime) {
    return value;
  } else {
    throw new Error('Invalid input data for DateTimeType');
  }
}).refine(data => DateTimeType.safeParse(data).success, {
  message: "Invalid input data for DateTimeType",
});
