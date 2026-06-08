<template>
	<div>
		<el-page-header title="Сотрудники" />

		<div style="margin: 20px 0">
			<el-button type="primary" @click="openDialog"
				>+ Добавить сотрудника</el-button
			>
		</div>

		<!-- Вывод в виде КАРТОЧЕК (как ты просил) -->
		<el-row :gutter="20">
			<el-col
				v-for="employee in employees"
				:key="employee.idСотрудники"
				:span="6">
				<el-card class="employee-card" style="margin-bottom: 8px">
					<el-avatar :size="60" style="margin-bottom: 15px"> 👤 </el-avatar>
					<h3>{{ employee.ФИО }}</h3>
					<p>
						<strong>Должность:</strong> {{ employee.Должность || 'Не указана' }}
					</p>
					<p><strong>Паспорт:</strong> {{ employee.Паспорт }}</p>

					<el-divider />

					<el-button size="small" @click="editEmployee(employee)">
						Изменить
					</el-button>
				</el-card>
			</el-col>
		</el-row>

		<!-- Диалог -->
		<el-dialog
			v-model="dialogVisible"
			:title="isEdit ? 'Редактировать сотрудника' : 'Новый сотрудник'">
			<el-form :model="form" label-width="120px">
				<el-form-item label="ФИО">
					<el-input v-model="form.ФИО" />
				</el-form-item>
				<el-form-item label="Паспорт">
					<el-input v-model="form.Паспорт" />
				</el-form-item>
				<el-form-item label="Должность">
					<el-input
						v-model="form.Должность"
						placeholder="Администратор, Горничная и т.д." />
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="dialogVisible = false">Отмена</el-button>
				<el-button type="primary" @click="saveEmployee">Сохранить</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';

	const employees = ref([]);
	const dialogVisible = ref(false);
	const isEdit = ref(false);
	const form = ref({ ФИО: '', Паспорт: '', Должность: '' });

	onMounted(() => loadEmployees());

	async function loadEmployees() {
		try {
			const res = await axios.get(
				'https://hotel-71iq.onrender.com/api/employees',
			);
			employees.value = res.data;
		} catch (e) {
			console.error(e);
		}
	}

	function openDialog() {
		form.value = { ФИО: '', Паспорт: '', Должность: '' };
		isEdit.value = false;
		dialogVisible.value = true;
	}

	async function saveEmployee() {
		// Здесь будет POST / PUT
		console.log('Сохраняем:', form.value);
		dialogVisible.value = false;
		loadEmployees();
	}

	function editEmployee(emp) {
		form.value = { ...emp };
		isEdit.value = true;
		dialogVisible.value = true;
	}
</script>

<style scoped>
	.employee-card {
		text-align: center;
		height: 100%;
	}
</style>
