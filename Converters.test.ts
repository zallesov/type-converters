import { DateTime } from 'luxon';
import { z } from 'zod';
import { fromDatabase, fromRequest, toDatabase, toResponse } from './Converters';
import { DateTimeWithTransformer } from './DateTimeType';


const Payment = z.object({
  createdAt: DateTimeWithTransformer,
  id: z.string(),
});

const Item = z.object({
  createdAt: DateTimeWithTransformer,
  id: z.string(),
});

const Order = z.object({
  createdAt: DateTimeWithTransformer,
  id: z.string(),
  payment: Payment,
  items: z.array(Item)
});

describe('Converters', () => {
  const now = DateTime.now()
  const order = {
      createdAt: now,
      id: '123',
      payment: {
        createdAt: now,
        id: '123',
      },
      items: [
        {
          createdAt: now,
          id: '123',
        },
      ],
  }
  const request_response = {
      created_at: now.toISO(),
      id: '123',
      payment: {
        created_at: now.toISO(),
        id: '123',
      },
      items: [
        {
          created_at: now.toISO(),
          id: '123',
        },
      ],
  }
    const order_db = {
      createdAt: now.toJSDate(),
      id: '123',
      payment: {
        createdAt: now.toJSDate(),
        id: '123',
      },
      items: [
        {
          createdAt: now.toJSDate(),
          id: '123',
        },
      ],
    }
  
  it('should convert from request', () => {
    const result = fromRequest(Order, request_response);
    expect(result).toEqual(order);
    expect(() => Order.parse(result)).not.toThrow();
  });

  it('should convert to response', () => {
    const result = toResponse(order);
    expect(result).toEqual(request_response);
  });

  it('should convert to database', () => {
    const result = toDatabase(order);
    expect(result).toEqual(order_db);
  });
  
  it('should convert from response', () => {
    const result = fromDatabase(Order, order_db);
    expect(result).toEqual(order);
    expect(() => Order.parse(result)).not.toThrow();
  });
});