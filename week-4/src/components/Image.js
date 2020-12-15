import React from 'react';


const Image = ({currentIndex, line_count, image_directory}) => {

    let imageArray = [];

    if(currentIndex > line_count){
        return null;
    }

    for (let index = 1; index < line_count; index++) {
        let file = 'poems/' + image_directory + '/' + index + '.jpg';
        imageArray.push( file);
    }

    return(
        <img src={imageArray[currentIndex]} className="machineImagined"/>
    )
    

}

export default Image;