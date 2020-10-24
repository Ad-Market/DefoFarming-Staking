import { useCallback } from 'react'

import useDefo from './useDefo'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../defo/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const defo = useDefo()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(defo),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, defo],
  )

  return { onStake: handleStake }
}

export default useStake
