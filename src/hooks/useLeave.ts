import {useCallback} from 'react'

import useDefo from './useDefo'
import {useWallet} from 'use-wallet'

import {leave, getXDefoStakingContract} from '../defo/utils'

const useLeave = () => {
  const {account} = useWallet()
  const defo = useDefo()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXDefoStakingContract(defo),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, defo],
  )

  return {onLeave: handle}
}

export default useLeave
