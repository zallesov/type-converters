/**
 * Replace type V1 with type V2.
 */
type Replace<T, V1, V2> = T extends V1 ? V2 : never;

/**
 * Replace all fields of type V1 with fields of type V2.
 */
export type DeepReplace<T, V1, V2> = {
  [P in keyof T]: T[P] extends V1
    ? Replace<T[P], V1, V2>
    : T[P] extends object
    ? DeepReplace<T[P], V1, V2>
    : T[P];
};

export function deepReplace<T, V1, V2>(
  obj: T,
  isFunc: (value: any) => value is V1,
  convert: (value: V1) => V2,
): DeepReplace<T, V1, V2> {
  const isObject = (value: any): value is Object =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

  const replace = (current: any): any => {
    if (Array.isArray(current)) {
      // If current value is an array, recursively replace each element
      return current.map((element: any) => replace(element));
    } else if (isFunc(current)) {
      // Replace Date with its string representation
      return convert(current);
    } else if (isObject(current)) {
      // Recursively replace Date with string for all object properties
      const result: any = {};
      for (const key of Object.keys(current)) {
        result[key] = replace(current[key]);
      }
      return result;
    } else {
      // Return the value unchanged if it's neither Date nor object nor array
      return current;
    }
  };

  return replace(obj);
}
