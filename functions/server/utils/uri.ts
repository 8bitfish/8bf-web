import { Shades } from "../../../global";

interface URI {
  pinataMetadata: { name: string };
  pinataContent: {
    description: string;
    image: string;
    name: string;
    attributes: Array<{
      display_type?: string;
      trait_type: string;
      value: string | number;
    }>;
  };
}

export async function generateURI({
  data: { tokenId, image, pattern, colors },
}: {
  data: {
    tokenId: string | string[];
    image: string;
    pattern: string;
    colors: Shades;
  };
}): Promise<{ meta: string }> {
  const meta: URI = {
    pinataMetadata: { name: `8BF #${tokenId}` },
    pinataContent: {
      description: `Mr. Number ${tokenId} is a unique algorithmically generated fish swimming around on the blockchain!`,
      image,
      name: `8BitFish #${tokenId}`,
      attributes: [
        {
          trait_type: "Pattern",
          value: pattern,
        },
        {
          trait_type: "Primary color",
          value: colors.primary.base,
        },
        {
          trait_type: "Secondary color",
          value: colors.secondary.base,
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: Date.now(),
        },
      ],
    },
  };

  return {
    meta: JSON.stringify(meta),
  };
}
