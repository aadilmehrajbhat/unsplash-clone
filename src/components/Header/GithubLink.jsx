import { ReactComponent as GithubOctocat } from '@assets/svgs/github_octocat.svg';

function GithubLink() {
  return (
    <a
      href="https://github.com/AadilMehrajBhat/unsplash-clone"
      className="github-link"
      target="_blank"
      rel="noreferrer"
    >
      <GithubOctocat width={40} height={40} />
    </a>
  );
}

export default GithubLink;
