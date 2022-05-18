import { default as PhotoIcon } from '@assets/svgs/photos.svg';
import { useUnsplashSearch } from '@contexts/search-context';
import { formatCountInThousands } from '@utils/strings';
import styled from 'styled-components';

function PhotosCount() {
  const { totalCount } = useUnsplashSearch();

  return (
    <S.Container>
      <PhotoIcon width={22} height={22} />
      <S.Text>&nbsp;Photos {formatCountInThousands(totalCount)}</S.Text>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #111;
    font-size: 0.9rem;
  `,
  Text: styled.span`
    padding-left: 0.35em;
  `,
};

export default PhotosCount;
