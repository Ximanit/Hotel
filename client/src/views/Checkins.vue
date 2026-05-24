<template>
	<div>
		<el-page-header title="Заселение и Выселение" />

		<div style="margin: 20px 0; display: flex; gap: 10px">
			<el-button type="primary" @click="openCheckinDialog">
				+ Заселить клиента
			</el-button>
			<el-button @click="loadCheckins">Обновить список</el-button>
		</div>

		<!-- Таблица текущих заселений -->
		<el-table :data="checkins" stripe style="width: 100%">
			<el-table-column prop="idЗаселение_клиента" label="ID" width="70" />
			<el-table-column prop="номер" label="Номер" width="100" />
			<el-table-column prop="клиент_фио" label="Клиент" />
			<el-table-column prop="Дата_заселения" label="Заселение" width="120" />
			<el-table-column prop="Дата_выезда" label="Выезд" width="120" />
			<el-table-column prop="Колчиество_дней" label="Дней" width="80" />
			<el-table-column prop="Стоимость" label="Стоимость" width="110">
				<template #default="scope"> {{ scope.row.Стоимость }} ₽ </template>
			</el-table-column>
			<el-table-column prop="Статус" label="Статус" width="120">
				<template #default="scope">
					<el-tag :type="scope.row.Статус === 'Активно' ? 'success' : 'danger'">
						{{ scope.row.Статус }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="Действия" width="180">
				<template #default="scope">
					<el-button
						v-if="scope.row.Статус === 'Активно'"
						size="small"
						type="warning"
						@click="checkout(scope.row.idЗаселение_клиента)">
						Выселить
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- Диалог заселения -->
		<el-dialog v-model="dialogVisible" title="Заселение клиента" width="580px">
			<el-form :model="form" label-width="160px">
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

				<el-form-item label="Номер">
					<el-select
						v-model="form.Номера_idНомера"
						filterable
						placeholder="Выберите номер">
						<el-option
							v-for="room in freeRooms"
							:key="room.idНомера"
							:label="room.Числовой_номер + ' — ' + room.Тип_номера"
							:value="room.idНомера">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Сотрудник">
					<el-select
						v-model="form.Сотрудники_idСотрудники"
						placeholder="Выберите сотрудника">
						<el-option
							v-for="emp in employees"
							:key="emp.idСотрудники"
							:label="emp.ФИО"
							:value="emp.idСотрудники">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Дата заселения">
					<el-date-picker v-model="form.Дата_заселения" type="date" />
				</el-form-item>

				<el-form-item label="Дата выезда">
					<el-date-picker v-model="form.Дата_выезда" type="date" />
				</el-form-item>

				<el-form-item label="Количество персон">
					<el-input-number v-model="form.Количество_персон" :min="1" />
				</el-form-item>

				<el-form-item label="Стоимость">
					<el-input-number v-model="form.Стоимость" :min="0" />
				</el-form-item>

				<el-form-item label="Количество дней">
					<el-input-number v-model="form.Колчиество_дней" :min="1" />
				</el-form-item>
			</el-form>

			<template #footer>
				<el-button @click="dialogVisible = false">Отмена</el-button>
				<el-button type="primary" @click="createCheckin">Заселить</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import { ElMessage } from 'element-plus';

	const checkins = ref([]);
	const clients = ref([]);
	const freeRooms = ref([]);
	const employees = ref([]);
	const dialogVisible = ref(false);

	const form = ref({
		Клиенты_idКлиенты: null,
		Номера_idНомера: null,
		Сотрудники_idСотрудники: null,
		Дата_заселения: null,
		Дата_выезда: null,
		Количество_персон: 1,
		Стоимость: 0,
		Колчиество_дней: 1,
	});

	onMounted(() => {
		loadCheckins();
		loadClients();
		loadFreeRooms();
		loadEmployees();
	});

	async function loadCheckins() {
		const res = await axios.get('http://localhost:5000/api/checkins');
		checkins.value = res.data;
	}

	async function loadClients() {
		const res = await axios.get('http://localhost:5000/api/clients');
		clients.value = res.data;
	}

	async function loadFreeRooms() {
		const res = await axios.get('http://localhost:5000/api/rooms/free');
		freeRooms.value = res.data;
	}

	async function loadEmployees() {
		// Если у вас есть маршрут для сотрудников, замените
		const res = await axios.get('http://localhost:5000/api/employees'); // можно добавить позже
		employees.value = res.data.length
			? res.data
			: [{ idСотрудники: 1, ФИО: 'Администратор' }];
	}

	async function createCheckin() {
		try {
			await axios.post('http://localhost:5000/api/checkins', form.value);
			ElMessage.success('Клиент успешно заселён!');
			dialogVisible.value = false;
			loadCheckins();
			loadFreeRooms(); // обновляем свободные номера
		} catch (err) {
			ElMessage.error('Ошибка при заселении');
			console.error(err);
		}
	}

	async function checkout(id) {
		try {
			await axios.put(`http://localhost:5000/api/checkins/${id}/checkout`);
			ElMessage.success('Клиент выселен');
			loadCheckins();
			loadFreeRooms();
		} catch (err) {
			ElMessage.error('Ошибка при выселении');
		}
	}

	function openCheckinDialog() {
		form.value = {
			Клиенты_idКлиенты: null,
			Номера_idНомера: null,
			Сотрудники_idСотрудники: 1,
			Дата_заселения: new Date(),
			Дата_выезда: null,
			Количество_персон: 1,
			Стоимость: 0,
			Колчиество_дней: 1,
		};
		dialogVisible.value = true;
	}
</script>
