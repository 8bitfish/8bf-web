import type { NextApiRequest, NextApiResponse } from "next";
import { newToken } from "../../../functions/server";

type Data = {
  hash: string;
  imageHash: string;
  uri: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tokenId } = req.query;

  const [s1, s2, s3, s4] = [
    {
      id: process.env.SPECIAL_1,
      hash: process.env.SPECIAL_1_HASH,
      imageHash: process.env.SPECIAL_1_IMAGE_HASH,
    },
    {
      id: process.env.SPECIAL_2,
      hash: process.env.SPECIAL_2_HASH,
      imageHash: process.env.SPECIAL_2_IMAGE_HASH,
    },
    {
      id: process.env.SPECIAL_3,
      hash: process.env.SPECIAL_3_HASH,
      imageHash: process.env.SPECIAL_3_IMAGE_HASH,
    },
    {
      id: process.env.SPECIAL_4,
      hash: process.env.SPECIAL_4_HASH,
      imageHash: process.env.SPECIAL_4_IMAGE_HASH,
    },
  ];

  if (s1.id === tokenId) {
    const { hash, imageHash, uri } = {
      hash: s1.hash || "",
      imageHash: s1.imageHash || "",
      uri: `https://gateway.pinata.cloud/ipfs/${s1.hash}`,
    };
    res.status(200).json({ hash, imageHash, uri });
  } else if (s2.id === tokenId) {
    const { hash, imageHash, uri } = {
      hash: s2.hash || "",
      imageHash: s2.imageHash || "",
      uri: `https://gateway.pinata.cloud/ipfs/${s1.hash}`,
    };
    res.status(200).json({ hash, imageHash, uri });
  } else if (s3.id === tokenId) {
    const { hash, imageHash, uri } = {
      hash: s3.hash || "",
      imageHash: s3.imageHash || "",
      uri: `https://gateway.pinata.cloud/ipfs/${s1.hash}`,
    };
    res.status(200).json({ hash, imageHash, uri });
  } else if (s4.id === tokenId) {
    const { hash, imageHash, uri } = {
      hash: s4.hash || "",
      imageHash: s4.imageHash || "",
      uri: `https://gateway.pinata.cloud/ipfs/${s1.hash}`,
    };
    res.status(200).json({ hash, imageHash, uri });
  } else {
    const {
      hash,
      imageHash,
      uri,
    }: { hash: string; imageHash: string; uri: string } = await newToken({
      tokenId,
    });
    res.status(200).json({ hash, imageHash, uri });
  }
}
