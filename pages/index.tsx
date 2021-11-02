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
import { mint, withdraw } from "../functions/client/methods";
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
    setLoading(true);
    setError(null);
    try {
      const res = await mint({
        contract,
        account,
        web3,
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
    const usd: { data: { USD: number } } = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
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
      from: "0xcfb1f4a1689517dbe78de50090513c05cd6997a1",
      transactionHash: receipt.transactionHash,
      price: {
        gas: receipt.gasUsed,
        eth: Number(eth) + receipt.gasUsed / Math.pow(10, 9),
        usd:
          Math.ceil(
            usd.data.USD *
              (Number(eth) + receipt.gasUsed / Math.pow(10, 9)) *
              100
          ) / 100,
      },
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
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      connect();
    });

    window.ethereum.on("networkChanged", (networkId: string) => {
      connect();
    });
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
        {/* <button onClick={() => withdraw({ contract, account })}>withdraw</button> */}
      </LandingContainer>

      <Footer />
    </MainContainer>
  );
};

export default Home;
