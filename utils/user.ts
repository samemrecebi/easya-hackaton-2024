import { NFT } from "./nft";


export class User{
    readonly publicId: string;
    readonly image: string;

    constructor(
        publicId: string,
        image: string,
      ) {
        this.publicId = publicId;
        this.image = image;
    }

    private nftCollection: NFT[] = [];

}