import React from 'react'

export const Input = (props) => {
    return (
        <div style={{ padding: 5, borderRadius:8, width:'50%' }}>
            <input style={{ padding: 5, backgroundColor:'white', border:'0.5px solid rgba(118, 151, 244, 0.5)', borderRadius:8 , width:'100%' }} {...props} />
        </div>
    )
}
