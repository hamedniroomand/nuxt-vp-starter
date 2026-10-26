import * as v from 'valibot';
import { sql } from 'void/db';
import { createInsertSchema } from 'void/drizzle-valibot';
import { integer, sqliteTable, text } from 'void/schema-d1';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  done: integer('done', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const insertTodoSchema = v.pick(
  createInsertSchema(todos, {
    title: schema => v.pipe(schema, v.trim(), v.minLength(1), v.maxLength(200)),
  }),
  ['title'],
);
