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
import { loadWeb3, loadBlockchainData } from "../functions/client/chain";
import {
  LandingContainer,
  ItemStatic,
  MainContainer,
} from "../components/home";
import { AllTokens } from "../components/AllTokens";
import { Navigation } from "../components/Navigation/Navigation";
import { Footer } from "../components/Footer";
import Seo from "../components/Seo";
import { TokenContainer } from "../components/containers";

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

  const getTokens = async ({
    totalSupply,
  }: {
    totalSupply: string | null;
    contract: TypeContract;
  }) => {
    console.log(contract);
    const arr = Array.from({ length: Number(totalSupply) }, (_, i) => i + 1);
    console.log(arr);

    const promises = arr.map(async (i: number) => {
      const uri = await contract!.methods.tokenURI(i).call();
      const { data } = await axios.get(uri);
      console.log(data);
      return data;
    });

    const data = await Promise.all(promises);
    console.log(data);
    return data;
  };

  const connect = async () => {
    console.log("connecting");
    setLoading(true);
    setError(null);
    try {
      await loadWeb3();
      const { web3, accounts, contract } = await loadBlockchainData();
      const totalSupply = await contract.methods.totalSupply().call();
      setTotalSupply(totalSupply);
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

  // useEffect(() => {
  //   const checkAndFetch = async () => {
  //     console.log(contract, totalSupply);
  //     if (contract !== null) {
  //       await getTokens({ totalSupply, contract });
  //     }
  //   };
  //   checkAndFetch();
  // }, [contract, totalSupply]);

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

  const tokens = [
    {
      description:
        'Mr. Number 1 is a completely unique algorithmically\n      "on-the-fly" generated fish swimming around on the blockchain!',
      image:
        "https://gateway.pinata.cloud/ipfs/QmWou495RJwNoRY4kZSGkr87D2QPgBMrXvrwCXmJPCn5fU",
      name: "8BitFish #1",
      attributes: [
        {
          trait_type: "Pattern",
          value: "pattern_2",
        },
        {
          trait_type: "Primary color",
          value: "#77f24f",
        },
        {
          trait_type: "Secondary color",
          value: "#efe891",
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1637630361749,
        },
      ],
    },
    {
      description:
        'Mr. Number 2 is a completely unique algorithmically\n      "on-the-fly" generated fish swimming around on the blockchain!',
      image:
        "https://gateway.pinata.cloud/ipfs/Qmd6TCJ8cMULLqoz6jYQ5CAfC86X8eGq6vHrXosP1nrZsS",
      name: "8BitFish #2",
      attributes: [
        {
          trait_type: "Pattern",
          value: "pattern_3",
        },
        {
          trait_type: "Primary color",
          value: "#530345",
        },
        {
          trait_type: "Secondary color",
          value: "#656db9",
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1637630583735,
        },
      ],
    },
    {
      description:
        'Mr. Number 3 is a completely unique algorithmically\n      "on-the-fly" generated fish swimming around on the blockchain!',
      image:
        "https://gateway.pinata.cloud/ipfs/QmfBJKRUxgHcbZoTeCBo4Ad6Kh4ytfdDVk8b6ZqxRtmz4T",
      name: "8BitFish #3",
      attributes: [
        {
          trait_type: "Pattern",
          value: "pattern_5",
        },
        {
          trait_type: "Primary color",
          value: "#3c27e0",
        },
        {
          trait_type: "Secondary color",
          value: "#60efb5",
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1637630630007,
        },
      ],
    },
    {
      description:
        'Mr. Number 4 is a completely unique algorithmically\n      "on-the-fly" generated fish swimming around on the blockchain!',
      image:
        "https://gateway.pinata.cloud/ipfs/QmYvG6XM5hWC4tzTxD2nWPBpQdUW7AZxyf8CFvAAGEtUKp",
      name: "8BitFish #4",
      attributes: [
        {
          trait_type: "Pattern",
          value: "pattern_1",
        },
        {
          trait_type: "Primary color",
          value: "#d4368c",
        },
        {
          trait_type: "Secondary color",
          value: "#5edc79",
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1637630672246,
        },
      ],
    },
    {
      description:
        'Mr. Number 5 is a completely unique algorithmically\n      "on-the-fly" generated fish swimming around on the blockchain!',
      image:
        "https://gateway.pinata.cloud/ipfs/QmXEoMg264qFU1ST4YPAHc9XLCtpHNPM6H8sa4ts5U6UmM",
      name: "8BitFish #5",
      attributes: [
        {
          trait_type: "Pattern",
          value: "plain",
        },
        {
          trait_type: "Primary color",
          value: "#3e3d29",
        },
        {
          trait_type: "Secondary color",
          value: "#7fd804",
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1637630718477,
        },
      ],
    },
    {
      description:
        'Mr. Number 6 is a completely unique algorithmically\n      "on-the-fly" generated fish swimming around on the blockchain!',
      image:
        "https://gateway.pinata.cloud/ipfs/QmYWrqaBopn2WLsqrhHPHt8ygLMkxVcjgJVq7cVNpQWwjb",
      name: "8BitFish #6",
      attributes: [
        {
          trait_type: "Pattern",
          value: "pattern_6",
        },
        {
          trait_type: "Primary color",
          value: "#c6615e",
        },
        {
          trait_type: "Secondary color",
          value: "#dfb217",
        },
        {
          display_type: "date",
          trait_type: "birthday",
          value: 1637630804534,
        },
      ],
    },
  ];

  return (
    <MainContainer>
      <Seo />
      <Navigation connected={connected} account={account} />
      <LandingContainer>
        <ItemStatic
          totalSupply={Number(totalSupply)}
          connect={connect}
          connected={connected}
          loading={loading}
          error={error}
        />
      </LandingContainer>
      {/* <TokenContainer>
        <AllTokens tokens={tokens} />
      </TokenContainer> */}
      <Footer />
    </MainContainer>
  );
};

export default Home;
