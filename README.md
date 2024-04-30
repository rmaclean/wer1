# Hello WeR1

Welcome to the demo application for WeR1, this is meant to give you a brief idea of my skills.

## Running

### Requirements

1. Node 20+
2. Run `npm ci` to install dependencies
3. Set the following environmental variables
   - `ACR_TOKEN` this should be set to the personal access token from [ACRCloud](https://console.acrcloud.com/account?region=eu-west-1#/developer). The token requires just `read-metadata` permissions. The variable should be set without `bearer`.
   - `PORT` this is the port to run the server on. It is _optional_ and if omitted will default to 4000.
4. Run `npm run start` to compile and launch the server

The _graphql-queries_ folder has examples of the queries which can be run.

## Design Notes

- To get this going quickly I used [gts](https://github.com/google/gts) to scaffold the system. I went with this because it gives me a npm based solution which I felt had the lowest barrier for entry. If I was doing this in a production system, I likely would have used [bun](https://bun.sh/) thanks to its native TypeScript support, templates and performance. Same is true for eslint, not my ideal config but just quicker to get running with it.

- The document provided said it could be dockerised, and I have not done that because it was optional and also because adding a _DOCKERFILE_ is not massively complex and the time to benefit trade-off for me, lands that I would rather produce a better full solution for you to understand my skills.

- DB for this is PouchDB which is a local DB which can work with CouchDB. I just wanted a pure local filesystem solution. Obviously a real system would have something far better for production.

- The DB layer creates the index each time just to make it easier to run. In a prod system, I would pull that out into scripts that run on creation and save spin up cycles.
