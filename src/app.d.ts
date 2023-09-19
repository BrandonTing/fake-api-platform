// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			username: string;
		};
		type DatabaseSessionAttributes = {};
	}
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
	}
}

// THIS IS IMPORTANT!!!
export { };