import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
      <div>
          

          <h1 className="text-center">Path Not Available <Link to='/' className='text-blue-900 underline'>Back to Home</Link></h1>
    </div>
  )
}
