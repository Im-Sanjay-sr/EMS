let employeeDeleteForm = document.getElementById("deleteform");   ///dele form id
let employeeOpenBtn = document.getElementById("employeeOpen");    ///add employee btn id
let submitFormOpen = document.getElementById("formOpen");         ///bootstrap frm id
let submitFormClose = document.getElementById("formClose");       ///close form X ic
let deleteFormOpen = document.getElementById("deleteopen");       ///dele btn bucket ic
let deleteFormClose = document.getElementById("deleteclose");     ///dele frm x ic
let saveBtn = document.getElementById("saveForm");                ///In frm addEply btn
// let deleteBtn = document.getElementById("deleteForm");         ///In frm dele btn 
let deleteemply = document.getElementById("dltUser");             ///veiw detail dele btn





function genderSelect() {
  let Male = document.getElementById("maleForm");
  let Female = document.getElementById("femaleForm");

  if (Male.checked == true) {
    return Male.value;
  } else {
    return Female.value;
  }
}

// -----------------ADD EMPLOYE FORM FILE---------------



function formData() {


  let Salutation = document.getElementById("SalutationForm").value;
  let Name = document.getElementById("nameForm").value;
  let FullName = document.getElementById("fullNameForm").value;
  let email = document.getElementById("emailForm").value;
  let phoneNo = document.getElementById("phoneNoForm").value;
  let dob = document.getElementById("dobForm").value;
  let qulification = document.getElementById("qulificationForm").value;
  let address = document.getElementById("addressForm").value;
  let city = document.getElementById("cityForm").value;
  let state = document.getElementById("stateForm").value;
  let country = document.getElementById("countryForm").value;
  let username = document.getElementById("usernameForm").value;
  let password = document.getElementById("PasswordForm").value;
  // let pin= document.getElementById("pinForm").value;


  let user = {
    salutation: Salutation,
    firstName: Name,
    lastName: FullName,
    email: email,
    phone: phoneNo,
    dob: date(dob),
    gender: genderSelect(),
    qualifications: qulification,
    address: address,
    city: city,
    state: state,
    country: country,
    username: username,
    password: password,
  }
  console.log(user)
  return user;


}


//----------------------------------- VEIWDETAILS PREVIEW ALL DETAILS SEE........................................................

let view = new URLSearchParams(document.location.search);
let Id = view.get("id");
userId = Id;
console.log(Id);


const viewdetails = async () => {

  

  let employeeDetails = document.getElementById("employeeview");

  try {
    const res = await fetch('http://localhost:3000/employees/' + Id, {
      method: 'GET'
    });
    const user = await res.json();
    console.log(user)


    employeeDetails.innerHTML =
      `<div class="body">
<div class="imgs">
        
          <img src="img/Background Image.png" alt="">
          <div class="dp">
          <img src="http://localhost:3000/employees/${user.id}/avatar" alt=profilpic class="rounded-circle mr-2"height=120  width=120>
        </div>
        
      </div>
  <div class="text">
    <h5> ${user.salutation}.${user.firstName}.${user.lastName}</h5>
    <p>${user.email}</p>
  </div>
<div class="detailviews">
  <div class="view">
    <p>Gender</p>
    <h6>${user.gender}</h6>
  </div>
  <div class="view">
    <p>Age</p>
    <h6>${calculate(user.dob)}</h6>
  </div>
  <div class="view">
    <p>Date of Birth</p>
    <h6>${user.dob}</h6>
  </div>
</div>
<div class="detailviews">
  <div class="view max">
    <p>Mobile Number</p>
    <h6>${user.phone}</h6>
  </div>

  <div class="view max">
    <p>Qualifications</p>
    <h6>${user.qualifications}</h6>
  </div>
</div>
<div class="detailviews">
  <div class="view max">
    <p>Address</p>
    <h6>${user.address}.${user.state}.${user.city}</h6>
  </div>

  <div class="view max">
    <p>Username</p>
    <h6>${user.username}</h6>
  </div>
</div>
<div class=" d-flex justify-content-end">
  <button id="dltUser" class="btss dark" onclick="openDeleteForm('${user.id}')">Delete</button>
  <button  class="btss normal" onclick="getUser('${user.id}')">Edit Details</button>
</div>

</div>`
document.getElementsByClassName('pops')[0].style.zIndex = '0';
    if (!res.ok) {
      console.log(user.descripition);
      return;
    }

  } catch (error) {
    console.log(error);
  }

}
viewdetails();

// --------------------------------------------------------------------------------



// --------------------------FETCH EDIT DATA.................................................................

