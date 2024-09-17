async function adressbok() {
  try {
    const response = await fetch("/person");
    const data = await response.json();

    const adressbokDiv = document.getElementById("adressbokDiv");
    adressbokDiv.innerHTML = "";

    data.forEach((person) => {
      const personCard = document.createElement("div");
      personCard.innerHTML = `
                <h3 class="name inria-sans-regular">${person.name}</h3>
                <p class="email inria-sans-light">E-post: ${person.email}</p>
                <div class="cardbuttons">
                    <button id="editButton" class="cardButton">Edit</button>
                    <button id="deleteButton" class= "cardButton">Delete</button>
                </div>
            `;
      personCard.classList.add("card");
      adressbokDiv.appendChild(personCard);

    });
  } catch (error) {
    console.error("Error when trying to fetch adressbok: ", error);
  }
}

async function editPerson() {}
function openAddPerson() {
  const addPersonDiv = document.getElementById("addPersonDiv");
  if (addPersonDiv.classList.contains("hidden")) {
    addPersonDiv.classList.remove("hidden");
  } else {
    addPersonDiv.classList.add("hidden");
  };
};

function hideAddPerson() {
  const addPersonDiv = document.getElementById("addPersonDiv");
  addPersonDiv.classList.add("hidden");
  console.log("Avbryt klickades");
};

async function addPerson(){
  const newName = document.getElementById("addName");
  const newEmail = document.getElementById("addEmail");
  const newPerson ={
    name: newName.value,
    email: newEmail.value
  };

  try{
    const response = await fetch('/person',{
      method: 'POST',
      headers: {
        'content-Type': 'application/JSON'
      },
      body:JSON.stringify(newPerson),
    });

    if(!response.ok){
      throw new Error('problem with response from server.');
    };

    const data = await response.json();
    console.log(`${newPerson.name} added to adressbok`);

  }catch (error) {
      console.error("Error: ", error);
  }
  
};

async function deletePerson() {}

window.onload = adressbok();
document.addEventListener("DOMContentLoaded", function () {
  // document.getElementById("deleteButton").addEventListener("click", deletePerson);
  // document.getElementById("editButton").addEventListener("click", editPerson);
  document.getElementById("newPersonButton").addEventListener("click", openAddPerson);
  document
    .getElementById("avbrytButton")
    .addEventListener("click", hideAddPerson);
  document.getElementById("addButton").addEventListener("click", addPerson);
});
