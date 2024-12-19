import * as wasm from "zisk-eth-client-wasm";

self.onmessage = async function(e) {
    if (e.data && e.data.input) {
        console.log("Input received in worker, length: " + e.data.input.byteLength);
        const inputU8Array = new Uint8Array(e.data.input);
        let block_hash = wasm.execute_block(inputU8Array);
        postMessage(block_hash);
    } else {
        console.error("No input received in worker");
    }
};