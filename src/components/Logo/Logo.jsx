import { ReactComponent as UnsplashLogo } from '@assets/svgs/unsplash.svg';

function Logo() {
  return (
    <div className="logo-container">
      <UnsplashLogo />
      <div className="logo-main">
        <span className="logo-main__text">Unsplash</span>
        <span>Photos for everyone</span>
      </div>
    </div>
  );
}

export default Logo;
