const Record = props => {
  const { title, children } = props;
  return (
    <div>
      {title && <h2 style={{ fontSize: '1.5rem' }}>{title}</h2>}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 12 }}>
        {children}
      </div>
    </div>
  )
}

export default Record;
