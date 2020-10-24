import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../defo/utils'
import useDefo from './useDefo'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const defo = useDefo()
  const masterChefContract = getMasterChefContract(defo)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, defo])

  useEffect(() => {
    if (account && defo) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, defo])

  return balance
}

export default useStakedBalance
