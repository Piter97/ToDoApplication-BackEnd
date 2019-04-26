//myStorage = localStorage;

var object = {
    email: "monday@gmail.com",
    password: "44444"
}

fetch("https://to-do-a.herokuapp.com/api/auth", {
        method: "post",
        body: JSON.stringify(object),
        headers: {
            "Content-Type": "application/json" 
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(`User ${res} was logged in`);
    })