'use client'
import React, {useState} from 'react'

;

const WasteList = () => {


  
  return (
    <div>
      <WasteFilter onSearch={handleSearch} />
      {/* {error && <ErrorAlert message={error} clear={clearmessage} />}
      {success && <OnSuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />} */}
        <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {/* {getWasteLength()} */}
          </div>
      </div>
    </div>
  )
}

export default WasteList

// mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8