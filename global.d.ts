export type Receipt = {
  from: string;
  transactionHash: string;
  gasUsed: number;
  events: { Transfer: { returnValues: { tokenId: string } } };
};

export interface TypeContract {
  methods: {
    totalSupply: () => { call: () => Promise<string> };
    mint: (
      hash: string,
      uri: string
    ) => { send: ({ from: string, value: string }) => any };
    tokenURI: (tokenId: number) => { call: () => Promise<string> };
  };
}

export interface TypeWeb3 {
  utils: {
    toWei: (eth: string, to: "ether") => number;
  };
}

export interface MetaData {
  ipfsHash: string;
  tokenId: string;
  svg: string;
  description: string;
  pattern: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

export interface TransactionData {
  transactionHash: string;
}

export type Color = {
  base: string;
  light: string;
  maxLight: string;
  dark: string;
  maxDark: string;
  bg: string;
  hue: {
    base: string;
    light: string;
    dark: string;
  };
};

export interface Colors {
  primary: Color;
  secondary: Color;
}

// Token

type TraitType = "Pattern" | "Primary Color" | "Secondary Color";
export interface Token {
  description: string;
  image: string;
  name: string;
  attributes: [
    {
      trait_type: TraitType;
      value: string;
    },
    {
      trait_type: TraitType;
      value: string;
    },
    {
      trait_type: TraitType;
      value: string;
    },
    {
      display_type: "date";
      trait_type: "birthday";
      value: number;
    }
  ];
}
