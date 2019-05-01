import React from 'react';

export default function Languages(props){
    let languages=[
        'All',
        'JavaScript',
        'Ruby',
        'Java',
        'Python',
        'PHP',
        'Shell',
        'CSS',
        'HTML'
    ]

    return(
        <ul className="repoview">
            {languages.map((lang,i) => {
                return(
                    <li className={lang===props.lang? "language active":"language"} key={i}
                    onClick={props.handleLangaugeChange.bind(null,lang)}>
                    {lang}
                   </li>
                )
                
            })}
            
        </ul>
    )
} 