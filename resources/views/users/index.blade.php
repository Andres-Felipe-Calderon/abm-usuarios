<meta name="csrf-token" content="{{ csrf_token() }}">

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Gestión de Usuarios') }}
        </h2>
    </x-slot>

    <div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <!-- Botón para agregar usuario -->
            

            <!-- Campo de búsqueda -->
            <div class="flex flex-col mt-4">
                <label for="search" class="block mb-2 text-gray-700">Buscar:</label>
                <input 
                    type="text" 
                    id="search" 
                    placeholder="Buscar usuarios..." 
                    class="border border-gray-300 rounded-lg p-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
            </div>
<br>
            <!-- Contenedor para la tabla -->
            <div class="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
    <table id="usersTable" class="min-w-full bg-white">
        <thead>
            <tr class="bg-blue-500 text-white">
                <th class="p-4 text-center">Nombre</th>
                <th class="p-4 text-center">Correo</th>
                <th class="p-4 text-center">Teléfono</th>
                <th class="p-4 text-center">Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr class="hover:bg-gray-50">
                <td class="border-t p-4 text-center">{{ $user->name }}</td>
                <td class="border-t p-4 text-center">{{ $user->email }}</td>
                <td class="border-t p-4 text-center">{{ $user->telefono }}</td>
                <td class="border-t p-4 text-center flex justify-center space-x-2">
                    <button class="bg-yellow-500 text-white p-2 rounded flex items-center" onclick="editUser({{ $user->id }})">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="bg-red-500 text-white p-2 rounded flex items-center" onclick="deleteUser({{ $user->id }})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

            <div class="mt-4">
                {{ $users->links() }} <!-- Aquí se muestra la paginación -->
            </div>
                <br>
                <button class="bg-blue-500 text-white px-4 py-2 rounded flex items-center" onclick="openModal()">
    <i class="fas fa-plus mr-2"></i> Registrar Usuario
</button>

            </div>
        </div>
    </div>
    
<!-- Modal para registro de usuario -->
<!-- Modal para Crear Usuario -->
<div id="userModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out hidden">
    <div class="bg-white p-4 md:p-6 rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out w-full max-w-md max-h-[80%] relative overflow-auto">
        <button type="button" onclick="closeModal()" class="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition duration-200">
            <i class="fas fa-times fa-lg"></i>
        </button>
        <h2 id="modalTitle" class="text-lg font-bold mb-4 text-gray-800">Registrar Usuario</h2>
        <form id="userForm" action="{{ route('users.store') }}" method="POST">
            @csrf
            <label for="name" class="block mb-2 text-gray-700">Nombre:</label>
            <input type="text" id="name" name="name" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

            <label for="apellido" class="block mb-2 text-gray-700">Apellido:</label>
            <input type="text" id="apellido" name="apellido" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

            <label for="email" class="block mb-2 text-gray-700">Correo:</label>
            <input type="email" id="email" name="email" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

            <label for="telefono" class="block mb-2 text-gray-700">Teléfono:</label>
<input type="text" id="telefono" name="telefono" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" oninput="this.value = this.value.replace(/[^0-9]/g, '')" maxlength="10">

            <label for="password" class="block mb-2 text-gray-700">Contraseña:</label>
            <input type="password" id="password" name="password" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

            <div class="flex justify-between">
                <button id="submitButton" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200 hover:bg-blue-500">
                    <i class="fas fa-save mr-1"></i> Guardar
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal para Editar Usuario -->
<div id="editUserModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out hidden">
    <div class="bg-white p-4 md:p-6 rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out w-full max-w-md max-h-[80%] relative overflow-auto">
        <button type="button" onclick="closeEditModal()" class="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition duration-200">
            <i class="fas fa-times fa-lg"></i>
        </button>
        <h2 id="editModalTitle" class="text-lg font-bold mb-4 text-gray-800">Editar Usuario</h2>
        <form id="editUserForm" action="{{ route('users.update', ':id') }}" method="POST">
    @csrf
    @method('PUT') <!-- Método para actualización -->

    <!-- Campo oculto para el ID del usuario -->
    <input type="hidden" id="editUserId" name="user_id">

    <label for="editName" class="block mb-2 text-gray-700">Nombre:</label>
    <input type="text" id="editName" name="name" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

    <label for="editApellido" class="block mb-2 text-gray-700">Apellido:</label>
    <input type="text" id="editApellido" name="apellido" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

    <label for="editEmail" class="block mb-2 text-gray-700">Correo:</label>
    <input type="email" id="editEmail" name="email" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required>

    <label for="editTelefono" class="block mb-2 text-gray-700">Teléfono:</label>
    <input type="text" id="editTelefono" name="telefono" class="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">

    <div class="flex justify-between">
        <button id="editSubmitButton" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200 hover:bg-blue-500">
            <i class="fas fa-save mr-1"></i> Actualizar
        </button>
    </div>
</form>

    </div>
</div>




    
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/user.js']) <!-- Usando Vite -->
</x-app-layout>
