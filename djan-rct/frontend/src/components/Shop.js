import React from 'react'

export default function Shop({img, upgradeName, upgradePrice, onPurchase, upgradeCount}) {
    return (
    <div className='shopItems' onClick = {onPurchase}>
       <img src= {img} alt="cursor img"/>
       <div className='shopDesc'>
        <p className='name'>{upgradeName}</p>
        <p className='price'>{upgradePrice}</p>
       </div>
       <span className='upgradeCount'>{upgradeCount}</span>
    </div>
  )
}
