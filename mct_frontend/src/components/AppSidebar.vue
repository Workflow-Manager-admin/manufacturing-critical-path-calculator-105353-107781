<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Sidebar navigation links; map route "to" to relevant view paths
const links = [
  {
    name: 'Dashboard',
    icon: 'analytics',
    to: '/',
  },
  {
    name: 'Input',
    icon: 'list_alt',
    to: '/input',
  },
  {
    name: 'MCT Calculator',
    icon: 'calculate',
    to: '/mct',
  },
  {
    name: 'Reports',
    icon: 'bar_chart',
    to: '/reports',
  },
  {
    name: 'Account',
    icon: 'account_circle',
    to: '/account',
  }
]

const route = useRoute()
const router = useRouter()
const currentPath = computed(() => route.path)

function go(to: string) {
  if (route.path !== to) {
    router.push(to)
  }
}
</script>

<template>
  <aside class="md-sidebar">
    <div class="sidebar-logo">
      <span class="logo-icon">MCT</span>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <li
          v-for="item in links"
          :key="item.to"
          :class="{ active: currentPath === item.to || (item.to === '/' && currentPath === '') }"
        >
          <button class="nav-btn" @click="go(item.to)">
            <span class="material-icons nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.name }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.md-sidebar {
  width: 260px;
  background: var(--color-md-sidebar, #f6f0fb);
  border-right: 1.5px solid var(--color-md-card-border, #e4dafc);
  min-height: 100vh;
  padding-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 0 24px 0 rgba(170,120,250,0.02);
  z-index: 99;
  transition: width 0.18s;
}

.sidebar-logo {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 1.53em;
  letter-spacing: 0.06em;
  font-weight: 800;
  color: var(--color-primary, #9420f3);
  text-align: center;
  padding-bottom: 36px;
  user-select: none;
}
.logo-icon {
  background: var(--color-primary, #9420f3);
  color: #fff;
  border-radius: 50%;
  display: inline-block;
  font-size: 1.18em;
  letter-spacing: 0.14em;
  padding: 13px 16px 11px 16px;
  font-weight: 900;
  box-shadow: 0 2.5px 21px #abb2cb18;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.sidebar-nav ul {
  list-style: none;
  padding: 0 0 12px 0;
  margin: 0;
}
.sidebar-nav li {
  margin-bottom: 9px;
  width: 92%;
  margin-inline: auto;
  border-radius: 11px;
  overflow: hidden;
  transition: background .12s;
}
.sidebar-nav li.active,
.sidebar-nav li:hover {
  background: var(--color-md-hover, #f6f0fb);
  box-shadow: 0 1.5px 12px #d3c0fb16;
}
.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  color: var(--color-primary, #9420f3);
  padding: 12px 14px 12px 18px;
  font-size: 1.02em;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  gap: 19px;
  border-radius: 11px;
  transition: background .14s, color .14s;
}
li.active .nav-btn, .nav-btn:focus {
  color: var(--color-secondary, #ff4405);
  background: var(--color-md-fab, #eee5fd);
}
.nav-icon {
  font-size: 1.4em;
  margin-right: 3px;
  opacity: 0.89;
}

.nav-label {
  flex: 1;
  letter-spacing: .045em;
  font-size: 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 900px) {
  .md-sidebar {
    width: 67px;
    min-width: 67px;
    padding-top: 16px;
  }
  .sidebar-logo .logo-icon {
    font-size: 1em;
    padding: 10px 11px 8px 11px;
  }
  .sidebar-logo {
    font-size: 1.06em;
    padding-bottom: 19px;
  }
  .nav-label {
    display: none;
  }
  .nav-icon {
    font-size: 1.58em;
    margin: 0;
  }
  .nav-btn {
    padding: 11px 16px;
    justify-content: center;
  }
}
</style>
