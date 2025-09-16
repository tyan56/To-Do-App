// 筛选状态常量
export const FILTER_STATUS = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending'
};

// 筛选状态显示文本
export const FILTER_LABELS = {
  [FILTER_STATUS.ALL]: '全部',
  [FILTER_STATUS.COMPLETED]: '已完成',
  [FILTER_STATUS.PENDING]: '未完成'
};

// 操作类型
export const ACTION_TYPES = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  CLEAR_ALL: 'CLEAR_ALL'
};

// 消息类型
export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

