import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: ${props => props.style?.alignItems ? `${props.style?.alignItems}px` : "center"};
`
