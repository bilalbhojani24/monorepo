## Setup 
1. Make sure to complete initial setp from doc https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3810758604/How+to+use+New+Design+System
2. update /etc/hosts with entry `127.0.0.1 observability-local.bsstag.com`
3. create `.npmrc` file from contents of `.npmrc.sample`
4. Create certs folder under `apps/o11y` folder
5. install turbo globally `npm install turbo --global`
6. install `pnpm` globally `npm install -g pnpm`
7. run `pnpm run build:dev-package` command on root to build utils, hooks and design system
8. run `turbo run dev --filter o11y` to start
9. open url https://observability-local.bsstag.com:9000/

## Mocker Setup

1. Clone api mocker repo https://github.com/browserstack/api-mocker
2. Setup api mocker via readme
3. checkout branch `testops_static_data`
4. start api-mocker