import { fetchPhotoById } from '@services/unsplash-api';
import Home from '@pages/Home';

export async function getStaticProps() {
  const featuredPhoto = await fetchPhotoById(process.env.FEATURED_PHOTO_ID);

  return {
    props: {
      featuredPhoto,
    },
  };
}

function HomePage({ featuredPhoto }) {
  return <Home featuredPhoto={featuredPhoto} />;
}

export default HomePage;
