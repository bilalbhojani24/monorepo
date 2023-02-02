import React from 'react';
import { SourceOutlinedIcon } from 'assets/icons';
import { TMEmptyState } from 'common/bifrostProxy';
import InlineAddTestCase from "./InlineAddTestCase";

export default function BlankPage() {
  return (
    <div className="flex w-full flex-wrap justify-center">
        <TMEmptyState
            title="Build your repository"
            description="You can get started by creating test cases/folders by entering details below."
            mainIcon={<SourceOutlinedIcon className="!h-12 !w-12" />}
            buttonProps={null}
        />
        <div className={"w-9/12 p-5"}>
            <InlineAddTestCase />
        </div>
    </div>
  );
}
