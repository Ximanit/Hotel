<template>
	<div>
		<el-page-header title="Номерной фонд" />

		<div class="actions" style="margin-bottom: 16px; margin-top: 16px">
			<el-button type="primary" @click="openAddDialog"
				>+ Добавить номер</el-button
			>
		</div>

		<el-row :gutter="20">
			<el-col
				v-for="room in rooms"
				:key="room.idНомера"
				:span="6"
				style="margin-bottom: 8px">
				<el-card shadow="hover" class="room-card">
					<div class="room-number">#{{ room.Числовой_номер }}</div>
					<h3>{{ room.Тип_номера }}</h3>

					<div class="room-info">
						<p>{{ room.Количество_спальных_мест }} сп. мест</p>
						<p>
							Балкон:
							<strong>{{ room.Наличие_балкона ? 'Есть' : 'Нет' }}</strong>
						</p>
					</div>

					<div class="price">{{ room.Цена }} ₽ / сутки</div>
				</el-card>
			</el-col>
		</el-row>
		<el-dialog
			v-model="dialogVisible"
			:title="isEdit ? 'Редактировать номер' : 'Новый номер'">
			<el-form :model="form" label-width="140px">
				<el-form-item label="Номер">
					<el-input v-model.number="form.Числовой_номер" type="number" />
				</el-form-item>
				<el-form-item label="Тип номера">
					<el-input
						v-model="form.Тип_номера"
						placeholder="Люкс, Стандарт и т.д." />
				</el-form-item>
				<el-form-item label="Спальных мест">
					<el-input
						v-model.number="form.Количество_спальных_мест"
						type="number" />
				</el-form-item>
				<el-form-item label="Балкон">
					<el-switch v-model="form.Наличие_балкона" />
				</el-form-item>
				<el-form-item label="Цена за сутки">
					<el-input v-model.number="form.Цена" type="number" />
				</el-form-item>
			</el-form>

			<template #footer>
				<el-button @click="dialogVisible = false">Отмена</el-button>
				<el-button type="primary" @click="saveRoom">Сохранить</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';

	const rooms = ref([]);
	const dialogVisible = ref(false);
	const isEdit = ref(false);
	const form = ref({
		Числовой_номер: null,
		Тип_номера: '',
		Количество_спальных_мест: null,
		Наличие_балкона: false,
		Цена: null,
	});

	onMounted(() => {
		loadRooms();
	});

	async function loadRooms() {
		const res = await axios.get('https://hotel-71iq.onrender.com/api/rooms');
		rooms.value = res.data;
	}

	function openAddDialog() {
		form.value = {
			Числовой_номер: null,
			Тип_номера: '',
			Количество_спальных_мест: null,
			Наличие_балкона: false,
			Цена: null,
		};
		isEdit.value = false;
		dialogVisible.value = true;
	}

	async function saveRoom() {
		if (isEdit.value) {
			// Обновление (пока без PUT, можно добавить позже)
			console.log('Update not implemented yet');
		} else {
			await axios.post('https://hotel-71iq.onrender.com/api/rooms', form.value);
		}
		dialogVisible.value = false;
		loadRooms();
	}

	function editRoom(room) {
		form.value = { ...room };
		isEdit.value = true;
		dialogVisible.value = true;
	}
</script>

<style scoped>
	.room-card {
		height: 100%;
		transition: all 0.3s;
	}
	.room-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}
	.room-number {
		font-size: 28px;
		font-weight: bold;
		color: #409eff;
		margin-bottom: 8px;
	}
	.price {
		font-size: 22px;
		font-weight: bold;
		color: #67c23a;
		margin: 15px 0;
	}
	.status {
		position: absolute;
		top: 15px;
		right: 15px;
	}
</style>
