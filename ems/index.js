

// -------------------------

const url ='http://localhost:3000/employees';

const fetchData = async() => {
    try{
        const response = await fetch(url);
        const employees = await response.json();

        console.log(employees[0].firstName);
    }
    catch(error){
        console.log(error);
    }
}


//------------------------------ API FETCH IN FRAME...............................................

let allEmployee;


function alluserdata(){
    fetch("http://localhost:3000/employees")
    .then((data)=>{
    //console.log(data); json Format
    return data.json(); //converted to Object
}).then((objectData)=>{
    console.log(objectData)
    // displayData(objectData)
    list(objectData)
    allEmployee = objectData
})

}

alluserdata();

function displayData(values,sl){  
  
console.log(`sl: ${sl}`);
    let tableData="";
    
    // let slno=1
    values.map((values,index)=>{
        tableData+=`<tr>
        <th>#${zero(index+sl)}${index+sl}</th>
        <td><img src="http://localhost:3000/employees/${values.id}/avatar" alt=profilpic class="rounded-circle mr-2" height=30  width=30>   ${values.firstName}${values.lastName}</td>
        <td>${values.email}</td>
        <td>${values.phone}</td>
        <td>${values.gender}</td>
        <td>${values.dob}</td>
        <td>${values.country}</td>
        <td class="dot" id="openAction"><button onclick="openactions(this.nextElementSibling)" ><i class="fa-solid fa-ellipsis dotfill"></i></button>
                      <div id ="actionDetails" class="dotdetails">
                        <a href="view.html?id=${values.id}" target="_blank"><button   ><i class="fa-regular fa-eye "></i><p>View Details</p></button></a>
                        <button  onclick="getId('${values.id}'); getUser() "><i class="fa-solid fa-pencil "></i><p>Edit </p></button>
                        <button onclick="openDeleteForm('${values.id}')"><i id="deleteopen" class="fa-regular fa-trash-can"></i><p>Delete </p></button>
                      </div>
                    </td>
      </tr>`;
    //   slno++
    })
    document.getElementById("table_body").
    innerHTML=tableData;

}



function zero(num){
    if (num<10)
    return 0;
else

    return "";
}

//---------------------------- DOT BUTTON ONCLICKE..........................................

let actionBtn;

const openactions = (actions)=>{
  clickAction() 
  actions.classList.toggle("pops");
  setTimeout(() => {actionBtn = actions},500)
  if(actionBtn){
    actionBtn.classList.remove("pops")

  }}


// dot button view,edit,delete....

const openAction =(actions)=>{

actions.style.display == 'none' ? actions.style.display='block' :  actions.style.display='none';
    
}
// .....................

let openActionclick = document.getElementById("openAction");

document.getElementById('overlays').addEventListener("click", function () {
  document.getElementById('overlays').classList.remove("active")
  actionBtn.classList.remove("pops")
  document.getElementsByClassName('pops')[0].style.zIndex = '100';
})



function clickAction(){
  document.getElementById('overlays').classList.add('active');
  
}

function clickActions() {
  // openActionclick.classList.remove('active');
  document.getElementById('overlays').classList.remove('active');

}


function formData() {
   
let Salutation= document.getElementById("SalutationForm").value;
let Name= document.getElementById("nameForm").value;
let FullName = document.getElementById("fullNameForm").value;
let email = document.getElementById("emailForm").value;
let phoneNo = document.getElementById("phoneNoForm").value;
let dob = document.getElementById("dobForm").value;
let qulification = document.getElementById("qulificationForm").value;
let address = document.getElementById("addressForm").value;
let city= document.getElementById("cityForm").value;
let state= document.getElementById("stateForm").value;
let country = document.getElementById("countryForm").value;
let username = document.getElementById("usernameForm").value;
let password = document.getElementById("PasswordForm").value;



    let user={
        salutation:Salutation,
        firstName:Name,
        lastName: FullName,
        email:  email,
        phone: phoneNo ,
        dob: date(dob),
        gender:genderSelect(),
        qualifications: qulification,
        address: address,
        city: city,
        state: state,
        country: country ,
        username: username,
        password: password,
    }
    console.log(user)
    return user ;

    
}

