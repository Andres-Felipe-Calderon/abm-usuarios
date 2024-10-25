<div>
    <input type="text" wire:model="search" placeholder="Buscar usuarios..." class="border border-gray-300 p-2 mb-4 rounded">

    <table class="min-w-full bg-white border border-gray-300">
        <thead>
            <tr>
                <th class="border-b px-4 py-2">Nombre</th>
                <th class="border-b px-4 py-2">Correo</th>
                <th class="border-b px-4 py-2">Teléfono</th>
                <th class="border-b px-4 py-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            @if($users->isEmpty())
                <tr>
                    <td colspan="4" class="border-b px-4 py-2 text-center">No hay usuarios disponibles.</td>
                </tr>
            @else
                @foreach($users as $user)
                    <tr>
                        <td class="border-b px-4 py-2">{{ $user->name }}</td>
                        <td class="border-b px-4 py-2">{{ $user->email }}</td>
                        <td class="border-b px-4 py-2">{{ $user->telefono }}</td>
                        <td class="border-b px-4 py-2">
                            <button class="bg-green-500 text-white px-2 py-1 rounded">Editar</button>
                            <button class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                        </td>
                    </tr>
                @endforeach
            @endif
        </tbody>
    </table>

    <div class="mt-4">
        {{ $users->links() }} <!-- Esto generará los enlaces de paginación -->
    </div>
</div>
