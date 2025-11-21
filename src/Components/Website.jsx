import React from 'react'
import { useParams } from 'react-router-dom'

const Website = () => {
const {id} = useParams()

  return (
    <div>
     <h1>
         Website page {id}
        </h1>
    </div>
  )
}

export default Website
