import { Injectable } from '@angular/core';
import { Problem, TestCase } from '../models/problem';
import { SubmissionRequest, ExecutionResult } from '../models/execution';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private problems: Problem[] = [
    {
      id: '1',
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you cannot use the same element twice.',
      difficulty: 'Easy',
      category: 'Array',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'nums[0] + nums[1] == 9, so return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'nums[1] + nums[2] == 6, so return [1, 2].'
        }
      ],
      constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
      functionSignature: 'function twoSum(nums: number[], target: number): number[]',
      defaultCode: {
        typescript: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
        javascript: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
        dotnet: `public int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>();
    
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.ContainsKey(complement)) {
            return new int[] { map[complement], i };
        }
        map[nums[i]] = i;
    }
    
    return new int[] { };
}`
      }
    },
    {
      id: '2',
      title: 'Reverse String',
      description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
      difficulty: 'Easy',
      category: 'String',
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: 'The string is reversed by reversing the array.'
        },
        {
          input: 's = ["H","a","n","n","a","h"]',
          output: '["h","a","n","n","a","H"]',
          explanation: 'The string is reversed.'
        }
      ],
      constraints: '1 <= s.length <= 10^5\ns[i] is a printable ascii character.',
      functionSignature: 'function reverseString(s: string[]): void',
      defaultCode: {
        typescript: `function reverseString(s: string[]): void {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
        javascript: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
        dotnet: `public void ReverseString(char[] s) {
    int left = 0;
    int right = s.Length - 1;
    
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`
      }
    },
    {
      id: '3',
      title: 'Valid Palindrome',
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
      difficulty: 'Easy',
      category: 'String',
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: 'true',
          explanation: 'After removing non-alphanumeric characters and converting to lowercase, it becomes "amanaplanacanalpanama" which is a palindrome.'
        },
        {
          input: 's = "race a car"',
          output: 'false',
          explanation: 'After removing non-alphanumeric characters and converting to lowercase, it becomes "raceacar" which is not a palindrome.'
        }
      ],
      constraints: '1 <= s.length <= 2 * 10^5\ns consists of printable ASCII characters.',
      functionSignature: 'function isPalindrome(s: string): boolean',
      defaultCode: {
        typescript: `function isPalindrome(s: string): boolean {
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}`,
        javascript: `function isPalindrome(s) {
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}`,
        dotnet: `public bool IsPalindrome(string s) {
    string cleaned = Regex.Replace(s, @"[^a-zA-Z0-9]", "").ToLower();
    int left = 0;
    int right = cleaned.Length - 1;
    
    while (left < right) {
        if (cleaned[left] != cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}`
      }
    },
    {
      id: '4',
      title: 'Merge Two Sorted Lists',
      description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the two lists. Return the head of the merged linked list.',
      difficulty: 'Easy',
      category: 'Linked List',
      examples: [
        {
          input: 'list1 = [1,2,4], list2 = [1,3,4]',
          output: '[1,1,2,3,4,4]',
          explanation: 'The two lists are merged into one sorted list.'
        }
      ],
      constraints: 'The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nboth list1 and list2 are sorted in non-decreasing order.',
      functionSignature: 'function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null',
      defaultCode: {
        typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 !== null ? list1 : list2;
    return dummy.next;
}`,
        javascript: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 !== null ? list1 : list2;
    return dummy.next;
}`,
        dotnet: `public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
    var dummy = new ListNode(0);
    var current = dummy;
    
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 != null ? list1 : list2;
    return dummy.next;
}`
      }
    },
    {
      id: '5',
      title: 'Longest Substring Without Repeating Characters',
      description: 'Given a string s, find the length of the longest substring without repeating characters. A substring is a contiguous sequence of characters within a string.',
      difficulty: 'Medium',
      category: 'String',
      examples: [
        {
          input: 's = "abcabcbb"',
          output: '3',
          explanation: 'The answer is "abc", with the length of 3.'
        },
        {
          input: 's = "bbbbb"',
          output: '1',
          explanation: 'The answer is "b", with the length of 1.'
        },
        {
          input: 's = "pwwkew"',
          output: '3',
          explanation: 'The answer is "wke", with the length of 3.'
        }
      ],
      constraints: '0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.',
      functionSignature: 'function lengthOfLongestSubstring(s: string): number',
      defaultCode: {
        typescript: `function lengthOfLongestSubstring(s: string): number {
    const charMap = new Map<string, number>();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (charMap.has(s[right])) {
            left = Math.max(left, charMap.get(s[right])! + 1);
        }
        charMap.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        javascript: `function lengthOfLongestSubstring(s) {
    const charMap = new Map();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (charMap.has(s[right])) {
            left = Math.max(left, charMap.get(s[right]) + 1);
        }
        charMap.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
        dotnet: `public int LengthOfLongestSubstring(string s) {
    var charMap = new Dictionary<char, int>();
    int maxLength = 0;
    int left = 0;
    
    for (int right = 0; right < s.Length; right++) {
        if (charMap.ContainsKey(s[right])) {
            left = Math.Max(left, charMap[s[right]] + 1);
        }
        charMap[s[right]] = right;
        maxLength = Math.Max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`
      }
    },
    {
      id: '6',
      title: 'Container With Most Water',
      description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
      difficulty: 'Medium',
      category: 'Array',
      examples: [
        {
          input: 'height = [1,8,6,2,5,4,8,3,7]',
          output: '49',
          explanation: 'The vertical lines are at indices 1 and 8. The water trapped is 7 * (8 - 1) = 49.'
        }
      ],
      constraints: 'n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4',
      functionSignature: 'function maxArea(height: number[]): number',
      defaultCode: {
        typescript: `function maxArea(height: number[]): number {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        const area = width * h;
        maxWater = Math.max(maxWater, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
        javascript: `function maxArea(height) {
    let maxWater = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        const area = width * h;
        maxWater = Math.max(maxWater, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
        dotnet: `public int MaxArea(int[] height) {
    int maxWater = 0;
    int left = 0;
    int right = height.Length - 1;
    
    while (left < right) {
        int width = right - left;
        int h = Math.Min(height[left], height[right]);
        int area = width * h;
        maxWater = Math.Max(maxWater, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`
      }
    }
  ];

  constructor() {}

  getProblems(): Promise<{ success: boolean; data: Problem[] }> {
    return Promise.resolve({ success: true, data: this.problems });
  }

  getProblem(problemId: string): Promise<{ success: boolean; data: Problem | undefined }> {
    const problem = this.problems.find(p => p.id === problemId);
    return Promise.resolve({ success: !!problem, data: problem });
  }

  submitCode(submission: SubmissionRequest): Promise<{ success: boolean; data: ExecutionResult }> {
    // Simulate successful submission
    const result: ExecutionResult = {
      success: true,
      output: 'Accepted',
      executionTime: Math.random() * 200 + 50,
      memoryUsed: Math.random() * 50 + 30
    };
    return Promise.resolve({ success: true, data: result });
  }

  runTests(submission: SubmissionRequest): Promise<{ success: boolean; data: ExecutionResult }> {
    // Simulate test execution with some tests passing and some failing
    const problem = this.problems.find(p => p.id === submission.problemId);
    if (!problem) {
      return Promise.resolve({
        success: false,
        data: { success: false, error: 'Problem not found' }
      });
    }

    const testResults = problem.examples.map((example, index) => ({
      testCaseIndex: index,
      passed: Math.random() > 0.3, // 70% pass rate
      input: example.input,
      expected: example.output,
      actual: example.output,
      error: Math.random() > 0.3 ? undefined : 'Timeout error'
    }));

    const result: ExecutionResult = {
      success: testResults.every(t => t.passed),
      testResults,
      executionTime: Math.random() * 200 + 50,
      memoryUsed: Math.random() * 50 + 30
    };

    return Promise.resolve({ success: true, data: result });
  }

  getExecutionResult(executionId: string): Promise<{ success: boolean; data: ExecutionResult }> {
    return Promise.resolve({
      success: true,
      data: { success: true, output: 'Accepted' }
    });
  }
}
