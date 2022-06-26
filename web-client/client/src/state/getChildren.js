export const getChildren = ({ royaltyContractInstance, address, id }) => {
  let childrenSoftware = [];
  royaltyContractInstance.methods
    .getChildren()
    .call()
    .then((result) => {
      for (let i = 0; i < result; i++) {
        const software = await new Promise((resolve, reject) => {
          royaltyContractInstance.methods.getSoftwareDetails(result[parseInt(i)]).call(
            {
              from: address,
            }, (err, res) => {
              if (!err) {
                resolve({
                  owner: res[0],
                  id: res[1],
                  parent: res[2],
                  children: res[3],
                  price: res[4],
                  uri: res[5]
                })
              } else {
                console.log(err)
              }
            })
        })
        childrenSoftware.push(software);
      }
    });

    return childrenSoftware;
};
