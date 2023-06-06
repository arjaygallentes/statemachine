<template>
  <div>
    <h1>Recommended Price: ${{ current.context.recommendedPrice }}</h1>
    <h1>Current Price: ${{ current.context.userPrice }}</h1>
    <input v-if="current.matches('userModified')" v-model="inputPrice" type="number" />
    <button @click="editPrice">Edit</button>
    <button @click="submitPrice">Submit</button>
    <h2>{{ current.context.notification }}</h2>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { interpret } from 'xstate';
import { priceMachine, MachineEvent } from './../priceMachine';

export default {
	setup() {
		const service = interpret(priceMachine.withContext({
			recommendedPrice: 100,
			userPrice: 100,
			notification: '',
		}));

		const current = ref(service.state);
		service.onTransition(state => {
			current.value = state;
		});
		service.start();

		const inputPrice = ref(service.state.context.userPrice);

		const editPrice = () => {
			service.send({ type: 'EDIT', value: inputPrice.value } as MachineEvent);
		};

		const submitPrice = () => {
			service.send('SUBMIT');
		};

		return { current, inputPrice, editPrice, submitPrice, service };
	},
	beforeUnmount() {
		this.service.stop();
	},
};
</script>

