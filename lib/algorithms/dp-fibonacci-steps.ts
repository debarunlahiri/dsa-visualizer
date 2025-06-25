export interface FibonacciStep {
  n: number // Current n for fib(n)
  description: string
  cache: { [key: number]: number }
  cacheHit?: boolean // True if value was found in cache
  cacheStore?: boolean // True if value is being stored in cache
  returnValue?: number // The value returned by fib(n)
  callStackDepth: number // To visualize recursion depth
  isActiveCall: boolean // Is this the current active recursive call being evaluated
}

export function generateFibonacciMemoizedSteps(n: number): FibonacciStep[] {
  const steps: FibonacciStep[] = []
  const cache: { [key: number]: number } = {}
  let callDepth = 0

  function fib(num: number): number {
    callDepth++
    steps.push({
      n: num,
      description: `Calling fib(${num}). Current depth: ${callDepth}.`,
      cache: { ...cache },
      callStackDepth: callDepth,
      isActiveCall: true,
    })

    if (cache[num] !== undefined) {
      steps.push({
        n: num,
        description: `fib(${num}): Value ${cache[num]} found in cache (memoization).`,
        cache: { ...cache },
        cacheHit: true,
        returnValue: cache[num],
        callStackDepth: callDepth,
        isActiveCall: false, // This call is returning
      })
      callDepth--
      return cache[num]
    }

    if (num <= 1) {
      steps.push({
        n: num,
        description: `fib(${num}): Base case, returns ${num}.`,
        cache: { ...cache },
        returnValue: num,
        callStackDepth: callDepth,
        isActiveCall: false, // This call is returning
      })
      callDepth--
      return num
    }

    steps.push({
      n: num,
      description: `fib(${num}): Calculating fib(${num - 1}) + fib(${num - 2}).`,
      cache: { ...cache },
      callStackDepth: callDepth,
      isActiveCall: true, // Still active, about to make sub-calls
    })

    const res1 = fib(num - 1)
    // After fib(num-1) returns, num is active again before calling fib(num-2)
    steps.push({
      n: num,
      description: `fib(${num}): fib(${num - 1}) returned ${res1}. Now calculating fib(${num - 2}).`,
      cache: { ...cache }, // Cache might have been updated by sub-calls
      callStackDepth: callDepth, // callDepth for `num` is restored after sub-call returns
      isActiveCall: true,
    })

    const res2 = fib(num - 2)
    // After fib(num-2) returns
    steps.push({
      n: num,
      description: `fib(${num}): fib(${num - 2}) returned ${res2}. Result for fib(${num}) is ${res1 + res2}.`,
      cache: { ...cache },
      callStackDepth: callDepth,
      isActiveCall: true, // About to store and return
    })

    cache[num] = res1 + res2
    steps.push({
      n: num,
      description: `fib(${num}): Storing result ${cache[num]} in cache. Returning ${cache[num]}.`,
      cache: { ...cache },
      cacheStore: true,
      returnValue: cache[num],
      callStackDepth: callDepth,
      isActiveCall: false, // This call is returning
    })
    callDepth--
    return cache[num]
  }

  steps.push({
    n,
    description: `Starting Fibonacci(${n}) with memoization.`,
    cache: {},
    callStackDepth: 0,
    isActiveCall: false,
  })
  fib(n)
  steps.push({
    n,
    description: `Fibonacci(${n}) calculation complete. Final result: ${cache[n]}.`,
    cache: { ...cache },
    returnValue: cache[n],
    callStackDepth: 0,
    isActiveCall: false,
  })
  return steps
}
