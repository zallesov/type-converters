import { convertCamelCaseKeysToSnakeCase, convertSnakeCaseKeysToCamelCase } from './CamelToSnake';

describe('CamelToSnake', () => {
  it('should convert camelCase keys to snake_case', () => {
    const obj = {
      camelCase: 'value',
      nestedObject: {
        anotherCamelCase: 'value',
        array: [{ insideArray: 'value' }]
      },
      array: [{ insideArray: 'value' }],
      nil: null,
      undefined: undefined,
    };

    const expected = {
      camel_case: 'value',
      nested_object: {
        another_camel_case: 'value',
        array: [{ inside_array: 'value' }]
      },
      array: [{ inside_array: 'value' }],
      nil: null,
      undefined: undefined,
    };

    const result = convertCamelCaseKeysToSnakeCase(obj);

    expect(result).toEqual(expected);
  });

  it('should convert snake_case keys to camelCase', () => {
    const obj = {
      snake_case: 'value',
      nested_object: {
        another_snake_case: 'value',
        array: [{ inside_array: 'value' }]
      },
      array: [{ inside_array: 'value' }],
      nil: null,
      undefined: undefined,
    };

    const expected = {
      snakeCase: 'value',
      nestedObject: {
        anotherSnakeCase: 'value',
        array: [{ insideArray: 'value' }]
      },
      array: [{ insideArray: 'value' }],
      nil: null,
      undefined: undefined,
    };

    const result = convertSnakeCaseKeysToCamelCase(obj);

    expect(result).toEqual(expected);
  });
});