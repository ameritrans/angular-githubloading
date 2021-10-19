import { Machine, actions, StateSchema } from "xstate";
const { assign } = actions;

export interface GitHubStateSchema extends StateSchema {
	states: {
		idle: {};
		loading: {};
		success: {};
		error: {};
	};
}

export type GitHubEvent =
	| { type: 'LOAD'; username: string }
	| { type: 'USER_FETCHED' }
	| { type: 'LOADED' }
	| { type: 'FAILED' };

export interface GitHubContext {
	username: string;
	user: any;
}	

export const loadMachine = Machine<GitHubContext, GitHubStateSchema, GitHubEvent>(
	{
		id: "loadMachine",
		initial: "idle",
		context: {
			username: 'timdeschryver',
			user: undefined
		},
		states: {
			idle: {
				
				on: {
					LOAD: {
						target: "loading",
						actions: assign({					
							username: (_, event) => {
								debugger
								return event.username;
								//return event.payload;
							}							
						}),
					}
				}
			},
			loading: {
				
				invoke: {
					src: "loadUser",
					onDone: "success",
					onError: "error"
				},
				on: {
					USER_FETCHED: { actions: 'assignUser' },
					LOADED: "success",
					FAILED: "error"
				}
			},
			success: {
				//type: "final"
				after: {
					2000: "idle"
				},
				onExit: ['userClear']
				
			},
			error: {
				
			}
		}
	},
	{
		actions: {
			assignUser: assign({
				user: (_, evt) => {
					debugger

					console.warn(evt);
					return evt;
				}
			}),
			userClear: assign({
				username: 'ameritrans',
				user: {}
			})
		}
	}
);
