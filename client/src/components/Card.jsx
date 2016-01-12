import React from 'react'

export default ({
  desc
}) => {
  return (
    <div className="list-card">
        <div className="list-card-item">
          <a className="list-card-name">{desc}</a>
        </div>
    </div>
  )
}
