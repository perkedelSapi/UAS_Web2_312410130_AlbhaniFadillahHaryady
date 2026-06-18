const DashboardComponent = {
  template: `
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
    <!-- Header -->
    <div class="mb-10">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p class="text-gray-600 text-sm mt-1">Selamat datang kembali, <span class="font-semibold text-indigo-600">{{ adminName }}</span></p>
        </div>
        <div class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <span class="text-sm text-gray-600">{{ currentDate }}</span>
        </div>
      </div>
    </div>

    <!-- Statistik Cards 2x2 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 border-blue-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Total</span>
          <span class="text-5xl font-bold text-blue-600">{{ stats.total_buku }}</span>
        </div>
        <div class="text-gray-700 font-semibold text-2xl mt-2">Buku</div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 border-green-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Total</span>
          <span class="text-5xl font-bold text-green-600">{{ stats.total_anggota }}</span>
        </div>
        <div class="text-gray-700 font-semibold text-2xl mt-2">Anggota</div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 border-yellow-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">Dipinjam</span>
          <span class="text-5xl font-bold text-yellow-600">{{ stats.sedang_dipinjam }}</span>
        </div>
        <div class="text-gray-700 font-semibold text-2xl mt-2">Sedang Dipinjam</div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-l-4 border-indigo-500 hover:scale-105 transition-transform">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Total</span>
          <span class="text-5xl font-bold text-indigo-600">{{ stats.total_kategori }}</span>
        </div>
        <div class="text-gray-700 font-semibold text-2xl mt-2">Kategori</div>
      </div>
    </div>
  </div>
  `,
  data() {
    return { 
      stats: { 
        total_buku: 0, 
        total_anggota: 0, 
        total_kategori: 0, 
        sedang_dipinjam: 0, 
        sudah_dikembalikan: 0 
      } 
    };
  },
  computed: {
    adminName() { 
      return localStorage.getItem('adminName') || 'Admin'; 
    },
    currentDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString('id-ID', options);
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/api/statistik');
      this.stats = response.data;
    } catch (error) { 
      console.error('Gagal memuat statistik:', error); 
    }
  }
};