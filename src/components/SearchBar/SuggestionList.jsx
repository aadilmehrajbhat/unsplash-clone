import { Children } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

function SuggestionList({ title, suggestions, startAdornment }) {
  return (
    <>
      <S.Heading>{title}</S.Heading>
      <S.Content>
        {Children.map(suggestions, (suggestion) => (
          <Link href={`/s/photos/${suggestion}`} passHref>
            <S.Item>
              {startAdornment && <S.Adornment>{startAdornment}</S.Adornment>}
              {suggestion}
            </S.Item>
          </Link>
        ))}
      </S.Content>
    </>
  );
}

const S = {
  Heading: styled.p`
    margin: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.25;
    color: #111111;
  `,
  Content: styled.div`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0.85em 0;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 1.5em;
  `,
  Item: styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid ${(props) => props.theme.colors.grey};
    color: #767676;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.1s ease-in-out;
    line-height: 1;
    &:hover {
      background-color: #f5f5f5;
    }
  `,
  Adornment: styled.span`
    display: flex;
    align-items: center;
    margin-right: 0.5em;
  `,
};

export default SuggestionList;
