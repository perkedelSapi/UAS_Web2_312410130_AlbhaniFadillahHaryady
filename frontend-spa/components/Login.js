const LoginComponent = {
  template: `
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-700 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">E-Library</h1>
        <p class="text-gray-500 text-sm mt-1">Sistem Informasi Rental Buku Digital</p>
      </div>

      <form @submit.prevent="doLogin" class="space-y-5">
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {{ errorMsg }}
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" v-model="form.email" placeholder="admin@email.com" required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input type="password" v-model="form.password" placeholder="Masukkan password" required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        </div>
        <button type="submit" :disabled="isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <span v-if="isLoading">Sedang masuk...</span>
          <span v-else>Masuk</span>
        </button>
      </form>

      <div class="text-center mt-6">
        <router-link to="/" class="text-sm text-indigo-600 hover:text-indigo-800">Kembali ke Beranda</router-link>
      </div>
    </div>
  </div>
  `,
  data() {
    return { form: { email: '', password: '' }, errorMsg: '', isLoading: false };
  },
  methods: {
    async doLogin() {
      this.errorMsg = '';
      this.isLoading = true;
      try {
        const response = await axios.post('/api/login', this.form);
        const data = response.data.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminName', data.username);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMsg = error.response?.data?.messages || 'Gagal terhubung ke server.';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
