import Image from 'next/image';
import styled from 'styled-components';
import emptyContent from '@assets/imgs/empty_content.png';

function EmptyContent() {
  return (
    <S.Container>
      <Image
        src={emptyContent}
        alt="No content found"
        width={350}
        height={262.5}
      ></Image>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
  `,
};

export default EmptyContent;
