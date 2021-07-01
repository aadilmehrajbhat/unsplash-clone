import PageLayout from '@components/PageLayout';
import PhotoGallery from '@components/PhotoGallery/PhotoGallery';
import Container from '@components/Container';
import useUnsplashPhotos from '@hooks/useUnsplashPhotos';

function Home() {
  const { photos, fetchPhotos } = useUnsplashPhotos({ limit: 30 });

  return (
    <PageLayout>
      <Container>
        <PhotoGallery photos={photos} onFetchPhotos={fetchPhotos} />
      </Container>
    </PageLayout>
  );
}

export default Home;
