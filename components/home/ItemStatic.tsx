import React from "react";
import { Main } from "./item/static/Main";
import { ItemContainer } from "./item/Container";

export const ItemStatic = ({
  totalSupply,
  connect,
  mint,
  loading,
  connected,
  error,
}: {
  totalSupply: number;
  connect: () => Promise<void>;
  mint: () => Promise<void>;
  loading: boolean;
  connected: boolean;
  error: Error | null;
}): JSX.Element => {
  return (
    <ItemContainer
      mint={mint}
      connect={connect}
      connected={connected}
      loading={loading}
      error={error}
      totalSupply={totalSupply}
    >
      <Main totalSupply={totalSupply} />
    </ItemContainer>
  );
};
