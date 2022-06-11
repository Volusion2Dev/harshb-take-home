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
    id, block_type, position, JSONB_PRETTY(configured_data) as data
    FROM
    site_builder.block
    WHERE
    id = $1`, [id]);

    return result;
}

export async function createBlock(block: Block): Promise<Block> {
  const result = await db.one(
    `INSERT INTO
    site_builder.block(block_type, position, configured_data)
    VALUES($1, $2, $3)
    RETURNING id, block_type, position, JSONB_PRETTY(configured_data) as data`, 
    [block.type, block.position, JSON.parse(block.configData)]
  );

  return result;
}

export async function deleteBlock(id): Promise<null> {
  await db.none(
    `DELETE
    FROM
    site_builder.block
    WHERE
    id = $1`,
    [id]
  );

  return;
}