// --------------------------------ADD USER ........................................................

async function addUser(){

  // if(profilePic){
  //   addAvatar();
  // }
  formCheque();
    try{
       const res = await fetch("http://localhost:3000/employees",{
        
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData())
    })

const employe = await res.json();

if (!res.ok){
// console.log(employe);
return
}else{
  showMessage('Added successfully');
  setTimeout("hideMessage()", 10000);
  closeForm();

}
  
  if(profilePic){
    let avatardata = new FormData()
  avatardata.append("avatar", profilePic)

  try {
    const res = await fetch("http://localhost:3000/employees/" + employe.id + "/avatar", {

      method: "POST",

      body: avatardata
    })
  }
  catch (error) {
    console.log(error);
  }
  }
   
}
    catch(error){
        console.log(error);
    }
    
  //     setTimeout(() => {
  //   location.reload();
  //  }, 2000);
   
   
}


// --------edit form...........................

let userId;
function getId(id){
userId=id;
}
console.log(userId);





//----------------------------- add employe form clear.................................

const cleardeatils = () => {

 
    document.getElementById("nameForm").value="";
    document.getElementById("fullNameForm").value="";
    document.getElementById("emailForm").value="";
    document.getElementById("phoneNoForm").value="";
    document.getElementById("dobForm").value="";
    document.getElementById("qulificationForm").value="";
    document.getElementById("addressForm").value="";
    document.getElementById("cityForm").value="";
    document.getElementById("stateForm").value="";
    document.getElementById("countryForm").value="";
    document.getElementById("usernameForm").value="";
    document.getElementById("PasswordForm").value="";
  
  
    const imageview = document.getElementById('upload');
    imageview.innerHTML=" ";
  
    let viewdata=` 
    <i class="fa-solid fa-upload"></i>
    <h5>Upload Image</h5>
    <p>PNG,JPG Files are allowed</p>`
  document.getElementById('changebtn').style.display = 'none'
       
      imageview.innerHTML = viewdata;
      imageview.setAttribute("style","width:100% !important");
  
  }

//  -------------------------SEARCH BAR FUCTION...................



const searchdetails = () => {
    const searchvalue = document.getElementById('search').value.toUpperCase();
    let filteredData = [];
  
    for(let i=0 ; i< allEmployee.length;i++){
      let firstName = allEmployee[i].firstName.toUpperCase();
      let phone = allEmployee[i].phone;
      let mail = allEmployee[i].email.toUpperCase();
  
      if(firstName.includes(searchvalue) || phone.includes(searchvalue) || mail.includes(searchvalue)){
        filteredData.push(allEmployee[i])
        console.log(filteredData)
      }
    }
    console.log(filteredData.length);
  displayData(filteredData,1)
  
  }

  // ------------------------ALERT MESSAGE......................................................

let messageDiv = document.getElementById('alerted');

const showMessage = (message)=> {
  const messageDiv = document.getElementById('alerted');
  messageDiv.innerHTML = message;
  messageDiv.style.display = "block";
  fetchData()
}

const hideMessage =()=>{
  const messageDiv = document.getElementById('alerted');
  messageDiv.style.display = "none";
}



// .........................................................

let pageno = document.getElementsByClassName('pagenos'); 

// for(let index = 0 ;index < pageno.length; index++){
//   pageno[index].addEventListener('click', () => {
//   document.querySelector('.pagenoactive')?.classList.remove('pagenoactive')
//   pageno[index].classList.add('pagenoactive');

//   })
// }













  //-------------------------------- PAGINATION...............................................

