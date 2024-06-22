
module waste_addr::waste_manage {
    use aptos_framework::account;
    use aptos_framework::event;
    
    use std::string::String;
    use aptos_std::table::{Self, Table};
    use std::signer;


    
    #[event]
    struct Waste has store, drop, copy {
        wast_id: u64,
        wasteAdmin: address,
        wasteType: String,
        collectionLocation: String,
        weight: u64,
        isRecorded: bool,
        isValidated: bool,
        isPaid: bool,
        wasteAmount: u64,
        hospitalAddress: address,
    }

    struct WasteList has key {
        waste: Table<u64, Waste>,
        set_waste_event: event::EventHandle<Waste>,
        waste_count: u64
    }

     const E_NOT_INITIALIZED: u64 = 1;
    const EWASTE_DOESNT_EXIST: u64 = 2;
    const EWASTE_IS_VALIDATED: u64 = 3;
    
    
    public entry fun create_list(account: &signer) {
        let waste_holder = WasteList {
            waste: table::new(),
            set_waste_event: account::new_event_handle<Waste>(account),
            waste_count: 0
        };
        move_to(account, waste_holder);
    }

    

    public entry fun register_waste(account: &signer, wasteType: String, collectionLocation: String,
    weight: u64, wasteAmount: u64, hospitalAddress: address) acquires WasteList {
        let signer_address = signer::address_of(account);
        assert!(exists<WasteList>(signer_address), E_NOT_INITIALIZED);

        let waste_list = borrow_global_mut<WasteList>(signer_address);
        let counter = waste_list.waste_count + 1;

        let new_record_waste = Waste {
            wast_id: counter,
            wasteAdmin: signer_address,
            wasteType,
            collectionLocation,
            weight,
            isRecorded: true,
            isValidated: false,
            isPaid: false,
            wasteAmount,
            hospitalAddress,
        };

        table::upsert(&mut waste_list.waste, counter, new_record_waste);

        waste_list.waste_count = counter;
       event::emit(new_record_waste);

    }

    public entry fun validate_waste(account: &signer, waste_id: u64) acquires WasteList {
        let signer_address = signer::address_of(account);
        assert!(exists<WasteList>(signer_address), E_NOT_INITIALIZED);

        let waste_list = borrow_global_mut<WasteList>(signer_address);
        assert!(table::contains(&waste_list.waste, waste_id), EWASTE_DOESNT_EXIST);
        // get the task that math the id 
        let waste_track = table::borrow_mut(&mut waste_list.waste, waste_id);
        // check if the waste is not validated yet 
        assert!(waste_track.isValidated == false, EWASTE_IS_VALIDATED);
        // let waste_record = table::borrow_mut(&mut waste_list.waste, waste_id);
        // validate the waste
        waste_track.isValidated = true;
    }




}