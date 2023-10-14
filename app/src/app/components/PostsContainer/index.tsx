import StHeader from './StHeader';
import StPostContainer from './StPostContainer';
import { ReactNode } from 'react';
import StTitle from './StTitle';
import StNoPostsTitle from './StNoPostsTitle';
import StNoPostsContent from './StNoPostsContent';
import StFlex from '../Flex';

interface PostContainerProps {
  employeeName: string;
  hasPosts: boolean;
  children?: ReactNode;
}

const PostsContainer = ({
  employeeName,
  hasPosts,
  children,
}: PostContainerProps) => {
  return (
    <StPostContainer hasPosts={hasPosts}>
      <StHeader>
        <StTitle>{`${employeeName}'s Posts`}</StTitle>
      </StHeader>
      {hasPosts ? (
        children
      ) : (
        <StFlex
          flexProps={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            width: 100,
          }}
        >
          <StNoPostsTitle>Hi there!</StNoPostsTitle>
          <StNoPostsContent>
            {`${employeeName} hasn't posted anything yet. Stay tunned!`}
          </StNoPostsContent>
        </StFlex>
      )}
    </StPostContainer>
  );
};

export default PostsContainer;
