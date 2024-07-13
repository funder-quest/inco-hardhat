// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/abstracts/EIP712WithModifier.sol";

import "fhevm/lib/TFHE.sol";

contract RandomPhoto is EIP712WithModifier("RandomPhoto", "1") {
    event RandomNumber(uint8 number);

    function getRandomPhoto(uint8 photosN, uint8[] memory mintedPhotos) public view returns (uint8) {
        require(photosN > 0, "Put a positive number of photos");
        require(mintedPhotos.length < photosN, "Minted photos cant be more than the photos");
        uint8 randomPhoto;
        bool found = false;

        while (!found) {
            euint8 enumber = TFHE.randEuint8();
            uint8 rnd = TFHE.decrypt(enumber);
            randomPhoto = rnd % photosN;

            // Check if the randomly generated photo is not in the mintedPhotos array
            bool isInMintedPhotos = false;
            for (uint8 i = 0; i < mintedPhotos.length; i++) {
                if (mintedPhotos[i] == randomPhoto) {
                    isInMintedPhotos = true;
                    break;
                }
            }

            if (!isInMintedPhotos) {
                found = true;
            }
        }

        return randomPhoto;
    }
}
