import React from 'react';
import { Button, CodeSnippet, Modal, Tabs } from '@browserstack/bifrost';
import { GRID_MANAGER_NAMES } from 'constants/index';

import useCreateGridCLIModal from './useCreateGridCLIModal';

const CreateGridCLIModal = () => {
  const {
    activeGridManagerCodeSnippet,
    createGridCommands,
    setActiveGridManagerCodeSnippet
  } = useCreateGridCLIModal();

  const TabsForCodeSnippet = (
    <Tabs
      id="tabID"
      label="Tabs"
      onTabChange={(e) => {
        setActiveGridManagerCodeSnippet(e.name);
      }}
      isContained={false}
      navigationClassName="first:ml-4"
      tabsArray={[
        {
          name: GRID_MANAGER_NAMES.helm
        },
        {
          name: GRID_MANAGER_NAMES.kubectl
        },
        {
          name: GRID_MANAGER_NAMES.cli
        }
      ]}
    />
  );

  return (
    // eslint-disable-next-line react/jsx-boolean-value
    <Modal show={true} size="3xl">
      <div className="mx-6 my-4">
        <p className="text-lg font-medium">Automation Grid Incomplete</p>

        <div className="border-base-300 mt-4 rounded-lg border">
          <p className="mx-4 my-1">
            Use below commands to create a new grid with default parameters in
            your existing Kubernetes setup or click on ‘Configure Grid’ button
            to customize different grid parameters as per needs.
          </p>
          {TabsForCodeSnippet}
          <CodeSnippet
            code={
              createGridCommands?.[activeGridManagerCodeSnippet.toLowerCase()]
            }
            language={
              activeGridManagerCodeSnippet.toLowerCase() ===
              GRID_MANAGER_NAMES.cli
                ? 'node'
                : activeGridManagerCodeSnippet.toLowerCase()
            }
            singleLine={false}
            showLineNumbers={false}
            view="neutral"
          />
        </div>
        <div className="mt-3 justify-end">
          <Button
            aria-label="Close"
            colors="white"
            onClick={() => {
              window.location.href = `${window.location.origin}/${'xyz'}`;
            }}
            type="button"
            varaint="primary"
          >
            Configure Grid
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default CreateGridCLIModal;
