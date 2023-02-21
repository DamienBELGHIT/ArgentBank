import "./index.css"

function IconInfo({ icon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={icon} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default IconInfo
