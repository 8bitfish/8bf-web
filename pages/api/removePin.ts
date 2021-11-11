import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  let pinata_api_key: string;
  let pinata_secret_api_key: string;

  let s1: string;
  let s2: string;
  let s3: string;
  let s4: string;

  if (process.env.PINATA_API_KEY) {
    pinata_api_key = process.env.PINATA_API_KEY;
  } else {
    throw new Error("PINATA_API_KEY environment variable is not set");
  }

  if (process.env.PINATA_SECRET_API_KEY) {
    pinata_secret_api_key = process.env.PINATA_SECRET_API_KEY;
  } else {
    throw new Error("PINATA_SECRET_API_KEY environment variable is not set");
  }

  if (process.env.SPECIAL_1_HASH) {
    s1 = process.env.SPECIAL_1_HASH;
  } else {
    throw new Error("SPECIAL_1_HASH environment variable is not set");
  }

  if (process.env.SPECIAL_2_HASH) {
    s2 = process.env.SPECIAL_2_HASH;
  } else {
    throw new Error("SPECIAL_2_HASH environment variable is not set");
  }

  if (process.env.SPECIAL_3_HASH) {
    s3 = process.env.SPECIAL_3_HASH;
  } else {
    throw new Error("SPECIAL_3_HASH environment variable is not set");
  }

  if (process.env.SPECIAL_4_HASH) {
    s4 = process.env.SPECIAL_4_HASH;
  } else {
    throw new Error("SPECIAL_4_HASH environment variable is not set");
  }

  const offLimits: string[] = [s1, s2, s3, s4];
  const hashes = [req.body.json, req.body.img];

  if (offLimits.includes(hashes[0])) {
    res.status(403).json("You cannot remove this pin.");
    return;
  } else {
    for (const hash of hashes) {
      await axios
        .delete(`https://api.pinata.cloud/pinning/unpin/${hash}`, {
          headers: {
            pinata_api_key,
            pinata_secret_api_key,
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
