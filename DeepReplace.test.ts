import { deepReplace } from './DeepReplace';

describe('deepReplace', () => {
  it('should replace all instances of a type in an object', () => {
    const obj = {
      date: new Date('2020-01-01'),
      nested: {
        date: new Date('2020-01-02'),
        array: [new Date('2020-01-03'), new Date('2020-01-04')],
      },
      array: [new Date('2020-01-05'), new Date('2020-01-06')],
    };

    const expected = {
      date: '2020-01-01T00:00:00.000Z',
      nested: {
        date: '2020-01-02T00:00:00.000Z',
        array: ['2020-01-03T00:00:00.000Z', '2020-01-04T00:00:00.000Z'],
      },
      array: ['2020-01-05T00:00:00.000Z', '2020-01-06T00:00:00.000Z'],
    };

    const result = deepReplace(
      obj,
      (value): value is Date => value instanceof Date,
      (date: Date) => date.toISOString(),
    );

    expect(result).toEqual(expected);
  });
});