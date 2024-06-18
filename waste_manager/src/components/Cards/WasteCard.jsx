import React, {useCallback} from 'react'

import { truuncateAddress } from '@/utils/index';




const WasteCard = ({ waste }) => {
  
  console.log(waste)
console.log(waste?.weight)

  return (
    <div className='max-w-md m-auto text-white bg-[#06102b] rounded-lg w-72 drop-shadow-2xl p-2'>
      
      
        <>
          <div className=' pl-2'>
            <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste?.wasteAdmin)}</span></h1>
          </div>
          <div className='pl-2 text-center'>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste?.depositor}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste?.wasteType}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste?.collectionLocation}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste?.weight}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Payment Status <br /> <span className=' text-white text-sm'>{waste?.isPaid? "Yes Paid" : "Not paid"}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {waste?.wasteAmount}</span></p>
            <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste?.hospitalAddress)}</span></p>
          </div>
          <div className=' flex justify-center items-center'>
            <button className=' bg-white py-2 px-2 rounded-lg font-medium text-blue-700 hover:text-white hover:bg-[#efae07] mt-5 mb-5'>Transfer Payment</button>
          </div>
        </>
        
    </div>
  )
}

export default WasteCard
