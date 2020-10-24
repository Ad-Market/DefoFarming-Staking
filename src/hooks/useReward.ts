import { useCallback } from 'react'

import useDefo from './useDefo'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../defo/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const defo = useDefo()
  const masterChefContract = getMasterChefContract(defo)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, defo])

  return { onReward: handleReward }
}

export default useReward
