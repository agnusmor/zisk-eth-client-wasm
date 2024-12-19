async function run() {
    try {
        const worker = new Worker(new URL('./worker.js', import.meta.url));

        // Add an event listener to the file picker input element
        document.getElementById('file_picker').addEventListener(
            'change',
            async function() {
                console.log('File picker change event');
                let file = this.files[0];
                
                if (!file) {
                    console.warn('No file selected');
                    return;
                } else {
                    console.log('File selected: ' + file.name);
                }

                const input = await readFileAsArrayBuffer(file);

                // Send message to the worker to execute block using input buffer
                worker.postMessage({ input: input });
                
                // Process the message response from the worker
                worker.onmessage = function(e) {
                    const outputDiv = document.getElementById('output');

                    // Clear the output div content
                    outputDiv.innerHTML = '';

                    // Convert the block_hash response from the worker to a hexadecimal string
                    const block_hash = '0x' + Array.from(new Uint8Array(e.data.buffer))
                        .map(byte => byte.toString(16).padStart(2, '0')) // Convert each byte to a 2-digit hexadecimal number
                        .join(''); // Join the array of hexadecimal numbers into a single string

                    // Add the block_hash in the output div
                    logOutput(block_hash);                       
                };
            },
            false
        );
    } catch (error) {
        logOutput('Error running block executor: ' + error);
    }
}

// Add message to the output div
function logOutput(message) {
    const outputDiv = document.getElementById('output');
    const outputLine = document.createTextNode(message);
    outputDiv.appendChild(outputLine);
    outputDiv.appendChild(document.createElement('br'));

    console.log(message);
}

// Helper function to read the file as an ArrayBuffer using a Promise
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file as ArrayBuffer'));

        reader.readAsArrayBuffer(file);
    });
}

run();
