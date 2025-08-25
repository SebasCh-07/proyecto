import { useState } from 'react'
import ClientesAdmin from "./Clientes.Admin.jsx"

export default function Admin(){
  const [tab, setTab] = useState('clientes')
  return (
    <div className="container">

      <div className="tabs">
        <div className={['tab', tab==='clientes' && 'active'].filter(Boolean).join(' ')} onClick={()=>setTab('clientes')}>Clientes</div>
       
      </div>

      {tab==='clientes' && (
        <ClientesAdmin/>
      )}

    
    </div>
  )
}
