import { useState } from 'react';

const PRIORITIES = [
  { value: 'low',    label: '🟢 Low',    color: '#38a169' },
  { value: 'medium', label: '🟡 Medium', color: '#d69e2e' },
  { value: 'high',   label: '🔴 High',   color: '#e53e3e' },
];

function TaskInput({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter a task before adding.');
      return;
    }
    onAdd(trimmed, priority);
    setText('');
    setPriority('medium');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="task-input-container">
      <div className="task-input-row">
        <input
          type="text"
          className={`task-input ${error ? 'input-has-error' : ''}`}
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          aria-label="New task text"
        />
        <button className="add-btn" onClick={handleAdd} aria-label="Add task">
          <span className="add-btn-icon">+</span>
          <span>Add</span>
        </button>
      </div>

      <div className="priority-row">
        <span className="priority-label">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            className={`priority-chip ${priority === p.value ? 'selected' : ''}`}
            style={priority === p.value ? { borderColor: p.color, color: p.color, background: p.color + '18' } : {}}
            onClick={() => setPriority(p.value)}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="input-error" role="alert">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

export default TaskInput;
