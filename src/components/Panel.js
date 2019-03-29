import React from 'react';
import styled from 'styled-components';

const PanelWrapper = styled.section`
  margin-bottom: 1em;
`

/**
 * @param {PanelProps} props
 */
export const Panel = (props) => (
  <PanelWrapper className="main-wrapper__primary">
    <h3>{props.name}</h3>
    {props.children}
  </PanelWrapper>
)

/**
 * @typedef {Object} PanelProps
 * @property {string} name
 */
