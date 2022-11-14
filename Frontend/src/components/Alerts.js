import React from 'react'

export default function Alerts(props) {
  let header=''
  if(props.alert){
    if(props.alert.type==='success'){
      header='Congratulations!'
    }
    else if(props.alert.type==='danger'){
      header='Sorry!'
    }
  }
  return (
     props.alert&&<div>
<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{header}</strong> {props.alert.message}
</div>
    </div>
  )
}
