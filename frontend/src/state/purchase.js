export const mintTopLevelSoftware = ({
  royaltyContractInstance,
  id,
  amount,
  address
}) => {
  royaltyContractInstance.methods.purchase(id).send(
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
