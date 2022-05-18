import { default as UnsplashLogo } from '@assets/svgs/unsplash.svg';

import styled from 'styled-components';

function Logo() {
  return (
    <S.Logo>
      <UnsplashLogo />
      <S.Main>
        <S.Title>Unsplash</S.Title>
        <S.Caption>Photos for everyone</S.Caption>
      </S.Main>
    </S.Logo>
  );
}

const S = {
  Logo: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    font-weight: 600;
    padding-left: 1rem;
    user-select: none;
    white-space: nowrap;
  `,
  Title: styled.span`
    font-size: 1rem;
    font-weight: 700;
    font-family: sans-serif;
  `,
  Caption: styled.span``,
};

export default Logo;
