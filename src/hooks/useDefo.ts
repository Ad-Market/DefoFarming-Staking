import { useContext } from 'react'
import { Context } from '../contexts/DefoProvider'

const useDefo = () => {
  const { defo } = useContext(Context)
  return defo
}

export default useDefo
