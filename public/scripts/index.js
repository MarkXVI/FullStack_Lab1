const content = document.getElementById('content');

const loadDataAsCards = async () => {
    state = "cards";
    await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
                    <button onclick="editItem('${response[x].name}');"> 
                        <p>Name: ${response[x].name} </p>
                        ${response[x].gender == "male" ? '<i class="fa-solid fa-person">Male</i>' : '<i class="fa-solid fa-person-dress">Female</i>' }
                        <p> Age: ${response[x].age} </p> 
                        <p> Sign Up Date: ${response[x].signUpDate} </p>  
                    </button> 
                </div> `;
            }
            content.innerHTML += `
            <div class="card"> 
                <button onclick="toRegister();">
                    <br>
                    <h1>+</h1> 
                    <br>
                    </button> 
            </div>`;
        };
    });


};

const loadDataAsTable = async () => {
    state = "table";
    await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        let data = '';
        if (response.error) {
            alert(response.error);
        } else {
            

            for (let x in response) {
                data += `
                <tr>
                    <td>${response[x].name}</td>
                    <td>${response[x].age}</td>
                    <td>${response[x].gender == "male" ? '<i class="fa-solid fa-person">Male</i>' : '<i class="fa-solid fa-person-dress">Female</i>' } </td>
                    <td>${response[x].signUpDate}</td>
                    <td><button id="editItem" onclick="editItem('${response[x].name}');">edit</button></td>
                </tr>`;
            };
            content.innerHTML = `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Sign Up Date</th>
                    <th></th>
                </tr>
                ${data}
            </table>
            `;
        };
    });

};

const updateItem = async (name) => {
    let nameInput = document.getElementById('nameInput').value;
    let ageInput = document.getElementById('ageInput').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    await fetch(`/api/user/update/${name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput,
            age: ageInput,
            gender: gender
        })
    })
    .then(response => {alert('Success!', response)});
    loadData();

};

const deleteItem = async (name) => {
    if (confirm(`Are you sure you want to delete ${name} from the database?`)) {
        await fetch(`/api/user/delete/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {alert('Success!', response)});
        loadData();  
    };
};

const setRadioButtons = (gender) => {
    let html = `<input type="radio" id="male" name="gender" value="male">
    <label for="male"><i class="fa-solid fa-person">Male</i></label>
    <input type="radio" id="female" name="gender" value="female" checked>
    <label for="female"><i class="fa-solid fa-person-dress">Female</i></label>`
    if (gender == 'male') {
        html = `<input type="radio" id="male" name="gender" value="male" checked>
        <label for="male"><i class="fa-solid fa-person">Male</i></label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female"><i class="fa-solid fa-person-dress">Female</i></label>`
    };
    return (html);
}

const editItem = async (name) => {
    console.log(name);
    await fetch(`/api/user/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        if (response.error) {
            alert(response.error);
        } else {
            content.innerHTML = `
            <div class="btns"> 
                <button id="back" onclick="loadDataAsTable();">Return to Table</button>  
                <button id="back" onclick="loadDataAsCards();">Return to Cards</button>  
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
    let nameInput = document.getElementById('nameInput').value;
    let ageInput = document.getElementById('ageInput').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    await fetch(`/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput,
            age: ageInput,
            gender: gender
        })
    })
    .then(response => {alert('Success!', response)});
    loadData();

}

const toRegister = () => {

    content.innerHTML = `
    <div class="btns"> 
        <button id="back" onclick="loadDataAsTable();">Return to Table</button>  
        <button id="back" onclick="loadDataAsCards();">Return to Cards</button>  
    </div> 
    <div class="user"> 
        <p>Name: <input type="text"  id="nameInput" placeholder="John Smith"></input></p>
        <p>Age: <input type="number" min="0" max="120" id="ageInput" placeholder="21"></input> </p> 
        ${ setRadioButtons('male') }
    </div> 
    <div class="btns"> 
        <button id="registerItem" onclick="registerItem();">Register</button>
    </div> `;

};


let state = "table";

const loadData = () => {
    switch (state) {
        case "table":
            return loadDataAsTable();
        case "cards":
            return loadDataAsCards();
    }
}

loadData();
