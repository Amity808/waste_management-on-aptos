'use client'
import React, {useState, useEffect, useCallback} from 'react'
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import WasteCard from '../Cards/WasteCard';

export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);
export const moduleAddress =
  "0x3384c2b172da81a170daee6f140350eecf044cd399ecf14ef16406e93249916d";

const WasteList = () => {
  const [accountHasList, setAccountHasList] = useState(false);
  const [waste, setWaste] = useState([]);
  const [transactionInProgress, setTransactionInProgress] =
    useState(false);

  const { account, signAndSubmitTransaction } = useWallet();

  const fetchWaste = useCallback(async () => {
      if (!account) return [];
      try {
      const wasteListItems = await aptos.getAccountResource({
        accountAddress: account?.address,
        resourceType: `${moduleAddress}::waste_manage::WasteList`,
      });
      console.log(wasteListItems)
      setAccountHasList(true);

      // handle table
      const tableHandle = wasteListItems.waste.handle;
      // get the counter
      const wasteCount = wasteListItems.waste_count;
      console.log("waste_count", wasteCount)
      let wastes = [];
      let counter = 1;
      while (counter <= wasteCount) {
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::waste_manage::Waste`,
          key: `${counter}`,
        };
        console.log(tableItem)
        const wasteTable = await aptos.getTableItem({
          handle: tableHandle,
          data: tableItem,
        });
        wastes.push(wasteTable);
        console.log(wasteTable);
        counter++;
      }
      setWaste(wastes);
    } catch (error) {
      console.log(error);
      setAccountHasList(false);
    }
  }
  
) 
  useEffect(() => {
    fetchWaste();
  }, [account?.address,fetchWaste]);
  console.log(waste)
  
  return (
    <div>
      {/* <WasteFilter onSearch={handleSearch} /> */}
      {/* {error && <ErrorAlert message={error} clear={clearmessage} />}
      {success && <OnSuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />} */}
        <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {waste ? waste.map((item) => (

              <WasteCard waste={item} key={item} />
            )
            ) : <><p>No waste</p></>}
          </div>
      </div>
    </div>
  )
}

export default WasteList

// mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8