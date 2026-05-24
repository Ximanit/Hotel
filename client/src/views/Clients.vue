<template>
	<div>
		<el-page-header title="Клиенты" />

		<el-button type="primary" @click="dialogVisible = true"
			>+ Новый клиент</el-button
		>

		<el-table :data="clients" stripe style="margin-top: 20px">
			<el-table-column prop="idКлиенты" label="ID" width="80" />
			<el-table-column prop="ФИО" label="ФИО" />
			<el-table-column prop="Паспорт" label="Паспорт" />
			<el-table-column prop="Дата_рождения" label="Дата рождения" />
			<el-table-column label="Действия" width="150">
				<template #default="scope">
					<el-button size="small" @click="editClient(scope.row)"
						>Изменить</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<!-- Диалог создания/редактирования -->
		<el-dialog v-model="dialogVisible" title="Клиент">
			<el-form :model="form">
				<el-form-item label="ФИО">
					<el-input v-model="form.ФИО" />
				</el-form-item>
				<el-form-item label="Паспорт">
					<el-input v-model="form.Паспорт" />
				</el-form-item>
				<el-form-item label="Дата рождения">
					<el-date-picker v-model="form.Дата_рождения" type="date" />
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="dialogVisible = false">Отмена</el-button>
				<el-button type="primary" @click="saveClient">Сохранить</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';

	const clients = ref([]);
	const dialogVisible = ref(false);
	const form = ref({ ФИО: '', Паспорт: '', Дата_рождения: null });

	onMounted(() => loadClients());

	async function loadClients() {
		const res = await axios.get('http://localhost:5000/api/clients');
		clients.value = res.data;
	}

	async function saveClient() {
		await axios.post('http://localhost:5000/api/clients', form.value);
		loadClients();
		dialogVisible.value = false;
		form.value = { ФИО: '', Паспорт: '', Дата_рождения: null };
	}
</script>
