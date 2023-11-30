document.getElementById('searchBox').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => {
                return item.title.toLowerCase().includes(searchTerm) ||
                       item.description.toLowerCase().includes(searchTerm) ||
                       (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
            });
            displayResults(filteredData);
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(item => {
        const element = document.createElement('div');
        element.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
        resultsContainer.appendChild(element);
    });
}
