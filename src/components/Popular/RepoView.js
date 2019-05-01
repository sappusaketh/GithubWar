import React from 'react';

export default function RepoView(props){
    let repos=props.repos;
    // console.log(repos)
    return(
    <ul className="repoview">
        {
            repos.map((repo,i)=>{
                return(
                    <li  key={i}>
                        <div className="rank">
                            <p>#{i+1}</p>
                        </div>
                        <div>
                            <img className="repoImg" src={repo.owner.avatar_url} alt={repo.owner.login}/>
                            <a href={repo.html_url} target='_blank' rel="noopener noreferrer"><p>{repo.name}</p></a>
                            <p>@{repo.owner.login}</p>
                            <p>{repo.stargazers_count} stars</p>
                        </div>
                    </li>
                )
            })
        }
        
    </ul>
        )
}