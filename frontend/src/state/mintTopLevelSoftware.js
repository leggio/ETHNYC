export const mintTopLevelSoftware = ({
  royaltyContractInstance,
  address,
  uri,
}) => {
  royaltyContractInstance.methods.mintTopLevelSoftware(address, uri).send(
    {
      from: address,
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
