<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Muestra la lista de usuarios.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $users = User::paginate(10); // Cambia el número a la cantidad de usuarios por página que desees
        return view('users.index', compact('users'));
    }
    
    /**
     * Muestra el formulario para crear un nuevo usuario.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Almacena un nuevo usuario en la base de datos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validación
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'telefono' => 'nullable|string|max:15',
            'password' => 'required|string|min:8',
        ]);
    
        // Creación del usuario
        User::create([
            'name' => $validatedData['name'],
            'apellido' => $validatedData['apellido'],
            'email' => $validatedData['email'],
            'telefono' => $validatedData['telefono'],
            'password' => bcrypt($validatedData['password']),
        ]);
    
        // Respuesta de éxito
        return response()->json(['message' => 'Usuario creado con éxito.'], 201);
    }
    
    /**
     * Muestra un usuario específico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }
    
    /**
     * Muestra el formulario para editar un usuario existente.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }
    
    /**
     * Actualiza un usuario existente en la base de datos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id); // Busca el usuario por ID

        // Validación antes de actualizar
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'telefono' => 'nullable|string|max:15',
        ]);

        // Actualiza el usuario
        $user->update($validatedData);
    
        return response()->json(['message' => 'Usuario actualizado con éxito.']);
    }

    /**
     * Elimina un usuario de la base de datos.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado con éxito.']);
    }
}
