// loads data by api when the search button is clicked
const loadData = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs, data.num_found))
}

// displays searched data on the display section
const displayBooks = (docs, num) => {
    const displayResults = document.getElementById("display-results");
    const h5 = document.getElementById('result-number');
    displayResults.textContent = '';
    h5.innerText = '';
    if (num !== 0) {
        h5.innerText = `Total ${num} results found`;
    }
    else {
        h5.innerText = `No results found`;
    }
    docs = docs.slice(0, 20);
    docs.forEach(doc => {
        console.log(doc);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${doc.cover_i ? doc.cover_i : "Image not found"}-M.jpg" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${doc.title}</h5>
                    <p><span class='bold'>Author:</span> ${doc.author_name ? doc.author_name : 'Not found'}</p>
                    <p><span class='bold'>First Published:</span> ${doc.first_publish_year ? doc.first_publish_year : "Not found"}</p>
                    <p><span class='bold'>Publisher:</span> ${doc.publisher ? doc.publisher : 'Not found'}</p>
                </div>
            </div>
        `;
        displayResults.appendChild(div);
    });
}