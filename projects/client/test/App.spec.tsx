import { render } from '@testing-library/react';

import App from '@/App';

test('renders the "Home Page" text', () => {
  const { getByText } = render(<App />);
  const homePageText = getByText('Home Page');

  expect(homePageText).toBeInTheDocument();
});
