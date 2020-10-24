import {useCallback} from 'react'

import useDefo from './useDefo'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getDefoContract,
  getXDefoStakingContract
} from '../defo/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const defo = useDefo()
  const lpContract = getDefoContract(defo)
  const contract = getXDefoStakingContract(defo)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
