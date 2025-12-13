require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.19",
  networks: {
    // mạng Hardhat tích hợp sẵn của Hardhat
    hardhat: {
      chainId: 31337,        // giúp MetaMask & script hoạt động ổn định
    },
    // mạng local blockchain khi chạy: npx hardhat node
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  }
};
