async function adressbok() {
  try {
    const response = await fetch("/person");
    const data = await response.json();

    const adressbokDiv = document.getElementById("adressbokDiv");
    adressbokDiv.innerHTML = "";

    data.forEach((person) => {
      const personCard = document.createElement("div");
      personCard.innerHTML = `
                <div>
                <h3 class="name inria-sans-regular" id="name${person.id}">${person.name}</h3>
                <input type="text" id="inputName${person.id}" placeholder="" class="inputfield hidden"/>
                </div>
                <div>
                  <p class="email inria-sans-light" id="email${person.id}">E-post: ${person.email}</p>
                  <input type="text" id="inputEmail${person.id}" placeholder="" class="inputfield hidden"/>
                </div>
                <div class="cardbuttons">
                    <button id="editButton${person.id}" class="cardButton" onClick="openEditPerson(${person.id})">Edit</button>
                    <button id="saveEditButton${person.id}" class="cardButton hidden" onClick="saveEditPerson(${person.id})">Save</button>
                    <button class="cardButton hidden" id="cancelButton${person.id}" onClick="deletePerson(${person.id})">Cancel</button>
                    <button class="cardButton" id="deleteButton${person.id}" onClick="deletePerson(${person.id})">Delete</button>
                </div>
            `;
      personCard.classList.add("card");
      personCard.setAttribute('id',person.id)
      adressbokDiv.appendChild(personCard);

    });
  } catch (error) {
    console.error("Error when trying to fetch adressbok: ", error);
  };
};

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
    newName.value="";
    newEmail.value="";
    adressbok();
  }catch (error) {
      console.error("Error: ", error);
  };  
};

async function openEditPerson(id) {
 const inputName =document.getElementById("inputName"+id);
 const inputEmail =document.getElementById("inputEmail"+id);
 const nameValue =document.getElementById("name"+id);
 const emailValue =document.getElementById("email"+id);
 const editButton =document.getElementById("editButton"+id);
 const deleteButton =document.getElementById("deleteButton"+id);
 const saveButton =document.getElementById("saveEditButton"+id);
 const cancelButton =document.getElementById("cancelButton"+id);

 try{
  const response = await fetch(`/person/${id}`,{
    method:'GET'
  });
  
  if(!response.ok){
    throw new Error("Problem with response");
  };
  const data = await response.json();
  if(inputName.classList.contains("hidden")){
    inputEmail.classList.remove("hidden");
    inputName.classList.remove("hidden");
    saveButton.classList.remove("hidden");
    cancelButton.classList.remove("hidden");
    nameValue.classList.add("hidden");
    emailValue.classList.add("hidden");
    editButton.classList.add("hidden");
    deleteButton.classList.add("hidden");
    
    inputName.value=data.name;
    inputEmail.value=data.email;
  };
  // else{
  // //   inputEmail.classList.add("hidden");
  // //   inputName.classList.add("hidden");
  // //   saveButton.classList.add("hidden");
  // //   cancelButton.classList.add("hidden");
  // //   nameValue.classList.remove("hidden");
  // //   emailValue.classList.remove("hidden");
  // //   saveButton.classList.remove("hidden");
  // //   cancelButton.classList.remove("hidden");
  // // }

 }catch(error){
  console.log("Error: ",error);
 }
};

async function saveEditPerson(id) {
  const inputName =document.getElementById("inputName"+id).value;
  const inputEmail =document.getElementById("inputEmail"+id).value;
  const updatedPerson ={
    "name":inputName,
    "email": inputEmail
  };
  try{
    const response =await fetch(`/person/${id}`,{
      method:"PATCH",
      headers: {
        'content-Type': 'application/JSON'
      },
      body:JSON.stringify(updatedPerson),
    });
    if(!response.ok){
      throw new Error("Problem with response");
    };
    console.log(`${inputName} have been updated.`)
    adressbok();
  }catch(error){
    console.log("Error:", error);
  };
};

async function deletePerson(id) {
 const deletePersonDiv = document.getElementById(id);

 try{
  const response = await fetch(`/person/${id}`,{
    method: 'DELETE'
  });

  if(!response.ok){
    throw new Error('Response was not ok');
  };

  console.log("Person have been removed from adressbok.")
  adressbok();
 }catch(error){
  console.log('Error: ',error);
 };
};

window.onload = adressbok();
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("newPersonButton").addEventListener("click", openAddPerson);
  document
    .getElementById("avbrytButton")
    .addEventListener("click", hideAddPerson);
  document.getElementById("addButton").addEventListener("click", addPerson);
});
