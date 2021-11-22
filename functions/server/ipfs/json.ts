import axios from "axios";
import { MetaData } from "../../../global";

export async function json({
  tokenId,
  meta,
  pinataApiKey,
  pinataSecretApiKey,
}: {
  tokenId: string | string[];
  meta: MetaData | any;
  pinataApiKey: string;
  pinataSecretApiKey: string;
}): Promise<{ hash: string; uri: string }> {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const gateway = "https://gateway.pinata.cloud/ipfs/";
  // const data = await meta;

  try {
    const r = await axios.post(url, meta, {
      maxContentLength: Infinity,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
    const hash = r.data.IpfsHash;
    return {
      hash,
      uri: `${gateway}${hash}`,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
