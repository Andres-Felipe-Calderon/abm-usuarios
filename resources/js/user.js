document.addEventListener('DOMContentLoaded', function() {
    // Función para abrir el modal
    function openModal() {
        document.getElementById('userModal').classList.remove('hidden');
    }

    // Función para cerrar el modal
    function closeModal() {
        document.getElementById('userModal').classList.add('hidden');
    }
    function openEditUserModal() {
        document.getElementById('editUserModal').classList.remove('hidden');
    }

    // Función para cerrar el modal de editar usuario
    function closeEditModal() {
        document.getElementById('editUserModal').classList.add('hidden');
    }
    window.closeEditModal = function() {
        document.getElementById('editUserModal').classList.add('hidden');
    };
document.getElementById('editUserForm').onsubmit = function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    updateUser(); // Llama a la función para actualizar
};

    // Función para editar un usuario
// Asegúrate de que esta función está en el ámbito global
window.updateUser = function() {
    const userId = document.getElementById('editUserId').value; 
 

    const formData = new FormData(document.getElementById('editUserForm'));


    const csrfToken = document.querySelector('input[name="_token"]').value;

    if (!userId) {
        console.error('No se encontró el ID del usuario');
        // Usar SweetAlert para mostrar un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ID del usuario no encontrado.'
        });
        return;
    }

    fetch(`/users/${userId}`, { // Se usará la ruta del resource
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRF-TOKEN': csrfToken 
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(err => {
                throw new Error(err.message || 'Error en la actualización');
            });
        }
    })
    .then(result => {
        // Usar SweetAlert para mostrar el mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: result.message || 'Usuario actualizado con éxito.'
        });
        closeEditModal(); 
        location.reload(); 
    })
    .catch(error => {
        console.error('Error al actualizar el usuario:', error);
        // Usar SweetAlert para mostrar un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el usuario: ' + error.message
        });
    });
};


// Función para abrir el modal de edición y cargar los datos del usuario
// Función para abrir el modal de edición y cargar los datos del usuario
window.editUser = function(userId) {
    // Imprimir el userId que se recibe como parámetro    
    fetch(`/users/${userId}/edit`)
        .then(response => {
    
            return response.json();
        })
        .then(data => {
      
            
            // Asigna el userId al campo oculto
            document.getElementById('editUserId').value = userId; // Asigna el userId al campo oculto
            document.getElementById('editName').value = data.name;
            document.getElementById('editApellido').value = data.apellido;
            document.getElementById('editEmail').value = data.email;
            document.getElementById('editTelefono').value = data.telefono;

            // Abre la modal de edición
            openEditUserModal();
        })
        .catch(error => {
            console.error('Error al cargar los datos del usuario:', error);
        });
};



// Configura el evento de envío del formulario
document.getElementById('editUserForm').onsubmit = function(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const userId = document.getElementById('editUserId').value; // Asegúrate de tener un campo oculto con el ID del usuario
    updateUser(userId); // Llama a la función updateUser
};


    // Asignar el evento de envío al formulario de editar usuario
    document.getElementById('editUserForm').onsubmit = function(e) {
        e.preventDefault(); // Prevenir el envío por defecto
        const userId = document.getElementById('editUserForm').action.split('/').pop(); // Obtener el ID del usuario
        updateUser(userId); // Llama a la función para actualizar el usuario
    };

    // También puedes agregar los eventos de cierre aquí si es necesario
 

    // Función para eliminar un usuario
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    window.deleteUser = function(userId) {
        // Mostrar la alerta de confirmación utilizando SweetAlert2
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, hacer la solicitud DELETE
                fetch(`/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'El usuario ha sido eliminado.',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            location.reload();  // Recargar la página después de eliminar
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al eliminar el usuario.',
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error en la conexión al eliminar el usuario.',
                    });
                });
            }
        });
    };
    

    // Evento de envío del formulario para agregar usuario
    document.getElementById('userForm').onsubmit = function(event) {
        event.preventDefault();
    
        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                name: this.name.value,
                apellido: this.apellido.value,
                email: this.email.value,
                telefono: this.telefono.value,
                password: this.password.value
            })
        })
        .then(response => {
            if (response.ok) {
                closeModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario registrado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });
            } else if (response.status === 422) {
                return response.json().then(data => {
                    if (data.errors && data.errors.email) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Este correo ya ha sido registrado',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.message || 'Ocurrió un error al registrar el usuario.',
                        });
                    }
                });
            } else {
                return response.json().then(data => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'Ocurrió un error al registrar el usuario.',
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error en la conexión.',
            });
        });
    };
    
    // Función para filtrar usuarios
    function filterUsers() {
        const input = document.getElementById('search');
        const filter = input.value.toLowerCase();
        const table = document.getElementById('usersTable');
        const rows = table.getElementsByTagName('tr'); // Cambiado para incluir encabezados



        // Iterar sobre las filas de la tabla
        for (let i = 1; i < rows.length; i++) { // Comienza en 1 para omitir el encabezado
            const cells = rows[i].getElementsByTagName('td');
            if (cells.length > 0) {
                const nameText = cells[0].textContent || cells[0].innerText;
                const emailText = cells[1].textContent || cells[1].innerText;

                // Mostrar o ocultar la fila según el filtro
                if (nameText.toLowerCase().indexOf(filter) > -1 || emailText.toLowerCase().indexOf(filter) > -1) {
                    rows[i].style.display = ''; // Mostrar fila
                } else {
                    rows[i].style.display = 'none'; // Ocultar fila
                }
            }
        }
    }

    // Agregar un evento de entrada al campo de búsqueda
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    } else {
        console.error('No se encontró el campo de búsqueda con ID "search".');
    }
    // Agregar un evento de entrada al campo de búsqueda
    document.getElementById('search').addEventListener('input', filterUsers);

    // Exponer las funciones para que puedan ser accedidas desde el HTML
    window.openModal = openModal;
    window.closeModal = closeModal;
});
