import React from "react";
import { Main } from "./item/Main";
import { ItemContainer } from "./item/Container";
import { MetaData, TransactionData } from "../../global";

export const Item = ({
  mint,
  connect,
  loading,
  connected,
  error,
  data,
}: {
  mint: () => Promise<void>;
  connect: () => Promise<void>;
  loading: boolean;
  connected: boolean;
  error: Error | null;
  data: {
    totalSupply: number;
    token: MetaData;
    transaction: TransactionData;
  };
}): JSX.Element => {
  return (
    <ItemContainer
      mint={mint}
      connect={connect}
      connected={connected}
      loading={loading}
      error={error}
      totalSupply={data.totalSupply}
    >
      <Main data={data} />
    </ItemContainer>
  );
};
