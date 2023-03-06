## Setup 

1. update /etc/hosts with entry `127.0.0.1 observability-local.bsstag.com`
2. Create certs folder under `apps/o11y` folder
3. install turbo globally `npm install turbo --global`
4. run `pnpm run build:dev-package` command on root to build utils, hooks and design system
5. run `turbo run dev --filter o11y` to start
6. open url https://observability-local.bsstag.com:9000/