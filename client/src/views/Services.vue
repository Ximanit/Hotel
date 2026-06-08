<template>
	<div>
		<el-page-header title="Услуги" content="Оказание дополнительных услуг" />

		<div style="margin: 20px 0; display: flex; gap: 10px">
			<el-button type="primary" @click="openProvideDialog">
				+ Оказать услугу
			</el-button>
			<el-button @click="loadProvidedServices">Обновить</el-button>
		</div>

		<!-- Список всех доступных услуг -->
		<el-card style="margin-bottom: 30px">
			<template #header>
				<div class="card-header">
					<span>Доступные услуги</span>
				</div>
			</template>
			<el-table :data="services" stripe style="width: 100%">
				<el-table-column prop="idУслуга" label="ID" width="80" />
				<el-table-column prop="Название" label="Название услуги" />
				<el-table-column prop="Стоимость" label="Стоимость" width="150">
					<template #default="scope"> {{ scope.row.Стоимость }} ₽ </template>
				</el-table-column>
				<el-table-column
					prop="Дата_окозания"
					label="Дата оказания"
					width="140" />
			</el-table>
		</el-card>

		<!-- История оказанных услуг -->
		<el-card>
			<template #header>
				<div class="card-header">
					<span>История оказанных услуг</span>
				</div>
			</template>
			<el-table :data="providedServices" stripe style="width: 100%">
				<el-table-column prop="idОказание_услуги" label="ID" width="80" />
				<el-table-column prop="клиент" label="Клиент" />
				<el-table-column prop="Название" label="Услуга" />
				<el-table-column prop="сотрудник" label="Сотрудник" />
				<el-table-column label="Дата" width="140">
					<template #default="scope">
						{{ new Date().toLocaleDateString('ru-RU') }}
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- Диалог оказания услуги -->
		<el-dialog
			v-model="dialogVisible"
			title="Оказать услугу клиенту"
			width="500px">
			<el-form :model="form" label-width="140px">
				<el-form-item label="Клиент">
					<el-select
						v-model="form.Клиенты_idКлиенты"
						filterable
						placeholder="Выберите клиента">
						<el-option
							v-for="client in clients"
							:key="client.idКлиенты"
							:label="client.ФИО"
							:value="client.idКлиенты">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Услуга">
					<el-select
						v-model="form.Услуга_idУслуга"
						filterable
						placeholder="Выберите услугу">
						<el-option
							v-for="service in services"
							:key="service.idУслуга"
							:label="service.Название + ' (' + service.Стоимость + ' ₽)'"
							:value="service.idУслуга">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Сотрудник">
					<el-select
						v-model="form.Сотрудники_idСотрудники"
						placeholder="Сотрудник">
						<el-option
							v-for="emp in employees"
							:key="emp.idСотрудники"
							:label="emp.ФИО"
							:value="emp.idСотрудники">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>

			<template #footer>
				<el-button @click="dialogVisible = false">Отмена</el-button>
				<el-button type="primary" @click="provideService"
					>Оказать услугу</el-button
				>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import { ElMessage } from 'element-plus';

	const services = ref([]);
	const providedServices = ref([]);
	const clients = ref([]);
	const employees = ref([]);

	const dialogVisible = ref(false);

	const form = ref({
		Услуга_idУслуга: null,
		Сотрудники_idСотрудники: 1,
		Клиенты_idКлиенты: null,
	});

	onMounted(() => {
		loadAllServices();
		loadProvidedServices();
		loadClients();
		loadEmployees();
	});

	async function loadAllServices() {
		try {
			const res = await axios.get(
				'https://hotel-71iq.onrender.com/api/services/list',
			);
			services.value = res.data;
		} catch (e) {
			console.error(e);
		}
	}

	async function loadProvidedServices() {
		try {
			const res = await axios.get(
				'https://hotel-71iq.onrender.com/api/services/provided',
			);
			providedServices.value = res.data;
		} catch (e) {
			console.error(e);
		}
	}

	async function loadClients() {
		const res = await axios.get('https://hotel-71iq.onrender.com/api/clients');
		clients.value = res.data;
	}

	async function loadEmployees() {
		employees.value = [{ idСотрудники: 1, ФИО: 'Администратор' }];
	}

	async function provideService() {
		try {
			await axios.post(
				'https://hotel-71iq.onrender.com/api/services/provide',
				form.value,
			);
			ElMessage.success('Услуга успешно оказана!');
			dialogVisible.value = false;
			loadProvidedServices();
		} catch (err) {
			ElMessage.error('Ошибка при оказании услуги');
		}
	}

	function openProvideDialog() {
		form.value = {
			Услуга_idУслуга: null,
			Сотрудники_idСотрудники: 1,
			Клиенты_idКлиенты: null,
		};
		dialogVisible.value = true;
	}
</script>

<style scoped>
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
