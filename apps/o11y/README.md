## Setup 
1. Make sure to complete initial setp from doc https://browserstack.atlassian.net/wiki/spaces/ENG/pages/3810758604/How+to+use+New+Design+System
2. update /etc/hosts with entry `127.0.0.1 observability-local.bsstag.com`
3. create `.npmrc` file from contents of `.npmrc.sample`
4. create `.env` file from contents of `.env.sample`
5. Create certs folder under `apps/o11y` folder
6. install turbo globally `npm install turbo --global`
7. install `pnpm` globally `npm install -g pnpm`
8. run `pnpm run build:dev-package` command on root to build utils, hooks and design system
9. run `turbo run dev --filter o11y` to start
10. open url https://observability-local.bsstag.com:9000/

## Using .env
#### `BSTACK_STAGE`
To be used to define signInUrl, apiUrl and cookiePrefix used in `interceptor.js` and `App.jsx`

Default Value: `local`

Possible Values: 

`local-staging`: defines api-url of staging

`devtestops, dev-staging, staging`: for staging signInUrl, apiUrl and cookiePrefix

```
const STAGING_CONFIG = (envName) => ({
  cookiePrefix: `${envName}__`,
  signInUrl: `https://${envName}.bsstag.com/users/signin`,
  apiUrl: 'https://devtestops-api.bsstag.com'
});
```

`preprod`: for preprod signInUrl, apiUrl and cookiePrefix
```
cookiePrefix: 'preprod__',
signInUrl: 'https://preprod.bsstag.com/users/signin',
apiUrl: 'https://api-observability-preprod.bsstag.com'
```

`production`: for production signInUrl, apiUrl and cookiePrefix
```
cookiePrefix: '',
signInUrl: 'https://browserstack.com/users/signin',
apiUrl: 'https://api-observability.browserstack.com'
```

## Mocker Setup

1. Clone api mocker repo https://github.com/browserstack/api-mocker
2. Setup api mocker via readme
3. checkout branch `testops_static_data`
4. start api-mocker