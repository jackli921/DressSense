import React, { useEffect } from "react";


export default function SearchResult(props){
    const {filteredData, setInput, setIsSidebarVisible} = props
        
    function handleClick(e) {
        const target = e.target
        if (target && typeof target.innerText === 'string') {
            setInput(target.innerText);
        }
        setIsSidebarVisible(false)
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
  
