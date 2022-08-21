import { CIDString } from "web3.storage";

export const Web3torage_token = process.env.NEXT_PUBLIC_WEB3_API_TOKEN || "";

export function makeGatewayURL(
    cid: CIDString | undefined,
    path: string | undefined
  ): string {
    return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path as string)}`;
}
  
export function jsonFile(filename: string, obj: object): File {
    return new File([JSON.stringify(obj)], filename);
}