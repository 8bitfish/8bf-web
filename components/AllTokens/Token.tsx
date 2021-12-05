import React from "react";
import Image from "next/image";
import { Token as TokenType } from "../../global";

export const Token = ({ description, image, name, attributes }: TokenType) => {
  return (
    <div>
      <img
        className="rounded-lg"
        src={image}
        alt="test"
        width="50px"
        height="50px"
      />
      {/* <p className="text-white">{name.split("8BitFish")[1]}</p> */}

      {/* <Image src={image} alt="image" /> */}
    </div>
  );
};
