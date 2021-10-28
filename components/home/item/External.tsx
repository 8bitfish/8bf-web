import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

export const ExternalButtons = ({
  id,
  hash,
}: {
  id: string;
  hash: string;
}): JSX.Element => {
  const buttons: Array<{ opensea: boolean; endpoint: string }> = [
    { opensea: true, endpoint: id },
    { opensea: false, endpoint: hash },
  ];
  return (
    <div className="flex flex-row items-center">
      {buttons.map((b, i) => (
        <External key={i} os={b.opensea} ep={b.endpoint} />
      ))}
    </div>
  );
};

const External = ({ os, ep }: { os: boolean; ep: string }) => {
  return (
    <div className="relative mr-1 mt-0 flex items-center md:justify-center cursor-pointer rounded-md md:px-1 px-2 text-[#ffffff9c] bg-white/5 border-2 border-white/10 bg-opacity-10 hover:text-[#ffffffc6] hover:border-white/30 group">
      <a
        href={
          os
            ? `https://opensea.io/assets/CONTRACT_ADDRESS/${ep}`
            : `https://gateway.pinata.cloud/ipfs/${ep}`
        }
        className="text-[10px] font-semibold"
      >
        {os ? "opensea" : "ipfs"}
        <IoMdArrowRoundForward
          className="absolute transform group-hover:-rotate-45
            inline -top-1 -right-1 transition duration-150"
        />
      </a>
    </div>
  );
};
