import { domainList } from "./domainList"

const dns = require("dns").promises

async function checkDomainAvailability(domain: any) {
	try {
		await dns.resolve(domain, "A")
		return `${domain} ❎`
	} catch (error: any) {
		if (error.code === "ENOTFOUND" || error.code === "NODATA") {
			return `${domain} 🔥`
		} else {
			return `Erreur lors de la vérification de ${domain}: ${error.message}`
		}
	}
}

async function checkDomains(domainList: string[]) {
	for (const baseDomain of domainList) {
		const domain = baseDomain.includes(".") ? baseDomain : `${baseDomain}.com`
		const result = await checkDomainAvailability(domain)
		console.log(result)
	}
}

checkDomains(domainList).catch((error) => console.error("Erreur générale:", error))
