mod utils;

use rsp_client_executor::{io::ClientExecutorInput, ClientExecutor, EthereumVariant};
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn execute_block(input: &[u8]) -> Vec<u8> {
    set_panic_hook();

    let input_len = input.len();
    browser_log(format!("Executing block, input size: {}", input_len));

    if input_len == 0 {
        browser_log("input buffer is empty".to_string());
        return Vec::new();
    }
    
    let executor_input = bincode::deserialize::<ClientExecutorInput>(&input).unwrap();
    let block_number = executor_input.current_block.number;

    browser_log(format!("Executing block {}", executor_input.current_block.number)); 

    // Execute the block.
    let executor = ClientExecutor;
    let header = executor
        .execute::<EthereumVariant>(executor_input)
        .expect("failed to execute client");

    // Calculate block hash    
    let block_hash = header.hash_slow();
      
    // Print block number and calculated hash  
    browser_log(format!("block number: {}, hash: {}\n", block_number, block_hash));    

    block_hash.to_vec()
}

/// Logs a string to the browser's console
fn browser_log(log_msg: String) {
    console::log_1(&log_msg.into());
}

