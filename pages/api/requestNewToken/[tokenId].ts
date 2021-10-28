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
  const keys: { [key: string]: string | undefined } = {
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
  };
  const { tokenId } = req.query;
  const {
    hash,
    imageHash,
    uri,
  }: { hash: string; imageHash: string; uri: string } = await newToken({
    tokenId,
    keys,
  });
  res.status(200).json({ hash, imageHash, uri });
}
