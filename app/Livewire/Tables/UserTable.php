<?php
namespace App\Http\Livewire\Tables;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\User;

class UserTable extends Component
{
    use WithPagination;

    public $search = '';

    public function render()
    {
        // Obtén los usuarios, aplicando la búsqueda si se proporciona
        $users = User::query()
            ->when($this->search, function ($query) {
                $query->where('name', 'like', '%' . $this->search . '%')
                      ->orWhere('email', 'like', '%' . $this->search . '%');
            })
            ->paginate(10);

        return view('livewire.tables.user-table', [
            'users' => $users, // Pasa la variable aquí
        ]);
    }
}
