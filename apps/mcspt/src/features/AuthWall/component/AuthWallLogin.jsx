import React from 'react';
import { Button, MdLogin } from '@browserstack/bifrost';

const AuthWallLogin = () => (
  <div>
    <Button
      icon={<MdLogin />}
      variant="primary"
      colors="brand"
      size="large"
      onClick={() => {}}
      loading={false}
      loaderText="Logging In"
    >
      Login to perform your first test
    </Button>
  </div>
);

export default AuthWallLogin;
