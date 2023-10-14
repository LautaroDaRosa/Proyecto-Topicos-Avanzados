import StTrashCanContainer from './StTrashCanContainer';
import { ReactComponent as TrashCanIcon } from '../../../resources/trashcan.svg';
import StTrashButton from './StTrashButton';

interface DeleteProps {
  pictureId: number;
  deletePicture: (id: number) => void;
}

const TrashCan = ({ pictureId, deletePicture }: DeleteProps) => {
  return (
    <StTrashCanContainer>
      <StTrashButton
        onClick={_ => deletePicture(pictureId)}
        aria-label="Delete"
      />
      <TrashCanIcon />
    </StTrashCanContainer>
  );
};

export default TrashCan;
