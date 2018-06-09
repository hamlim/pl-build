/* @flow */
/**
 * Button docs
 *
 * @module    button-docs
 * @author    @TODO
 * @copyright 2018 @TODO
 **/
import React from "react"
import Demo from "hb-demo"
import Documentation from "hb-documentation"
import type { componentDataType } from "hb-types"

import Button from "button"
import rawButton from "raw!button"

import ButtonComplexDemo from "button-complex-demo"
import rawButtonComplexDemo from "raw!button-complex-demo"

import ButtonSimpleDemo from "button-simple-demo"
import rawButtonSimpleDemo from "raw!button-simple-demo"

export const route = "/button"

export const data: componentDataType = {
  route,
  some: "other",
  things: "here"
}

const variations = [
  <Demo
    key="button-complex-demo"
    title="button complex demo"
    previewCode={rawButtonComplexDemo.code}
    externalDemo
  >
    <ButtonComplexDemo />
  </Demo>,
  <Demo
    key="button-simple-demo"
    title="button simple demo"
    previewCode={rawButtonSimpleDemo.code}
    externalDemo
  >
    <ButtonSimpleDemo />
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
