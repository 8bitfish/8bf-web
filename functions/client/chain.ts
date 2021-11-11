import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BitFish from "../../contracts/BitFish.json";
import { TypeContract, TypeWeb3 } from "../../global";

declare let window: any;

type Networks = "4" | "5777" | "80001";

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else if (window.web3) {
    window.web3 = new Web3(window.ethereum);
  } else {
    throw new Error(
      "Non-Ethereum browser detected. You should consider trying MetaMask"
    );
  }
};

const loadBlockchainData = async (): Promise<{
  web3: TypeWeb3;
  accounts: Array<string>;
  contract: TypeContract;
}> => {
  const { web3, ethereum } = window;
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const networkId: Networks = await web3.eth.net.getId();
  const networkData = BitFish.networks[networkId];
  if (networkData) {
    const { abi } = BitFish;
    const { address } = networkData;
    const contract = new web3.eth.Contract(abi as AbiItem[], address);
    return { web3, accounts, contract };
  } else {
    throw new Error("Smart contract not deployed to detected network");
  }
};

export { loadWeb3, loadBlockchainData };
