<nav class="-mx-3 flex flex-1 justify-end">
    @auth
        <a
            href="{{ url('/dashboard') }}"
            class="rounded-md px-3 py-2 bg-blue-600 text-white ring-1 ring-transparent transition hover:bg-blue-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-blue-500 dark:hover:bg-blue-400"
        >
            Dashboard
        </a>
    @else
        <a
            href="{{ route('login') }}"
            class="rounded-md px-3 py-2 bg-blue-600 text-white ring-1 ring-transparent transition hover:bg-blue-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-blue-500 dark:hover:bg-blue-400"
        >
            Log in
        </a>
    @endauth
</nav>
