export const mintTopLevelSoftware = ({
  royaltyContractInstance,
  address,
  uri,
  name
}: any) => {
  royaltyContractInstance.methods.mintTopLevelSoftware(address, uri, name).send(
    {
      from: address,
    },
    (err: any, res: any) => {
      if (!err) {
        console.log("woo!");
      } else {
        console.log(err);
      }
    }
  );
};
