/* @flow */
/**
 * Icon docs
 *
 * @module    icon-docs
 * @author    @TODO
 * @copyright 2018 @TODO
 **/
import React from "react"
import Demo from "hb-demo"
import Documentation from "hb-documentation"
import type { componentDataType } from "hb-types"

import Icon from "icon"
import rawIcon from "raw!icon"

import IconSimpleDemo from "icon-simple-demo"
import rawIconSimpleDemo from "raw!icon-simple-demo"

import IconStarDemo from "icon-star-demo"
import rawIconStarDemo from "raw!icon-star-demo"

export const route = "/icon"

export const data: componentDataType = {
  route,
  some: "other",
  things: "here"
}

const variations = [
  <Demo
    key="icon-simple-demo"
    title="icon simple demo"
    previewCode={rawIconSimpleDemo.code}
    externalDemo
  >
    <IconSimpleDemo />
  </Demo>,
  <Demo
    key="icon-star-demo"
    title="icon star demo"
    previewCode={rawIconStarDemo.code}
    externalDemo
  >
    <IconStarDemo />
  </Demo>
]

export const Docs = () => (
  <Documentation
    baseRoute={route}
    variations={variations}
    componentData={data}
    description={<p>{/* @TODO */}</p>}
  />
)
