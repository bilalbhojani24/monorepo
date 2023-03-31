import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getPusherConfig = async () =>
  axios.get(`${versionedBaseRoute()}/projects/pusherAuth`);
