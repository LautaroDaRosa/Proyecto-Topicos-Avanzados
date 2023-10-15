import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import StSidebar from './StSidebar';

export type SidebarProps = {
  placement?: 'right' | 'left';
  children: ReactNode;
};

const Sidebar = ({ placement, children }: SidebarProps) => (
  <StSidebar placement={placement}>
    <div>{children}</div>
  </StSidebar>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string.isRequired,
};
export default Sidebar;
