import Header from '@components/Header';

function PageLayout({ children }) {
  return (
    <article>
      <Header />
      {children}
    </article>
  );
}

export default PageLayout;
