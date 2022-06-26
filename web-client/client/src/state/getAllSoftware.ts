export const getAllSoftware = ({ royaltyContractInstance, address }: any) => {
  let allSoftware: any[] = [];
  royaltyContractInstance.methods.getAllSoftware()
    .call({
      from: address
    },
    (err: any, res: any) => {
      if (!err) {
        console.log("woo!")
      } else {
        console.log(err);
      }
    })
    // .then(async (result: any) => {
    //   for (let i = 0; i < result; i++) {
    //     const software = await new Promise((resolve, reject) => {
    //       royaltyContractInstance.methods.getSoftwareDetails(i).call(
    //         {
    //           from: address,
    //         }, (err: any, res: any) => {
    //           if (!err) {
    //             resolve({
    //               owner: res[0],
    //               id: res[1],
    //               parent: res[2],
    //               children: res[3],
    //               price: res[4],
    //               uri: res[5],
    //               name: res[6]
    //             })
    //           } else {
    //             console.log(err)
    //           }
    //         })
    //     })
    //     allSoftware.push(software);
    //   }
    // });

    // return allSoftware;
};
