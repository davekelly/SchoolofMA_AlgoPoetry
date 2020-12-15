import React, {useEffect, useState } from 'react';
import Image from "./Image";
import Typewriter from 'typewriter-effect';


const Text = ({lines, line_count, image_directory}) => {

    let [currentIndex, updateCurrentIndex] = useState(0);
    let [output, updateOutput]    = useState('');
    let getLine = true;
    let nextIndex = 0;

    let getNextLine = () => {
        let nextIndex = currentIndex++;
        // console.log(currentIndex, nextIndex);
        updateCurrentIndex(nextIndex);

        updateOutput(lines[nextIndex]);
        // console.log(  lines[nextIndex]);
        
        getLine = false;
    }


    useEffect(() => {
       
        const timeout = setInterval(() => {
            getNextLine();
        }, 5500);
        
        return () => clearTimeout(timeout);

    }, []);

        
    return (
        <div className="row">
            <div className="col">
                <Typewriter
                    strings={output}
                    onInit={(typewriter) => {
                        
                        typewriter.typeString(lines.join(' <br/> '))
                        typewriter
                            .callFunction(() => {
                                // console.log('String typed out!');
                                // getNextLine();
                                // getLine = true;;
                            })
                            .pauseFor(2500)
                            // .deleteAll()
                            // .callFunction(() => {
                            //     console.log('All strings were deleted');
                            //     // getNextLine();                                
                            // })
                            .start();
                    }}
                />
            </div>
            <div className="col">
           
                <Image line_count={line_count} image_directory={image_directory} currentIndex={currentIndex} />
            </div>
        </div>
    );
    

}

export default Text;