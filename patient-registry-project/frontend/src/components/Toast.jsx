export default function Toast({ message, isError, visible }) {
  return (
    <div className={`toast ${visible ? 'show' : ''} ${isError ? 'error' : ''}`}>
      {message}
    </div>
  )
}
