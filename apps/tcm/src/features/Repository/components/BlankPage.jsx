import React from 'react';
import { TMEmptyState } from '_proxyComp';
import { SourceOutlinedIcon } from 'Icons';

export default function BlankPage() {
  return (
    <div className="flex items-center justify-center">
      <TMEmptyState
        title="Build your repository"
        description="You can get started by creating test cases/folders by entering details below."
        mainIcon={<SourceOutlinedIcon className="!h-12 !w-12" />}
        buttonProps={null}
      />
    </div>
  );
}
