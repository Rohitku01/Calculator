document.getElementById('submit-btn').addEventListener('click', function(){
    event.preventDefault();
});

document.getElementById('submit-btn').addEventListener('click', () =>{
    let username = document.getElementById('inputusername').value;
    if(username.trim()==""){
        return;
    }
    let url = 'https://api.github.com/users/'+username;
    fetch(url).then(res=>res.json()).then( data =>{
        if(data.message=="Not Found"){
            showhide(1);
            document.getElementById('fullname').style.display='revert';
            document.getElementById('fullname').innerHTML = "User don't exist!";
            return;
        }
        showhide(0);
        document.getElementById('fullname').innerHTML = data.name;
        document.getElementById('username').innerHTML = "(@"+data.login+")";
        document.getElementById('userimg').src = data.avatar_url;
        document.getElementById('follwers').innerHTML = 'Followers:' + data.followers;
        document.getElementById('following').innerHTML = 'Following:' + data.following;
        document.getElementById('pub-repos').innerHTML = 'Repo:' + data.public_repos;
        
        console.log(data);
    }).catch(e=>{
        showhide(1);
        console.log(e);
    })
});


document.getElementById('submit-btn').addEventListener('click', () =>{
    document.getElementById('repogohere').querySelectorAll('*').forEach( n => n.remove() );
    let username = document.getElementById('inputusername').value;
    let url = 'https://api.github.com/users/'+username+"/repos";
    fetch(url).then(res=>res.json()).then( data =>{
        for(let i = 0; i<data.length; i++){
        let div = document.createElement('div');
        div.classList.add('repo');
        div.innerHTML = data[i].name;
        document.getElementById('repogohere').appendChild(div);}
        console.log(data);
    }).catch(e=>{
        showhide(1);
        console.log(e);
    })
});



function showhide(i){
    if(i == 0){
        document.getElementById('fullname').style.display='revert';
        document.getElementById('username').style.display='revert';
        document.getElementById('follwers').style.display='revert';
        document.getElementById('repolist').style.display='revert';
        document.getElementById('userphoto').style.display='revert';
        document.getElementById('following').style.display='revert';
        document.getElementById('pub-repos').style.display='revert';
    }
    else{
        document.getElementById('repogohere').querySelectorAll('*').forEach( n => n.remove() );
        document.getElementById('fullname').style.display='none';
        document.getElementById('username').style.display='none';
        document.getElementById('follwers').style.display='none';
        document.getElementById('repolist').style.display='none';
        document.getElementById('following').style.display='none';
        document.getElementById('pub-repos').style.display='none';
    }
}
