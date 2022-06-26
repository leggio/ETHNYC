export const mintSoftware = ({
  royaltyContractInstance,
  address,
  uri,
  parent,
  price,
  name
}) => {
  royaltyContractInstance.methods
    .mintSoftware(address, parent, price, uri, name)
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
