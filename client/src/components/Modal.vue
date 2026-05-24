<template>
	<div v-if="show" class="modal-overlay" @click.self="$emit('close')">
		<div class="modal">
			<h2>{{ title }}</h2>
			<slot></slot>
			<div class="modal-actions">
				<button class="cancel" @click="$emit('close')">Отмена</button>
				<button class="save" @click="$emit('save')">Сохранить</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({ show: Boolean, title: String });
	defineEmits(['close', 'save']);
</script>

<style scoped>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
	.modal {
		background: white;
		padding: 25px;
		border-radius: 12px;
		width: 90%;
		max-width: 500px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}
	.modal-actions {
		margin-top: 20px;
		display: flex;
		gap: 10px;
		justify-content: flex-end;
	}
	.save {
		background: #007bff;
		color: white;
	}
	.cancel {
		background: #ccc;
	}
	button {
		padding: 10px 18px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
</style>
