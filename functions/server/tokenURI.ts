import { Colors } from "../../global";
import { generateURI } from "./utils/uri";
import { pin } from "./ipfs/pin";

export async function tokenURI({
  tokenId,
  colors,
  pattern,
  svg,
}: {
  tokenId: string | string[];
  colors: Colors;
  pattern: string;
  svg: Buffer;
}) {
  let pinataApiKey: string;
  let pinataSecretApiKey: string;

  if (process.env.NEXT_PUBLIC_PINATA_API_KEY) {
    pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  } else {
    throw new Error("PINATA_API_KEY environment variable is not set");
  }

  if (process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY) {
    pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  } else {
    throw new Error("PINATA_SECRET_API_KEY environment variable is not set");
  }

  const { image, imageHash }: { image: string; imageHash: string } =
    await pin.file({
      tokenId,
      pinataApiKey,
      pinataSecretApiKey,
      svg,
    });

  const data = {
    tokenId,
    image,
    pattern,
    colors,
  };

  const { meta } = await generateURI({ data });

  const { hash, uri } = await pin.json({
    tokenId,
    meta,
    pinataApiKey,
    pinataSecretApiKey,
  });

  return { hash, imageHash, uri };
}
