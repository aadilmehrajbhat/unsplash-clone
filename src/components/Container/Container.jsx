import styled from 'styled-components';

function Container({ children }) {
  return <S.Container>{children}</S.Container>;
}

const S = {
  Container: styled.main`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    background: #fff;
  `,
};

export default Container;
