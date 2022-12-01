import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// Endpoint for serving user uploaded files. 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.query
    const filePath = path.resolve(".", `public/images/${name}`);
    const image = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "image/jpg");
    return res.send(image);
  }