import React, { useState } from 'react';

function B() {

    const [color, setColor] = useState('blue');

    const changeColor = () => {
        setColor(color === 'blue' ? 'red' : 'blue');
    }

    return(
        <>
            <div>B 页面</div>
            <div>
                <button onClick={changeColor}>改变颜色</button>
            </div>

            <style jsx>
                {`
                    div {
                        color: ${color};
                    }
                `}
            </style>
        </>
    )
}

export default B;