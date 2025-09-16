import React, { memo } from 'react';

const ActionBar = memo(({ 
  stats, 
  onClearCompleted, 
  onClearAll, 
  loading 
}) => {
  const hasCompleted = stats.completed > 0;
  const hasAnyTodos = stats.total > 0;

  const handleClearCompleted = () => {
    if (window.confirm(`确定要删除所有已完成的任务吗？\n这将删除 ${stats.completed} 个已完成的任务。`)) {
      onClearCompleted();
    }
  };

  const handleClearAll = () => {
    if (window.confirm(`确定要清空所有任务吗？\n这将删除 ${stats.total} 个任务，此操作不可撤销！`)) {
      onClearAll();
    }
  };

  return (
    <div className="action-bar">
      <div className="action-info">
        {hasAnyTodos ? (
          <span>
            共 {stats.total} 个任务，其中 {stats.completed} 个已完成，{stats.pending} 个待完成
          </span>
        ) : (
          <span>暂无任务</span>
        )}
      </div>
      
      <div className="action-buttons">
        {hasCompleted && (
          <button
            className="btn btn-warning"
            onClick={handleClearCompleted}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                清除中...
              </>
            ) : (
              <>
                <span>🧹</span>
                清除已完成 ({stats.completed})
              </>
            )}
          </button>
        )}
        
        {hasAnyTodos && (
          <button
            className="btn btn-danger"
            onClick={handleClearAll}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                清空中...
              </>
            ) : (
              <>
                <span>🗑️</span>
                清空全部 ({stats.total})
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
});

ActionBar.displayName = 'ActionBar';

export default ActionBar;

