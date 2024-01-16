/* eslint-disable @typescript-eslint/no-explicit-any */
import { signal } from "@preact/signals"

export const logData = signal<Array<any[]>>([])

const handler: ProxyHandler<typeof console.log> = {
  apply: (target: (...data: any[]) => void, thisArg: any, argumentsList: any[]) => {
    logData.value.push(argumentsList) // Store arguments in the array
    target.apply(thisArg, argumentsList) // Optionally, you can call the original console.log
  }
}

// Create a proxy to intercept calls to console.log
// eslint-disable-next-line no-console
console.log = new Proxy(console.log, handler)

// Example usage
