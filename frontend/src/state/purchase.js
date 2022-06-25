export const purchase = ({
  royaltyContractInstance,
  id,
  amount,
  address
}) => {
  royaltyContractInstance.methods.purchase(parseInt(id)).send(
    {
      from: address,
      value: amount
    },
    (err, res) => {
      if (!err) {
        console.log("woo!");
      } else {
        console.log(err);
      }
    }
  );
};
