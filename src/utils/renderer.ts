import { createVNode, render, getCurrentInstance  } from 'vue'

import type { Component, PropType, AppContext, VNodeProps, ComponentInternalInstance } from 'vue'

export function renderComponent<T>(component : Component | string, props?: PropType<T> | null,  element?: Element | null,  app?: ComponentInternalInstance) {
  let el = element
  let vnode = createVNode(component, props as VNodeProps)  // TODO: typing here

  const appContext = getCurrentInstance()?.appContext ?? app?.appContext


  if (component?.constructor === String) {
    vnode = createVNode(appContext!.components[component], props as VNodeProps) // TODO: catch here
  } else {
    vnode = createVNode(component, props as VNodeProps)
  }

  if (app && app.appContext) {
    vnode.appContext = { ...app.appContext }
  }

  render(vnode, el = el ? el : document.body)

  const destroy = () => {
    if (el) render(null, el)
    el = null
    vnode = null
  }

  return {
    vnode,
    destroy,
    el,
  }
}