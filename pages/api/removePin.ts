import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const hashes = [req.body.json, req.body.img];

  for (const hash of hashes) {
    axios
      .delete(`https://api.pinata.cloud/pinning/unpin/${hash}`, {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(400).json(error.data);
      });
  }
}
