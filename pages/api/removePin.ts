import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const offLimits = [
    process.env.SPECIAL_1_HASH,
    process.env.SPECIAL_2_HASH,
    process.env.SPECIAL_3_HASH,
    process.env.SPECIAL_4_HASH,
  ];
  const hashes = [req.body.json, req.body.img];

  if (offLimits.includes(hashes[0])) {
    res.status(403).json("You cannot remove this pin.");
    return;
  } else {
    for (const hash of hashes) {
      await axios
        .delete(`https://api.pinata.cloud/pinning/unpin/${hash}`, {
          headers: {
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
          },
        })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error) => {
          res.status(400).json(error.data);
        });
    }
  }
}
