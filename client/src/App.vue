<template>
	<div class="app-container">
		<header class="header">
			<div class="header-content">
				<h1>🏨 Гостиница "Уют"</h1>

				<!-- Hamburger для мобильных -->
				<button class="hamburger" @click="toggleSidebar">☰</button>
			</div>
		</header>

		<div class="layout">
			<!-- Sidebar -->
			<el-aside
				:width="isMobile ? '100%' : '240px'"
				class="sidebar"
				:class="{ open: sidebarOpen }">
				<el-menu
					:default-active="$route.path"
					router
					class="menu"
					@select="closeSidebarOnMobile">
					<el-menu-item index="/"
						><el-icon><DataBoard /></el-icon> Дашборд</el-menu-item
					>
					<el-menu-item index="/employees"
						><el-icon><User /></el-icon> Сотрудники</el-menu-item
					>
					<el-menu-item index="/clients"
						><el-icon><UserFilled /></el-icon> Клиенты</el-menu-item
					>
					<el-menu-item index="/rooms"
						><el-icon><OfficeBuilding /></el-icon> Номера</el-menu-item
					>
					<el-menu-item index="/checkins"
						><el-icon><Key /></el-icon> Заселение</el-menu-item
					>
					<el-menu-item index="/services"
						><el-icon><Service /></el-icon> Услуги</el-menu-item
					>
				</el-menu>
			</el-aside>

			<!-- Основной контент -->
			<main class="main-content">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue';

	const sidebarOpen = ref(false);
	const isMobile = ref(window.innerWidth <= 768);

	const toggleSidebar = () => {
		sidebarOpen.value = !sidebarOpen.value;
	};

	const closeSidebarOnMobile = () => {
		if (isMobile.value) sidebarOpen.value = false;
	};

	const handleResize = () => {
		isMobile.value = window.innerWidth <= 768;
		if (!isMobile.value) sidebarOpen.value = false;
	};

	onMounted(() => {
		window.addEventListener('resize', handleResize);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', handleResize);
	});
</script>

<style scoped>
	.app-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f8f9fa;
	}

	.header {
		background: linear-gradient(135deg, #007bff, #0056b3);
		color: white;
		padding: 1rem 1.2rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.header h1 {
		margin: 0;
		font-size: 1.6rem;
	}

	.hamburger {
		display: none;
		background: none;
		border: none;
		color: white;
		font-size: 1.8rem;
		cursor: pointer;
		padding: 5px 10px;
	}

	.layout {
		display: flex;
		flex: 1;
		overflow: hidden;
		position: relative;
	}

	.sidebar {
		background: white;
		border-right: 1px solid #e4e7ed;
		height: calc(100vh - 65px);
		overflow-y: auto;
		transition: all 0.3s;
		z-index: 90;
	}

	.main-content {
		flex: 1;
		padding: 1.5rem;
		overflow-y: auto;
		background: #f8f9fa;
	}

	/* ==================== МОБИЛЬНАЯ ВЕРСИЯ ==================== */
	@media (max-width: 768px) {
		.hamburger {
			display: block;
		}

		.sidebar {
			position: fixed;
			left: -100%;
			top: 65px;
			width: 100%;
			height: calc(100vh - 65px);
			box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
			z-index: 200;
		}

		.sidebar.open {
			left: 0;
		}

		.main-content {
			padding: 1rem;
		}

		/* Делаем карточки и таблицы удобными на мобильных */
		.el-row {
			margin: 0 !important;
		}

		.el-col {
			margin-bottom: 15px;
		}

		table {
			font-size: 0.95rem;
		}

		.room-card,
		.employee-card {
			margin-bottom: 15px;
		}
	}
</style>
