/**
 * All following functions will have the case of having n = 0 and the sum will be 0
 */

/**
 * The first way uses conventional linear loop to sumup to the n numbers
 * The runtime complexity is simply O(n)
 *
 */
function sum_to_n_a(n: number): number {
  // your code here

  if (n === 0) {
    return 0;
  }

  let sum = 0;

  for (let i = 1; i <= n; ++i) {
    sum += i;
  }
  return sum;
}

/**
 * The second way use recursion to accumulate the sum
 * The function is called recursively with the integer n passed in decrementally at each call
 * It stops at the base case of n = 1, then climb back up to the top of the call stack, adding to the return value of each call for the final sum
 * The runtime complexity is O(n) because the function is called n times
 * Recursion is generally avoid because it can cause application stackoverflow in the case of big input, which is common in the real scenario of having big data input
 * To be clearer, for comparison with the for loop, recursion maintains the previous calls memory, which is in the stackframe and have higher memory overhead
 * for loop only persists one local operation at a time, the previous iteration is garbage collected if it's not being stored outside of the loop
 * It is also easier to create bugs in recursion when the base case is not created properly, and make debugging harder to visualize
 */
function sum_to_n_b(n: number): number {
  // your code here
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  return n + sum_to_n_b(n - 1);
}

/**
 * The third way use the Gaussian sum formula to calculate the sum
 * The runtime complexity is O(1), since there's only a fixed number of operation in the code
 * This should be the most optimal way since it only takes 1 math operation
 */
function sum_to_n_c(n: number): number {
  // your code here
  if (n === 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
}

// The maximum input for the recursion implementation is 13926, after that the call stack will exceed maximum default stack size of Node
const input = 5000;
console.log(sum_to_n_a(input), sum_to_n_b(input), sum_to_n_c(input));
