import React from "react";
import Head from "next/head";
export const Seo = (): JSX.Element => {
  return (
    <Head>
      <meta
        name="description"
        content="8bitfish are completely randomized algorithmically generated pixel fish with exactly 2251799813685248 combinations."
      />
      <meta
        name="keywords"
        content="8bitfish, cryptocurrency, cryptocollectible, collectible, nft, NFT, non fungible token, 8bit, pixelfish"
      />
      <meta name="author" content="Paul Bokelman" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>8bitfish</title>
      <html lang="en" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};

export default Seo;
