import { forceRenderStyles, style as typestyleStyle, types } from 'typestyle'

const classes: { [key: string]: string } = { }

export function style(...objects: types.NestedCSSProperties[]) {
  const className = typestyleStyle(...objects)
  if (classes[className] == undefined) {
    classes[className] = className
    forceRenderStyles()
  }
  return className
}
