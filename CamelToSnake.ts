export type CamelCaseToSnakeCase<S extends string> =
    string extends S
        ? string
        : S extends `${infer P1}${infer P2}${infer P3}`
            ? P2 extends Uppercase<P2>
                ? `${Lowercase<P1>}_${CamelCaseToSnakeCase<`${Lowercase<P2>}${P3}`>}`
                : `${P1}${CamelCaseToSnakeCase<`${P2}${P3}`>}`
            : Lowercase<S>;
    
export type CamelCaseKeysToSnakeCase<T> = {
    [K in keyof T as CamelCaseToSnakeCase<K & string>]: T[K]
};

export type SnakeCaseToCamelCase<S extends string> =
    S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${SnakeCaseToCamelCase<`${P3}`>}`
    : Lowercase<S>;

export type SnakeCaseKeysToCamelCase<T> = {
    [K in keyof T as SnakeCaseToCamelCase<K & string>]: T[K]
};

export function strCamelCaseToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function convertCamelCaseKeysToSnakeCase<T extends Record<string, any>>(obj: T): { [K in keyof T as CamelCaseToSnakeCase<K & string>]: T[K] } {
    const result: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
      const newKey = strCamelCaseToSnakeCase(key);
        if(obj[key] === null) return result[newKey] = null
        else if (Array.isArray(obj[key])) {
            result[newKey] = obj[key].map((val: any) => convertCamelCaseKeysToSnakeCase(val));
        } else if (typeof obj[key] === 'object') {
            result[newKey] = convertCamelCaseKeysToSnakeCase(obj[key]);
        } else {
            result[newKey] = obj[key];
        }
    });
    return result as any;
}

export function strSnakeCaseToCamelCase(str: string): string {
    return str.replace(/(_\w)/g, matches => matches[1].toUpperCase());
}

export function convertSnakeCaseKeysToCamelCase<T extends Record<string, any>>(obj: T): { [K in keyof T as SnakeCaseToCamelCase<K & string>]: T[K] } {
    const result: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
      const newKey = strSnakeCaseToCamelCase(key);
        if(obj[key] === null) return result[newKey] = null
        else if (Array.isArray(obj[key])) {
            result[newKey] = obj[key].map((val: any) => convertSnakeCaseKeysToCamelCase(val));
        } else if (typeof obj[key] === 'object') {
            result[newKey] = convertSnakeCaseKeysToCamelCase(obj[key]);
        } else {
            result[newKey] = obj[key];
        }
    });
    return result as any;
}