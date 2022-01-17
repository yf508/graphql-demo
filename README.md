## Difference between REST and GraphQL

REST: server decides which data to send
GraphQL: client only requests the data needed

GraphQL is just a graph based query framework, so needs support from data storage layer, e.g. FS, DB, Opensearch etc

## Setup & Installation

``` bash
mkdir server
cd server
npm init -y
npm install express
npm i -g nodemon
```

Add app.js

## Define the schema

### schema.js

Add file schema/schema.js:

### RootQuery

RootQuery is the entry of the GraphQL

### Run

``` bash
nodemon app
```
