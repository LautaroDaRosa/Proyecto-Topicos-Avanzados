import StGrid from './StGrid';
import StPictureContainer from './StPictureContainer';
import { Picture } from 'types';
import TrashCan from '../TrashCan';
import StPictureTitle from './StPictureTitle';

interface GridProps {
  isFeatured: boolean;
  pics: Picture[];
  hasPerm: boolean;
  deletePict: (id: number) => void;
}
const PhotoGrid = ({ isFeatured, pics, hasPerm, deletePict }: GridProps) => {
  return (
    <StGrid featured={isFeatured}>
      {pics.map(pict => (
        <StPictureContainer key={pict.id}>
          <img src={pict.photo} alt={pict.title} key={pict.id} />
          {hasPerm ? (
            <TrashCan pictureId={pict.id} deletePicture={deletePict} />
          ) : (
            <></>
          )}
          <StPictureTitle>{pict.title}</StPictureTitle>
        </StPictureContainer>
      ))}
    </StGrid>
  );
};

export default PhotoGrid;
