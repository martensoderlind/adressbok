async function adressbok() {
    try {
        const response = await fetch('/person');
        const data = await response.json();

        const adressbokDiv= document.getElementById('adressbokDiv');
        adressbokDiv = "";

        data.forEach(person => {
            const personCard = document.createElement('div');
            personCard.innerHTML=`
            <h3>${person.name}</h3>
            <p>${person.email}</p>
            `;
            adressbokDiv.appendChild(personCard);
        });
    } catch(error){
        console.error('Error when trying to fetch adressbok: ', error)
    };
};
window.onload = adressbok;