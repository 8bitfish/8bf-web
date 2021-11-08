import { Colors } from "../../global";
import { generateURI } from "./utils/uri";
import { pin } from "./ipfs/pin";

export async function tokenURI({
  tokenId,
  colors,
  pattern,
  keys,
}: {
  tokenId: string | string[];
  colors: Colors;
  pattern: string;
  keys: { [key: string]: string | undefined };
}) {
  const { pinataApiKey, pinataSecretApiKey } = keys;

  const { image, imageHash }: { image: string; imageHash: string } =
    await pin.file({
      tokenId,
      pinataApiKey,
      pinataSecretApiKey,
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
