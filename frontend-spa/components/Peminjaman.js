const PeminjamanComponent = {
  template: `
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Data Peminjaman</h2>
        <p class="text-gray-500 text-sm mt-1">Kelola peminjaman dan pengembalian buku</p>
      </div>
      <button @click="bukaModalTambah" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Catat Peminjaman
      </button>
    </div>

    <div v-if="alertMsg" :class="alertType === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'" class="border rounded-lg px-4 py-3 text-sm mb-6">{{ alertMsg }}</div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">No</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Anggota</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Buku</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Tgl Pinjam</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Tgl Kembali</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
              <th class="text-left px-6 py-4 font-semibold text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading"><td colspan="7" class="text-center py-12 text-gray-400">Memuat data...</td></tr>
            <tr v-else-if="daftarPeminjaman.length === 0"><td colspan="7" class="text-center py-12 text-gray-400">Belum ada data peminjaman.</td></tr>
            <tr v-for="(p, index) in daftarPeminjaman" :key="p.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-gray-500">{{ index + 1 }}</td>
              <td class="px-6 py-4 font-medium text-gray-800">{{ p.nama_anggota }}</td>
              <td class="px-6 py-4 text-gray-600 max-w-xs"><div class="truncate">{{ p.judul_buku }}</div></td>
              <td class="px-6 py-4 text-gray-500">{{ p.tanggal_pinjam }}</td>
              <td class="px-6 py-4 text-gray-500">{{ p.tanggal_kembali || '-' }}</td>
              <td class="px-6 py-4"><span :class="p.status === 'dipinjam' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'" class="text-xs px-2.5 py-1 rounded-full font-medium capitalize">{{ p.status }}</span></td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button v-if="p.status === 'dipinjam'" @click="kembalikan(p)" class="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-xs font-medium">Kembalikan</button>
                  <button @click="hapus(p.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">Catat Peminjaman Baru</h3>
          <button @click="tutupModal" class="p-2 hover:bg-gray-100 rounded-lg"><svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <form @submit.prevent="simpan" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Anggota *</label>
            <select v-model="form.anggota_id" required class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Pilih anggota</option>
              <option v-for="a in daftarAnggota" :key="a.id" :value="a.id">{{ a.nama }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Buku *</label>
            <select v-model="form.buku_id" required class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Pilih buku</option>
              <option v-for="b in daftarBuku" :key="b.id" :value="b.id" :disabled="b.stok < 1">{{ b.judul }} (stok: {{ b.stok }})</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pinjam *</label>
            <input type="date" v-model="form.tanggal_pinjam" required class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="tutupModal" class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">Batal</button>
            <button type="submit" :disabled="isSaving" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg text-sm font-medium">{{ isSaving ? 'Menyimpan...' : 'Catat Peminjaman' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  data() {
    const today = new Date().toISOString().split('T')[0];
    return { daftarPeminjaman: [], daftarAnggota: [], daftarBuku: [], isLoading: true, showModal: false, isSaving: false, alertMsg: '', alertType: 'success', form: { anggota_id: '', buku_id: '', tanggal_pinjam: today } };
  },
  async mounted() {
    await this.muatData();
    const [ra, rb] = await Promise.all([axios.get('/api/anggota'), axios.get('/api/buku')]);
    this.daftarAnggota = ra.data.anggota;
    this.daftarBuku = rb.data.buku;
  },
  methods: {
    async muatData() {
      this.isLoading = true;
      try { const r = await axios.get('/api/peminjaman'); this.daftarPeminjaman = r.data.peminjaman; }
      catch (e) { this.tampilAlert('Gagal memuat data.', 'error'); }
      finally { this.isLoading = false; }
    },
    bukaModalTambah() {
      const today = new Date().toISOString().split('T')[0];
      this.form = { anggota_id: '', buku_id: '', tanggal_pinjam: today };
      this.showModal = true;
    },
    tutupModal() { this.showModal = false; },
    async simpan() {
      this.isSaving = true;
      try {
        await axios.post('/api/peminjaman', this.form);
        this.tampilAlert('Peminjaman berhasil dicatat.', 'success');
        this.tutupModal(); await this.muatData();
        const rb = await axios.get('/api/buku');
        this.daftarBuku = rb.data.buku;
      } catch (e) { this.tampilAlert(e.response?.data?.messages?.error || 'Terjadi kesalahan.', 'error'); }
      finally { this.isSaving = false; }
    },
    async kembalikan(p) {
      const today = new Date().toISOString().split('T')[0];
      if (!confirm('Konfirmasi pengembalian buku "' + p.judul_buku + '" oleh ' + p.nama_anggota + '?')) return;
      try { await axios.put('/api/peminjaman/' + p.id, { status: 'dikembalikan', tanggal_kembali: today }); this.tampilAlert('Buku berhasil dikembalikan.', 'success'); await this.muatData(); }
      catch (e) { this.tampilAlert('Gagal memperbarui status.', 'error'); }
    },
    async hapus(id) {
      if (!confirm('Hapus data peminjaman ini?')) return;
      try { await axios.delete('/api/peminjaman/' + id); this.tampilAlert('Data dihapus.', 'success'); await this.muatData(); }
      catch (e) { this.tampilAlert('Gagal menghapus.', 'error'); }
    },
    tampilAlert(msg, type) { this.alertMsg = msg; this.alertType = type; setTimeout(() => { this.alertMsg = ''; }, 4000); }
  }
};
