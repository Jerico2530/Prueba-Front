import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProductsListView from '../views/ProductsListView.vue'
import ProductFormView from '../views/ProductFormView.vue'
import CategoriesListView from '../views/CategoriesListView.vue'

const routes = [
  { path: '/', name: 'dashboard', component: DashboardView },
  { path: '/products', name: 'products.index', component: ProductsListView },
  { path: '/products/create', name: 'products.create', component: ProductFormView },
  { path: '/products/:id/edit', name: 'products.edit', component: ProductFormView, props: true },
  { path: '/categories', name: 'categories.index', component: CategoriesListView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
