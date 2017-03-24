import * as R from 'react'

declare global {
  const ENVIRONMENT: 'website' | 'mobile-app'
  const React: typeof R
}