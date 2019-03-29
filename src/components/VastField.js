import React, { useState, useEffect } from "react"
import { TextField } from "./TextField";
import { ParamsKV } from "./ParamsKV";

// https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=

/**
 * 
 * @param {VASTFieldProps} props 
 */
export const VASTField = (props) => {

  const [inputUrl, setInputUrl] = useState('')
  const [finalUrl, setFinalUrl] = useState('')
  const [adUnit, setAdUnit] = useState('')
  const [customParams, setCustomParams] = useState(new Map())

  const handleMainFieldChange = (data) => {
    setInputUrl(data.currentTarget.value)

    const match = data.currentTarget.value.match(/\?(.*)$/)
    const allParams = new Map();
    if (match) {
      match[1].split('&').map(kv => kv.split('='))
        .forEach(kv => allParams.set(kv[0], kv[1]))
    }

    console.log(...allParams.entries())

    if (allParams.has('iu')) {
      console.log('iu:', allParams.get('iu'));
      setAdUnit(allParams.get('iu'));
    }

    if (allParams.has('cust_params')) {
      const custParamsMap = new Map();
      decodeURIComponent(allParams.get('cust_params'))
        .split('&').map(kv => kv.split('='))
        .forEach(kv => custParamsMap.set(kv[0], kv[1]))

      setCustomParams(custParamsMap);
    }
  }

  const handleAdUnitUpdate = (event) => {
    console.log('someone updated AD UNIT', event.currentTarget.value)
  }

  // ---------

  const custParamsFields = []

  customParams.forEach((value, key) => {
    custParamsFields.push(
      <ParamsKV
        custKey={key} custValue={value}
        onKeyChange={(oldKey, newKey) => {
          customParams.set(newKey, customParams.get(oldKey))
          customParams.delete(oldKey)
          setCustomParams(customParams)
        }}
        onValueChange={(key, newValue) => {
          customParams.set(key, newValue)
          setCustomParams(customParams)
        }}
      />
    )
  })

  return (<div>
    <TextField
      label={props.label}
      onChange={handleMainFieldChange}
    />

    <div className={`${inputUrl ? '' : 'hidden'}`}>
      <TextField
        label="Ad unit code:"
        value={adUnit}
        onChange={handleAdUnitUpdate}
      />
      <p>Custom parameters:</p>
      {custParamsFields}

      <TextField label="Final URL:" value={finalUrl} readOnly={true} />
    </div>
  </div >)
}
/**
* @typedef {Object} VASTFieldProps
* @property {string} label - whats visible on popup
* @property {string} fieldName - whats going to JSON
*/
