const path = require('path')
const dirTree = require('directory-tree')
const fs = require('fs')
const { DIRECTORY } = require('./env.js')

const toLower = s => s.toLowerCase()

const docsTemplate = ({
  moduleName,
  mod,
  fileName,
  demoImports,
  demos,
}) => `/* @flow */
/**
 * ${moduleName} docs
 * 
 * @module    ${fileName}-docs
 * @author    @TODO
 * @copyright 2018 @TODO
 **/
import React from 'react';
import Demo from 'hb-demo';
import Documentation from 'hb-documentation';
import type {componentDataType} from 'hb-types';

import ${mod} from '${fileName}';
import raw${mod} from 'raw!${fileName}';

${demoImports}

export const route = '/${toLower(mod)}';

export const data: componentDataType = {
  route,
  some: 'other',
  things: 'here'
};

const variations = [
  ${demos}
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
`

const parseChildren = child => {
  const { children, name, type } = child
  let ret = {}
  let moduleFile = children.find(
    c => c.name === 'module.json',
  )
  if (!moduleFile) {
    return null
  }
  try {
    const moduleJson = JSON.parse(
      fs.readFileSync(moduleFile.path, {
        encoding: 'utf-8',
      }),
    )
    const { demos, name: mod, moduleName } = moduleJson
    let actualModule = children.find(
      c => c.name === `${moduleName}.js`,
    )

    if (!actualModule) {
      return null
    }
    ret = {
      ...ret,
      moduleName,
      mod,
      demoImports: demos,
      fileName: actualModule.name,
    }
  } catch (error) {
    console.error(
      'Failed to parse or read the module.json file for the child: ' +
        name,
    )
    console.error(error)
    return null
  }
  return ret
}

const main = () => {
  const tree = dirTree(DIRECTORY)
  const { children } = tree

  children.forEach(child => {
    const parsedResp = parseChildren(child)
    if (parsedResp) {
      const templ = docsTemplate(parsedResp)
      fs.writeFileSync(
        `${child.path}/docs/${parsedResp.fileName.slice(
          0,
          -3,
        )}-docs.js`,
        templ,
        { encoding: 'utf-8' },
      )
    }
  })
}

main()
