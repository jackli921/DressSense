import React from "react";


export default function SearchResult(props){
    const {filteredData, setInput} = props
        
    function handleClick(e) {
        setInput(e.target.innerText)
    }


    const results = filteredData.map((place, index) => {
        return (
            <div className="result-card" key={index}>
                <p
                    className="result-text"
                    onClick={(e) => handleClick(e)}
                >
                    {place.name}
                </p>
            </div>
        );
    })

    return (
        <>
            {results}
        </>
        )
};
  
