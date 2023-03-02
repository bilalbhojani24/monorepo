import React, { useState } from 'react';
import { Button } from '@browserstack/bifrost';
import { CreateIssue } from '@browserstack/integrations';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Report a bug</Button>
      <CreateIssue
        isOpen={isOpen}
        handleClose={handleClose}
        authUrl="https://integrations.bsstag.com/api/user-access-tokens"
      />
    </div>
  );
};

export default Home;
