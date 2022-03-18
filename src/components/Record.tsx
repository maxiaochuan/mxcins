import * as React from 'react';

const Record: React.FC<{ title?: string; gray?: boolean; style?: React.CSSProperties }> = props => {
  const { title, gray, style, children } = props;
  return (
    <div>
      {title && <h2 style={{ fontSize: '1.5rem' }}>{title}</h2>}
      <div style={{ padding: 12 }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            padding: 12,
            marginBottom: 12,
            background: gray ? 'rgb(190, 200, 200)' : 'initial',
            ...style,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Record;
