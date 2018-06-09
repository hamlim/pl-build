const path = require('path')
const dirTree = require('directory-tree')
const fs = require('fs')
const { DIRECTORY, DEMO_DIRECTORY } = require('./env.js')
const prettier = require('prettier')
const {
  toLower,
  toUpper,
  getBareFileFrom,
  camelize,
  toWords,
} = require('./utils.js')

/**
 * fileName = 'button.js'
 * moduleName = Button  "how its imported"
 * bareFile = 'button' "where its imported from"
 * demos = array of Demo components
 * demoImports = import statements for demo files
 */

const docsTemplate = ({
  moduleName,
  bareFile,
  demoImports = '',
  demos = '',
} = {}) => `/* @flow */
/**
 * ${moduleName} docs
 * 
 * @module    ${bareFile}-docs
 * @author    @TODO
 * @copyright 2018 @TODO
 **/
import React from 'react';
import Demo from 'hb-demo';
import Documentation from 'hb-documentation';
import type {componentDataType} from 'hb-types';

import ${moduleName} from '${bareFile}';
import raw${moduleName} from 'raw!${bareFile}';

${demoImports}

export const route = '/${toLower(moduleName)}';

export const data: componentDataType = {
  route,
  some: 'other',
  things: 'here',
  liveScope: {
    ${moduleName},
    /* @TODO add extra imports here */
  }
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

const demoTemplate = ({
  name,
  key = name,
  component,
  rawCode,
}) => `<Demo
  key="${key}"
  title="${name}"
  previewCode={${rawCode}.code}
  externalDemo
>
  <${component} />
</Demo>`

const getDemoComponentsFrom = demos => {
  return demos.reduce((acc, demo, ndx) => {
    const isFirst = ndx === 0
    const template = demoTemplate({
      name: toWords(demo.oldName),
      key: demo.oldName,
      rawCode: demo.rawName,
      component: demo.name,
    })
    if (isFirst) {
      return template
    }
    return `${acc},
${template}`
  }, '')
}

const getFileImportsFrom = (demo, registry) => {
  const fileContents = fs.readFileSync(demo.path, {
    encoding: 'utf-8',
  })
  const lines = fileContents.split('\n')
  let isInMultiLineImport = false
  let multiImportString = ''

  lines.forEach(line => {
    if (line.includes('import') && line.includes('from')) {
      const key = line.split('from ')[1]
      if (!registry.has(key)) {
        registry.set(key, line)
      }
    } else if (
      line.includes('import') &&
      !line.includes('from') &&
      !isInMultiLineImport
    ) {
      isInMultiLineImport = true
      multiImportString += line + '\n'
    } else if (
      isInMultiLineImport &&
      !line.includes('from')
    ) {
      multiImportString += line + '\n'
    } else if (
      isInMultiLineImport &&
      line.includes('from')
    ) {
      multiImportString += line
      isInMultiLineImport = false
      const key = line.split('from ')[1]
      registry.set(key, multiImportString)
      multiImportString = ''
    }
  })
  return registry
}

const parseChildren = (child, filePrefix = '') => {
  const { children, name } = child
  const bareFile = `${filePrefix}${name}`
  const fileName = `${bareFile}.js`
  const moduleName = toUpper(camelize(name))
  let moduleRegistry = new Map()
  moduleRegistry.set("'react'", `import React from 'react'`)
  moduleRegistry.set(
    `'${bareFile}'`,
    `import ${moduleName} from '${bareFile}'`,
  )
  let ret = {
    bareFile,
    fileName,
    moduleName,
  }
  // Get the demos
  const demoDirectory = children.find(
    childDir => childDir.name === DEMO_DIRECTORY,
  )

  // If there are no demos, then lets just return what we have
  if (!demoDirectory) {
    return ret
  }

  // Get the files from the demo directory
  const { children: demoFiles } = demoDirectory

  const formattedDemoFiles = demoFiles.map(demo => {
    const withoutExtension = getBareFileFrom(demo.name)
    const name = toUpper(camelize(withoutExtension))

    const prevValues = [...moduleRegistry.entries()]
    moduleRegistry = getFileImportsFrom(
      demo,
      moduleRegistry,
    )

    let fileImports = [...moduleRegistry.entries()]

    const dedupped = fileImports
      .reduce((acc, importEntry, ndx) => {
        if (
          prevValues[ndx] &&
          prevValues[ndx][0] === importEntry[0]
        ) {
          return acc
        } else {
          return [...acc, importEntry]
        }
      }, [])
      .map(([key, path]) => path)
    let hasExtraImports = dedupped.length > 0

    return {
      oldName: withoutExtension,
      name,
      bareFile: withoutExtension,
      rawName: `raw${name}`,
      demoFileImports: hasExtraImports
        ? dedupped.join('\n')
        : '',
    }
  })

  // Flatten the demo files down to import statements
  const demoFileImports = formattedDemoFiles.reduce(
    (acc, demo) => {
      return `${acc}
import ${demo.name} from '${demo.bareFile}';
import ${demo.rawName} from 'raw!${demo.bareFile}';
${
        demo.demoFileImports.length > 0
          ? '/* @TODO: Include these imports into liveScope below */'
          : ''
      }
${demo.demoFileImports};

`
    },
    '',
  )

  ret = Object.assign(ret, {
    demoImports: demoFileImports,
  })

  // getDemos

  const demos = getDemoComponentsFrom(formattedDemoFiles)

  ret = Object.assign(ret, {
    demos,
  })

  // let actualModule = children.find(c => c.name === fileName)

  // if (!actualModule) {
  //   return null
  // }
  // ret = {
  //   ...ret,
  //   moduleName,
  //   mod,
  //   demoImports: demos,
  //   fileName: actualModule.name,
  // }
  // } catch (error) {
  //   console.error(
  //     'Failed to parse or read the module.json file for the child: ' +
  //       name,
  //   )
  //   console.error(error)
  //   return null
  // }
  return ret
}

const main = () => {
  const tree = dirTree(DIRECTORY)
  const { children } = tree

  children.forEach(child => {
    const parsedResp = parseChildren(child)
    if (parsedResp) {
      const templ = prettier.format(
        docsTemplate(parsedResp),
        { semi: false, parser: 'babylon' },
      )
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
