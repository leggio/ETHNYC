export const mintSoftware = ({
  royaltyContractInstance,
  address,
  uri,
  parent,
  price,
}) => {
  royaltyContractInstance.methods
    .mintSoftware(address, parent, price, uri)
    .send(
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
