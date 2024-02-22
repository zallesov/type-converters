import { ZodType } from "zod";
import { CamelCaseKeysToSnakeCase, convertCamelCaseKeysToSnakeCase, convertSnakeCaseKeysToCamelCase } from "./CamelToSnake";
import { DeepReplace, deepReplace } from "./DeepReplace";
import { DateTime } from "luxon";

export function fromRequest<T>(schema: ZodType<T>, object: object): T { 
  return schema.parse(convertSnakeCaseKeysToCamelCase(object));
}

export function toResponse<T extends object>(object: T) : CamelCaseKeysToSnakeCase<DeepReplace<T, DateTime, string>> { 
  const replaced = deepReplace(object, (x: any): x is DateTime => x instanceof DateTime, (x: DateTime) => x.toISO()||"")
  const snake_case = convertCamelCaseKeysToSnakeCase(replaced);
  return snake_case;
}

export function toDatabase<T>(obj: T): DeepReplace<T, DateTime, Date> {
  return deepReplace<T, DateTime, Date>(
    obj,
    (value: any): value is DateTime => value instanceof DateTime,
    (value: DateTime) => value.toJSDate(),
  );
}

export function fromDatabase<T>(schema: ZodType<T>, object: object): T { 
  return schema.parse(object);
}
  
