import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { createInstances } from "../test/instance";
import { Signers, getSigners } from "../test/signers";
import { FhevmInstances } from "../test/types";

task("task:mint")
  .addParam("mint", "Tokens to mint")
  .addParam("account", "Specify which account [alice, bob, carol, dave]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;
    const RandomPhoto = await deployments.get("RandomPhoto");
    const signers = await getSigners(ethers);

    const instances = await createInstances(RandomPhoto.address, ethers, signers);

    const encryptedERC20 = await ethers.getContractAt("RandomPhoto", RandomPhoto.address);

    await encryptedERC20
      .connect(signers[taskArguments.account as keyof Signers])
      .mint(instances[taskArguments.account as keyof FhevmInstances].encrypt32(+taskArguments.mint));

    console.log("Mint done: ", taskArguments.mint);
  });
