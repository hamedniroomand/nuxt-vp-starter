import * as v from 'valibot';
import { describe, expect, it } from 'vite-plus/test';

import { insertTodoSchema } from '../db/schema';

describe('insertTodoSchema', () => {
  it('accepts a title and removes the spaces around it', () => {
    expect(v.parse(insertTodoSchema, { title: '  Buy milk  ' })).toEqual({ title: 'Buy milk' });
  });

  it('rejects an empty title', () => {
    expect(v.safeParse(insertTodoSchema, { title: '   ' }).success).toBe(false);
  });

  it('rejects a title longer than 200 characters', () => {
    expect(v.safeParse(insertTodoSchema, { title: 'a'.repeat(201) }).success).toBe(false);
  });

  it('removes the fields that the database sets', () => {
    expect(
      v.parse(insertTodoSchema, { title: 'Buy milk', id: 5, done: true, createdAt: 'x' }),
    ).toEqual({ title: 'Buy milk' });
  });
});
