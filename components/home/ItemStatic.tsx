import React from "react";
import { Main } from "./item/static/Main";
import { ItemContainer } from "./item/Container";

export const ItemStatic = ({
  totalSupply,
  connect,
  loading,
  connected,
  error,
}: {
  totalSupply: number;
  connect: () => Promise<void>;
  loading: boolean;
  connected: boolean;
  error: Error | null;
}): JSX.Element => {
  return (
    <ItemContainer
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
