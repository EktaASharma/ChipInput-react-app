import React from 'react';
import './selectedValue.css'

const SelectedValueComponent = (props) =>{
    return ( 
        <span className="chip">
            <img src={props.listItem.img} alt="Person" width="96" height="96"/>
             {props.listItem.listValue}
             <span className="closebtn" onClick={()=>{props.cancelClick(props.listItem.key)}}>&times;</span>
        </span>

    );
}

export default SelectedValueComponent;