document.getElementById('searchInput').addEventListener('input', async function() {
    const query = this.value.trim(); // Obtener el texto del input
    const response = await fetch(`/search?q=${query}`); // Hacer la petición al backend
    const users = await response.json(); // Obtener los datos filtrados
    
    const tbody = document.getElementById('userTable');
    tbody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos resultados

    // Insertar los usuarios filtrados en la tabla
    users.forEach(user => {
        const row = `<tr>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.phone}</td>
            <td>${user.company.name}</td>
         

        </tr>`;
        tbody.innerHTML += row;
    });
});
