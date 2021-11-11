import React, { useState, useEffect } from "react";
// import axios from "axios";
import type { MetaData, TransactionData } from "../../../global";
import Image from "next/image";
import { AttributeGroup } from "./AttributeGroup";
import { ExternalButtons } from "./External";
import { getPrice } from "../../../functions/client/utils";

export const Main = ({
  data: { token, transaction },
}: {
  data: { token: MetaData; transaction: TransactionData };
}): JSX.Element => {
  const { svg, tokenId, colors, pattern, ipfsHash, description } = token;
  const { from, transactionHash, price } = transaction;
  const { eth, usd } = price;

  return (
    <div className="relative flex flex-col md:flex-row md:items-start items-center">
      <div className="relative md:mr-4">
        <div className="md:hidden flex flex-row items-center justify-between">
          <h2 className="md:text-[30px] text-[20px] font-bold text-white">
            8bitfish #{tokenId}
          </h2>
          <p className="text-[10px] text-[#ffffff9c] font-semibold">
            {8000 - Number(tokenId)} / 8000 left at {getPrice(Number(tokenId))}Ξ
            each
          </p>
        </div>
        <div className="md:w-[215px] md:h-[215px] w-[80vw] overflow-hidden rounded-md">
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            width={215}
            height={215}
            layout="responsive"
            alt="Fish"
          />
        </div>
      </div>

      <div className="flex flex-col md:mt-0 bg-white bg-opacity-[0.02] rounded-lg px-4 md:py-2 pb-2 md:h-[215px]">
        <h2 className="hidden md:inline md:text-[30px] text-[20px] font-bold text-white">
          8bitfish #{tokenId}
        </h2>

        <div className="flex flex-row md:my-1 my-3">
          <ExternalButtons id={tokenId} hash={ipfsHash} />
          <Transaction eth={eth} usd={usd} />
        </div>

        <p className="md:m-0 -mt-1 md:text-[15px] text-[11.5px] text-[#ffffff9c] font-bold">
          {description}
        </p>
        <AttributeGroup
          hash={ipfsHash}
          tokenId={tokenId}
          colors={colors}
          pattern={pattern}
        />
      </div>
    </div>
  );
};

const Transaction = ({ eth, usd }: { eth: number; usd: number }) => {
  const [currency, toggleEth] = useState(true);
  return (
    <div
      className="mt-0 flex items-center justify-center md:px-1 px-2 cursor-pointer rounded-md text-[#ffffff9c] bg-white/5 border-2 border-white/10 bg-opacity-10 "
      onClick={() => toggleEth(!currency)}
    >
      <p className="text-[10px] font-semibold">
        {currency ? `${eth}Ξ` : `$${usd}`}
      </p>
      <div className="relative">
        <span className="absolute md:left-[9px] left-[13px] -bottom-2 w-0.5 h-4 rounded-full bg-white/10 inline-block" />
        <span
          className={`${
            !currency ? "translate-y-4" : "translate-y-0"
          } transform  absolute md:left-2 left-3 bottom-1.5 w-1 h-1 transition duration-200 rounded-full bg-white/60 inline-block`}
        />
      </div>
    </div>
  );
};
