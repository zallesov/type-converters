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

type Order = z.infer<typeof Order>;
type Payment = z.infer<typeof Payment>;
type Item = z.infer<typeof Item>;


const order = {
  created_at: '2022-01-01T00:00:00.000Z',
  id: '123',
  payment: {
    created_at: '2022-01-01T00:00:00.000Z',
    id: '123',
  },
  items: [
    {
      created_at: '2022-01-01T00:00:00.000Z',
      id: '123',
    },
  ],
}

const orderFromRequest = fromRequest(Order, order);

console.log("orderFromRequest", orderFromRequest);
Order.safeParse(orderFromRequest);

const orderToDatabase = toDatabase(orderFromRequest);

console.log("orderToDatabase", orderToDatabase);

const orderFromDatabase = fromDatabase(Order, orderToDatabase);
 
console.log("orderFromDatabase", orderFromDatabase);

const orderToResponse = toResponse(orderFromDatabase);

console.log("orderToResponse", orderToResponse);