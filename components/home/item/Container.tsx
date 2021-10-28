import React from "react";
import { CgSpinner } from "react-icons/cg";
import { BiErrorAlt } from "react-icons/bi";
import { getPrice } from "../../../functions/client/utils";
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
  const currentPrice: string = getPrice(totalSupply + 1);

  return (
    <div className="relative flex flex-col md:items-center items-start">
      <p className="hidden md:inline text-[10px] text-[#ffffff9c] font-semibold md:mb-0 mb-2">
        {8000 - totalSupply} / 8000 left at {currentPrice}Ξ each
      </p>
      <div className="md:px-3 md:py-2 rounded-xl md:w-[41.5rem] w-[80vw] border-[0px] md:border-[0px] border-[#2A2A2A]">
        {children}
      </div>

      <button
        disabled={totalSupply === 8000 ? true : loading ? true : false}
        className={`${
          totalSupply === 8000
            ? "cursor-not-allowed text-white/60 bg-white/10 hover:text-red-500/90 hover:bg-red-500/20"
            : loading
            ? "cursor-not-allowed text-[#888888] bg-[#888888]"
            : `cursor-pointer text-white/60 bg-white/10 ${
                connected
                  ? "hover:text-[#69FF97] hover:bg-[#69FF97]"
                  : "hover:text-yellow-500 hover:bg-yellow-500/10"
              } `
        } md:mt-2 mt-2 py-1 md:px-9 md:w-auto w-full rounded-lg font-semibold uppercase md:text-sm text-xs hover:bg-opacity-10 transform hover:scale-105 active:scale-100 transition duration-200`}
        onClick={
          totalSupply === 8000
            ? () => alert("Maximum supply met.")
            : connected
            ? mint
            : connect
        }
      >
        {loading ? (
          <CgSpinner className="animate-spin h-4 w-4 md:mx-1.5 mx-auto" />
        ) : (
          <>
            {totalSupply === 8000
              ? "Sold out"
              : connected
              ? "Mint new token"
              : "Connect with metamask"}
          </>
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
