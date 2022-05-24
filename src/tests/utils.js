import { render } from '@testing-library/react';
import mock from 'nock';
import ThemeProvider from '@styles/index';

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
  contexts = [ThemeProvider, ...contexts];

  const ComponentWithContexts = contexts
    .reverse()
    .reduce((children, context) => {
      const [Provider, props] = Array.isArray(context) ? context : [context];
      return <Provider {...props}>{children}</Provider>;
    }, <Component {...componentProps} />);

  return render(ComponentWithContexts);
};
