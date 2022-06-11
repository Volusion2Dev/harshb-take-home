import * as bodyParser from "body-parser";
import express, { Request, Response } from "express";
import next from 'next';

import { getBlocks, CreateBlock }  from './api/blocks';
import { getBlockById }  from './api/blocks';
import { ApiResponse } from "./apiResponse";
import { Block } from "../types";

const port = parseInt(process.env.PORT || '3000');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json({ limit: "1000kb" }));

  server.get('/blocks', async (_req: Request, res: Response) => {
    const blockResponse: ApiResponse = await getBlocks();
    res.status(blockResponse.statusCode).json(blockResponse.data);
  });

  server.get('/blocks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      const blockResponse: ApiResponse = await getBlockById(id);
      res.status(blockResponse.statusCode).json(blockResponse.data);
    } catch (error) {
      console.log(error.message);
    }
  });

  server.post('/blocks', async (req, res) => {
    console.log('request body: ', req.body);
    console.log('request body configs = ', req.body.configured_data);

    const block: Block = {
      type: req.body.block_type,
      configData:  JSON.stringify(req.body.configured_data),
      position:  req.body.position
    };

    console.log('block is: ', block);

    const blockResponse: ApiResponse = await CreateBlock(block);
    res.status(blockResponse.statusCode).json(blockResponse.data);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: Error) => {
    if (err)  {
      throw err;
    }
    // tslint:disable-next-line no-console
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    );
  });

});
