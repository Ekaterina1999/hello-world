import React, {useState} from 'react';
export default function Button({children1,count,children2, enable}){

    const [current, setCurrent] = useState(5);
    const handelClick = ()=>{ if (current!==0){setCurrent(current-1);}
    else{alert('5');};};

    console.log(enable);
    
return <button onClick={handelClick} class="button">{children1} {count} {children2}</button> ;
}