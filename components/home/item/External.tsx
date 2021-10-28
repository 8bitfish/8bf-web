import React, { useState } from "react";
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
    <div className="flex flex-row items-center mt-2.5">
      {buttons.map((b, i) => (
        <External key={i} os={b.opensea} ep={b.endpoint} />
      ))}
    </div>
  );
};

const External = ({ os, ep }: { os: boolean; ep: string }) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <div className={`relative md:mt-0 -mt-2 ${os ? null : "ml-2"}`}>
      <a
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        href={
          os
            ? `https://opensea.io/assets/CONTRACT_ADDRESS/${ep}`
            : `https://gateway.pinata.cloud/ipfs/${ep}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className={`filter hover:brightness-125 ${
          os ? "text-[#2081E2]" : "text-[#FF009E]"
        } rounded-md leading-0 uppercase font-bold text-[9px] transition duration-200`}
      >
        {os ? "opensea" : "ipfs"}{" "}
        <IoMdArrowRoundForward
          className={`transform ${
            isHovered ? "-rotate-45" : "rotate-0"
          } inline relative bottom-[1px] transition duration-150`}
        />
      </a>
    </div>
  );
};
