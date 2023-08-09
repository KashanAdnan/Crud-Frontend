const table = document.querySelector("#table");

const getData = () => {
    axios.get("https://filthy-seal-blazer.cyclic.app/products")
        .then((res) => {
            const products = res.data.products;
            table.innerHTML = ""
            products.map((item) => {
                table.innerHTML += `
                <tr id=${item._id}>
                <td>${item.name}</td>
                <td>${item.price}</htd>
                <td>${item.description}</td>
                <td><button onclick="updateInputs('${item._id}' , '${item.name}' , '${item.price}' ,'${item.description}')"><i
                            class="fa-solid fa-pencil"></i></button></td>
                <td><button id="delete" onclick="deleteProducts('${item._id}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
                `
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

getData()

const updateInputs = (id, name, price, description) => {
    const tableRow = document.getElementById(`${id}`);
    tableRow.innerHTML = `
        <tr id=${id}>
            <td><input id="${id}-name"  value="${name}" /></td>
            <td><input id="${id}-price" value=${price} /></htd>
            <td><input id="${id}-description" value="${description}"  /></td>
            <td><button onclick="updateProduct('${id}')">Set</button></td>
            <td><button id="delete" onclick="deleteProducts('${id}')"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `
}

const deleteProducts = (id) => {
    axios.delete(`https://filthy-seal-blazer.cyclic.app/product/${id}`)
        .then((res) => {
            getData()
        })
        .catch((err) => {
            console.log(err);
        })
}

const updateProduct = (id) => {
    const name = document.getElementById(`${id}-name`).value;
    const price = document.getElementById(`${id}-price`).value
    const description = document.getElementById(`${id}-description`).value
    axios.put(`https://filthy-seal-blazer.cyclic.app/product/${id}`, {
        name: name,
        price: price,
        description: description,
    })
        .then((res) => {
            getData()
        })
        .catch((err) => {
            console.log(err);
        })
}

const addProuct = () => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    axios.post("https://filthy-seal-blazer.cyclic.app/product", {
        name: name,
        price: price,
        description: description,
    })
        .then((res) => {
            getData()
        })
        .catch((err) => {
            console.log(err);
        })
}

window.getData = getData
window.addProuct = addProuct
window.updateInputs = updateInputs
window.updateProduct = updateProduct
window.deleteProducts = deleteProducts