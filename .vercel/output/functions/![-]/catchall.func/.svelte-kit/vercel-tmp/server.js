import { create_server } from '../output/server/index.js';
const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set(["logo.svg","robots.txt"]),
	mime_types: {".svg":"image/svg+xml",".txt":"text/plain"},
	client: {start:"_app/immutable/entry/start.CeR11pBU.js",app:"_app/immutable/entry/app.1RH5-s5z.js",imports:["_app/immutable/entry/start.CeR11pBU.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/lcSWd0bi.js","_app/immutable/chunks/Ck5MCiNP.js","_app/immutable/chunks/B0IZM6yK.js","_app/immutable/chunks/DNisB8-5.js","_app/immutable/chunks/CVaeOcUY.js","_app/immutable/entry/app.1RH5-s5z.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('../output/server/nodes/0.js')),
		__memo(() => import('../output/server/nodes/1.js')),
		__memo(() => import('../output/server/nodes/2.js')),
		__memo(() => import('../output/server/nodes/3.js')),
		__memo(() => import('../output/server/nodes/4.js')),
		__memo(() => import('../output/server/nodes/5.js')),
		__memo(() => import('../output/server/nodes/6.js')),
		__memo(() => import('../output/server/nodes/7.js')),
		__memo(() => import('../output/server/nodes/8.js')),
		__memo(() => import('../output/server/nodes/9.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/auth/login",
			pattern: /^\/auth\/login\/?$/,
			params: [],
			page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
			endpoint: null
		},
		{
			id: "/auth/register",
			pattern: /^\/auth\/register\/?$/,
			params: [],
			page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
			endpoint: null
		},
		{
			id: "/courses/[courseId]",
			pattern: /^\/courses\/([^/]+?)\/?$/,
			params: [{"name":"courseId","optional":false,"rest":false,"chained":false}],
			page: { layouts: [0,], errors: [1,], leaf: 6 },
			endpoint: null
		},
		{
			id: "/courses/[courseId]/contents/[contentId]",
			pattern: /^\/courses\/([^/]+?)\/contents\/([^/]+?)\/?$/,
			params: [{"name":"courseId","optional":false,"rest":false,"chained":false},{"name":"contentId","optional":false,"rest":false,"chained":false}],
			page: { layouts: [0,], errors: [1,], leaf: 7 },
			endpoint: null
		},
		{
			id: "/profile",
			pattern: /^\/profile\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 8 },
			endpoint: null
		},
		{
			id: "/users",
			pattern: /^\/users\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 9 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
export const server = create_server(manifest);