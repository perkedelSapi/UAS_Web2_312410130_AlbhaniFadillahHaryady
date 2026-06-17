const HomeComponent = {
  template: `
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
    <nav class="flex items-center justify-between px-8 py-5">
      <div>
        <span class="text-xl font-bold">E-Library</span>
        <span class="text-indigo-300 text-sm ml-2">Rental Buku Digital</span>
      </div>
      <router-link to="/login" class="bg-white text-indigo-800 font-semibold px-5 py-2 rounded-lg hover:bg-indigo-50 text-sm">
        Login Admin
      </router-link>
    </nav>

    <section class="text-center py-20 px-4">
      <h1 class="text-5xl font-extrabold mb-4 leading-tight">
        Selamat Datang di<br><span class="text-indigo-300">E-Library</span>
      </h1>
      <p class="text-indigo-200 text-lg max-w-xl mx-auto mb-10">
        Sistem Informasi Rental Buku dan Komik Digital yang modern.
      </p>
    </section>

    <section class="max-w-5xl mx-auto px-8 pb-20">
      <h2 class="text-center text-xl font-semibold text-indigo-200 mb-8">Statistik Perpustakaan</h2>
      <div v-if="isLoading" class="text-center text-indigo-300">Memuat data...</div>
      <div v-else class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
          <div class="text-3xl font-bold">{{ stats.total_buku }}</div>
          <div class="text-indigo-200 text-sm mt-1">Total Buku</div>
        </div>
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
          <div class="text-3xl font-bold">{{ stats.total_anggota }}</div>
          <div class="text-indigo-200 text-sm mt-1">Anggota</div>
        </div>
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
          <div class="text-3xl font-bold">{{ stats.total_kategori }}</div>
          <div class="text-indigo-200 text-sm mt-1">Kategori</div>
        </div>
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
          <div class="text-3xl font-bold text-yellow-300">{{ stats.sedang_dipinjam }}</div>
          <div class="text-indigo-200 text-sm mt-1">Sedang Dipinjam</div>
        </div>
        <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 text-center border border-white border-opacity-20">
          <div class="text-3xl font-bold text-green-300">{{ stats.sudah_dikembalikan }}</div>
          <div class="text-indigo-200 text-sm mt-1">Sudah Dikembalikan</div>
        </div>
      </div>
    </section>
  </div>
  `,
  data() {
    return {
      stats: { total_buku: 0, total_anggota: 0, total_kategori: 0, sedang_dipinjam: 0, sudah_dikembalikan: 0 },
      isLoading: true
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/api/statistik');
      this.stats = response.data;
    } catch (error) {
      console.error('Gagal memuat statistik:', error);
    } finally {
      this.isLoading = false;
    }
  }
};
