import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
export const Footer = (): JSX.Element => {
  return (
    <div className="w-full py-3 text-center">
      <p className="text-[#808080] font-semibold text-xs">
        Built and developed by{" "}
        <a
          href="https://github.com/paul-bokelman"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300/80 hover:text-blue-300 transition duration-200 group"
        >
          Paul Bokelman
          <IoMdArrowRoundForward
            className="transform group-hover:-rotate-45 rotate-0
            inline relative bottom-[1px] transition duration-150"
          />
        </a>
      </p>
    </div>
  );
};
