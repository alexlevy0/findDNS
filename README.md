# Domain Availability Checker

This project contains a simple Node.js script to check the availability of domains from a provided list. It uses the DNS module to resolve domains and determines their availability.

## Features

- Checks if a domain is available or already taken.
- Supports multiple domains.
- Handles errors gracefully.

## Prerequisites

- Node.js installed on your machine.

## Usage

1. Create a `domainList.ts` file in the root directory with a list of domains you want to check. Example:

   ```typescript
   export const domainList = [
       "example",
       "google",
       "nonexistentdomain1234",
       "microsoft"
   ]
   ```

2. Run the script:

   ```sh
   bun index.ts
   ```

## Code Explanation

### Import Dependencies

```typescript
import { domainList } from "./domainList"
const dns = require("dns").promises
```

### Check Domain Availability

```typescript
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
```

- Tries to resolve the domain.
- Returns a ❎ if the domain is taken.
- Returns a 🔥 if the domain is available.
- Handles DNS errors and returns an error message for other issues.

### Check Multiple Domains

```typescript
async function checkDomains(domainList: string[]) {
    for (const baseDomain of domainList) {
        const domain = baseDomain.includes(".") ? baseDomain : `${baseDomain}.com`
        const result = await checkDomainAvailability(domain)
        console.log(result)
    }
}
```

- Iterates through the list of domains.
- Appends ".com" if the domain does not include a TLD.
- Logs the result of the domain check.

### Execute the Script

```typescript
checkDomains(domainList).catch((error) => console.error("Erreur générale:", error))
```

- Initiates the domain check and handles any general errors.

## Example Output

```
example.com ❎
google.com ❎
nonexistentdomain1234.com 🔥
microsoft.com ❎
```
