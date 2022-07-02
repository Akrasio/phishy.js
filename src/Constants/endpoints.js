module.exports = {
	base: "api.phisherman.gg",
	endpoints: {
		v1: {
			check: "v1/domains/",
			info: "v1/domains/info/",
			caught: "v1/domains/"
		},
		v2: {
			check: "v2/domains/check/",
			info: "v2/domains/info/",
			caught: "v2/phish/caught/",
			report: "v2/phish/report"
		}
	}
}
