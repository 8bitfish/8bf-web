import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const url = `https://discord.com/api/webhooks/${process.env.WEBHOOK_ID}`;
  const p = "./functions/server/assets/generated";

  const {
    hash,
    tokenId,
    account,
  }: { hash: string; tokenId: string; account: string } = req.body;
  const data = new FormData();

  const r: {
    data: {
      image: string;
      attributes: Array<{
        trait_type: string;
        value: string;
      }>;
    };
  } = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`);

  const svg: { data: string } = await axios.get(r.data.image);

  const [pattern, primary, secondary]: Array<{
    trait_type: string;
    value: string;
  }> = r.data.attributes;

  await fs.promises.writeFile(`${p}/#${tokenId}.svg`, svg.data);

  await sharp(`${p}/#${tokenId}.svg`)
    .png()
    .toFile(`${p}/#${tokenId}.png`)
    .then(function (info) {
      console.log(info);
    })
    .catch(function (err) {
      throw err;
    });

  data.append("file", fs.createReadStream(`${p}/#${tokenId}.png`));

  data.append(
    "payload_json",
    j({
      tokenId,
      account,
      img: hash,
      pattern: pattern.value,
      primary: primary.value,
      secondary: secondary.value,
    })
  );

  try {
    await axios.post(url, data, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    });
  } catch (error) {
    console.error(error);
  }

  await fs.promises.unlink(`${p}/#${tokenId}.svg`);
  await fs.promises.unlink(`${p}/#${tokenId}.png`);
  res.status(200).json("ok");
}

const j = ({
  tokenId,
  account,
  pattern,
  primary,
  secondary,
}: {
  tokenId: string;
  account: string;
  img: string;
  pattern: string;
  primary: string;
  secondary: string;
}): string => {
  const o = {
    embeds: [
      {
        title: `Check out #${tokenId} on opensea`,
        url: `https://opensea.com/CONTRACT/${tokenId}`,
        description: `Minted by: ${account}`,
        color: parseInt(primary, 16),
        fields: [
          {
            name: "Pattern",
            value: pattern,
            inline: true,
          },
          {
            name: "Primary",
            value: primary,
            inline: true,
          },
          {
            name: "Secondary",
            value: secondary,
            inline: true,
          },
        ],
        thumbnail: {
          url: `attachment://${tokenId}.png`,
        },
      },
    ],
  };

  return JSON.stringify(o);
};
