import { Deployer, Reporter } from '@solarity/hardhat-migrate'

import { UniswapV3Staker__factory } from '../typechain'

const ONE_MINUTE_SECONDS = 60
const ONE_HOUR_SECONDS = ONE_MINUTE_SECONDS * 60
const ONE_DAY_SECONDS = ONE_HOUR_SECONDS * 24
const ONE_MONTH_SECONDS = ONE_DAY_SECONDS * 30
const ONE_YEAR_SECONDS = ONE_DAY_SECONDS * 365

// 2592000
const MAX_INCENTIVE_START_LEAD_TIME = ONE_MONTH_SECONDS
// 1892160000
const MAX_INCENTIVE_DURATION = ONE_YEAR_SECONDS * 2

export = async (deployer: Deployer) => {
  const v3CoreFactoryAddress = process.env.V3_FACTORY_ADDRESS!
  const nonFungibleTokenPositionManagerAddress = process.env.NONFUNGIBLE_TOKEN_POSITION_MANAGER_ADDRESS!

  const v3Staker = await deployer.deploy(UniswapV3Staker__factory, [
    v3CoreFactoryAddress,
    nonFungibleTokenPositionManagerAddress,
    MAX_INCENTIVE_START_LEAD_TIME,
    MAX_INCENTIVE_DURATION,
  ])

  Reporter.reportContracts(['UniswapV3Staker', v3Staker.address])
}
