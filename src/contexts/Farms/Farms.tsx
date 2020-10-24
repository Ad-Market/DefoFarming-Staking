import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useDefo from '../../hooks/useDefo'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../defo/utils'
import { getFarms } from '../../defo/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const defo = useDefo()
  const { account } = useWallet()

  const farms = getFarms(defo)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
