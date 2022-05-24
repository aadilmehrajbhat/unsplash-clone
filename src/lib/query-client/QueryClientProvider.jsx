import { QueryClientProvider as RQClientProvider } from 'react-query';
import createClient from './create-client';

export const queryClient = createClient();

const QueryClientProvider = ({ children, client }) => (
  <RQClientProvider client={client}>{children}</RQClientProvider>
);

QueryClientProvider.defaultProps = {
  client: queryClient,
};

export default QueryClientProvider;
