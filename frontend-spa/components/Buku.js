const BukuComponent = {
  template: `
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Data Buku</h2>
        <p class="text-gray-500 text-sm mt-1">Kelola koleksi buku perpustakaan</p>
      </div>
      <button @click="bukaModalTambah" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Tambah Buku
      </button>
    </div>

    <div v-if="alertMsg" :class="alertType === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'" class="border rounded-lg px-4 py-3 text-sm mb-6">{{ alertMsg }}</div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">No</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Judul</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Penulis</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Kategori</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Stok</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading"><td colspan="6" class="text-center py-12 text-gray-400">Memuat data...</td></tr>
            <tr v-else-if="daftarBuku.length === 0"><td colspan="6" class="text-center py-12 text-gray-400">Belum ada data buku.</td></tr>
            <tr v-for="(buku, index) in daftarBuku" :key="buku.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-gray-500">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                <div class="font-medium text-gray-800">{{ buku.judul }}</div>
                <div class="text-gray-400 text-xs">{{ buku.penerbit }} ({{ buku.tahun_terbit }})</div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ buku.penulis }}</td>
              <td class="px-6 py-4"><span class="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-medium">{{ buku.nama_kategori }}</span></td>
              <td class="px-6 py-4"><span :class="buku.stok > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="text-xs px-2.5 py-1 rounded-full font-medium">{{ buku.stok }} tersedia</span></td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button @click="bukaModalEdit(buku)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                  <button @click="hapusBuku(buku.id, buku.judul)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">{{ isEditMode ? 'Edit Buku' : 'Tambah Buku Baru' }}</h3>
          <button @click="tutupModal" class="p-2 hover:bg-gray-100 rounded-lg"><svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <form @submit.prevent="simpanBuku" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Judul Buku *</label>
            <input type="text" v-model="form.judul" required class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Penulis *</label>
            <input type="text" v-model="form.penulis" required class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Penerbit</label>
              <input type="text" v-model="form.penerbit" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tahun Terbit</label>
              <input type="number" v-model="form.tahun_terbit" min="1900" max="2100" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
              <select v-model="form.kategori_id" required class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Pilih kategori</option>
                <option v-for="kat in daftarKategori" :key="kat.id" :value="kat.id">{{ kat.nama_kategori }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stok</label>
              <input type="number" v-model="form.stok" min="0" class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="tutupModal" class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Batal</button>
            <button type="submit" :disabled="isSaving" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg text-sm font-medium">
              {{ isSaving ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Tambah Buku') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      daftarBuku: [], daftarKategori: [], isLoading: true, showModal: false, isEditMode: false, isSaving: false,
      alertMsg: '', alertType: 'success', editId: null,
      form: { judul: '', penulis: '', penerbit: '', tahun_terbit: '', stok: 1, kategori_id: '' }
    };
  },
  async mounted() {
    await this.muatData();
    await this.muatKategori();
  },
  methods: {
    async muatData() {
      this.isLoading = true;
      try { const r = await axios.get('/api/buku'); this.daftarBuku = r.data.buku; }
      catch (e) { this.tampilAlert('Gagal memuat data buku.', 'error'); }
      finally { this.isLoading = false; }
    },
    async muatKategori() {
      try { const r = await axios.get('/api/kategori'); this.daftarKategori = r.data.kategori; }
      catch (e) { console.error('Gagal memuat kategori:', e); }
    },
    bukaModalTambah() {
      this.isEditMode = false; this.editId = null;
      this.form = { judul: '', penulis: '', penerbit: '', tahun_terbit: '', stok: 1, kategori_id: '' };
      this.showModal = true;
    },
    bukaModalEdit(buku) {
      this.isEditMode = true; this.editId = buku.id;
      this.form = { judul: buku.judul, penulis: buku.penulis, penerbit: buku.penerbit, tahun_terbit: buku.tahun_terbit, stok: buku.stok, kategori_id: buku.kategori_id };
      this.showModal = true;
    },
    tutupModal() { this.showModal = false; },
    async simpanBuku() {
      this.isSaving = true;
      try {
        if (this.isEditMode) { await axios.put('/api/buku/' + this.editId, this.form); this.tampilAlert('Buku berhasil diperbarui.', 'success'); }
        else { await axios.post('/api/buku', this.form); this.tampilAlert('Buku berhasil ditambahkan.', 'success'); }
        this.tutupModal(); await this.muatData();
      } catch (error) { this.tampilAlert(error.response?.data?.messages?.error || 'Terjadi kesalahan.', 'error'); }
      finally { this.isSaving = false; }
    },
    async hapusBuku(id, judul) {
      if (!confirm('Hapus buku "' + judul + '"?')) return;
      try { await axios.delete('/api/buku/' + id); this.tampilAlert('Buku berhasil dihapus.', 'success'); await this.muatData(); }
      catch (error) { this.tampilAlert('Gagal menghapus buku.', 'error'); }
    },
    tampilAlert(msg, type) { this.alertMsg = msg; this.alertType = type; setTimeout(() => { this.alertMsg = ''; }, 4000); }
  }
};
