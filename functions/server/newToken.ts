import { getShades } from "./utils/shades";
import { p } from "./assets/patterns/patternExport";
import { tokenURI } from "./tokenURI";
import { Colors } from "../../global";
import { verifyExistence } from "./firebase";

export const tokenData = async (): Promise<{
  svg: Buffer;
  pattern: string;
  colors: Colors;
}> => {
  const getColor = (): string => {
    const hex: string = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (hex.length < 7) {
      return getColor();
    }
    return hex;
  };

  const { primary, secondary }: Colors = getShades([getColor(), getColor()]);
  const keys = Object.keys(p);
  const pattern = keys[Math.floor(Math.random() * keys.length)];
  // const exists = await verifyExistence({
  //   pattern,
  //   primary: primary.base,
  //   secondary: secondary.base,
  // });

  // if (!exists) {
  //   return tokenData();
  // }

  return {
    svg: Buffer.from(p[pattern]({ primary, secondary })),
    pattern,
    colors: { primary, secondary },
  };
};
export async function newToken({
  tokenId,
}: {
  tokenId: string | string[];
}): Promise<{ hash: string; imageHash: string; uri: string }> {
  const {
    svg,
    pattern,
    colors,
  }: { svg: Buffer; pattern: string; colors: Colors } = await tokenData();

  const {
    hash,
    imageHash,
    uri,
  }: { hash: string; imageHash: string; uri: string } = await tokenURI({
    tokenId,
    colors,
    pattern,
    svg,
  });

  return { hash, imageHash, uri };
}
