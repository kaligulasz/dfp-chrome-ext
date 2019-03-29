import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import { TextField } from "./TextField";

const KVWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const HalfInputLabel = styled.label`
  width: 50%;
  margin: 0 !important;
`

/**
* @param {ParamsKVProps} props
 */
export const ParamsKV = (props) => {
  console.log(props)
  return (
    <KVWrapper key={props.custKey} >
      <HalfInputLabel
        className="input-wrapper"
        htmlFor={`f${props.custKey}`}
      >
        <TextField
          id={`f${props.custKey}`}
          className="input"
          placeholder="Key"
          onChange={event => props.onKeyChange(props.custKey, event.currentTarget.value)}
          value={props.custKey}
        />
      </HalfInputLabel> :
      <HalfInputLabel
        className="input-wrapper"
        htmlFor={`f${props.custValue}`}
      >
        <TextField
          id={`f${props.custValue}`}
          className="input"
          placeholder="Value"
          onChange={event => props.onValueChange(props.custKey, event.currentTarget.value)}
          value={props.custValue}
        />
      </HalfInputLabel>
    </KVWrapper>
  )
}
/**
 * @typedef {Object} ParamsKVProps
 * @property {string} custKey
 * @property {string} custValue
 */
