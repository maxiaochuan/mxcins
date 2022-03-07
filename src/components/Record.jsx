const Record = props => {
  const { title, gray, children } = props;
  return (
    <div>
      {title && <h2 style={{ fontSize: '1.5rem' }}>{title}</h2>}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 12, background: gray ? 'gray' : 'initial' }}>
        {children}
      </div>
    </div>
  )
}

export default Record;
