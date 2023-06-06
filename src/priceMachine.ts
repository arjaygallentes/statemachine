import { createMachine, assign } from 'xstate';

interface MachineContext {
	recommendedPrice: number;
	userPrice: number;
	notification: string;
}


const calculateRecommendedPrice = (context: MachineContext, event: MachineEvent) => {
	// Simple calculation for demonstration purposes.
	return context.userPrice * 0.9;
};

// Define the event type for your state machine
export type MachineEvent = { type: 'EDIT' } | { type: 'SUBMIT' };

// Define your state machine using the Machine constructor
export const priceMachine = createMachine<MachineContext, MachineEvent>({
  id: 'price',
  initial: 'autoCalculated',
  context: {
	recommendedPrice: 0,
	userPrice: 0,
	notification: '',
  },
  states: {
	autoCalculated: {
	  on: {
		EDIT: {
		  target: 'userModified',
		  actions: assign({
			// Update the userPrice context with the new value
			userPrice: (context) => context.recommendedPrice,
		  }),
		},
	  },
	},
	userModified: {
	  on: {
		SUBMIT: {
		  target: 'autoCalculated',
		  actions: assign({
			// Update the notification context with the submitted user price
			notification: (context) => `Notify: User-modified price submitted: $${context.userPrice}`,
		  }),
		},
	  },
	},
  },
});

