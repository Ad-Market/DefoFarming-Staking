import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}



export const contractAddresses = {
  defo: {
    1: '0xFCBaf6f9c56074297930034b38425f56BE20b5A2',
  },
  masterChef: {
    1: '0xE1c3c53688026BA52D255Aeb3eD5623e88aF4F56',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  xDefo: {
    1: '0xB212b2111f8a2F8123b0ed773C4b41cd6Ec0e4D4'
  }
}



export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
    tokenAddresses: {
      1: '0xFCBaf6f9c56074297930034b38425f56BE20b5A2',
    },
    name: 'Defo Rail!',
    symbol: 'DEFO-WETH',
    tokenSymbol: 'DEFO',
    icon: '💎',
  },
 
]
