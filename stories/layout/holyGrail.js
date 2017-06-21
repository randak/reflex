// @flow
import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { Grid, Item, Layout } from '../../src'
import { loremIpsum } from '../core'
import styles from './layout.css'

export default function() {
  const includeText = boolean('Show text', false)

  return (
    <Layout type="parent" className={styles.page}>
      <Layout className={styles.header} fixed="top">
        <Grid root>
          <h1>Header</h1>
        </Grid>
      </Layout>
      <Layout type="stretch" className={styles.main}>
        <Grid root>
          <Grid size={2} className={styles.nav}><h2>Nav</h2></Grid>
          <Grid size={8} className={styles.content} align="top">
            <h2>Content</h2>
            <Item size={12}>
              {includeText && <p>{loremIpsum}</p>}
            </Item>
          </Grid>
          <Grid size={2} className={styles.ads}><h2>Ads</h2></Grid>
        </Grid>
      </Layout>
      <Layout className={styles.footer}>
        <Grid root>
          <h1>Footer</h1>
        </Grid>
      </Layout>
    </Layout>
  )
}
