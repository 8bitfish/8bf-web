import axios from "axios";
// @ts-ignore
import FormData from "form-data";

export async function file({
  tokenId,
  pinataApiKey,
  pinataSecretApiKey,
  svg,
}: {
  tokenId: string | string[];
  pinataApiKey: string;
  pinataSecretApiKey: string;
  svg: Buffer;
}): Promise<{ image: string; imageHash: string }> {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const gateway = "https://gateway.pinata.cloud/ipfs/";

  const data = new FormData();

  data.append("file", svg, {
    filename: `8BF #${tokenId}.svg`,
  });

  const metadata = JSON.stringify({
    name: `8BF #${tokenId}.svg`,
    keyvalues: {
      tokenId: tokenId,
    },
  });

  data.append("pinataMetadata", metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });

  data.append("pinataOptions", pinataOptions);

  try {
    const r = await axios.post(url, data, {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    const { IpfsHash } = r.data;
    return { image: `${gateway}${IpfsHash}`, imageHash: IpfsHash };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
