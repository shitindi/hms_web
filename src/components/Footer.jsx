import React from 'react'

function Footer() {
  return (
    <div style={{display: "flex", justifyContent: "center", paddingBottom: 20}}>
      Copyright &copy; 2023-{(new Date()).getFullYear()} Byteware Solutions.
    </div>
  )
}

export default Footer
