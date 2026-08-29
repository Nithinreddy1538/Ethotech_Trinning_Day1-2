

function validateform(){
const a=document.getElementById("username").value.trim();
const b=document.getElementById("email").value.trim();
const c=document.getElementById("password").value;
const d=document.getElementById("repassword").value;

const emailpattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (a===""||b===""||c===""||d===""){
    alert("All fields are required!")
    return false;
}
else if (c.length<8){
    alert("User name should ciontain 6 charecters")
    return false;
}

else if (c!=d){
    alert("mismatched password")
    return false;
}
else if (a.length>6){
    alert("User name should ciontain 6 charecters")
    return false;
}
else if (!emailpattern.test(b)){
    alert("mismatched email address")
    return false;
}
alert("form submitted sucessfully")
return true;
}
 