/* @flow */
/**
 * icon docs
 * 
 * @module    icon.js-docs
 * @author    @TODO
 * @copyright 2018 @TODO
 **/
import React from 'react';
import Demo from 'hb-demo';
import Documentation from 'hb-documentation';
import type {componentDataType} from 'hb-types';

import Icon from 'icon.js';
import rawIcon from 'raw!icon.js';

icon-simple-demo.js,icon-star-demo.js

export const route = '/icon';

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
