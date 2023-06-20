import { updateRealTimeGraph } from 'features/RealtimeMetricGraphs';

const MCP_SOCKET_EVENTS = {
  GRAPH_UPDATE: 'GRAPH_UPDATE'
};

export const handleSocketMessage = (dispatch, getState, messageEvent) => {
  // we'll have more switch cases in future
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (messageEvent?.type) {
    case MCP_SOCKET_EVENTS.GRAPH_UPDATE: {
      dispatch(updateRealTimeGraph(messageEvent));

      break;
    }

    default: {
      break;
    }
  }
};
