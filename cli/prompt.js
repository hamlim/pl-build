const inquirer = require('inquirer')

module.exports = function prompt() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Provide the name of the component:',
      validate(input) {
        if (input.length === 0) {
          return 'The component name is required.'
        }
        return true
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide the description for the component',
    },
    {
      type: 'checkbox',
      name: 'applications',
      message: 'Provide the application this component will live within',
      choices: ['Stores', 'Admin', 'Extranet', 'Common'],
    },
  ])
}
