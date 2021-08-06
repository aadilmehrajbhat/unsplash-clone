import GitHubButton from './GithubButton';

function GithubLink() {
  return (
    <GitHubButton
      namespace="AadilMehrajBhat"
      repo="unsplash-clone"
      size="large"
      showCount="true"
      type="stargazers"
      aria-label="Star AadilMehrajBhat/unsplash-clone on GitHub"
    >
      &nbsp;Star
    </GitHubButton>
  );
}

export default GithubLink;
