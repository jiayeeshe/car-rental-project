import React from 'react'
import Navbar from './Navbar'

function DefaultLayout(props) {
  return (
    <div>
        <Navbar/>
        <div className=" mt-2 container overflow-auto d-flex justify-content-center justify-content-lg-center justify-content-md-center justify-content-sm-center" style={{ minHeight: '90vh',minWidth:'80%', backgroundColor:'azure' }}>
            {props.children}
        </div>
    </div>
  )
}

export default DefaultLayout