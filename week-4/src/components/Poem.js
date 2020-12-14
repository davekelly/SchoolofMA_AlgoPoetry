import React, { useState, useEffect } from 'react';

import Text from "./Text";
import Image from "./Image";


const Poem = () => {

    
    const [poem, updatePoem] = useState( null );
    
    console.log(poem);
    // updatePoem(poem);  
   

    useEffect(() => {
        fetch("poems/config.json")
            .then(response => response.json())
            .then(( data ) => {
                console.log(data)                
                updatePoem(data[Math.floor(Math.random() * data.length)]);  
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return(
        <div>
            <section className="col">
                <Text poem={poem} />
            </section>
            <section className="col">
                <Image poem={poem} />
            </section>
        </div>
    )
    

}

export default Poem;