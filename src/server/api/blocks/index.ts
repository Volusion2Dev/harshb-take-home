import { ApiResponse } from '../../apiResponse';
import * as db from '../../datastore';
import { Block } from '../../../types';

export async function getBlocks(): Promise<ApiResponse> {
  try {
    const blocks: Block[] = await db.getBlocks();
    return { statusCode: 200, data: blocks };
  } catch (err) {
    return { statusCode: 500, data: { message: err.message }};
  }
}

export async function getBlockById(id): Promise<ApiResponse> {
  try {
    const block: Block = await db.getBlockById(id);
    return { statusCode: 200, data: block };
  } catch (error) {
    return { statusCode: 500, data: { message: error.message }};
  }
}

export async function CreateBlock(block: Block): Promise<ApiResponse> {
  try {
    const blockData: Block = await db.createBlock(block);
    return { statusCode: 200, data: blockData };
  } catch (error) {
    return { statusCode: 500, data: { message: error.message }};
  }
}

export async function deleteBlock(id): Promise<ApiResponse> {
  try {
    await db.deleteBlock(id);
    return { statusCode: 200, data: null };
  } catch (error) {
    return { statusCode: 500, data: { message: error.message }};
  }
}
