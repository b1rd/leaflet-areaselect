import React, {Fragment} from 'react'
import { render } from 'react-dom'
import RectangleExample from './RectangleExample'

const example = (
  <Fragment>
    <h1>Rectangle frame example</h1>
    <RectangleExample />
  </Fragment>
  )

render(example, document.getElementById('app'));