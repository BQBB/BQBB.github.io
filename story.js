window.onload=function(){
    document.querySelector('.formControls').style.margin=(document.getElementsByTagName('nav')[0].clientHeight+14)+"px 0"
    var checks=document.getElementById('user');
    checks.addEventListener('keyup',function(e){if(e.keyCode===13){request(document.getElementById('user').value)}})
}


function getID(user){
    let id;
    var req=new XMLHttpRequest();
    req.onreadystatechange=function(){
    if(this.readyState==4&&this.status==200){

        id= this.responseText.match('profilePage_(.*?)",')[1];
    }
    }
    req.open("GET","https://www.instagram.com/"+user,false);
    req.send();
    return id;
}
function request(user){
var p=document.querySelector('p');p.innerText="Wait..."
if(user==''){p.style.color="red";p.innerText="user not Correctly"}
else{
    if(localStorage.getItem(user)){
        user=localStorage.getItem(user)
    }
    else{
        user=getID(user);
        localStorage.setItem(document.getElementById('user').value,user)
    }
    
p.style.color="#28a745";
var bdy="";
var req=new XMLHttpRequest();
req.onreadystatechange=function(){
if(this.readyState==4&&this.status==200){


    var lisurl=this.responseText.split(',');
    p.innerText='Stories : '+lisurl.length
    for(var urlss of lisurl){
        if(urlss.includes(".jpg")){
         bdy+="<div class=\"carousel-item\"><img class=\"img rad d-block\" src="+urlss+"/></div>";

        }
        else{
            bdy+="<div class=\"carousel-item\"><video class='d-block rad ' src="+urlss+"  controls></video></div>";
        }
    }
    document.querySelector('.carousel-control-prev').removeAttribute('hidden')
    document.querySelector('.carousel-control-next').removeAttribute('hidden')

    document.getElementById('here').innerHTML=bdy

    document.querySelector('div.carousel-item').classList.add('active');

}
else if(this.status==404){
    p.style.color="red";
    p.innerText="Stories : Empty"
}


}
req.open("GET","https://boiling-taiga-54246.herokuapp.com/?u="+user,true);
req.send();
}}
