import React, { useState, useEffect } from "react"
/**
* @param {ParamsKVProps} props
 */
export const ParamsKV = (props) => {
  return (
    <div key={props.key} >
      <label className="input-wrapper" for={`f${props.key}`}>
        <input
          name={props.key}
          id={`f${props.key}`}
          className="input"
          placeholder="Key"
        />
      </label>
      <label className="input-wrapper" for={`f${props.value}`}>
        <input
          name={props.value}
          id={`f${props.value}`}
          className="input"
          placeholder="Value"
        />
      </label>
    </div>
  )
}
/**
 * @typedef {Object} ParamsKVProps
 * @property {string} key
 * @property {string} value
 */
