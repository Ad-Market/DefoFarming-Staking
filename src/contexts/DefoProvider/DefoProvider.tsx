import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Defo } from '../../defo'

export interface DefoContext {
  defo?: typeof Defo
}

export const Context = createContext<DefoContext>({
  defo: undefined,
})

declare global {
  interface Window {
    defosauce: any
  }
}

const DefoProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [defo, setDefo] = useState<any>()

  // @ts-ignore
  window.defo = defo
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const defoLib = new Defo(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setDefo(defoLib)
      window.defosauce = defoLib
    }
  }, [ethereum])

  return <Context.Provider value={{ defo }}>{children}</Context.Provider>
}

export default DefoProvider
