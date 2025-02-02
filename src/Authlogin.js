import React from 'react'
import Auth from './Pages/Auth'

function Authlogin() {
  return (
    <div
  className=""
  style={{
    backgroundImage: "url('/assets/login theme.jpg')",
    backgroundSize: "cover", // Ensures the image covers the entire div
    backgroundPosition: "center", // Centers the image
    height: "100vh", // Example height
    width: "100%", // Example width
  }}
>
    <Auth/>
 
</div>

  )
}

export default Authlogin
