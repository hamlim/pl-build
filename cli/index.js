#!/usr/bin/env node
const prompt = require('./prompt.js')
const { checkIfExists } = require('./utils.js')

const updateComponent = require('./update/index.js')

const addComponent = require('./add/index.js')

async function main() {
  // first we want to parse the name of a component
  const answers = await prompt()
  const { componentName, description, applications } = answers
  // find out if we have a module for this yet
  let doesExist = await checkIfExists(componentName)

  if (doesExist) {
    updateComponent({
      componentName,
      description,
      applications,
    })
  } else {
    addComponent({
      componentName,
      description,
      applications,
    })
  }
}

main()
