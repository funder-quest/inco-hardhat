import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { createInstances } from "../test/instance";
import { Signers, getSigners } from "../test/signers";
import { FhevmInstances } from "../test/types";

task("task:rp")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;
    const RandomPhoto = await deployments.get("RandomPhoto");
    const signers = await getSigners(ethers);


    const contract = await ethers.getContractAt("RandomPhoto", RandomPhoto.address);

    const singer = signers[taskArguments.account as keyof Signers];
    await contract
      .connect(singer)
      .getRandomPhoto(25, [12, 1, 22]);
    // .mint(instances[taskArguments.account as keyof FhevmInstances].encrypt32(+taskArguments.mint));

    console.log("==========", signer.decrypt(await contract.getAddress(), contract))
    console.log("Mint done: ", taskArguments.mint);
  });
