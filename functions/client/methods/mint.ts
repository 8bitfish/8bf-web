import { Receipt, TypeContract, TypeWeb3 } from "./../../../global.d";
import axios from "axios";
import { getPrice } from "../utils";

export const mint: Function = async ({
  contract,
  account,
  web3,
}: {
  contract: TypeContract;
  account: string;
  web3: TypeWeb3;
}) => {
  const tokenId = Number(await contract.methods.totalSupply().call()) + 1;
  if (tokenId > 8000) {
    throw new Error("Token ID exceeds 8000.");
  }
  const { data } = await axios.get(`/api/requestNewToken/${tokenId}`);
  const { hash, imageHash, uri } = data;
  const eth: string = getPrice(tokenId);

  const errorValues: any = {
    "-32700": {
      standard: "JSON RPC 2.0",
      message:
        "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
    },
    "-32600": {
      standard: "JSON RPC 2.0",
      message: "The JSON sent is not a valid Request object.",
    },
    "-32601": {
      standard: "JSON RPC 2.0",
      message: "The method does not exist / is not available.",
    },
    "-32602": {
      standard: "JSON RPC 2.0",
      message:
        "Invalid method parameter(s). Did you switch you address without refreshing?",
    },
    "-32603": {
      standard: "JSON RPC 2.0",
      message: "Internal JSON-RPC error.",
    },
    "-32000": {
      standard: "EIP-1474",
      message: "Invalid input.",
    },
    "-32001": {
      standard: "EIP-1474",
      message: "Resource not found.",
    },
    "-32002": {
      standard: "EIP-1474",
      message: "Resource unavailable.",
    },
    "-32003": {
      standard: "EIP-1474",
      message: "Transaction rejected.",
    },
    "-32004": {
      standard: "EIP-1474",
      message: "Method not supported.",
    },
    "-32005": {
      standard: "EIP-1474",
      message: "Request limit exceeded.",
    },
    "4001": {
      standard: "EIP-1193",
      message: "User rejected the request.",
    },
    "4100": {
      standard: "EIP-1193",
      message:
        "The requested account and/or method has not been authorized by the user.",
    },
    "4200": {
      standard: "EIP-1193",
      message:
        "The requested method is not supported by this Ethereum provider.",
    },
    "4900": {
      standard: "EIP-1193",
      message: "The provider is disconnected from all chains.",
    },
    "4901": {
      standard: "EIP-1193",
      message: "The provider is disconnected from the specified chain.",
    },
  };

  const res = await contract.methods
    .mint(hash, uri)
    .send({
      from: account,
      value: web3.utils.toWei(eth, "ether"),
    })
    .once("transactionHash", (hash: string) => {
      console.log(hash);
    })
    .on("confirmation", (confNumber: string, receipt: object) => {
      console.log(confNumber);
      console.log(receipt);
    })
    .then(
      async (
        receipt: Receipt
      ): Promise<{ hash: string; receipt: Receipt; eth: string }> => {
        return { hash, receipt, eth };
      }
    )
    .catch(async (e: { code: number; message: string }): Promise<never> => {
      await await axios
        .post(`/api/removePin`, { json: hash, img: imageHash })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
      throw new Error(errorValues[e.code.toString()].message);
    });

  return res;
};
