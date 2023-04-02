import React from 'react'

function Search(){
    const search = (Q) =>{
        console.log({Q})
    }

    

    return(
        <div className='search-container'>
            <input placeholder='cari film...'
            onChange={({target}) => search(target.value)}/>
        </div>
    );
}

export default Search;