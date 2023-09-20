import assert from "assert";
import { Problem } from "../types/problem";

const startingCodeTwoSum = `function twoSum(nums,target){
  // Write your code here
};`;

const testingFunctionTwoSum = (fun: any) => {
  try {
    const nums = [
      [2, 7, 11, 15],
      [3, 2, 4],
      [3, 3],
    ];

    const targets = [9, 6, 6];
    const expectedOutputs = [
      [0, 1],
      [1, 2],
      [0, 1],
    ];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < nums.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fun(nums[i], targets[i]);
      assert.deepStrictEqual(result, expectedOutputs[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Two Sum testing function error");
    throw new Error(error);
  }
};

export const twoSum: Problem = {
  id: "two-sum",
  order: 1,
  title: "1. Two Sum",
  difficulty: "Easy",
  problemStatement: `<p class='mt-3'>
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  <em>indices of the two numbers such that they add up to</em> <code>target</code>.
</p>
<p class='mt-3'>
  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use the same element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
  examples: [
    {
      id: 1,
      inputText: "nums = [2, 7, 11, 15], target = 9",
      outputText: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      id: 2,
      inputText: "nums = [3, 2, 4], target = 6",
      outputText: "[1, 2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      id: 3,
      inputText: " nums = [3, 3], target = 6",
      outputText: "[0, 1]",
    },
  ],
  constraints: `<li class='mt-2'>
  <code>2 ≤ nums.length ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ nums[i] ≤ 10</code>
</li> <li class='mt-2'>
<code>-10 ≤ target ≤ 10</code>
</li>
<li class='mt-2 text-sm'>
<strong>Only one valid answer exists.</strong>
</li>`,
  testingFunction: testingFunctionTwoSum,
  startingCode: startingCodeTwoSum,
  startingFunctionName: "function twoSum(",
};
