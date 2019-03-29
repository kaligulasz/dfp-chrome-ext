import React, { useState, useEffect } from "react"

/**
 * @param {TextFieldProps} props
 */
export const TextField = (props) => {
  return (
    <label key={props.name} className="input-wrapper" for={`tf${props.name}`}>
      <span className="label">{props.label}</span>
      <input
        name={props.name}
        id={`tf${props.key}`}
        className="input"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </label>
  )
}
/**
 * @typedef {Object} TextFieldProps
 * @property {string} name
 * @property {string} placeholder
 * @property {string} label
 * @property {string} value
 * @property {function} onChange
 */
