const Record = props => {
  const { title, gray, children } = props;
  return (
    <div>
      {title && <h2 style={{ fontSize: '1.5rem' }}>{title}</h2>}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: 12, marginBottom: 12, background: gray ? 'rgb(190, 200, 200)' : 'initial' }}>
        {children}
      </div>
    </div>
  )
}

export default Record;
