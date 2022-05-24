import { render } from '@testing-library/react';
import mock from 'nock';
import ThemeProvider from '@styles/index';
import { QueryClientProvider, createClient } from '@lib/query-client';

export {
  render,
  renderHook,
  cleanup,
  queryAllByTestId,
  act,
  waitFor,
} from '@testing-library/react';

export { mock };

export const renderWithContext = ({
  contexts = [],
  component: Component,
  props: componentProps = {},
}) => {
  const queryClient = createClient({ queries: { retry: false } });
  contexts = [
    [QueryClientProvider, { client: queryClient }],
    ThemeProvider,
    ...contexts,
  ];

  const ComponentWithContexts = contexts
    .reverse()
    .reduce((children, context) => {
      const [Provider, props] = Array.isArray(context) ? context : [context];
      return <Provider {...props}>{children}</Provider>;
    }, <Component {...componentProps} />);

  return render(ComponentWithContexts);
};
