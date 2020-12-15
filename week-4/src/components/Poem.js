import React, { useState, useEffect } from 'react';

import Text from "./Text";



const Poem = () => {

    
    const [poems, updatePoems] = useState( null );
    const [poemData, updatePoemData] = useState( null );
    const [poem, updatePoem] = useState( null );
    const [lines, updateLines] = useState( null );
    

    useEffect(() => {
        if(!poems){
            fetch("poems/config.json")
                .then(response => response.json())
                .then(( data ) => {
                    // console.log(data)                
                    updatePoems(data);
                    let meta = data[Math.floor(Math.random() * data.length)];

                    fetch("poems/" + meta.file) 
                        .then(response => response.json())
                        .then(( poemText ) => {
                            // console.log('poemText', poemText);
                            updatePoemData(meta);
                            updatePoem(poemText);  
                            updateLines(poemText.lines);
                        });
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }else{
            updatePoem(poems[Math.floor(Math.random() * poems.length)]);     
        }

        
    }, [poems]);



    if(!poem || !lines){
        return 'Loading...';
    }
       
    console.log('lines', lines);

    return(
        
        <div className="container">
            <header className="row pb-5 mb-5 pt-5">
                <div className="col">
                    <h1> { poem.title }</h1>
                    <cite>{poem.author} </cite>
                </div>
            </header>
            <section>
                <Text lines={lines} line_count={poem.linecount} image_directory={poemData.directory} />
            </section>           
        </div>
    )
    

}

export default Poem;