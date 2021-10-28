import React from "react";
import { CgSpinner } from "react-icons/cg";
import { BiErrorAlt } from "react-icons/bi";
export const ItemContainer = ({
  children,
  totalSupply,
  loading,
  connected,
  error,
  mint,
  connect,
}: {
  children: React.ReactChild;
  totalSupply: number;
  loading: boolean;
  connected: boolean;
  error: Error | null;
  mint: () => Promise<void>;
  connect: () => Promise<void>;
}): JSX.Element => {
  const tokenId = totalSupply === null ? totalSupply + 1 : 0;
  let currentPrice: string;

  if (tokenId < 100) {
    currentPrice = "0.00";
  } else if (tokenId < 1000) {
    currentPrice = "0.01";
  } else if (tokenId < 7000) {
    currentPrice = "0.03";
  } else if (tokenId < 8000) {
    currentPrice = "0.08";
  } else {
    currentPrice = "0.08";
  }

  return (
    <div className="relative flex flex-col md:items-center items-start">
      <p className="hidden md:inline text-[10px] text-[#ffffff9c] font-semibold md:mb-0 mb-2">
        {8000 - totalSupply} / 8000 left at {currentPrice}Ξ each
      </p>
      <div className="md:px-3 md:py-2 rounded-xl md:w-[41.5rem] w-[80vw] border-[0px] md:border-[0px] border-[#2A2A2A]">
        {children}
      </div>

      <button
        disabled={loading ? true : false}
        className={`${
          loading
            ? "cursor-not-allowed text-[#888888] bg-[#888888] "
            : `cursor-pointer ${
                connected
                  ? "text-[#69FF97] bg-[#69FF97]"
                  : "text-white/60 bg-white/10"
              } `
        } md:mt-2 mt-2 py-1 md:px-9 md:w-auto w-full rounded-lg font-semibold uppercase md:text-sm text-xs bg-opacity-25 transition duration-200`}
        onClick={connected ? mint : connect}
      >
        {loading ? (
          <CgSpinner className="animate-spin h-4 w-4 md:mx-1.5 mx-auto" />
        ) : (
          <>{connected ? "Mint new token" : "Connect with metamask"}</>
        )}
      </button>

      {!!error ? (
        <div className="absolute -bottom-8">
          <p className="text-red-400 text-center text-sm">
            <BiErrorAlt className="relative inline mr-1 bottom-[1px]" />
            Error: {error.message}
          </p>
        </div>
      ) : null}
    </div>
  );
};
