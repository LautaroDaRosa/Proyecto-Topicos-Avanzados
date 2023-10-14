import Navbar from 'app/components/NavBar';
import { Picture } from 'types';
import StGridsContainer from '../../components/PhotoGrid/StGridsContainer';
import StFlex from 'app/components/Flex';
import { deletePicture, getPictures } from 'store/content/api';
import { useEffect, useState } from 'react';
import { getPermissions } from 'store/employees/api';
import PhotoGrid from 'app/components/PhotoGrid';

const Gallery = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const featuredPics: Picture[] = [];
  const notFeaturedPics: Picture[] = [];
  const [hasPerm, setHasPerm] = useState(false);

  useEffect(() => {
    async function fetchPictures() {
      const result = await getPictures();
      setPictures(result);
    }
    fetchPictures();
  }, []);

  useEffect(() => {
    async function getPermission() {
      const result = await getPermissions();
      setHasPerm(result.includes('content.delete_picture'));
    }
    getPermission();
  }, []);

  pictures.forEach(pict =>
    pict.featured ? featuredPics.push(pict) : notFeaturedPics.push(pict),
  );

  if (featuredPics.length % 2 !== 0) {
    const picture = notFeaturedPics.shift();
    if (picture !== undefined) {
      featuredPics.push(picture);
    }
  }

  const deletePict = async (id: number) => {
    await deletePicture(id);
    setPictures(pictures.filter(pic => pic.id !== id));
  };

  return (
    <StFlex flexProps={{}}>
      <Navbar />
      <StGridsContainer>
        <PhotoGrid
          isFeatured={true}
          pics={featuredPics}
          hasPerm={hasPerm}
          deletePict={deletePict}
        />
        <PhotoGrid
          isFeatured={false}
          pics={notFeaturedPics}
          hasPerm={hasPerm}
          deletePict={deletePict}
        />
      </StGridsContainer>
    </StFlex>
  );
};

export default Gallery;
