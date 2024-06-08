import React, {useCallback} from 'react'
import { ethers } from 'ethers'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { useReadContract, useWriteContract, useSimulateContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { truuncateAddress } from '@/utils/index';
import { wasteInsure } from '@/abi/wasteInsured'
import { getWallet } from '@/utils/getwallet'
import { utils, BrowserProvider } from 'zksync-ethers'
import { Generatepayment } from '@/abi/GeneralPayment'



const WasteCard = ({id, setError, setLoading, clear, searchQuery}) => {
  
  


  return (
    <div className='max-w-md m-auto text-white bg-[#06102b] rounded-lg w-72 drop-shadow-2xl p-2'>
      
      {address == waste.wassetWasteAdmin ? (
        <>
          <div className=' pl-2'>
            <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste.producer)}</span></h1>
          </div>
          <div className='pl-2 text-center'>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste.depositor}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste.wasteType}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste.collectionLocation}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.weight}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Payment Status <br /> <span className=' text-white text-sm'>{waste.isPaid? "Yes Paid" : "Not paid"}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {convertWasteAmount}</span></p>
            <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste.hospitalAdress)}</span></p>
          </div>
          <div className=' flex justify-center items-center'>
            <button className=' bg-white py-2 px-2 rounded-lg font-medium text-blue-700 hover:text-white hover:bg-[#efae07] mt-5 mb-5' onClick={payment}>Transfer Payment</button>
          </div>
        </>
        ) : <>
            <div className=' pl-2'>
              <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste.producer)}</span></h1>
            </div>
            <div className='pl-2 text-center'>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste.depositor}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste.wasteType}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste.collectionLocation}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.weight}</span> </p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Payment Status <br /> <span className=' text-white text-sm'>{waste.isPaid? "Yes Paid" : "Not paid"}</span> </p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {convertWasteAmount}</span></p>
              <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste.hospitalAdress)}</span></p>
            </div>
        </>
      }
    </div>
  )
}

export default WasteCard
