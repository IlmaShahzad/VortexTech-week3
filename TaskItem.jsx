const PRIORITY_META = {
  high:   { label: 'High',   color: '#e53e3e', bg: '#fff5f5', bar: '#fc8181' },
  medium: { label: 'Medium', color: '#d69e2e', bg: '#fffff0', bar: '#f6e05e' },
  low:    { label: 'Low',    color: '#38a169', bg: '#f0fff4', bar: '#68d391' },
};

function TaskItem({ task, index, onToggle, onDelete }) {
  const meta = PRIORITY_META[task.priority] || PRIORITY_META.medium;

  return (
    <li
      className={`task-item ${task.completed ? 'completed' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Priority accent bar */}
      <div className="priority-bar" style={{ background: meta.bar }} />

      <label className="task-label">
        {/* Custom checkbox */}
        <span
          className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggle(task.id)}
          role="checkbox"
          aria-checked={task.completed}
          tabIndex={0}
          onKeyDown={(e) => e.key === ' ' && onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        >
          {task.completed && <span className="checkmark">✓</span>}
        </span>

        <div className="task-body">
          <span className="task-text">{task.text}</span>
          <span
            className="priority-badge"
            style={{ color: meta.color, background: meta.bg }}
          >
            {meta.label}
          </span>
        </div>
      </label>

      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
        title="Delete task"
      >
        🗑
      </button>
    </li>
  );
}

export default TaskItem;
