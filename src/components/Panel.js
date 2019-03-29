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
    <fieldset>
      <legend>{props.name}</legend>
      {props.children}
    </fieldset>
  </PanelWrapper>
)

/**
 * @typedef {Object} PanelProps
 * @property {string} name
 */
