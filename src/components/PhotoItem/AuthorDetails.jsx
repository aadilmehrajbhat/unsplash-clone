import PropTypes from 'prop-types';
import styled from 'styled-components';
import { default as CheckIcon } from '@assets/svgs/check_circle.svg';

const AuthorDetails = ({ className, author }) => (
  <S.Container className={className}>
    <a
      href={`https://unsplash.com/@${author.username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <S.Avatar
        src={author.profile_image?.medium}
        alt={`${author.first_name} ${author.last_name ?? ''}`}
      />
    </a>
    <S.Content>
      <S.Title
        href={`https://unsplash.com/@${author.username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`${author.first_name} ${author.last_name ?? ''}`}
      </S.Title>
      {author.for_hire && (
        <S.Link
          small
          href={`https://unsplash.com/@${author.username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Available for hire <S.CheckIcon />
        </S.Link>
      )}
    </S.Content>
  </S.Container>
);

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  Link: styled.a`
    color: #fff;
    opacity: 0.8;
    text-decoration: none;
    text-shadow: 0 1px 8px #0000001a;
    will-change: opacity;
    line-height: 1.35;
    font-size: ${({ small }) => (small ? '11px' : '15px')};
    font-weight: 500;
    display: block;
    transition: opacity 0.1s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.22px;
    text-overflow: ellipsis;

    &:hover {
      opacity: 1;
    }
  `,
  Avatar: styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Title: styled.a`
    color: #fff;
    opacity: 0.8;
    text-decoration: none;
    text-shadow: 0 1px 8px #0000001a;
    will-change: opacity;
    line-height: 1.25;
    font-size: 15px;
    font-weight: 500;
    display: block;
    transition: opacity 0.1s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 0.02em;

    &:hover {
      opacity: 1;
    }
  `,
  CheckIcon: styled(CheckIcon)`
    width: 15px;
    height: 15px;
    fill: currentColor;
    vertical-align: middle;
    line-height: 1;
  `,
};

AuthorDetails.propTypes = {
  className: PropTypes.string,
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_image: PropTypes.shape({
      small: PropTypes.string,
      medium: PropTypes.string,
      large: PropTypes.string,
    }),
    username: PropTypes.string,
    for_hire: PropTypes.bool,
  }),
};

export default AuthorDetails;
