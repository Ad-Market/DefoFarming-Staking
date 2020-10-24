import {useCallback} from 'react'

import useDefo from './useDefo'
import {useWallet} from 'use-wallet'

import {enter, getXDefoStakingContract} from '../defo/utils'

const useEnter = () => {
  const {account} = useWallet()
  const defo = useDefo()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXDefoStakingContract(defo),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, defo],
  )

  return {onEnter: handle}
}

export default useEnter
