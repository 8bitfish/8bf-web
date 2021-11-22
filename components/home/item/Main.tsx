import React, { useState, useEffect } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
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
  const { transactionHash } = transaction;

  return (
    <div className="relative flex flex-col md:flex-row md:items-start items-center">
      <div className="relative md:mr-4">
        <div className="md:hidden flex flex-row items-center justify-between">
          <h2 className="md:text-[30px] text-[20px] font-bold text-white">
            8bitfish #{tokenId}
          </h2>
          <p className="text-[10px] text-[#ffffff9c] font-semibold">
            {8000 - Number(tokenId)} / 8000 left at {getPrice(Number(tokenId))}{" "}
            MATIC each
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
          <Transaction hash={transactionHash} />
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

const Transaction = ({ hash }: { hash: string }) => {
  return (
    <div className="relative mr-1 mt-0 flex items-center md:justify-center cursor-pointer rounded-md md:px-1 px-2 text-[#ffffff9c] bg-white/5 border-2 border-white/10 bg-opacity-10 hover:text-[#ffffffc6] hover:border-white/30 group">
      <a
        href={`https://polygonscan.com/tx/${hash}`}
        className="text-[10px] font-semibold"
      >
        tx on polyscan
        <IoMdArrowRoundForward
          className="absolute transform group-hover:-rotate-45
            inline -top-1 -right-1 transition duration-150"
        />
      </a>
    </div>
  );
};
