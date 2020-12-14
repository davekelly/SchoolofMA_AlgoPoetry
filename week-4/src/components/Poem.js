import React, { useState, useEffect } from 'react';

import Text from "./Text";



const Poem = () => {

    
    const [poems, updatePoems] = useState( null );
    const [poem, updatePoem] = useState( null );
    

    useEffect(() => {
        if(!poems){
            fetch("poems/config.json")
                .then(response => response.json())
                .then(( data ) => {
                    console.log(data)                
                    updatePoems(data);
                    let poemData = data[Math.floor(Math.random() * data.length)];

                    fetch("poems/" + poemData.file) 
                        .then(response => response.json())
                        .then(( poemText ) => {
                            console.log('poemText', poemText);
                            updatePoem(poemText);  
                        });
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }else{
            updatePoem(poems[Math.floor(Math.random() * poems.length)]);     
        }
    }, [poems]);


    if(!poem){
        return null;
    }
       

    return(
        
        <div className="container">
            <header className="row">
                <div className="col">
                    <h1> { poem.title }</h1>
                    <cite>{poem.author} </cite>
                </div>
            </header>
            <section className="col">
                <Text poem={poem} />
            </section>           
        </div>
    )
    

}

export default Poem;