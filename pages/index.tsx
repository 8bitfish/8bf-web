import React, { useEffect, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import type {
  MetaData,
  Receipt,
  TransactionData,
  TypeContract,
  TypeWeb3,
} from "../global";
import { mint } from "../functions/client/methods";
import { loadWeb3, loadBlockchainData } from "../functions/client/chain";
import {
  LandingContainer,
  Item,
  ItemStatic,
  MainContainer,
} from "../components/home";
import { Navigation } from "../components/Navigation/Navigation";
import { Footer } from "../components/Footer";
import Seo from "../components/Seo";

declare let window: any;

const Home: NextPage = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [trans, setTransaction] = useState<TransactionData | null>(null);
  const [web3, setWeb3] = useState<TypeWeb3 | null>(null);
  const [contract, setContract] = useState<TypeContract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const generateToken = async (): Promise<void> => {
    const tokenId: number =
      Number(await contract!.methods.totalSupply().call()) + 1;
    setLoading(true);
    setError(null);
    try {
      const res = await mint({
        contract,
        account,
        web3,
        tokenId,
      });
      const {
        hash,
        receipt,
        eth,
      }: { hash: string; receipt: Receipt; eth: string } = res;
      contract!.methods
        .totalSupply()
        .call()
        .then((r: string) => {
          setTotalSupply(r);
        });
      return await getData({ hash, receipt, eth });
    } catch (e: any) {
      e === undefined
        ? setError({ name: "Error", message: "Unknown error" })
        : setError(e);
      setLoading(false);
    }
  };

  const getData = async ({
    hash,
    receipt,
    eth,
  }: {
    hash: string;
    receipt: Receipt;
    eth: string;
  }) => {
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`;
    const { data } = await axios.get(url);
    const { attributes, image, description } = data;
    const [pattern, primary, secondary]: Array<{
      trait_type: string;
      value: string;
    }> = attributes;
    const svg: { data: string } = await axios.get(image);
    setMeta({
      ipfsHash: hash,
      tokenId: receipt.events.Transfer.returnValues.tokenId,
      svg: svg.data,
      description: description,
      pattern: pattern.value,
      colors: {
        primary: primary.value,
        secondary: secondary.value,
      },
    });
    setTransaction({
      transactionHash: receipt.transactionHash,
    });

    setLoading(false);
  };

  const connect = async () => {
    setLoading(true);
    setError(null);
    try {
      await loadWeb3();
      const { web3, accounts, contract } = await loadBlockchainData();
      await contract.methods
        .totalSupply()
        .call()
        .then((r: string) => {
          setTotalSupply(r);
        });
      setWeb3(web3);
      setAccount(accounts[0]);
      setContract(contract);
      setConnected(true);
      setLoading(false);
    } catch (e: any) {
      e === undefined
        ? setError({ name: "Error", message: "Something went wrong" })
        : setError(e);
      setConnected(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        connect();
      });
      window.ethereum.on("networkChanged", (networkId: string) => {
        connect();
      });
    } else {
      setError({
        name: "Error",
        message:
          "Non-Ethereum browser detected. You should consider trying MetaMask",
      });
    }
  }, []);

  return (
    <MainContainer>
      <Seo />
      <Navigation connected={connected} account={account} />
      <LandingContainer>
        {meta !== null && trans !== null ? (
          <Item
            mint={async () => await generateToken()}
            connect={connect}
            connected={connected}
            loading={loading}
            error={error}
            data={{
              totalSupply: Number(totalSupply),
              token: meta,
              transaction: trans,
            }}
          />
        ) : (
          <ItemStatic
            totalSupply={Number(totalSupply)}
            mint={async () => await generateToken()}
            connect={connect}
            connected={connected}
            loading={loading}
            error={error}
          />
        )}
      </LandingContainer>
      <Footer />
    </MainContainer>
  );
};

export default Home;
