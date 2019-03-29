import React, { useState, useEffect } from "react"
import { TextField } from "./TextField";

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
    console.log(data.currentTarget.value)
    setInputUrl(data.currentTarget.value)

    const match = data.currentTarget.value.match(/\?(.*)$/)
    const allParams = new Map();
    if (match) {
      match[1].split('&').map(kv => kv.split('='))
        .forEach(kv => allParams.set(kv[0], kv[1]))
    }

    if (allParams.has('iu')) {
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

  // ---------

  let custParamsFields = []

  customParams.forEach((v, k) => {
    custParamsFields.push(<ParamsKV key={k} value={v} />)
  })

  return (<fieldset>
    <TextField label={props.label} onChange={handleMainFieldChange} />
    <div className={{ 'hidden': !!inputUrl }}>
      <TextField
        label="Ad unit code" value={adUnit}
      />
      {customParams}
      <TextField value={finalUrl} />
    </div>

  </fieldset>)
}
/**
* @typedef {Object} VASTFieldProps
* @property {string} label - whats visible on popup
* @property {string} fieldName - whats going to JSON
*/
