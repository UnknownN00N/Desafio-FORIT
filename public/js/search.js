document.getElementById('searchInput').addEventListener('input', async function() {
    const query = this.value.trim(); // Obtener el texto del input
    const response = await fetch(`/search?q=${query}`); // Hacer la petición al backend
    const users = await response.json(); // Obtener los datos filtrados
    
    const section = document.getElementById('userContainer');
    section.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos resultados

    // Insertar los usuarios filtrados en la tabla
    users.forEach(user => {
        const card = `
        
        <article class="userCard">
    <div class="userCard--structure">
      <div class="userCard__division">
      <div class="userCard__miniStructure">
      <h3>Usuario:</h3>
      <div class="userCard__Box">
      <i class="fa-solid fa-user"></i>
      <div class="userCard__TextBox">
        <h4>${user.name}</h4>
      <p>${user.username}</p>
    </div>
      </div>
    </div>
    <div class="userCard__miniStructure">
      <h3>Localidad:</h3>
    <div class="userCard__Box">
    <i class="fa-solid fa-location-dot"></i>
    <p>${user.email}</p> 
  </div>
  </div>
    
    </div>
    <div class="userCard__division">
      <div class="userCard__miniStructure">
        <h3>Contacto:</h3>
          <div class="userCard__Box">
          <i class="fa-solid fa-envelope"></i>
          <p>${user.address.city}</p>
          </div>
          <div class="userCard__Box">
          <i class="fa-solid fa-phone"></i>
          <p>${user.phone}</p>
        </div>
        </div>

    <div class="userCard__miniStructure">
      <h3>Empresa:</h3>
    <div class="userCard__Box">
      <i class="fa-solid fa-building"></i>
      <p>${user.company.name}</p>
    </div>
    </div>
  </div>
      </div>
    </article>
        `;
        section.innerHTML += card;
    });
});
