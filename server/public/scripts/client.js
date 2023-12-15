console.log( 'js' );

/**
 * DOM ELEMENTS
 */
let koalaTBody = document.getElementById('viewKoalas');


function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas

  axios({
    method: "GET",
    url: "/koalas"
  })
  .then((response) => {
    console.log(response.data);
    // send in the array of objects
    appendsKoalasToTable(response.data);
  })
  .catch((error) => {
    console.log("whoops, there be an error in here!");
    console.error(error);
  })
  
} // end getKoalas


function addKoala(event) {
  event.preventDefault();

  console.log("Submit button clicked.");
  let koala = {};
  koala.name = document.getElementById("nameIn").value;
  koala.age = document.getElementById("ageIn").value;
  koala.gender = document.getElementById("genderIn").value;
  koala.readyForTransfer = document.getElementById("readyForTransferIn").value;
  koala.notes = document.getElementById("notesIn").value;
  saveKoala(koala);
}

function clearForm(){
  document.getElementById('nameIn').value = '';
  document.getElementById('ageIn').value = '';
  document.getElementById('genderIn').value = '';
  document.getElementById('readyForTransferIn').value = '';
  document.getElementById('notesIn').value = '';
}

// function saveKoala(event){
//   //event.preventDefault();
//   console.log( 'in saveKoala' );
//   // axios call to server to get koalas
//   //made this an object to create request body
//   let koalaObject ={
//     name: document.querySelector('#nameIn').value,
//     age: document.querySelector('#ageIn').value,
//     gender: document.querySelector('#genderIn').value,
//     readyForTransfer: document.querySelector('#readyForTransferIn').value,
//     notes: document.querySelector('#notesIn').value
//   }
//   console.log(koalaObject);
//   //send the new koala data to the server
//   axios.post('/koalas', koalaObject).then((response) => {
//     clearForm();
//     getKoalas();
// }).catch((error) => {
//     console.log('Error', error);
//     alert('Something went wrong');
// });
 
// }

function saveKoala(koalaAdded) {
const koalaToAdd= {
  name: document.getElementById("nameIn").value,
  age: document.getElementById("ageIn").value,
  gender: document.getElementById("genderIn").value,
  readyForTransfer: document.getElementById("readyForTransferIn").value,
  notes: document.getElementById("notesIn").value
}

  axios({
    method: "POST",
    url: "/koalas",
    data: koalaToAdd,
  })
    .then(function (response) {
      console.log("saveKoala()", response.data);
      getKoalas();
      clearForm();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add koala at this time. Please try again later.");
    });
}

function koalaReadyForTransfer(event) {

  console.log('incoming event.target', event.target)
  console.log('Getting dataset from component', event.target.closest("tr").dataset.id)

  // Retrieving data that has been stored on an element
  let bookId = event.target.closest("tr").dataset.id

  axios.put(`/koalas/${koalaId}`)
      .then((response) => {
          getKoalas();
      })
      .catch((error) => {
          console.log('Error', error);
          alert('Something went wrong');
      });
}

appendsKoalasToTable(arrayOfKoalas) {
  console.log("made it into the appendsKoalasToTable - function!");
  console.log("our koalas:");
  console.table(arrayOfKoalas);

  // reset inner html of the table body
  koalaTBody.innerHTML = "";

  for (let koala of arrayOfKoalas){
    console.log("id:", id, "name:", koala.name, "age:", koala.age, "gender:", koala.gender, "readyForTransfer:", koala.readyForTransfer, "notes:", koala.notes );
    
    koalaTBody.innerHTML +=
      `
      <tr data-id="${koala.id}">
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>${koala.readyForTransfer ? '' : '<button onclick="koalaReadyForTransfer(event)">Ready For Transfer</button>'}</td>
      <td>${koala.notes}</td>
      <td>${koala.age}</td>
      <td>${koala.age}</td>
      </tr>    
      `;
    
  }
}

getKoalas();
saveKoala()
