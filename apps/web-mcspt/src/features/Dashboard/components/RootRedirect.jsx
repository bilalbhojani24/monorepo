import { useEffect } from 'react';
import { DOC_LINKS_CONSTANTS } from '@browserstack/mcp-shared';

const RootRedirect = () => {
  useEffect(() => {
    window.location.href = DOC_LINKS_CONSTANTS.MCP_LANDING;
  }, []);

  return null;
};

export default RootRedirect;
