import Axios from 'axios';

const id = '4f222f0a729e56486a58';
const sec = 'bcf861b19997f600bfe6c35342a4f40fa716c2d9';
const params = `?client_id=${id}&client_secret=${sec}`;
const latest='order=asc&sort=updated';

export function getUser(userName){
   return Axios.get(`https://api.github.com/users/${userName}${params}`)
        .then(results => results.data)
        .catch( (error) => {console.log(error);});
}


export function getRepos(userName){
   return Axios.get(`https://api.github.com/users/${userName}/repos${params}&${latest}`)
        .then(results=> results.data)
        .catch( (error) => {console.log(error);});
}

function getLang(repo){
        let url=repo+params
        return Axios.get(url)
        .then((results)=>{return results.data} )
        .catch((err)=>console.log(err.message))
}

export function getUserProfile(userName){
   return Axios.all([getUser(userName),getRepos(userName)])
        .then((data)=>{
                let user= data[0];
                let repos= data[1];
                return(calculateUserScore(user,repos))
        }
)
}

function calculateUserScore(user,repos){
        let userScore=3*user.followers+user.public_repos;
        let repoScore=repos.reduce((stars,repo)=>{
                return stars+3*repo.stargazers_count+repo.watchers_count;
        },0)
        return {userName:user.login,score:userScore+repoScore,userdata:user};
}

export function githubWar(players){
        return Axios.all([getUserProfile(players[0]),getUserProfile(players[1])])
                .then(playerScores=>{
                        return playerScores.sort((a,b)=>{return b.score-a.score})
                })
                .catch((err)=>console.log(err.message)
        )
}

export function getPopularRepos(language){
        let url=`https://api.github.com/search/repositories?q=stars:>1+language:${language}
        &sort=stars&order=desc&type=Repositories`
        return Axios.get(url)
           .then((results)=>{return results.data.items} )
           .catch((err)=>console.log(err.message))
}

export function getUserLanguage(userName){
        return getRepos(userName).then((data)=>{
                return getLanguagesbyrepo(data)
                  .then(data=>dataConversion(data))
        })
        
                
}

export async function getLanguagesbyrepo( languages ){
        // console.log(languages)
        let promise= new Promise(function(resolve,reject){
                let language=[];
                languages.forEach((lang,i)=>{
                        // console.log(lang.languages_url)
                        getLang(lang.languages_url)
                        .then((data)=>{
                                language.push(data)
                                if(language.length===languages.length){
                                        console.log(language)
                                   return resolve (language)
                                }
                        })
                        
                })
                
        })
        let result=await promise
        console.log()
        return getLangaugePercentage(result)
}

function getLangaugePercentage(langs){
        let languages=[];
        languages=langs;
        // console.log(languages)
        let finalLangobj= {};
       
       languages.forEach((lang)=>{
                for(let key in lang){
                        let keys = Object.keys(finalLangobj)
                        let result=keys.indexOf(key)
                        if(result!==-1){
                                finalLangobj[key]=finalLangobj[key]+lang[key]      
                        }else{
                                finalLangobj[key]=lang[key]
                        }
                }
        // console.log(finalLangobj)
                
        })
        let total=arraySum(Object.values(finalLangobj))
        for(let key in finalLangobj){
                // if(Math.round((finalLangobj[key]/ total)*100)!==0){
                        finalLangobj[key]=Math.round((finalLangobj[key]/ total)*100);
                // }
        }
                // console.log(finalLangobj)
        return finalLangobj;
      
        // console.log(c)
}

function arraySum(array){
        return array.reduce((acc,curr)=>{
                return acc+curr
        },0)
}


 function dataConversion(finalRepoObj){
        let data_array=[]
        for (let key in finalRepoObj){
                if(finalRepoObj[key]!==0){
               let newObj={
                "id": key,
                "label": key,
                "value": finalRepoObj[key],
               } 
               data_array.push(newObj)
        }
        }
        return data_array;
}
// getUserLanguage('sappusaketh').then(data=>console.log(data))
// githubWar(['sappusaketh','sa']).then(data=>console.log(data))