import { ReactComponent as PhotoIcon } from '@assets/svgs/photos.svg';
import { useUnsplashSearch } from '@contexts/search-context';
import { formatCountInThousands } from '@utils/strings';

function PhotosCount() {
  const { totalCount } = useUnsplashSearch();

  return (
    <div className="search-header__photos">
      <PhotoIcon width={22} height={22} />
      <span className="search-header__photos-content">
        &nbsp;Photos {formatCountInThousands(totalCount)}
      </span>
    </div>
  );
}

export default PhotosCount;
