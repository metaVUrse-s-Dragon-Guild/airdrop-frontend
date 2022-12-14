import Token from './contracts/ERC20.json';
import PublicSale from './contracts/PublicSale.json';
import Airdrop from './contracts/Airdrop.json';

export const tokenAddress =
  '0xe1d3c70e10bcdb2f7174741f9983f9997681989e';
export const publicSaleAddress =
    '0x67ae2d92bf2078ef917aFF6703DE339E9F029A50';
export const tokenAbi = Token.abi;
export const totalSupplyOfToken = 1000000000; 
export const publicSaleAbi = PublicSale.abi;
export const blockOfPublicSaleDeployment = 10617495;
export const etherscanKey = '84GIT36H5RB4TTPMFJ1J51GWID6334RW32';
export const publicSaleRate = 15170; 
export const publicSaleTotalTokens = 60680; 
export const rinkebyInfuraNode = 'https://rinkeby.infura.io/v3/4eadc04c11494a3e89b7a086ddebe68d';
export const rinkebyWebsocktedInfuraNode = 'wss://rinkeby.infura.io/ws/v3/35ca14aec33449b5b49900d3c41683e7';
export const rinkebyInfurSecret = '4eadc04c11494a3e89b7a086ddebe68d';
export const mainnetInfuraNode = 'https://mainnet.infura.io/v3/4eadc04c11494a3e89b7a086ddebe68d';

export const airdropAbi = Airdrop.abi;

export const nftContractAddress = '0x90b3812A2b94C97c4d058d948FED9e65CB55606d';
export const airdropContractAddress = '0xA8ee5252Ad4Be60c1e1D2A5D8BA005b6d8EFCECF';