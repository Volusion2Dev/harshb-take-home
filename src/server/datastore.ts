import pgPromise from 'pg-promise';

import { Block } from '../types';

const connOptions = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres'
};
const pgp = pgPromise();
const db = pgp(connOptions);

export async function getBlocks(): Promise<Block[]> {
  const result = await db.many(
    `SELECT
      id, block_type, position, JSONB_PRETTY(configured_data) as data
    FROM
      site_builder.block
    ORDER BY
      position;`
  );

  return result.map((row: any) => ({
    id: row.id,
    type: row.block_type,
    position: row.position,
    configData: JSON.parse(row.data)
  }));
}

export async function getBlockById(id): Promise<Block> {
  const result = await db.one(
    `SELECT
    *
    FROM
    site_builder.block
    WHERE
    id = $1`, [id]);

    return result;
}