let employeList = document.getElementById('employeList');   ///list number//
let pageNo = document.getElementById('pageno');            ///page number//


  fetch("http://localhost:3000/employees")
  .then((data)=>{
    return data.json();
  }).then((objectData)=>{
    employeList.addEventListener("change",pageCall)
    function pageCall(){
      list(objectData);
    }
  })

  function list(objectData){
    let n = employeList.value;
    let NP = numofpages(objectData.length,n);
    // console.log(n);
    let start = 0;
    let end = start+(n-1)
    let slNo=1;
    let employeData = [];
    for(let i=start; i<=end; i++){
      employeData.push(objectData[i]);
    }
    displayData(employeData,slNo);


 
    function numofpages(dataLength,num){
        let numberPage = Math.ceil(dataLength/num);
        return numberPage;
       
    }
    pageNo.innerHTML = ""
    for(let i=1; i<=NP; i++){
        let newNoSpan = document.createElement('span');
        newNoSpan.classList.add('pagenos');
        newNoSpan.textContent = i;
        newNoSpan.onclick = function(){
            employelistPage(i);
              document.querySelector('.pagenoactive')?.classList.remove('pagenoactive')
              pageno[i-1].classList.add('pagenoactive');

        }
        pageNo.appendChild(newNoSpan);

    }
  
  function employelistPage(noPage){
    let employeArray = [];
    let p = ((noPage-1)*n)-1;
    start = p+1
    end = start+(n-1)
    let slNo = ((n*noPage)-(n-1))
    for(let i=start; i<=end; i++){
        if(objectData[i] == undefined){
            break;  
        }
        employeArray.push(objectData[i]);
    }
    console.log(slNo);
    displayData(employeArray,slNo);
    
  }
}



// --------------------------ADD EMPLOYE FROM REQUIRED ALERT................................................


