import { renderComponent } from '@/utils/renderer'

import YesNoDialog from './yes-no-dialog.vue'

import type { ComponentInternalInstance } from 'vue'
import type { Props } from './yes-no-dialog.vue'




export async function useYesNoDialog(props: Props | null = null, propscurrentInstance?: ComponentInternalInstance) {
  // TODO: fix typing here
  const { vnode } = renderComponent(YesNoDialog, props, null, propscurrentInstance)

  return vnode.component?.exposed?.open()
}