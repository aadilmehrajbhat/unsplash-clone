import styled from 'styled-components';
import { default as DownloadIcon } from '@assets/svgs/down_arrow.svg';

const DownloadPhoto = ({ url }) => (
  <S.DownloadLink href={url} download rel="noopener noreferrer">
    <S.DownloadIcon />
  </S.DownloadLink>
);

const S = {
  DownloadLink: styled.a`
    color: #7d7d7d;
    background: #fff;
    border-radius: 4px;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.75rem;
    height: 2rem;

    &:hover {
      color: #000;
      background-color: #f3f3f3;
    }
  `,
  DownloadIcon: styled(DownloadIcon)`
    width: 18px;
    height: 18px;
    line-height: 1;
    vertical-align: middle;
  `,
};

export default DownloadPhoto;
