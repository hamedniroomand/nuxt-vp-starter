import { todos } from '@schema';
import { db, desc } from 'void/db';

export default defineEventHandler(() => {
  return db.select().from(todos).orderBy(desc(todos.id)).limit(100);
});
