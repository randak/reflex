// @flow
import * as React from 'react'
import { compact } from 'lodash'
import { combineSpacing } from './utils'
import type {
  SpacingValues,
  Dev,
  Overflow,
  Fixed,
  Spacing,
  Height,
} from './types'
import styles from './layout.css'
import devStyles from './dev.css'

function getLayout(layout?: Height): string {
  switch (layout) {
    case 'parent':
      return styles.parent
    case 'auto':
      return styles.auto
    case 'fit':
    default:
      return styles.fit
  }
}

function getFixed(fixed: Fixed): string {
  switch (fixed) {
    case 'top':
      return styles.fixedTop
    case 'bottom':
      return styles.fixedBottom
    default:
      return ''
  }
}

function getOverflow(overflow: Overflow): string {
  switch (overflow) {
    case 'scrollbars':
      return styles.overflow
    default:
      return ''
  }
}

export type Props = {
  dev?: Dev,
  devMode?: boolean,
  className?: string,
  fixed?: Fixed,
  margin?: Spacing,
  marginTop?: SpacingValues,
  marginRight?: SpacingValues,
  marginBottom?: SpacingValues,
  marginLeft?: SpacingValues,
  overflow?: Overflow,
  height?: Height,
  style?: { [string]: string | number },
}

export default function Layout({
  className,
  dev,
  fixed,
  height,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  overflow,
  style,
  ...props
}: Props) {
  const classes = compact([
    className,
    getFixed(fixed),
    getLayout(height),
    getOverflow(overflow),
    dev &&
      process.env.NODE_ENV !== 'production' &&
      devStyles[`colors${String(dev)}`],
    styles.layout,
  ])

  return (
    <div
      {...props}
      className={classes.join(' ')}
      style={{
        ...style,
        ...combineSpacing(
          {
            margin,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
          },
          24
        ),
      }}
    />
  )
}