async function getUser() {

  // .......................IMAGE IN EDITI FORM..........................

  

  document.getElementById('changebtn').style.display = 'block'
  const imageview = document.getElementById('upload');
  imageview.innerHTML = " ";

  let viewdata = `<img src ="http://localhost:3000/employees/${userId}/avatar" alt=profilpic height=100 width=100 id="selectedPic">`;
  imageview.innerHTML = viewdata;

  let selectedPic = document.getElementById('selectedPic');

  imageview.setAttribute("style", "width:20% !important");
  selectedPic.setAttribute("style", "border-radius:12px");

  //   ......................


  try {
    openForm();
    let Male = document.getElementById("maleForm");
    let Female = document.getElementById("femaleForm");

    //---- edit form----

    document.getElementById('saveForm').style.display = "none";
    document.getElementById('editForm').style.display = "block";
    document.getElementById('addChange').textContent = "Edit Employee";



    // --------------------------FETCH EDIT DATA.................................................................

    const res = await fetch("http://localhost:3000/employees/" + userId)
    const data = await res.json()

    // .then((res)=>res.json()).then((data)=>{
    document.getElementById("SalutationForm").value = data.salutation;
    document.getElementById("nameForm").value = data.firstName;
    document.getElementById("fullNameForm").value = data.lastName;
    document.getElementById("emailForm").value = data.email;
    document.getElementById("phoneNoForm").value = data.phone;
    document.getElementById("dobForm").value = date(data.dob);
    data.gender === "Male" ? Male.checked = true : Female.checked = true;
    document.getElementById("usernameForm").value = data.username;
    document.getElementById("PasswordForm").value = data.password;
    document.getElementById("qulificationForm").value = data.qualifications;
    document.getElementById("addressForm").value = data.address;
    document.getElementById("countryForm").value = data.country;
    document.getElementById("stateForm").value = data.state;
    document.getElementById("cityForm").value = data.city;



    document.getElementsByClassName('pops')[0].style.zIndex = '0';
  }

  catch (error) {
    console.log(error);
  }
}




//---------------------------- EDIT DATA THEN SAVE API..................................................


async function getEdit() {
  if (profilePic) {
    addAvatar();
  }

  try {

    console.log(formData());

    const res = await fetch("http://localhost:3000/employees/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData())
    })

  }
  catch (error) {
    console.log(error);

  }

  if( document.getElementById('alerteded')==null){
    showMessage('Edited successfully');
    setTimeout("hideMessage()", 10000);
  }else{
    showMessage2('Edited successfully');
    setTimeout("hideMessage2()", 10000);
  }
 

    
    submitFormOpen.style.display = "none"
    overlay.style.display = "none"
    
    // setTimeout(() => {
    //   location.reload();
    //  }, 2000);
}



//-------------------------- DELETE DATA IN API AND FRAME........................................


function openDeleteForm(id) {
  employeeDeleteForm.classList.add('active');
  document.getElementById('overlay').classList.add('active');

 
  
  deleteemply.addEventListener("click", function () {
    fetch("http://localhost:3000/employees/" + id, {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      // body:JSON.stringify(formData())
    }).then((res) => res.json()).then((response) => {
      if (!response.ok) {
        console.log(response.description)
        return
      }
    }).catch(error => {
      console.log(error);
    })
    if( document.getElementById('alerteded')==null){
      showMessage('Deleted successfully');
      setTimeout("hideMessage()", 10000);
    }else{
      showMessage2('Deleted successfully');
      setTimeout("hideMessage2()", 10000);
    }
    employeeDeleteForm.style.display = "none"
    overlay.style.display = "none"
    
    // setTimeout(() => {
    //   location.reload();
    //  }, 2000);


    document.getElementsByClassName('pops')[0].style.zIndex = '0';
  })

 
}


// --------------------------ADD AVATAR...................................................


async function addAvatar() {

  let avatardata = new FormData()
  avatardata.append("avatar", profilePic)

  try {
    const res = await fetch("http://localhost:3000/employees/" + userId + "/avatar", {

      method: "POST",

      body: avatardata
    })
  }
  catch (error) {
    console.log(error);
  }


}



// --------------------------IMAGE PREVIEW  INPUT..................................


let imageFile = document.getElementById("formFile");  ///img input id
let profilePic;


imageFile.addEventListener('change', () => {
  profilePic = imageFile.files[0]
  console.log(profilePic)


  if (profilePic) {
    const src = URL.createObjectURL(profilePic)

    console.log(src)
    document.getElementById('changebtn').style.display = 'block'

    const imageview = document.getElementById('upload');
    imageview.innerHTML = " ";

    let viewdata = ` <img src ="${src}" alt="profilpic" height="100" width="100" id="selectedPic">`
    imageview.innerHTML = viewdata;

    let selectedPic = document.getElementById('selectedPic');

    imageview.setAttribute("style", "width:20% !important");
    selectedPic.setAttribute("style", "border-radius:12px");
  }
  // console.log("hi")
})


//--------------------------- DATE SPLIT...........................................................

function date(dob) {
  let date = dob.split('-').reverse().join('-');
  return date;
}


// ---------------------AGE CALCULATE IN VEIW DETAILS........................................


function calculate(dob) {
  let Dob = dob.split('-');
  let age = []
  for (let i = 0; i < 3; i++) {
    age.push(parseInt(Dob[i]))
  }
  let otherDate = new Date();
  var years = otherDate.getFullYear() - age[2];
  if (otherDate.getMonth() < age[1] || otherDate.getMonth() == age[1] && otherDate.getDate() < age[0]) {
    years--;
  }
  return years;
}



//---------------------- FUCTION ONCLICK............................

document.getElementById('overlay').addEventListener("click", function () {
  closeForm();


})

// --------------------ADD EMPLOYEEE OPEN FUCTION............................

function openForm() {
  submitFormOpen.classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

function closeForm() {
  submitFormOpen.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');

}
function closeDeleteForm() {
  employeeDeleteForm.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');


}


// .............................


let messageDiv2 = document.getElementById('alerteded');

const showMessage2 = (message)=> {

  messageDiv2.innerHTML = message;
  messageDiv2.style.display = "block";

}

const hideMessage2 =()=>{

  messageDiv2.style.display = "none";
}
