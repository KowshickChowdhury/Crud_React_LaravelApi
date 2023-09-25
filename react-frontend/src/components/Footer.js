import React from 'react';

export default function Footer(props) { 
    return (
        <>
        <div className="container-fluid" style={{backgroundColor:'rgb(205 210 213)', position:'absolute'}}>
            <div>
                <p className='mt-2 text-center'>{props.footertext}</p>
            </div>
        </div>
        </>
    )
    
}
