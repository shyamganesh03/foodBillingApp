import React, { useContext, useState } from 'react'

const ParamsContext = React.createContext()

export const ParamsProvider = ({ children }) => {
  const [params, setParams] = useState({})

  return (
    <ParamsContext.Provider value={{ params, setParams }}>
      {children}
    </ParamsContext.Provider>
  )
}

export const useParams = () => {
  return useContext(ParamsContext)
}
