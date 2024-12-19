# Wasm Zisk Ethereum Client

## Requirements

- `rust` (https://www.rust-lang.org/tools/install)
- `wasm-pack` (https://rustwasm.github.io/wasm-pack/installer/)
- `nodejs` and `npm` (https://nodejs.org/en/download/package-manager)

## Build (web page)
Build wasm package (this will create `pkg` folder):
```bash
wasm-pack build
```

Install `npm` dependencies for local development web server:
```bash
cd www
npm install
```

Open a new terminal to run de development web server. Running the server in a new terminal lets us leave it running in the background, and doesn't block us from running other commands in the meantime. In the new terminal, run this command from the `www` folder:

```bash
npm run start
```

Navigate your Web browser to http://localhost:8080/ 

## Build (nodejs)
Build wasm package for `nodejs` (this will create `node/pkg` folder):
```bash
wasm-pack build --target nodejs --out-dir node/pkg
```

Install `npm` dependencies:
```bash
cd node
npm install
```

Run `execute-block` from `node` directory passing as argument the input file of the block to execute:
```bash
node execute-block.js ../data/16424145.bin
```
