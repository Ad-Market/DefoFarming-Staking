import { useCallback } from 'react'

import useDefo from './useDefo'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../defo/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const defo = useDefo()
  const masterChefContract = getMasterChefContract(defo)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, defo],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
