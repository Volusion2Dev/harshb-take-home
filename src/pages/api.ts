import axios from 'axios';

import { Block } from '../types';

const blocksApiUrl = 'http://localhost:3000/blocks';

export async function getBlocks(): Promise<Block[]> {
  const resp = await axios.get(blocksApiUrl);
  console.log('response: ', resp);
  return resp.data;
}