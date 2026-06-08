<template>
	<div class="app-container">
		<header class="header">
			<h1>🏨 Гостиница "Уют"</h1>
		</header>

		<div class="layout">
			<!-- Sidebar -->
			<el-aside width="240px" class="sidebar">
				<el-menu :default-active="$route.path" router class="menu">
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

<script setup></script>

<style scoped>
	.app-container {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		min-height: 100vh;
		background: #f8f9fa;
	}

	.header {
		background: linear-gradient(135deg, #007bff, #0056b3);
		color: white;
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	}

	.header h1 {
		margin: 0;
		font-size: 1.9rem;
	}

	nav a {
		color: white;
		text-decoration: none;
		margin-left: 1.8rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	nav a:hover {
		opacity: 0.85;
		text-decoration: underline;
	}

	main {
		padding: 2rem;
	}
</style>

<style>
	/* Глобальные стили для всех страниц */
	.page {
		max-width: 1400px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
		padding-bottom: 15px;
		border-bottom: 2px solid #eee;
	}

	.page-header h1 {
		margin: 0;
		color: #333;
		font-size: 2rem;
	}

	.add-btn {
		background: #28a745;
		color: white;
		border: none;
		padding: 12px 24px;
		font-size: 1.05rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s;
		box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
	}

	.add-btn:hover {
		background: #218838;
		transform: translateY(-2px);
	}

	.table-container {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 14px 16px;
		text-align: left;
		border-bottom: 1px solid #f0f0f0;
	}

	th {
		background: #f8f9fa;
		font-weight: 600;
		color: #444;
	}

	tr:hover {
		background: #f8fbff;
	}

	.edit-btn,
	.delete-btn {
		padding: 8px 12px;
		margin-right: 6px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1.1rem;
	}

	.edit-btn {
		background: #ffc107;
		color: #212529;
	}

	.delete-btn {
		background: #dc3545;
		color: white;
	}

	.modal-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.modal-form input {
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
	}

	.modal-form input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 1rem;
	}
</style>

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
		padding: 1rem 2rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
		z-index: 10;
	}

	.layout {
		display: flex;
		flex: 1; /* занимает всё оставшееся пространство */
		overflow: hidden;
	}

	.sidebar {
		background: white;
		border-right: 1px solid #e4e7ed;
		height: 100%;
		overflow-y: auto;
	}

	.main-content {
		flex: 1;
		padding: 2rem;
		overflow-y: auto;
		background: #f8f9fa;
	}

	/* Чтобы sidebar был фиксированной высоты */
	.el-aside {
		height: calc(100vh - 60px); /* подстраивай под высоту header */
	}
</style>
