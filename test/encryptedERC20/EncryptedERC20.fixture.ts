import { ethers } from "hardhat";

import type { RandomPhoto } from "../../types";
import { getSigners } from "../signers";

export async function deployEncryptedERC20Fixture(): Promise<RandomPhoto> {
  const signers = await getSigners(ethers);

  const contractFactory = await ethers.getContractFactory("RandomPhoto");
  const contract = await contractFactory.connect(signers.alice).deploy();
  await contract.waitForDeployment();

  return contract;
}
