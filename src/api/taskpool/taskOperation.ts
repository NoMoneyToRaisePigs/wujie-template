import type { ITaskOperation, ITaskOperationRaw } from '@/type/taskpool'
import alova from '@/utils/request'

export function normalize(userInfoRaw: ITaskOperationRaw) : ITaskOperation {
  return userInfoRaw
}

export const GET_TASK_OPERATION_URL = '/taskorders/datas/operations/task-operation'


export const getTaskOperation = (taskId: string) => alova.Get<ITaskOperation, ITaskOperationRaw>(GET_TASK_OPERATION_URL, { params: { taskId },transformData: normalize })