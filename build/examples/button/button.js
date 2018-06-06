// @flow
import React, { type Node } from 'react'
import PropTypes from 'prop-types'
import styles from 'styles!./button'

type Props = {
  onClick: (
    event: SyntheticEvent<HTMLButtonElement>,
  ) => void,
  children: Node,
}

const Button = (props: Props): Node => (
  <button className="Button" {...props} />
)

export default Button
