import { useState } from 'react';
import { GRID_MANAGER_NAMES } from 'constants/index';

const useCreateGridCLIModal = () => {
  const [activeGridManagerCodeSnippet, setActiveGridManagerCodeSnippet] =
    useState(GRID_MANAGER_NAMES.helm);
  const [createGridCommands, setCreateGridCommands] = useState({
    // eslint-disable-next-line sonarjs/no-duplicate-string
    cli: 'browserstack-cli hst create grid --cloud-provider <aws> --cluster-name <clustername> --region<regionName>',
    helm: 'browserstack-cli hst create grid --cloud-provider <aws> --cluster-name <clustername> --region<regionName>',
    kubectl:
      'browserstack-cli hst create grid --cloud-provider <aws> --cluster-name <clustername> --region<regionName>'
  });

  return {
    activeGridManagerCodeSnippet,
    createGridCommands,
    setActiveGridManagerCodeSnippet,
    setCreateGridCommands
  };
};

export default useCreateGridCLIModal;
