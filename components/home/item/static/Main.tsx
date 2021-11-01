import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import { AttributeGroup } from "./AttributeGroup";
import { p } from "../../../../functions/server/assets/patterns/patternExport";
import { getShades } from "../../../../functions/server/utils/shades";
import { getPrice } from "../../../../functions/client/utils";
import { IoMdArrowRoundForward } from "react-icons/io";

interface tokenData {
  svg: string;
  pattern: string;
  primary: string;
  secondary: string;
  // colors: { primary: string; secondary: string };
}

export const Main = ({ totalSupply }: { totalSupply: number }): JSX.Element => {
  const [currentUSD, setCurrentUSD] = useState<number>(3213);
  const [currentEth, setCurrentEth] = useState<number>(0.0);
  const [token, setToken] = useState<tokenData>({
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 350 350">
    <defs>
      <linearGradient id="linear-gradient" x2="1" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#d6f5ff"/>
        <stop offset="1" stop-color="#d8d6ff"/>
      </linearGradient>
    </defs>
    <g id="Group_204" data-name="Group 204" transform="translate(5973 -6760)">
      <g id="Group_200" data-name="Group 200" transform="translate(711 6378)">
        <rect id="Rectangle_819" data-name="Rectangle 819" width="350" height="350" transform="translate(-6684 382)" fill="url(#linear-gradient)"/>
        <g id="Group_180" data-name="Group 180" transform="translate(-112.285 -11)">
          <g id="Group_178" data-name="Group 178" transform="translate(-12281.82 309.725)">
            <path id="Union_21" data-name="Union 21" d="M59.393,141.158H-11V118.539H37.715V102.883H59.393v20.633H77.085v17.642Zm37.379-17.642H77.085V100.561H91.463V88.223H92.79V68.591h19.687v54.925ZM41.7,35.288h-23V17.646H24V0H59.4V35.288Z" transform="translate(5905.058 187.275)" fill="#2a23a6" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <path id="Union_24" data-name="Union 24" d="M88.473,23.582H35.388V20.614H0V0H129.838V20.614H106.169v2.968Z" transform="translate(5840.584 272.53)" fill="#169cc4" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <path id="Union_20" data-name="Union 20" d="M35.388,92.873H-6V75.227H53.085V92.873ZM94.113,75.227H70.781V55.257H85.819V15.988h15.374V0h22.673V39.938h-17.7V75.227Z" transform="translate(5893.669 217.918)" fill="#2f27b8" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <path id="Union_19" data-name="Union 19" d="M17.7,141.157V123.516H0V105.869H17.7v17.647H35.388v17.641Zm85.819-88.223V35.288h2.654V17.646h35.393V35.288h-17.7V52.934ZM35.388,35.288H17.7V17.646H53.084V35.288Zm17.7-17.642V0h17.7V17.646Z" transform="translate(5875.973 187.275)" fill="#342bca" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <path id="Union_22" data-name="Union 22" d="M183.918,52.934V35.293h0V52.934h-19.7V40.155H139.676V52.934H0V31.643H19.351V13.566h23v-.1H68.9V30.5h40.921V13.466H127.51V0h59.062V16.651h15.037V52.934Zm-4.314-19.3V20.3H169.538V33.634Z" transform="translate(5780.533 222.563)" fill="#1bc3f5" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <path id="Union_23" data-name="Union 23" d="M88.473,52.935h-17.7V35.293h35.393V52.935Zm17.7-17.641V17.647h17.7V35.293Zm-70.781,0H0V10.48H53.084V35.293Zm88.477-17.647V0h17.692V17.647Z" transform="translate(5840.584 222.563)" fill="#18b0dd" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <path id="Union_18" data-name="Union 18" d="M17.7,52.935V35.293H0V17.646H35.393V0h88.472V17.646H53.084v8.823H35.393V52.935ZM141.562,17.646h-17.7V0H159.25V17.646Z" transform="translate(5752.107 222.563)" fill="#1ed7ff" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <rect id="Rectangle_572" data-name="Rectangle 572" width="17.692" height="17.646" transform="translate(5787.5 240.209)" fill="#040505"/>
          </g>
          <g id="Group_179" data-name="Group 179" transform="translate(425.285 715.8)">
            <path id="Union_134" data-name="Union 134" d="M8771.764-2260.079v-17.694h17.7v17.694Zm35.387-17.694v-17.694h17.7v17.694Zm-70.774,0v-17.694h17.689v17.694Zm35.388-17.694v-35.392h17.7v35.392Zm-70.781,0v-35.392h17.7v35.392Zm-53.085,0v-17.7h17.7v17.7Z" transform="translate(-15602.897 2147.247)" fill="#1978f5" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            <g id="Group_176" data-name="Group 176" transform="translate(-8647.897 2330.858)">
              <path id="Union_133" data-name="Union 133" d="M8789.461-2260.076v-35.389h17.691v35.389Zm-70.78-17.7v-17.691h17.7v17.691Zm-70.783,0v-17.691h17.7v17.691Zm106.17-17.691v-35.394h17.7v35.394Zm-70.775,0v-17.7h17.69v17.7Z" transform="translate(-6901.915 -183.612)" fill="#1c84ff" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
              <path id="Union_132" data-name="Union 132" d="M8718.675-2260.077v-17.7h17.7v17.7Zm-70.778,0v-17.7h17.693v17.7Zm106.173-35.388v-35.4h17.69v35.4Zm-106.173-17.7v-17.7h17.693v17.7Z" transform="translate(-6866.522 -183.612)" fill="#176cdd" stroke="rgba(0,0,0,0)" stroke-miterlimit="10" stroke-width="1"/>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `,
    pattern: "pattern_4",
    primary: "#FFF610",
    secondary: "#4B2998",
  });

  let currentPrice: string = useMemo(
    () => getPrice(totalSupply + 1),
    [totalSupply]
  );

  const currencies = useCallback(async () => {
    const usd: { data: { USD: number } } = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );

    setCurrentUSD(usd.data.USD);
    setCurrentEth(Number(currentPrice));
  }, [totalSupply]);

  const getToken = async (): Promise<void> => {
    const tokenData = async () => {
      const color = (): string => {
        const hex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        if (hex.length < 7) {
          return color();
        }
        return hex;
      };

      const { primary, secondary } = getShades([color(), color()]);
      const keys = Object.keys(p);
      const pattern = keys[Math.floor(Math.random() * keys.length)];
      return {
        svg: p[pattern]({ primary, secondary }),
        pattern,
        colors: { primary, secondary },
      };
    };

    const { svg, pattern, colors } = await tokenData();
    setToken({
      svg,
      pattern,
      primary: colors.primary.base,
      secondary: colors.secondary.base,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getToken();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    currencies();
  }, [currencies]);

  return (
    <div className="relative flex flex-col md:flex-row md:items-start items-center">
      <div className="relative md:mr-4">
        <div className="md:hidden flex flex-row items-center justify-between">
          <h2 className="md:text-[30px] text-[20px] font-bold text-white">
            8BitFish
          </h2>
          <p className="text-[10px] text-[#ffffff9c] font-semibold">
            {8000 - totalSupply} / 8000 left at {currentPrice}Ξ each
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
      </div>

      <div className="flex flex-col md:mt-0 mt-0.5 bg-white bg-opacity-[0.02] rounded-lg px-4 md:py-2 pb-2 md:h-[215px]">
        <h2 className="hidden md:inline md:text-[30px] text-[20px] font-bold text-white">
          8BitFish
        </h2>

        <div className="flex flex-row md:my-1 my-3">
          <OpenSeaLink />
          <TokenFee currentEth={currentEth} currentUSD={currentUSD} />
        </div>
        <p className="md:m-0 -mt-1 md:text-[15px] text-[11.5px] text-[#ffffff9c] font-bold">
          Completely randomized algorithmically generated 8-bit fish with
          exactly <span style={{ color: token.primary }}>2251799813685248</span>{" "}
          <span style={{ color: token.secondary }}>combinations</span>.
        </p>
        <AttributeGroup
          primary={token.primary}
          secondary={token.secondary}
          pattern={token.pattern}
        />
      </div>
    </div>
  );
};

const OpenSeaLink = (): JSX.Element => (
  <div className="relative mr-1 mt-0 flex items-center md:justify-center cursor-pointer rounded-md md:px-1 px-2 text-[#ffffff9c] bg-white/5 border-2 border-white/10 bg-opacity-10 hover:text-[#ffffffc6] hover:border-white/30 group">
    <a
      href="https://opensea.io/assets/CONTRACT_ADDRESS/"
      className="text-[10px] font-semibold"
    >
      opensea
      <IoMdArrowRoundForward
        className="absolute transform group-hover:-rotate-45
            inline -top-1 -right-1 transition duration-150"
      />
    </a>
  </div>
);

const TokenFee = ({
  currentEth,
  currentUSD,
}: {
  currentEth: number;
  currentUSD: number;
}): JSX.Element => {
  const [currency, setCurrency] = useState<boolean>(true);

  return (
    <div
      className="mt-0 flex items-center justify-center md:px-1 px-2 cursor-pointer rounded-md text-[#ffffff9c] bg-white/5 border-2 border-white/10 bg-opacity-10"
      onClick={() => setCurrency(!currency)}
    >
      <p className="text-[10px] font-semibold">
        token fee:{" "}
        {currency
          ? `${currentEth}Ξ`
          : `$${Math.ceil((currentUSD * currentEth * 100) / 100)}`}
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
