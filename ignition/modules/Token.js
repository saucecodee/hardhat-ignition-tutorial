const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy", (m) => {
  const token = m.contract("Token", []);

  m.call(token, "balanceOf", ['0x23d919Ce336E1a56eA66c4421416acD6Ba26e246']);

  return { token };
});