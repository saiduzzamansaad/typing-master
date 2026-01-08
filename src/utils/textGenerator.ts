const COMMON_WORDS = [
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
      'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
      'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
      'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
      'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
      'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
      'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
      'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
      'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
      'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
    ];
    
    const PROGRAMMING_SNIPPETS = {
      javascript: [
        'function calculateSum(a, b) { return a + b; }',
        'const array = [1, 2, 3, 4, 5];',
        'const result = array.map(x => x * 2);',
        'if (condition) { console.log("true"); }',
        'for (let i = 0; i < array.length; i++) { }',
        'const person = { name: "John", age: 30 };',
        'try { dangerousOperation(); } catch (error) { }',
        'const promise = fetch(url).then(response => response.json());',
        'class Animal { constructor(name) { this.name = name; } }',
        'const [first, second, ...rest] = array;'
      ],
      python: [
        'def calculate_sum(a, b): return a + b',
        'numbers = [1, 2, 3, 4, 5]',
        'result = [x * 2 for x in numbers]',
        'if condition: print("true")',
        'for i in range(len(numbers)): pass',
        'person = {"name": "John", "age": 30}',
        'try: dangerous_operation()\nexcept Exception as e: pass',
        'with open("file.txt", "r") as file: content = file.read()',
        'class Animal:\n    def __init__(self, name): self.name = name',
        'first, second, *rest = numbers'
      ],
      typescript: [
        'function calculateSum(a: number, b: number): number { return a + b; }',
        'const array: number[] = [1, 2, 3, 4, 5];',
        'const result = array.map((x: number) => x * 2);',
        'interface Person { name: string; age: number; }',
        'const person: Person = { name: "John", age: 30 };',
        'type Callback = (error: Error | null, data?: any) => void;',
        'async function fetchData(url: string): Promise<any> { }',
        'enum Direction { Up, Down, Left, Right }',
        'const tuple: [string, number] = ["hello", 42];',
        'type Partial<T> = { [P in keyof T]?: T[P]; };'
      ],
      html: [
        '<div class="container"><h1>Title</h1></div>',
        '<input type="text" placeholder="Enter text" />',
        '<button onclick="handleClick()">Click me</button>',
        '<ul><li>Item 1</li><li>Item 2</li></ul>',
        '<form action="/submit" method="post"><input type="submit" /></form>',
        '<img src="image.jpg" alt="Description" />',
        '<a href="https://example.com">Link</a>',
        '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>',
        '<section><article><p>Content</p></article></section>',
        '<nav><a href="#home">Home</a><a href="#about">About</a></nav>'
      ]
    };
    
    export const generateText = (
      mode: string,
      wordCount?: number,
      language?: string
    ): string => {
      if (mode === 'developer' && language && PROGRAMMING_SNIPPETS[language as keyof typeof PROGRAMMING_SNIPPETS]) {
        const snippets = PROGRAMMING_SNIPPETS[language as keyof typeof PROGRAMMING_SNIPPETS];
        return snippets[Math.floor(Math.random() * snippets.length)];
      }
    
      const count = wordCount || 50;
      const words: string[] = [];
      
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
        words.push(COMMON_WORDS[randomIndex]);
      }
      
      // Capitalize first word and add period
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      
      return words.join(' ') + '.';
    };