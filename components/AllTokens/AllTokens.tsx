import React from "react";
import { Token as TokenType } from "../../global";
import { TokenContainer } from "./TokenContainer";
import { Token, Tokens } from ".";

export const AllTokens = ({ tokens }: { tokens: TokenType[] }) => {
  return (
    <TokenContainer>
      <Tokens>
        {tokens.map((token: TokenType, index: number) => (
          <Token key={index} {...token} />
        ))}
      </Tokens>
    </TokenContainer>
  );
};
