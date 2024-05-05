# Hello WeR1

Welcome to the demo application for WeR1, this is meant to give you a brief idea of my skills.

## Running

1. Node 22+
2. Install [bun](https://bun.sh/) `npm install -g bun`
3. Run `bun i` to install dependencies
3. Set the following environmental variables
   - `ACR_TOKEN` this should be set to the personal access token from [ACRCloud](https://console.acrcloud.com/account?region=eu-west-1#/developer). The token requires just `read-metadata` permissions. The variable should be set without `bearer`.
   - `PORT` this is the port to run the server on. It is _optional_ and if omitted will default to 4000.
   - `ACCESS_TOKEN_SECRET` this can be set to anything, it is just for the JWT token signing which is a demo in this.
4. Run `bun run start` to compile and launch the server and access it on http://localhost:4000/graphql (unless you changed the config)

The _graphql-queries_ folder has examples of the queries which can be run.

The following video can give guidance on how to use the system too

<video width="320" height="240" controls>
  <source src="./docs/demo.mov" type="video/mp4">
</video>

## Testing

If you have everything setup, you can run `bun test`

## Design Notes

- I decided to use bun as the runtime for this since it makes working with TypeScript much easier and it is so much faster than node. Also the errors are nicer.

- The document provided said it could be dockerised, and I have not done that because it was optional and also because adding a _DOCKERFILE_ is not massively complex and the time to benefit trade-off for me, lands that I would rather produce a better full solution for you to understand my skills.

- DB for this is PouchDB which is a local DB which can work with CouchDB. I just wanted a pure local filesystem solution. Obviously a real system would have something far better for production.

- The DB layer creates the index each time just to make it easier to run. In a prod system, I would pull that out into scripts that run on creation and save spin up cycles.

- In the requirements, point 5 is "Include proper error handling and response status codes for GraphQL endpoints" and most of this is handled by the Apollo engine anyway, but there are cases where there is a design decision to be made. For example with updating/deleting, what should happen when an invalid ID is provided. One approach could be to return a 404 which is what I would do in a RESTFul system; but in this I chose to always return successfully and return nothing if it does not exist. This is for me, closer to the way I believe GraphQL should work; but this is a design approach and one to be discussed by a team.

- What about exceptions and how should they be handled? At this point they are intentionally left as is, so that it is clear on the cause. This could be potentially exposing internal data (a known OWASP top 10), but without context on how this will be used, it is not clear the severity. If this is internal, then the severity is minimal and the benefit greater. If this is public facing, then the risk increases and they should be handled.

- PouchDb search is case-sensitve, so I have put in a simple check for artist/title to prevent duplicates. In a final system design, I would look at either a better search or a normalised index to cater for this.

- Not everything is covered by unit tests, some reasonings for places traded off not doing them for time. Time is a key factor as next week I am at [DevConf](https://www.devconf.co.za) and do not want to only get this back to you after that:
   - auth.checker is just wrapping other code which is tested in the right signature; a test could ensure it does not deviate in future but for an assessment, not key to worry.
   - Anything that is just types/classes/interfaces
   - Core startup stuff like index; mostly cause testing the server start is what other tests like a E2E could do. I do think I would refactor that for a prod system to make setup more testable.
   - Some of the database code. Find + in memory for pouchdb has odd issues with unit tests which I just do not have enough time to resolve. Rather give you 36 examples of validation now, than more in 2 weeks.

