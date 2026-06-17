// frontend-spa/app.js

const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Sesuaikan kalau backend di port/domain lain
const BASE_URL = 'http://localhost:8080';

axios.defaults.baseURL = BASE_URL;

// Request Interceptor - sisipkan token otomatis
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Response Interceptor - tangkap 401, tendang ke login
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminName');
    alert('Sesi Anda telah habis. Silakan login kembali.');
    router.push('/login');
  }
  return Promise.reject(error);
});

const routes = [
  { path: '/', component: HomeComponent, name: 'home' },
  { path: '/login', component: LoginComponent, name: 'login' },
  {
    path: '/dashboard', component: AppShellComponent, meta: { requiresAuth: true },
    children: [{ path: '', component: DashboardComponent }]
  },
  {
    path: '/buku', component: AppShellComponent, meta: { requiresAuth: true },
    children: [{ path: '', component: BukuComponent }]
  },
  {
    path: '/kategori', component: AppShellComponent, meta: { requiresAuth: true },
    children: [{ path: '', component: KategoriComponent }]
  },
  {
    path: '/anggota', component: AppShellComponent, meta: { requiresAuth: true },
    children: [{ path: '', component: AnggotaComponent }]
  },
  {
    path: '/peminjaman', component: AppShellComponent, meta: { requiresAuth: true },
    children: [{ path: '', component: PeminjamanComponent }]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isLoggedIn) {
    next({ path: '/dashboard' });
  } else {
    next();
  }
});

const app = createApp({});
app.use(router);
app.mount('#app');
