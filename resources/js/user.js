document.addEventListener('DOMContentLoaded', function() {
    // Funciones para manejar el modal de usuario
    function openModal() {
        document.getElementById('userModal').classList.remove('hidden');
    }

    function closeModal() {
        document.getElementById('userModal').classList.add('hidden');
    }

    function openEditUserModal() {
        document.getElementById('editUserModal').classList.remove('hidden');
    }

    function closeEditModal() {
        document.getElementById('editUserModal').classList.add('hidden');
    }

    // Función para actualizar un usuario
    function updateUser() {
        const userId = document.getElementById('editUserId').value; 
        const formData = new FormData(document.getElementById('editUserForm'));
        const csrfToken = document.querySelector('input[name="_token"]').value;

        if (!userId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'ID del usuario no encontrado.'
            });
            return;
        }

        fetch(`/users/${userId}`, {
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
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: result.message || 'Usuario actualizado con éxito.'
            });
            closeEditModal(); 
            location.reload(); 
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el usuario: ' + error.message
            });
        });
    }

    // Función para editar un usuario
    window.editUser = function(userId) {
        fetch(`/users/${userId}/edit`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('editUserId').value = userId;
                document.getElementById('editName').value = data.name;
                document.getElementById('editApellido').value = data.apellido;
                document.getElementById('editEmail').value = data.email;
                document.getElementById('editTelefono').value = data.telefono;
                openEditUserModal();
            })
            .catch(error => {
                console.error('Error al cargar los datos del usuario:', error);
            });
    };

    // Función para eliminar un usuario
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.deleteUser = function(userId) {
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
                        }).then(() => location.reload());
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al eliminar el usuario.',
                        });
                    }
                })
                .catch(() => {
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
    
        // Validación de correo electrónico
        const emailInput = this.email.value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co)$/; // Permitir .com y .co
        
        if (!emailPattern.test(emailInput)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa un correo válido que termine en .com o .co',
            });
            return; // Detiene el envío si el correo no es válido
        }
    
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
                }).then(() => window.location.reload());
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
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells.length > 0) {
                const nameText = cells[0].textContent || cells[0].innerText;
                const emailText = cells[1].textContent || cells[1].innerText;

                if (nameText.toLowerCase().indexOf(filter) > -1 || emailText.toLowerCase().indexOf(filter) > -1) {
                    rows[i].style.display = ''; 
                } else {
                    rows[i].style.display = 'none'; 
                }
            }
        }
    }

    
    // Agregar un evento de entrada al campo de búsqueda
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    }

    // Exponer funciones para que puedan ser accedidas desde el HTML
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.closeEditModal = closeEditModal;

    // Configura el evento de envío del formulario de edición de usuario
    document.getElementById('editUserForm').onsubmit = function(event) {
        event.preventDefault();
        updateUser();
    };
});
