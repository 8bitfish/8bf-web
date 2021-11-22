export const getPrice = (tokenId: number | null): string => {
  let currentPrice: string;
  if (tokenId === null) {
    currentPrice = "0.00";
  } else {
    if (tokenId < 100) {
      currentPrice = "0.00";
    } else if (tokenId < 1000) {
      currentPrice = "26.655567288447756";
    } else if (tokenId < 7000) {
      currentPrice = "79.96670186534327";
    } else if (tokenId < 8000) {
      currentPrice = "213.24453830758205";
    } else {
      currentPrice = "213.24453830758205";
    }
  }

  return currentPrice;
};
