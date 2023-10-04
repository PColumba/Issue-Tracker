Basic setup for node application with Typescript and:
- Prettier
- ESLint
- Jest (ts-jest)
- tsx (Executes typescript directly using esbuild for fast transpilation)
- docker compose for local development
- docker file for production deployment

### How to:

#### Run in docker environment
This will run `npm run dev` inside docker container with node.

Compose V2 (as docker plugin):
`docker compose up`

Compose V1:
`docker-compose up`

#### Run in dev mode
`npm run dev`
Note: this will use tsx and tsx does only transpilation and no typechecking!

#### Run js build files
`npm start`

#### Run tests
`npm run test`

#### Build js files
`npm run clean && npm run build`

#### Build docker image based on Dockerfile
`docker build .`

#### Prettify
`npm run pf` to apply changes
`npm run pf:check` to check for possible changes

#### Lint
`npm run lint`

### Caveats

#### Prettier and ESLint
These are done separately as recommended by prettier docs. 
In orther to avoid any clashes between prettier and ESLint rules, 
the `eslint-config-prettier` package provides a way to disable conficting rules.
Common alternative is to run prettier as ESLint plugin but this is discouraged.

#### Path aliasing
This setup uses path aliasing according to `paths` section in `tsconifg.json`. 
It allows to reference any module inside src by it's full path rather then relaying on relative paths.
For it to work properly during compilation additional package `tsc-alias` needs to be used.
`Tsx` will do this automatically and `ts-jest` relies on `moduleNameMapper` property in `jest.config.js`

#### Config files: tsconfig.json and tsconfig.build.json
This split into two files is needed to ensure proper typehints in the editor across the project files (both src and test folders) whilst 
simultanously limiting build artifacts to include only source files.