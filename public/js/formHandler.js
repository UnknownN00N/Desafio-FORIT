document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    let user = {};

    formData.forEach((value, key) => {
        const keys = key.split(/\[|\]/).filter(k => k !== '');
        let ref = user;

        while (keys.length > 1) {
            let currentKey = keys.shift();
            ref[currentKey] = ref[currentKey] || {};
            ref = ref[currentKey];
        }

        ref[keys[0]] = value;
    });

    try {
        const response = await fetch('/add', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!response.ok) throw new Error('Error al guardar el usuario');

        const result = await response.json();
        alert(result.message);

        window.location.href = '/';
    } catch (error) {
        window.location.href = '/';
    }
});
