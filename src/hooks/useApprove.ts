import { useCallback } from 'react'

import useDefo from './useDefo'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../defo/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const defo = useDefo()
  const masterChefContract = getMasterChefContract(defo)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
