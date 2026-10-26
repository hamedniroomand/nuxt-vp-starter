import { insertTodoSchema, todos } from '@schema';
import * as v from 'valibot';
import { db } from 'void/db';

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, data => v.parse(insertTodoSchema, data));
  const [todo] = await db.insert(todos).values(body).returning();

  setResponseStatus(event, 201);
  return todo;
});
