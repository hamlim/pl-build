// @flow
import React, { type Node } from 'react'
import styles from 'styles!./button'

type Props = {
  name: string,
}

const Icon = ({ name, ...rest }: Props): Node => (
  <svg className="Icon" {...rest}>
    <use xlinkHref={`#icons-${name}`} />
  </svg>
)

export default Icon