const formCheque = () => {
  if(!document.getElementById('nameForm').value){
    document.getElementById('nameForm').previousElementSibling.classList.add('required-field');
    document.getElementById('nameForm').style.border = "1px solid red";
    document.getElementById('nameForm').focus();
    document.getElementById('nameForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('nameForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('fullNameForm').value){
    document.getElementById('fullNameForm').previousElementSibling.classList.add('required-field');
    document.getElementById('fullNameForm').style.border = "1px solid red";
    document.getElementById('fullNameForm').focus();
    document.getElementById('fullNameForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('fullNameForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('usernameForm').value){
    document.getElementById('usernameForm').previousElementSibling.classList.add('required-field');
    document.getElementById('usernameForm').style.border = "1px solid red";
    document.getElementById('usernameForm').focus();
    document.getElementById('usernameForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('usernameForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('PasswordForm').value){
    document.getElementById('PasswordForm').previousElementSibling.classList.add('required-field');
    document.getElementById('PasswordForm').style.border = "1px solid red";
    document.getElementById('PasswordForm').focus();
    document.getElementById('PasswordForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('PasswordForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('addressForm').value){
    document.getElementById('addressForm').previousElementSibling.classList.add('required-field');
    document.getElementById('addressForm').style.border = "1px solid red";
    document.getElementById('addressForm').focus();
    document.getElementById('addressForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('addressForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('qulificationForm').value){
    document.getElementById('qulificationForm').previousElementSibling.classList.add('required-field');
    document.getElementById('qulificationForm').style.border = "1px solid red";
    document.getElementById('qulificationForm').focus();
    document.getElementById('qulificationForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('qulificationForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('countryForm').value){
    document.getElementById('countryForm').previousElementSibling.classList.add('required-field');
    document.getElementById('countryForm').style.border = "1px solid red";
    document.getElementById('countryForm').focus();
    document.getElementById('countryForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('countryForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('stateForm').value){
    document.getElementById('stateForm').previousElementSibling.classList.add('required-field');
    document.getElementById('stateForm').style.border = "1px solid red";
    document.getElementById('stateForm').focus();
    document.getElementById('stateForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('stateForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('cityForm').value){
    document.getElementById('cityForm').previousElementSibling.classList.add('required-field');
    document.getElementById('cityForm').style.border = "1px solid red";
    document.getElementById('cityForm').focus();
    document.getElementById('cityForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('cityForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('pinForm').value){
    document.getElementById('pinForm').previousElementSibling.classList.add('required-field');
    document.getElementById('pinForm').style.border = "1px solid red";
    document.getElementById('pinForm').focus();
    document.getElementById('pinForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('pinForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('SalutationForm').value){
    document.getElementById('SalutationForm').previousElementSibling.classList.add('required-field');
    document.getElementById('SalutationForm').style.border = "1px solid red";
    document.getElementById('SalutationForm').focus();
    document.getElementById('SalutationForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('SalutationForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('phoneNoForm').value){
    document.getElementById('phoneNoForm').previousElementSibling.classList.add('required-field');
    document.getElementById('phoneNoForm').style.border = "1px solid red";
    document.getElementById('phoneNoForm').focus();
    document.getElementById('phoneNoForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('phoneNoForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('emailForm').value){
    document.getElementById('emailForm').previousElementSibling.classList.add('required-field');
    document.getElementById('emailForm').style.border = "1px solid red";
    document.getElementById('emailForm').focus();
    document.getElementById('emailForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('emailForm').previousElementSibling.style.color = "red";
  }
  if(!document.getElementById('dobForm').value){
    document.getElementById('dobForm').previousElementSibling.classList.add('required-field');
    document.getElementById('dobForm').style.border = "1px solid red";
    document.getElementById('dobForm').focus();
    document.getElementById('dobForm').previousElementSibling.innerHTML = "required-field"
    document.getElementById('dobForm').previousElementSibling.style.color = "red";
  }
}

//--------------EMAIL AND PHONENO............. 

document.getElementById('phoneNoForm').addEventListener('keyup', () => {
  const phoneNo = document.getElementById('phoneNoForm').value;
  if (phoneNo.length !== 10) {
    document.getElementById('phoneNoForm').previousElementSibling.textContent = "Invalid number";
    document.getElementById('phoneNoForm').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('phoneNoForm').previousElementSibling.textContent = "Mobile Number";
    document.getElementById('phoneNoForm').previousElementSibling.style.color = "#2B3674";
    document.getElementById('phoneNoForm').style.border = "1px solid #E6E8EB";
  }
});

document.getElementById('emailForm').addEventListener('keyup', () => {
  const email = document.getElementById('emailForm').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailForm').previousElementSibling.textContent = "Invalid email";
    document.getElementById('emailForm').previousElementSibling.style.color = "red";
  } else {
    document.getElementById('emailForm').previousElementSibling.textContent = "Email Address";
    document.getElementById('emailForm').previousElementSibling.style.color = "#2B3674";
    document.getElementById('emailForm').style.border = "1px solid #E6E8EB";
  }
});


// -----------------------DECLARE IN OUTSIDE...........................................

document.getElementById('nameForm').addEventListener('click',()=>{
  document.getElementById('nameForm').addEventListener('input',()=>{
    if(!document.getElementById('nameForm').value){
      document.getElementById('nameForm').previousElementSibling.classList.add('required-field');
      document.getElementById('nameForm').previousElementSibling.innerHTML = "firstName is required";
      document.getElementById('nameForm').previousElementSibling.style.color = "red";
      document.getElementById('nameForm').style.border = "1px solid red";
      document.getElementById('nameForm').focus();
    }else{
      document.getElementById('nameForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('nameForm').style.border = "1px solid #E6E8EB";
      document.getElementById('nameForm').previousElementSibling.innerHTML = "First Name";
      document.getElementById('nameForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('fullNameForm').addEventListener('click',()=>{
  document.getElementById('fullNameForm').addEventListener('input',()=>{
    if(!document.getElementById('fullNameForm').value){
      document.getElementById('fullNameForm').previousElementSibling.classList.add('required-field');
      document.getElementById('fullNameForm').previousElementSibling.innerHTML = "secondName is required";
      document.getElementById('fullNameForm').previousElementSibling.style.color = "red";
      document.getElementById('fullNameForm').style.border = "1px solid red";
      document.getElementById('fullNameForm').focus();
    }else{
      document.getElementById('fullNameForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('fullNameForm').style.border = "1px solid #E6E8EB";
      document.getElementById('fullNameForm').previousElementSibling.innerHTML = "Last Name";
      document.getElementById('fullNameForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('usernameForm').addEventListener('click',()=>{
  document.getElementById('usernameForm').addEventListener('input',()=>{
    if(!document.getElementById('usernameForm').value){
      document.getElementById('usernameForm').previousElementSibling.classList.add('required-field');
      document.getElementById('usernameForm').previousElementSibling.innerHTML = "userName is required";
      document.getElementById('usernameForm').previousElementSibling.style.color = "red";
      document.getElementById('usernameForm').style.border = "1px solid red";
      document.getElementById('usernameForm').focus();
    }else{
      document.getElementById('usernameForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('usernameForm').style.border = "1px solid #E6E8EB";
      document.getElementById('usernameForm').previousElementSibling.innerHTML = "User Name";
      document.getElementById('usernameForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('PasswordForm').addEventListener('click',()=>{
  document.getElementById('PasswordForm').addEventListener('input',()=>{
    if(!document.getElementById('PasswordForm').value){
      document.getElementById('PasswordForm').previousElementSibling.classList.add('required-field');
      document.getElementById('PasswordForm').previousElementSibling.innerHTML = "Password is required";
      document.getElementById('PasswordForm').previousElementSibling.style.color = "red";
      document.getElementById('PasswordForm').style.border = "1px solid red";
      document.getElementById('PasswordForm').focus();
    }else{
      document.getElementById('PasswordForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('PasswordForm').style.border = "1px solid #E6E8EB";
      document.getElementById('PasswordForm').previousElementSibling.innerHTML = "Password";
      document.getElementById('PasswordForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('addressForm').addEventListener('click',()=>{
  document.getElementById('addressForm').addEventListener('input',()=>{
    if(!document.getElementById('addressForm').value){
      document.getElementById('addressForm').previousElementSibling.classList.add('required-field');
      document.getElementById('addressForm').previousElementSibling.innerHTML = "address is required";
      document.getElementById('addressForm').previousElementSibling.style.color = "red";
      document.getElementById('addressForm').style.border = "1px solid #E6E8EB";
      document.getElementById('addressForm').focus();
    }else{
      document.getElementById('addressForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('addressForm').style.border = "1px solid #E6E8EB";
      document.getElementById('addressForm').previousElementSibling.innerHTML = "Address";
      document.getElementById('addressForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('qulificationForm').addEventListener('click',()=>{
  document.getElementById('qulificationForm').addEventListener('input',()=>{
    if(!document.getElementById('qulificationForm').value){
      document.getElementById('qulificationForm').previousElementSibling.classList.add('required-field');
      document.getElementById('qulificationForm').previousElementSibling.innerHTML = "qulification is required";
      document.getElementById('qulificationForm').previousElementSibling.style.color = "red";
      document.getElementById('qulificationForm').style.border = "1px solid red";
      document.getElementById('qulificationForm').focus();
    }else{
      document.getElementById('qulificationForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('qulificationForm').style.border = "1px solid #E6E8EB";
      document.getElementById('qulificationForm').previousElementSibling.innerHTML = "Quolification";
      document.getElementById('qulificationForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('countryForm').addEventListener('click',()=>{
  document.getElementById('countryForm').addEventListener('input',()=>{
    if(!document.getElementById('countryForm').value){
      document.getElementById('countryForm').previousElementSibling.classList.add('required-field');
      document.getElementById('countryForm').previousElementSibling.innerHTML = "country is required";
      document.getElementById('countryForm').previousElementSibling.style.color = "red";
      document.getElementById('countryForm').style.border = "1px solid red";
      document.getElementById('countryForm').focus();
    }else{
      document.getElementById('countryForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('countryForm').style.border = "1px solid #E6E8EB";
      document.getElementById('countryForm').previousElementSibling.innerHTML = "Country";
      document.getElementById('countryForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('stateForm').addEventListener('click',()=>{
  document.getElementById('stateForm').addEventListener('input',()=>{
    if(!document.getElementById('stateForm').value){
      document.getElementById('stateForm').previousElementSibling.classList.add('required-field');
      document.getElementById('stateForm').previousElementSibling.innerHTML = "state is required";
      document.getElementById('stateForm').previousElementSibling.style.color = "red";
      document.getElementById('stateForm').style.border = "1px solid red";
      document.getElementById('stateForm').focus();
    }else{
      document.getElementById('stateForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('stateForm').style.border = "1px solid #E6E8EB";
      document.getElementById('stateForm').previousElementSibling.innerHTML = "State";
      document.getElementById('stateForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('cityForm').addEventListener('click',()=>{
  document.getElementById('cityForm').addEventListener('input',()=>{
    if(!document.getElementById('cityForm').value){
      document.getElementById('cityForm').previousElementSibling.classList.add('required-field');
      document.getElementById('cityForm').previousElementSibling.innerHTML = "city is required";
      document.getElementById('cityForm').previousElementSibling.style.color = "red";
      document.getElementById('cityForm').style.border = "1px solid red";
      document.getElementById('cityForm').focus();
    }else{
      document.getElementById('cityForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('cityForm').style.border = "1px solid #E6E8EB";
      document.getElementById('cityForm').previousElementSibling.innerHTML = "City";
      document.getElementById('cityForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('pinForm').addEventListener('click',()=>{
  document.getElementById('pinForm').addEventListener('input',()=>{
    if(!document.getElementById('pinForm').value){
      document.getElementById('pinForm').previousElementSibling.classList.add('required-field');
      document.getElementById('pinForm').previousElementSibling.innerHTML = "pin is required";
      document.getElementById('pinForm').previousElementSibling.style.color = "red";
      document.getElementById('pinForm').style.border = "1px solid red";
      document.getElementById('pinForm').focus();
    }else{
      document.getElementById('pinForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('pinForm').style.border = "1px solid #E6E8EB";
      document.getElementById('pinForm').previousElementSibling.innerHTML = "Pin/Zip";
      document.getElementById('pinForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

document.getElementById('SalutationForm').addEventListener('click',()=>{
  document.getElementById('SalutationForm').addEventListener('input',()=>{
    if(!document.getElementById('SalutationForm').value){
      document.getElementById('SalutationForm').previousElementSibling.classList.add('required-field');
      document.getElementById('SalutationForm').previousElementSibling.innerHTML = "Salutation is required";
      document.getElementById('SalutationForm').previousElementSibling.style.color = "red";
      document.getElementById('SalutationForm').style.border = "1px solid red";
      document.getElementById('SalutationForm').focus();
    }else{
      document.getElementById('SalutationForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('SalutationForm').style.border = "1px solid #E6E8EB";
      document.getElementById('SalutationForm').previousElementSibling.innerHTML = "Salutation";
      document.getElementById('SalutationForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})



document.getElementById('dobForm').addEventListener('click',()=>{
  document.getElementById('dobForm').addEventListener('input',()=>{
    if(!document.getElementById('dobForm').value){
      document.getElementById('dobForm').previousElementSibling.classList.add('required-field');
      document.getElementById('dobForm').previousElementSibling.innerHTML = "Salutation is required";
      document.getElementById('dobForm').previousElementSibling.style.color = "red";
      document.getElementById('dobForm').style.border = "1px solid red";
      document.getElementById('dobForm').focus();
    }else{
      document.getElementById('dobForm').previousElementSibling.classList.remove('required-field');
      document.getElementById('dobForm').style.border = "1px solid #E6E8EB";
      document.getElementById('dobForm').previousElementSibling.innerHTML = "Date of Birth";
      document.getElementById('dobForm').previousElementSibling.style.color = "#2B3674";
    }
  })
})

// ------------------------------------------------------------

