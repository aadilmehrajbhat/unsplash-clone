import { QueryClient } from 'react-query';

const createClient = ({ queries = {} } = {}) =>
  new QueryClient({
    defaultOptions: {
      refetchOnWindowFocus: false,
      queries: {
        ...queries,
      },
    },
  });

export default createClient;
