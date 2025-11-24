let prodTable = document.getElementById("products");
let filterInput = document.getElementById("filter");
let sortOrder = document.getElementById("sortOrder");

async function getData() {
    const url = "https://dummyjson.com/products";
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();        
        return result;

    } catch (error) {
        console.error(error.message);
    }
}

function sortData(prod1, prod2, asc) {
    if(prod1.toLowerCase() > prod2.toLowerCase()) return asc ? 1 : -1;
    if(prod1.toLowerCase() < prod2.toLowerCase()) return asc ? -1 : 1;
    return 0;
}

function sortById(prod1, prod2) {
    return (parseInt(prod1, 10) > parseInt(prod2, 10));
}


$(document).ready(function() {
    filterInput.value = "";
    sortOrder.value = "default";

    // Get data from api
    data = getData();
    data.then(productsData => {
        prodTable.innerHTML = `<tr>
            <th id="photoTh">Zdjęcie</th>
            <th id="titleTh">Tytuł</th>
            <th id="describtionTh">Opis</th>
        </tr>`;

        let id = 1;
        for(product of productsData.products) {
            prodRow = document.createElement('tr');
            prodRow.innerHTML = `
                    <td><img src="${product.thumbnail}"></td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>`;
            prodRow.id = id;
            prodTable.appendChild(prodRow);
            id++;
        }
    });

    
    // Sort data by product title
    $(sortOrder).change(function() {
        products = $(prodTable).children("tr").detach();

        // Sort default
        if(sortOrder.value == 'default') {
            console.log(products)
            sortedProducts = $(products).sort(function(prod1, prod2) {
                console.log(prod1.id)
                return sortById(prod1.id, prod2.id)
            });

            for(product of sortedProducts) {
                prodTable.appendChild(product);
            }


        // Sort ascending order
        } else if(sortOrder.value == 'asc') {
            sortedProducts = $(products).sort(function(prod1, prod2) {
                return sortData(prod1.childNodes[3].innerText, prod2.childNodes[3].innerText, true)
            });

            for(product of sortedProducts) {
                prodTable.appendChild(product);
            }


        // Sort descending order
        } else if(sortOrder.value == 'desc') {
            sortedProducts = $(products).sort(function(prod1, prod2) {
                return sortData(prod1.childNodes[3].innerText, prod2.childNodes[3].innerText, false)
            });

            for(product of sortedProducts) {
                prodTable.appendChild(product);
            }
        }
    });


    // Filter data
    $(filterInput).keyup(function() {
        products = Array.from($(prodTable).children("tr"));
        filterValue = $(filterInput).val();

        for(product of products) {
            productCells = Array.from($(product).children("td"));
            
            $(product).show();
            prodText = ""
            
            for(cell of productCells) {
                if(cell.innerText == "") continue;
                prodText += cell.innerText + " ";
            }

            if(!prodText.toLowerCase().includes(filterValue)) {
                $(product).hide();
            }
        }
    })

});