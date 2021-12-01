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
