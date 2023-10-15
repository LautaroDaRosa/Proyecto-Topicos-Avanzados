import styled, { css } from 'styled-components';
import { SidebarProps } from './index';
import { media } from 'styles/media';

const StSidebar = styled.div<Omit<SidebarProps, 'chilren'>>`
  height: 100%;
  display: none;

  > div {
    padding: 0 30px 72px 30px;
    overflow-y: scroll;
    position: fixed;
    height: calc(100% - 80px);
  }

  ${props =>
    props.placement === 'right' &&
    css`
      ${media.xlarge} {
        display: flex;
      }
    `}

  ${props =>
    props.placement === 'left' &&
    css`
      ${media.medium} {
        display: flex;
        width: 280px;
      }

      > div {
        padding-left: 60px;
        width: 280px;
      }
    `}

    ${media.large} {
    width: 364px;

    > div {
      width: 370px;
    }
  }
`;

export default StSidebar;
