import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { getSigners } from "../test/signers";

task("task:deployERC20").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers = await getSigners(ethers);
  const erc20Factory = await ethers.getContractFactory("RandomPhoto");
  const encryptedERC20 = await erc20Factory.connect(signers.alice).deploy();
  await encryptedERC20.waitForDeployment();
  console.log("RandomPhoto deployed to: ", await encryptedERC20.getAddress());
});
