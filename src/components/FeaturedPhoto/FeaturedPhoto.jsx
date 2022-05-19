import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FeaturedPhoto = ({ photo }) => {
  if (!photo) return null;

  return (
    <S.Container background={photo?.urls?.full}>
      <S.Content>
        <S.Title>Unsplash</S.Title>
        <S.Caption>
          The internet&apos;s source of{' '}
          <S.Link
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
          >
            freely-usable images
          </S.Link>
          .
          <br />
          Powered by creators everywhere.
        </S.Caption>
        <S.BottomBar>
          <S.Text>
            <S.Link
              href={photo?.links?.html ?? '#'}
              cursor="zoom-in"
              target="_blank"
              rel="noopener noreferrer"
              decoration="none"
            >
              Photo of the Day
            </S.Link>
            &nbsp;by&nbsp;
            <S.Link
              href={`https://unsplash.com/@${photo?.user?.username}`}
              target="_blank"
              rel="noopener noreferrer"
              decoration="none"
            >
              {photo?.user?.name}
            </S.Link>
          </S.Text>
        </S.BottomBar>
      </S.Content>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    position: relative;
    width: 100%;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
    padding: 0 2rem;
    background-color: #000;
    background-image: ${({ background }) => `url(${background})`};
    background-origin: border-box;
    background-position: center center;
    background-size: 130% auto;
    background-repeat: no-repeat;
    &:after {
      content: '';
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.25) 0%,
        rgba(0, 0, 0, 0.4) 35%,
        rgba(0, 0, 0, 0.6) 65%,
        rgba(0, 0, 0, 0.7) 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `,
  Content: styled.div`
    max-width: 768px;
    width: 100%;
    z-index: 1;
  `,
  Title: styled.h1`
    color: #fff;
    font-size: 3.5rem;
    font-weight: 800;
    text-align: left;
    letter-spacing: -1px;
    margin: 0;
  `,
  Caption: styled.h2`
    color: #fff;
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: left;
    margin-top: 1rem;
    letter-spacing: -0.25px;
  `,
  Link: styled.a`
    color: #fffc;
    cursor: ${({ cursor = 'pointer' }) => cursor};
    text-decoration: ${({ decoration = 'underline' }) => decoration};

    &:hover {
      color: #fff;
    }
  `,
  Text: styled.p`
    color: #ffffff8c;
    text-shadow: 0 1px 8px #0000001a;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: left;
    margin-top: 1rem;
    letter-spacing: -0.25px;
  `,
  BottomBar: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 2em 0.75em;
  `,
};

export default FeaturedPhoto;
