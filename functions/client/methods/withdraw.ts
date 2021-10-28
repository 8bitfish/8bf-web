import { TypeContract } from "./../../../global.d";
export const withdraw = async ({
  contract,
  account,
}: {
  contract: TypeContract;
  account: string;
}) => {
  await contract.methods
    .withdrawFunds()
    .send({
      from: account,
    })
    .on("transactionHash", function (hash: string) {
      console.log(hash);
    })
    .on(
      "confirmation",
      function (confirmationNumber: number, receipt: unknown) {
        console.log(confirmationNumber);
        console.log(receipt);
      }
    )
    .on("receipt", function (receipt: unknown) {
      // receipt example
      console.log(receipt);
    })
    .on("error", function (error: unknown, receipt: unknown) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log(error);
      console.log(receipt);
    });
};
