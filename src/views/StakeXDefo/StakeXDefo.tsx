import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import Spacer from '../../components/Spacer'
import useDefo from '../../hooks/useDefo'
import {getContract} from '../../utils/erc20'
import UnstakeXDefo from './components/UnstakeXDefo'
import StakeDefo from "./components/StakeDefo";

import {contractAddresses} from '../../defo/lib/constants'
import {getXDefoSupply} from "../../defo/utils";
import BigNumber from "bignumber.js";
import {getBalanceNumber} from "../../utils/formatBalance";

const StakeXDefo: React.FC = () => {
  const {
    tokenAddress,
  } = {
    tokenAddress: contractAddresses.xDefo[3],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  const defo = useDefo()
  const {ethereum} = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getXDefoSupply(defo)
      setTotalSupply(supply)
    }
    if (defo) {
      fetchTotalSupply()
    }
  }, [defo, setTotalSupply])



  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXDefo
              lpContract={lpContract}
            />
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StakeDefo
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              ℹ️️ You will earn a portion of the swaps fees based on the amount
              of xDefo held relative the weight of the staking. xDefo can be minted
              by staking Defo. To redeem Defo staked plus swap fees convert xDefo
              back to Defo. {totalSupply ? `There are currently ${getBalanceNumber(totalSupply)} xDEFO in the whole pool.` : '' }
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg"/>
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeXDefo
