import React from 'react';

export default function UserRepos(props){
    let repos=props.repos;
  
    if(repos.length!==0){
    
        return(
            <div className="row repo">
                <h4 style={{ width: '100%', textAlign: 'center' }}>User Repositories</h4>
                <ul className="repoalignment">
            {repos.map((repo)=>{
                
            let created=new Date(repo.created_at)
            created=created.toLocaleDateString('en-US',{year:'numeric',month:'long'})
                return(
                    <li className="card" key={repo.id} >
                    
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" ><h4 className="textsize">{repo.name}</h4></a>
                        <p>{repo.description}</p>
                        <div className="stats">
                        <p className="col-4">Forks: {repo.forks}</p>
                        <p  className="col-8">Open Issues: {repo.open_issues_count}</p>
                        </div>
                        <div className="stats">
                        <p className="col-4">Watch: {repo.watchers}</p>
                        <p  className="col-8">Main Language: {repo.language}</p>
                        </div>
                        
                        <p>Created On: {created}</p>
                        <div className="stats ">
                        <p className="col-6"><button className="btn btn-warning">Repo</button></p>
                        <p  className="col-6"><button className="btn btn-danger">Website</button></p>
                        </div>
                    
                    </li>
                   
                    
                )   
            } )}
            </ul>
            </div>
        )
    
    }else{
        return null;
    }
    
  

}