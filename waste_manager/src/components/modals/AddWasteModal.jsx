import React, { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
// import Aptoscli

export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);
export const moduleAddress =
  "0xd99bbc55db025316c59a08c65a53c528bd5949da98b83a30335751a7172c8d16";

const AddWasteModal = () => {
  const [name, setName] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [collectionLocation, setCollectionLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  // to open the modal state
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState("");
  const [waste, setWaste] = useState([]);
  const [accountHasList, setAccountHasList] = useState(false);
  const [transactionInProgress, setTransactionInProgress] =
    useState(false);

  const { account, signAndSubmitTransaction } = useWallet();

  // const fetchWaste = async () => {
  //   if (!account) return [];
  //   try {
  //     const wasteListItems = await aptos.getAccountResource({
  //       accountAddress: account?.address,
  //       resourceType: `${moduleAddress}::waste_insure::WasteList`,
  //     });
  //     console.log(wasteListItems)
  //     setAccountHasList(true);

  //     // handle table
  //     const tableHandle = wasteListItems.waste.handle;
  //     // get the counter
  //     const wasteCount = wasteListItems.waste_count;
  //     console.log("waste_count", wasteCount)
  //     let wastes = [];
  //     let counter = 1;
  //     while (counter <= wasteCount) {
  //       const tableItem = {
  //         key_type: "u64",
  //         value_type: `${moduleAddress}::waste_insure::Waste`,
  //         key: `${counter}`,
  //       };
  //       console.log(tableItem)
  //       const wasteTable = await aptos.getTableItem({
  //         handle: tableHandle,
  //         data: tableItem,
  //       });
  //       wastes.push(wasteTable);
  //       console.log(wasteTable);
  //       counter++;
  //     }
  //     setWaste(wastes);
  //   } catch (error) {
  //     console.log(error);
  //     setAccountHasList(false);
  //   }
  // };

  // to check if the form is filled
  const isFormFilled =
    name &&
    wasteType &&
    collectionLocation &&
    weight &&
    wasteAmount &&
    hospitalAddress;

  // clear the form when the form is filed
  const handleClear = () => {
    setName("");
    setWasteType("");
    setCollectionLocation("");
    setWeight("");
    setWasteAmount(0);
    setHospitalAddress("");
  };

  const addList = async () => {
    if (!account) return;
    setTransactionInProgress(true);

    const transaction = {
      data:{
        function:`${moduleAddress}::waste_insure::create_list`,
        functionArguments:[]
      }
    }

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({transactionHash:response.hash});
      setAccountHasList(true);
    } catch (error) {
      setAccountHasList(false);
    } finally {
      setTransactionInProgress(false);
    }
  }

  const addWaste = async (e) => {
    e.preventDefault();
    if (!account) return [];
    setTransactionInProgress(true);
    const transaction = {
      data: {
        function: `${moduleAddress}::waste_insure::register_waste`,
        // type_arguments: [],
        functionArguments: [
          wasteType,
          collectionLocation,
          weight,
          wasteAmount,
          hospitalAddress,
        ],
      },
    };

    const payload =  {
      type: "entry_function_payload",
      function: `${moduleAddress}::waste_insure::register_waste`,
      type_arguments: [],
      arguments: [
        wasteType,
        collectionLocation,
        weight,
        wasteAmount,
        hospitalAddress,
      ],
    }

    const latestId = waste.length > 0 ? parseInt(waste[waste.length - 1].wast_id) + 1 : 1;
    const newWasteToPush = {
      address: account.address,
      wasteType: wasteType,
      collectionLocation: collectionLocation,
      weigth: weight,
      isRecorded: true,
      isValidated: false,
      isPaid: false,
      wasteAmount: wasteAmount,
      hospitalAddress: hospitalAddress,
      wast_id: latestId + "",
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash:response.hash})
      
      let newWaste = [...waste]

      newWaste.push(newWasteToPush)
      setWaste(newWaste)
      handleClear();
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  // useEffect(() => {
  //   fetchWaste();
  // }, [account?.address]);
  // console.log(waste)

  return (
    <div className="flex mb-10">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Submit Waste
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <button onClick={addList}>Add List</button>
            <form onSubmit={addWaste}>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteType"
                  id="wasteType"
                  placeholder="Depositor Full Name"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setWasteType(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteType"
                  id="wasteType"
                  placeholder="WasteType"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setCollectionLocation(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="collectionLocation"
                  id="collectionLocation"
                  placeholder="Hospital Location"
                />
              </div>

              <div className="mb-8">
                <input
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteKg"
                  id="wasteKg"
                  placeholder="Waste Kg"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setWasteAmount(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteAmount"
                  id="wasteAmount"
                  placeholder="Waste Amount"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setHospitalAddress(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="hospitaladdress"
                  id="hospitalAddress"
                  placeholder="Hospital wallet Address"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  // disabled={!!loading || !isFormFilled || !recordWaste}
                >
                  {loading ? loading : "Record Waste"}
                </button>
                <button type="button" onClick={() => setToggle(false)}>
                  <IoCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWasteModal;

// "address" : "0x0452F805d508DDBbE95Da610b507033fa6807a77",
