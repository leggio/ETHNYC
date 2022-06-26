export const mintTopLevelSoftware = ({
  royaltyContractInstance,
  address,
  uri,
  name
}) => {
  royaltyContractInstance.methods.mintTopLevelSoftware(address, uri, name).send(
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
