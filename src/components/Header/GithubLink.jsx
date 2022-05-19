import styled from 'styled-components';
import { default as GitHubIcon } from '@assets/svgs/github_octocat.svg';

function GithubLink() {
  return (
    <S.Container
      rel="noreferrer"
      target="_blank"
      href="https://github.com/aadilmehrajbhat"
    >
      <S.Icon />
    </S.Container>
  );
}

const S = {
  Container: styled.a`
    cursor: pointer;
  `,
  Icon: styled(GitHubIcon)`
    width: 40px;
    height: 40px;
    fill: currentColor;
    color: #000;
    opacity: 0.75;
    margin-right: 0.5em;

    &:hover {
      opacity: 1;
    }
  `,
};

export default GithubLink;
