const { execute_block } = require('./pkg/wasm_zisk_eth_client.js');
const fs = require('node:fs');

async function run() {
    try {
        const args = process.argv.slice(2); // Remove the first two arguments
        
        if (args.length != 1) {
            console.error('Usage: node execute-block.js <input_file>');
            return;
        }

        // Read the input file
        const inputFile = args[0];
        const inputBuffer = fs.readFileSync(inputFile);

        // Execute the block using the input buffer
        let block_hash = execute_block(inputBuffer);        
    }
    catch (error) {
        console.error('Error running block executor:', error);
    }
}

run();