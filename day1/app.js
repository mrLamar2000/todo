let api = "https://655367345449cfda0f2ea0f3.mockapi.io/todo";
let table = document.querySelector(".table");
let butAdd = document.querySelector(".But1");
let dialog = document.querySelector(".Dialog1");
let cancel = document.querySelector(".Cancel");
let Add = document.querySelector(".Add");
let inpImage = document.querySelector(".inpimage");
let inpTitle = document.querySelector(".inpTitle");
let inpEmail = document.querySelector(".inpEmail");
let inpCitys = document.querySelector(".inpcitys");
let inpPhone = document.querySelector(".inpPhone");
let dialog1 = document.querySelector(".Dialog2");
let cancel1 = document.querySelector(".cancel1");
let edit = document.querySelector(".Edit");
let Info = document.querySelector(".Info");
let dialog2 = document.querySelector(".Dialog3");
let False = document.querySelector(".False"); 
let But1 = document.querySelector(".But1");
async function getData() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    get(data);
  }catch (error) {
    console.log(error);
  }
}
getData();
Info.onclick = () => {
    dialog2.showModal();
};

False.onclick = () => {
  dialog2.close();
};
edit.onclick = () => {
    dialog.showModal(); 
}
cancel1.onclick = () => {
    dialog1.close();
};
butAdd.onclick = () => {
  dialog.showModal();
};
cancel.onclick = () => {
  dialog.close();
};
Add.onclick = () => {
  add();
};
function add() {
  let newUser = {
    id: data.length + 1,
    avatar: inpImage.value,
    title: inpTitle.value,
    email: inpEmail.value,
    city: inpCitys.value,
    status: false,
    phone: inpPhone.value,
  };
  date.push(newUser);
  get();
}
function get(date) {
  table.innerHTML = "";
  date.forEach((elem) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.classList.add("td1");
    td.innerHTML = elem.avatar;
    let td1 = document.createElement("td");
    td1.classList.add("td");
    td1.innerHTML = elem.city;
    let td2 = document.createElement("td");
    td2.classList.add("td");
    td2.innerHTML = elem.status;
    let td3 = document.createElement("td");
    td3.classList.add("td");
    td3.innerHTML = elem.phone;
    let td4 = document.createElement("td");
    td4.classList.add("td4");
    let img = document.createElement("img");
    img.src = elem.avatar;
    img.classList.add("img1");
    td.append(img);
    let img1 = document.createElement("img");
    img1.src = "img/Icon-Actions.png";
    td4.append(img1);
    img1.classList.add("img2");
    tr.append(td, td1, td2, td3, td4);
      table.appendChild(tr);
      img1.onclick = () => {
        dialog1.showModal();};  
  })
}
get();