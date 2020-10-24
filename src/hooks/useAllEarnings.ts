import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../defo/utils'
import useDefo from './useDefo'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const defo = useDefo()
  const farms = getFarms(defo)
  const masterChefContract = getMasterChefContract(defo)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, defo])

  useEffect(() => {
    if (account && masterChefContract && defo) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, defo])

  return balances
}

export default useAllEarnings
