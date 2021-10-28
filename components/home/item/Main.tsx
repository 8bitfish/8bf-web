import React, { useState } from "react";
import type { MetaData, TransactionData } from "../../../global";
import Image from "next/image";
import { AttributeGroup } from "./AttributeGroup";
import { getPrice } from "../../../functions/client/utils";

export const Main = ({
  data: { token, transaction },
}: {
  data: { token: MetaData; transaction: TransactionData };
}): JSX.Element => {
  const [currency, toggleEth] = useState(true);
  const { svg, tokenId, colors, pattern, ipfsHash } = token;
  const { from, transactionHash, price } = transaction;
  const { eth, usd } = price;
  return (
    <div className="relative flex flex-col md:flex-row md:items-start items-center">
      <div className="relative md:mr-4">
        <div className="md:hidden flex flex-row items-center justify-between">
          <h2 className="md:text-[30px] text-[20px] font-bold">
            8bitfish #{tokenId}
          </h2>
          <p className="text-[10px] text-[#686868] font-semibold">
            {8000 - Number(tokenId)} / 8000 left at {getPrice(Number(tokenId))}Ξ
            each
          </p>
        </div>
        <div className="md:w-[215px] md:h-[215px] w-[80vw] overflow-hidden rounded-md">
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(token.svg)}`}
            width={215}
            height={215}
            layout="responsive"
            alt="Fish"
          />
        </div>
        {/* <p className="hidden md:inline absolute -bottom-5 text-[10px] text-white/20">
          Fish being displayed not minted tokens.
        </p> */}
      </div>

      <div className="flex flex-col md:-mt-2 mt-0.5">
        <h2 className="hidden md:inline md:text-[30px] text-[20px] font-bold">
          8bitfish #{tokenId}
        </h2>
        <div className="flex flex-row my-1">
          <div
            className="hidden md:flex items-center justify-center px-1 cursor-pointer text-green-500 bg-green-500/10 rounded-md"
            onClick={() => toggleEth(!currency)}
          >
            <p className="text-[10px] font-semibold">
              {currency ? `${eth}Ξ` : `$${usd}`}
            </p>
            <div className="relative">
              <span className="absolute left-[6.8px] -bottom-2 w-0.5 h-4 rounded-full bg-green-500/30 inline-block" />
              <span
                className={`transform ${
                  !currency ? "translate-y-4" : "translate-y-0"
                } absolute left-1.5 bottom-1.5 w-1 h-1 transition duration-200 rounded-full bg-green-500 inline-block`}
              />
            </div>
          </div>
        </div>
        <p className="md:m-0 -mt-1 md:text-[15px] text-[11.5px] text-[#808080] font-bold">
          Mr. Number {tokenId} is a unique algorithmically generated fish
          swimming around on the blockchain!
        </p>
        <div>
          <AttributeGroup
            hash={ipfsHash}
            tokenId={tokenId}
            colors={colors}
            pattern={pattern}
          />
        </div>
      </div>
    </div>
  );
};
