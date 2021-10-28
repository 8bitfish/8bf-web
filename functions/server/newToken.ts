import fs from "fs";
import { getShades } from "./utils/shades";
import { p } from "./assets/patterns/patternExport";
import { tokenURI } from "./tokenURI";
import { Shades } from "../../global";

export const tokenData = async () => {
  const colors = (): string => {
    const hex: string = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (hex.length < 7) {
      return colors();
    }
    return hex;
  };

  const { primary, secondary }: Shades = getShades([colors(), colors()]);
  const keys = Object.keys(p);
  const pattern = keys[Math.floor(Math.random() * keys.length)];
  return {
    svg: p[pattern]({ primary, secondary }),
    pattern,
    colors: { primary, secondary },
  };
};
export async function newToken({
  tokenId,
  keys,
}: {
  tokenId: string | string[];
  keys: { [key: string]: string | undefined };
}): Promise<{ hash: string; imageHash: string; uri: string }> {
  const {
    svg,
    pattern,
    colors,
  }: { svg: string; pattern: string; colors: Shades } = await tokenData();

  const assetDir: string = `./functions/server/assets/generated`;

  try {
    await fs.promises.writeFile(`${assetDir}/#${tokenId}.svg`, svg);
  } catch (e) {
    console.log(e);
    throw e;
  }

  const {
    hash,
    imageHash,
    uri,
  }: { hash: string; imageHash: string; uri: string } = await tokenURI({
    tokenId,
    colors,
    pattern,
    keys,
  });

  return { hash, imageHash, uri };
}
