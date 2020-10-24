import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../defo/utils'
import useDefo from './useDefo'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const defo = useDefo()
  const masterChefContract = getMasterChefContract(defo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, defo])

  useEffect(() => {
    if (account && masterChefContract && defo) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, defo])

  return balance
}

export default useEarnings
