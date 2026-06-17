const DashboardComponent = {
  template: `
  <div class="p-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800">Dashboard</h2>
      <p class="text-gray-500 text-sm mt-1">Selamat datang kembali, {{ adminName }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13"/></svg>
        </div>
        <div class="text-3xl font-bold text-gray-800">{{ stats.total_buku }}</div>
        <div class="text-gray-500 text-sm mt-1">Total Buku</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2"/></svg>
        </div>
        <div class="text-3xl font-bold text-gray-800">{{ stats.total_anggota }}</div>
        <div class="text-gray-500 text-sm mt-1">Total Anggota</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4"/></svg>
        </div>
        <div class="text-3xl font-bold text-gray-800">{{ stats.sedang_dipinjam }}</div>
        <div class="text-gray-500 text-sm mt-1">Sedang Dipinjam</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7"/></svg>
        </div>
        <div class="text-3xl font-bold text-gray-800">{{ stats.total_kategori }}</div>
        <div class="text-gray-500 text-sm mt-1">Kategori Buku</div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Akses Cepat</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link to="/buku" class="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-center">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13"/></svg>
          <span class="text-sm font-medium text-blue-800">Kelola Buku</span>
        </router-link>
        <router-link to="/anggota" class="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl text-center">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2"/></svg>
          <span class="text-sm font-medium text-green-800">Kelola Anggota</span>
        </router-link>
        <router-link to="/peminjaman" class="flex flex-col items-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl text-center">
          <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12"/></svg>
          <span class="text-sm font-medium text-yellow-800">Peminjaman</span>
        </router-link>
        <router-link to="/kategori" class="flex flex-col items-center gap-2 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-center">
          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01"/></svg>
          <span class="text-sm font-medium text-indigo-800">Kategori</span>
        </router-link>
      </div>
    </div>
  </div>
  `,
  data() {
    return { stats: { total_buku: 0, total_anggota: 0, total_kategori: 0, sedang_dipinjam: 0, sudah_dikembalikan: 0 } };
  },
  computed: {
    adminName() { return localStorage.getItem('adminName') || 'Admin'; }
  },
  async mounted() {
    try {
      const response = await axios.get('/api/statistik');
      this.stats = response.data;
    } catch (error) { console.error('Gagal memuat statistik:', error); }
  }
};
