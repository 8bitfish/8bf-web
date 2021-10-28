import React from "react";
import Image from "next/image";
import { IoMdArrowRoundForward } from "react-icons/io";
export const AttributeGroup = ({
  primary,
  secondary,
  pattern,
}: {
  primary: string;
  secondary: string;
  pattern: string;
}): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-2">
        <div className="flex flex-col md:text-[14px] text-[11.5px] font-bold">
          <span
            style={{ color: primary, backgroundColor: `${primary}30` }}
            className="px-4 bg-opacity-30 rounded-[4px] min-w-[100px] text-center"
          >
            {primary}
          </span>
          <span
            style={{ color: secondary, backgroundColor: `${secondary}30` }}
            className="px-4 mt-1 bg-opacity-30 rounded-[4px] min-w-[100px] text-center"
          >
            {secondary}
          </span>
        </div>
        <div className="ml-1 bg-[#FFFFFF] bg-opacity-25 rounded-[4px]">
          <div className="flex md:py-2 py-1 px-8">
            {/* <Image
              src="/fish1loading.svg"
              width={56.25}
              height={30}
              layout="fixed"
              alt="Fish"
            /> */}
            <Image
              src={`/patterns/${pattern}.svg`}
              width={56.25}
              height={30}
              layout="fixed"
              alt="Fish"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
