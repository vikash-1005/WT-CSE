async function fetchData() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block'; // Show loading

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const users = await response.json();
        renderData(users);

    } catch (error) {
        console.error('There was a problem fetching the data:', error);
        alert("Failed to fetch data");
    } finally {
        loading.style.display = 'none'; // Hide loading
    }
}

function renderData(data) {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = ''; // Clear existing rows

    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        `;
        dataBody.appendChild(row);
    });
}

// Call the function to fetch data when page loads
fetchData();
