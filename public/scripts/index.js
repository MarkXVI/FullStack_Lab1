
const content = document.getElementById('content');

const loadData = async () => {

    await fetch('/api/user', {
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
                content.innerHTML += ` 
                <div class="card"> 
                    <button onclick="toPage('${response[x].name}');"> 
                        ${response[x].gender == "male" ? '<i class="fa-solid fa-person"></i>' : '<i class="fa-solid fa-person-dress"></i>' }
                        <p>Name: ${response[x].name} </p>
                        <p> Age: ${response[x].age} </p> 
                        <p> Sign Up Date: ${response[x].signUpDate} </p>  
                    </button> 
                </div> `;
            }
            content.innerHTML += `
            <div class="card"> 
                <button onclick="toRegister();">
                    <br> <br> 
                    <h1>+</h1> 
                    <br> <br> 
                </button> 
            </div>`;
        };
    });

};

loadData();

const updateItem = (name) => {
    console.log(name);
};

const deleteItem = async (name) => {
    if (confirm(`Are you sure you want to delete ${name} from the database?`)) {
        await fetch(`/api/user/delete/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                alert(response.error);
            } else {
                console.log('deleted');
            }
        });
        loadData();  
    };
};

const setRadioButtons = (gender) => {
    let html = `<input type="radio" id="male" name="gender" value="male">
    <label for="male"><i class="fa-solid fa-person"></i></label>
    <input type="radio" id="female" name="gender" value="female" checked>
    <label for="female"><i class="fa-solid fa-person-dress"></i></label>`
    if (gender == 'male') {
        html = `<input type="radio" id="male" name="gender" value="male" checked>
        <label for="male"><i class="fa-solid fa-person"></i></label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female"><i class="fa-solid fa-person-dress"></i></label>`
    };
    return (html);
}

const toPage = async (name) => {
    console.log(name);
    await fetch(`/api/user/${name}`, {
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
            content.innerHTML = `
            <div class="btns"> 
                <button id="back" onclick="loadData();">Return</button>  
            </div> 
            <div class="user"> 
                <p>Name: <input type="text" id="nameInput" placeholder="${response.name}"></input></p>
                <p>Age: <input type="number" min="0" max="120" id="ageInput" placeholder="${response.age}"></input> </p> 
                ${ setRadioButtons(response.gender) }
                <p>Sign Up Date: ${response.signUpDate}</p> 
            </div> 
            <div class="btns"> 
                <button id="updateItem" onclick="updateItem('${response.name}');">update</button>
                <button id="deleteItem" onclick="deleteItem('${response.name}');">delete</button>
            </div> `;
        };
    });
}

const registerItem = async () => {
    let name = document.getElementById('nameInput').value;
    let age = document.getElementById('ageInput').value;
    let gender = document.getElementsByName('gender').value;

    await fetch(`/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: name,
            age: age,
            gender: gender
        }
    })
    .then((response) => {response.json()})
    .then((res) => {alert(res)});
    loadData();

}

const toRegister = () => {

    content.innerHTML = `
    <div class="btns"> 
        <button id="back" onclick="loadData();">Return</button>  
    </div> 
    <div class="user"> 
        <p>Name: <input id="nameInput" placeholder="John Smith"></input></p>
        <p>Age: <input id="ageInput" placeholder="21"></input> </p> 
        ${ setRadioButtons('male') }
    </div> 
    <div class="btns"> 
        <button id="registerItem" onclick="registerItem();">Register</button>
    </div> `;

};
