import styled from 'styled-components';

const Anchor = styled.a`
  cursor: url(static/cursor-pointer.png), pointer;
  font-weight: 800;

  &:active {
    cursor: url(static/cursor-pointer-clicked.png), pointer;
  }
`;

export default Anchor;
