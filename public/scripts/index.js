
const content = document.getElementById('content');

const loadData = async () => {

    await fetch('/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        if (response.error) {
            alert(response.error);
        } else {
            content.innerHTML = "";
            for (let x in response) {
                content.innerHTML += ` <div class="user"> <button onclick="toPage('${response[x].name}');"> <p>Name: ${response[x].name} </p><p> Age: ${response[x].age} </p> <p> Sign Up Date: ${response[x].signUpDate} </p>  </button> </div> `;
                // <button id="updateItem" onclick="updateItem('${response[x].name}');">update</button><button id="deleteItem" onclick="deleteItem('${response[x].name}');">delete</button> 
            }
            content.innerHTML += `<div class="user"> <button id="register" onclick="toRegister();"> <h1>+</h1> </button> </div>`;
        };
    });

};

loadData();

const updateItem = (name) => {
    console.log(name);
};

const deleteItem = (name) => {
    if (confirm(`Are you sure you want to delete ${name} from the database?`)) {

    }
};

const toPage = async (name) => {
    await fetch(`/user/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        if (response.error) {
            alert(response.error);
        } else {
            content.innerHTML = `<div class="btns"> <button id="back" onclick="loadData();">Return</button> <button id="updateItem" onclick="updateItem('${response.name}');">update</button> </div> <div class="user"> <p>Name: ${response.name} </p><p> Age: ${response.age} </p> <p> Sign Up Date: ${response.signUpDate} </p> </div> `;
        };
    });
}

const toRegister = () => {

    

};
