export default function Header({ online }) {
  return (
    <header className="app-header">
      <div>
        <h1>Patient Registry</h1>
        <p className="tag">Records, vitals and BMI status for every patient on file</p>
      </div>
      <div className="conn-status">
        <span className={`conn-dot ${online ? '' : 'offline'}`}></span>
        {online ? 'Connected to API' : 'API unreachable'}
      </div>
    </header>
  )
}
