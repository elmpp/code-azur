import { useContext } from 'react'
import { Service } from '../data/service'
import { ServiceContext } from './service-context'

export const useService = (): Service => {
  const service = useContext(ServiceContext)
  return service
}
