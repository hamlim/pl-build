/* @flow */
/**
 * button docs
 * 
 * @module    button.js-docs
 * @author    @TODO
 * @copyright 2018 @TODO
 **/
import React from 'react';
import Demo from 'hb-demo';
import Documentation from 'hb-documentation';
import type {componentDataType} from 'hb-types';

import Button from 'button.js';
import rawButton from 'raw!button.js';

button-simple-demo.js,button-complex-demo.js

export const route = '/button';

export const data: componentDataType = {
  route,
  some: 'other',
  things: 'here'
};

const variations = [
  undefined
]

export const Docs = () => (
  <Documentation
    baseRoute={route}
    variations={variations}
    componentData={data}
    description={
      <p>{/* @TODO */}</p>
    }
  />
)
