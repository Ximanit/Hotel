<template>
	<el-container style="height: 100vh; background: #f5f7fa">
		<!-- Main Content -->
		<el-container>
			<el-header style="background: white; border-bottom: 1px solid #e4e7ed">
				<div class="header-content">
					<h1>Панель управления</h1>
					<el-tag type="success" size="large">Сегодня: {{ today }}</el-tag>
				</div>
			</el-header>

			<el-main>
				<!-- Статистика -->
				<el-row :gutter="20">
					<el-col :span="6">
						<el-card shadow="hover" class="stat-card">
							<el-icon color="#409EFF"><OfficeBuilding /></el-icon>
							<div class="stat-info">
								<h3>Занято номеров</h3>
								<h1>{{ occupied }} / {{ totalRooms }}</h1>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card shadow="hover" class="stat-card">
							<el-icon color="#67C23A"><User /></el-icon>
							<div class="stat-info">
								<h3>Гостей сейчас</h3>
								<h1>{{ currentGuests }}</h1>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card shadow="hover" class="stat-card">
							<el-icon color="#E6A23C"><Money /></el-icon>
							<div class="stat-info">
								<h3>Доход сегодня</h3>
								<h1>{{ revenue }} ₽</h1>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card shadow="hover" class="stat-card">
							<el-icon color="#F56C6C"><Warning /></el-icon>
							<div class="stat-info">
								<h3>Выезд сегодня</h3>
								<h1>{{ checkoutsToday }}</h1>
							</div>
						</el-card>
					</el-col>
				</el-row>

				<!-- Последние заселения -->
				<el-card style="margin-top: 25px">
					<template #header>
						<div class="card-header">
							<span>Последние заселения</span>
							<el-button
								type="primary"
								size="small"
								@click="$router.push('/checkins')">
								Все заселения
							</el-button>
						</div>
					</template>
					<el-table :data="recentCheckins" stripe>
						<el-table-column prop="номер" label="Номер" width="100" />
						<el-table-column prop="клиент_фио" label="Клиент" />
						<el-table-column prop="Дата_заселения" label="Дата заселения" />
						<el-table-column prop="Статус" label="Статус">
							<template #default="scope">
								<el-tag
									:type="scope.row.Статус === 'Заселён' ? 'success' : 'info'">
									{{ scope.row.Статус }}
								</el-tag>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import {
		User,
		UserFilled,
		OfficeBuilding,
		Key,
		Service,
		Money,
		Warning,
		DataBoard,
	} from '@element-plus/icons-vue';

	const today = new Date().toLocaleDateString('ru-RU', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	const occupied = ref(14);
	const totalRooms = ref(25);
	const occupancyRate = ref(56);
	const currentGuests = ref(32);
	const revenue = ref(124500);
	const checkoutsToday = ref(5);
	const recentCheckins = ref([]);

	onMounted(async () => {
		// Можно позже подключить реальные данные
		const res = await axios.get('http://localhost:5000/api/checkins');
		recentCheckins.value = res.data.slice(0, 5);
	});
</script>

<style scoped>
	.logo {
		padding: 20px;
		text-align: center;
		border-bottom: 1px solid #e4e7ed;
	}
	.menu {
		border: none;
	}
	.stat-card {
		text-align: center;
		padding: 20px;
	}
	.stat-card .el-icon {
		font-size: 42px;
		margin-bottom: 15px;
	}
	.stat-info h3 {
		margin: 0 0 8px 0;
		color: #606266;
	}
	.stat-info h1 {
		margin: 0;
		font-size: 32px;
	}
	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
