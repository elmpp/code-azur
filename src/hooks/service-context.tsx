import React from 'react'
import { seedData } from '../data/seed-data'
import { Service } from '../data/service'

export const ServiceContext = React.createContext(new Service(seedData))
