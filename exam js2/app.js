let api = "http://localhost:3000/date";
let box = document.querySelector(".box");
let Add = document.querySelector(".Add");
let dialog = document.querySelector(".dialog");
let butClose = document.querySelector(".butX");
let butAdd = document.querySelector(".butAdd");
let inpName = document.querySelector(".inpName");
let inpEmail = document.querySelector(".inpEmail");
let h1ComplName = document.querySelector(".h1complName");
let h1ComplEmail = document.querySelector(".h1complEmail");
let dialogShow = document.querySelector(".dialog2");
let search = document.querySelector(".search");
let select = document.querySelector(".select");
let dialog3 = document.querySelector(".dialog3");
let butClose2 = document.querySelector(".butXX");
let buttonEddit = document.querySelector(".butedit");
let closeButton = document.querySelector(".close");  
let editName = document.querySelector(".editName");
let editEmail = document.querySelector(".editEmail");
let idx = null;
async function getDate() {
    try {
        let response = await fetch(api);
        let data = await response.json();
        get(data)
    } catch(error) {
        console.log(error);
    }
}
Add.onclick = () => {
    dialog.showModal();
}
butClose.onclick = () =>
{
    dialog.close();    
}
butClose2.onclick = () =>
{
    dialog3.close();    
}
closeButton.onclick = () =>
{
    dialogShow.close();    
}
butAdd.onclick = () =>
{
    let newUser = {
        name: inpName.value,
        email: inpEmail.value,
        status: false
    }
    postUser(newUser)    
}
function get(data) {
    box.innerHTML=""
    data.forEach((elem) => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let ht = document.createElement("h1");
        let butShow = document.createElement("button");
        let butEdit = document.createElement("button");
        let butDelete = document.createElement("button");
        let Compl = document.createElement("input");
        Compl.type = "checkbox";
        Compl.classList.add("compl");
        butDelete.classList.add("butDelete");
        butDelete.innerHTML = "delete";
        butEdit.classList.add("butEdit");
        butEdit.innerHTML = "edit";
        butShow.classList.add("butShow");
        butShow.innerHTML = "show";
        ht.classList.add("ht");
        ht.innerHTML = "unactive";
        td3.classList.add("td3");
        td4.classList.add("td4");
        td.classList.add("td");
        td1.classList.add("td1");
        td2.classList.add("td2");
        td.innerHTML = elem.id;
        td1.innerHTML = elem.name;
        td2.innerHTML = elem.email;
        h1ComplName.innerHTML = elem.name;
        h1ComplEmail.innerHTML = elem.email;
        td3.appendChild(ht);
        td4.append(butShow,butEdit,butDelete,Compl);
        tr.append(td, td1, td2, td3, td4);
        box.append(tr);
        butDelete.onclick = () => {
            deleteUser(elem.id);
        }
        butShow.onclick = () => {
            dialogShow.showModal();
        }
        search.oninput = async () => {
          try {
            const response = await fetch(`${api}?q=${search.value}`);
            const data = await response.json();
            get(data);
          } catch (error) {
            console.log(error);
          }
        };
        select.oninput = async () => {
          try {
            const response = await fetch(`${api}?status=${select.value}`);
            const data = await response.json();
            get(data);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        };
        butEdit.onclick = () => {
            dialog3.showModal();
            editName.value = elem.name;
            editEmail.value = elem.email;
            idx = elem.id;
        }
        if (elem.status == true)
        {
            ht.innerHTML = "active";
            ht.style.backgroundColor = "green";
            // elem.name.style.textDecoration="Line-through";
        }
        Compl.checked = elem.status;
        Compl.onclick = () =>
        {
            elem.status = !elem.status
            completedUser(elem.id, elem)
            console.log(elem.status);
        }
        buttonEddit.onclick = async () => {
            putUser( elem)
        };
            
    })
}
getDate();
 async function postUser(user) {
    try {
        let response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        let data = await response.json();
        getDate();
    } catch (error) {
        console.log(Error);
    }
 }
async function deleteUser(id) {
    try {
        let response = await fetch(api + "/" + id, {
            method: "DELETE"
        });
        let data = await response.json();
        console.log(data);
        getDate();
    } catch (error) {
        console.log(Error);
    }
}
async function completedUser(id,elem) {
    try {
        let response = await fetch(api + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(elem)
        });
        // let data = await response.json();
        getDate();
    } catch (error) {
        console.log(Error);
    }
}

async function putUser(elem) {
    try {
      const response = await fetch(`${api}/${idx}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName.value,
          email: editEmail.value,
          status: false,
        }),
      });
      getDate();
    } catch (error) {
      console.log(error);
    }
}