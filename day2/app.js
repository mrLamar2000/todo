let api = "http://localhost:3000/date";
let Box = document.querySelector(".box");
let Dark = document.querySelector(".Dark");
let Light = document.querySelector(".Light");
let Add = document.querySelector(".butAdd");
let DilaogAdd = document.querySelector(".dialog");
let inpImage = document.querySelector(".inpImage");
let inpEmail = document.querySelector(".inpEmail");
let inpTitle = document.querySelector(".inpTitle");
let inpPhone = document.querySelector(".inpPhone");
let inpCity = document.querySelector(".inpCity");
let ButAdd = document.querySelector(".ButAdd");
let ButCancel = document.querySelector(".ButCancel");
let Dialog = document.querySelector(".dialog2");
let Cancel3 = document.querySelector(".cancel3");
let icondell = document.querySelector(".icondell");
let dialogprof = document.querySelector(".dialogprof");
let iconprof = document.querySelector(".iconprof");
let butX = document.querySelector(".ButX");
let search = document.querySelector(".search");
let iconedit = document.querySelector(".iconedit");
let dialogEdit = document.querySelector(".dialogEdit");
let butEdit = document.querySelector(".butedit");
let butCanceledit = document.querySelector(".butCanceledit");
let editImage = document.querySelector(".editImage");
let editTitle = document.querySelector(".editTitle");
let editEmail = document.querySelector(".editEmail");
let editCity = document.querySelector(".editCity");
let editPhone = document.querySelector(".editPhone");
let checkComplet = document.querySelector(".checkCompl");
let select = document.querySelector(".select1");
let select2 = document.querySelector(".select2");
let idx = null;
async function getdata() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.log(error);
  }
}

butCanceledit.onclick = () => {
  dialogEdit.close();
};
butX.onclick = () => {
  dialogprof.close();
};
iconprof.onclick = () => {
  dialogprof.showModal();
};
Dark.onclick = () => {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
};
ButCancel.onclick = () => {
  DilaogAdd.close();
};
ButAdd.onclick = () => {
  let newUser = {
    name: inpTitle.value,
    email: inpEmail.value,
    phone: inpPhone.value,
    city: inpCity.value,
    image: inpImage.value,
    status: false,
  };
  post(newUser);
};
Light.onclick = () => {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
};
Add.onclick = () => {
  DilaogAdd.showModal();
};
Cancel3.onclick = () => {
  Dialog.close();
};
butEdit.onclick = async () => {
  try {
    const response = await fetch(`${api}/${idx}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editTitle.value,
        status: false,
        avatar: editImage.value,
        email: editEmail.value,
        phone: editPhone.value,
        city: editCity.value,
      }),
    });
    getdata();
  } catch (error) {
    console.log(error);
  }
};
function get(data) {
  Box.innerHTML = "";
  data.forEach((elem) => {
    let conteiner = document.createElement("tr");
    conteiner.classList.add("conteiner");
    let td = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("p");
    let active = document.createElement("h1");
    let share = document.createElement("img");
    let mant = document.createElement("div");
    mant.classList.add("mant");
    td.classList.add("td");
    td1.classList.add("td1");
    td2.classList.add("td2");
    td3.classList.add("td3");
    td4.classList.add("td4");
    share.src = "img/Icon-Actions.png";
    share.classList.add("share");
    active.classList.add("active");
    active.innerHTML = "unactive";
    div.classList.add("conteiner2");
    img.classList.add("icon");
    title.innerHTML = elem.name;
    let email = document.createElement("p");
    email.innerHTML = elem.email;
    img.src = elem.avatar;
    mant.append(title, email);
    div.append(img, mant);
    td.append(div);
    td1.innerHTML = elem.city;
    td2.appendChild(active);
    td3.innerHTML = elem.phone;
    td4.appendChild(share);
    conteiner.append(td, td1, td2, td3, td4);
    Box.appendChild(conteiner);
    share.onclick = () => {
      idx = elem.id;
      console.log(idx);
      Dialog.showModal();
      checkComplet.onclick = () => {
        elem.status = !elem.status;
        completedUser(elem.id, elem);
        console.log(elem.id);
      };
      editImage.value = elem.avatar;
      editTitle.value = elem.name;
      editCity.value = elem.city;
      editEmail.value = elem.email;
      editPhone.value = elem.phone;
    };
    icondell.onclick = () => {
      deleteuser(idx);
    };
    search.oninput = async () => {
      try {
        const response = await fetch(`${api}?q=${search.value}`);
        const data = await response.json();
        get(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (elem.status == true) {
      active.innerHTML = "active";
      active.style.backgroundColor = "green";
    }
    iconedit.onclick = () => {
      dialogEdit.showModal();
    };
  });
}
getdata();
async function post(obj) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    getdata();
  } catch (error) {
    console.log(error);
  }
}
async function deleteuser(id) {
  try {
    const responce = await fetch(`${api}/${id}`, { method: "DELETE" });
    getdata();
  } catch (error) {
    console.log(error);
  }
}
async function completedUser(id, e) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    });
    getdata();
    Dialog.close();
  } catch (error) {
    console.log(error);
  }
}
select.oninput = async () => {
  try {
    const response = await fetch(`${api}?status=${select.value}`);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.log(error);
  }
};
select2.oninput = async () => {
  try {
    const response = await fetch(`${api}?city=${select2.value}`);
    const data = await response.json();
    get(data);
  } catch (error) {
    console.log(error);
  }
};
