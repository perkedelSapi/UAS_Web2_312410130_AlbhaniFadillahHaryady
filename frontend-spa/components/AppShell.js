const AppShellComponent = {
  template: `
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <aside class="w-64 bg-indigo-800 text-white flex flex-col flex-shrink-0">
      <div class="p-6 border-b border-indigo-700">
        <h1 class="text-xl font-bold">E-Library</h1>
        <p class="text-indigo-300 text-xs mt-1">Panel Administrator</p>
      </div>

      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="$route.path === '/dashboard' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </router-link>
        <router-link to="/buku" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="$route.path === '/buku' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          Data Buku
        </router-link>
        <router-link to="/kategori" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="$route.path === '/kategori' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          Kategori
        </router-link>
        <router-link to="/anggota" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="$route.path === '/anggota' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          Anggota
        </router-link>
        <router-link to="/peminjaman" class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium"
          :class="$route.path === '/peminjaman' ? 'bg-indigo-600 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          Peminjaman
        </router-link>
      </nav>

      <div class="p-4 border-t border-indigo-700">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">{{ adminInitial }}</div>
          <div>
            <div class="text-sm font-medium">{{ adminName }}</div>
            <div class="text-xs text-indigo-300">Administrator</div>
          </div>
        </div>
        <button @click="logout" class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Keluar
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
  `,
  computed: {
    adminName() { return localStorage.getItem('adminName') || 'Admin'; },
    adminInitial() { return this.adminName.charAt(0).toUpperCase(); }
  },
  methods: {
    async logout() {
      if (confirm('Apakah Anda yakin ingin keluar?')) {
        try { await axios.post('/api/logout'); } catch (e) {}
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminName');
        this.$router.push('/login');
      }
    }
  }
};
