// Common words and sentences for typing practice
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
    
    const TYPING_SENTENCES = [
      "The quick brown fox jumps over the lazy dog.",
      "Pack my box with five dozen liquor jugs.",
      "How vexingly quick daft zebras jump!",
      "Bright vixens jump; dozy fowl quack.",
      "Sphinx of black quartz, judge my vow.",
      "The five boxing wizards jump quickly.",
      "Crazy Fredrick bought many very exquisite opal jewels.",
      "We promptly judged antique ivory buckles for the next prize.",
      "Jaded zombies acted quaintly but kept driving their oxen forward.",
      "The job requires extra pluck and zeal from every young wage earner.",
      "Quick zephyrs blow, vexing daft Jim.",
      "Two driven jocks help fax my big quiz.",
      "Five quacking zephyrs jolt my wax bed.",
      "The quick onyx goblin jumps over the lazy dwarf.",
      "Waltz, bad nymph, for quick jigs vex!",
      "Fox nymphs grab quick-jived waltz.",
      "Brick quiz whangs jumpy veldt fox.",
      "Bright vixens jump; dozy fowl quack.",
      "Sphinx of black quartz: judge my vow.",
      "How quickly daft jumping zebras vex!",
    ];
    
    const PARAGRAPHS = [
      "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++. When you learn to code, you develop problem-solving skills and logical thinking that can be applied in many different fields.",
      
      "The Internet has revolutionized communication and access to information. Today, billions of people around the world are connected through various online platforms. Social media, email, and video conferencing have made it possible to stay in touch with friends, family, and colleagues regardless of geographical distance.",
      
      "Learning to type efficiently is an essential skill in the modern digital age. Whether you are writing emails, coding, or creating documents, being able to type quickly and accurately can save you significant time. Practice regularly to improve your speed and reduce errors.",
      
      "Nature provides us with incredible beauty and resources that we must protect. Forests, oceans, and wildlife all contribute to the balance of our ecosystem. Conservation efforts around the world aim to preserve these natural treasures for future generations to enjoy.",
      
      "Technology continues to advance at an incredible pace, changing how we live and work. Artificial intelligence, virtual reality, and renewable energy are just a few examples of innovations shaping our future. Staying informed about technological developments helps us adapt and thrive.",
      
      "Education is the foundation of personal and professional growth. Continuous learning opens doors to new opportunities and helps individuals stay competitive in a rapidly changing job market. Both formal education and self-directed learning are valuable.",
      
      "Health and wellness should be priorities for everyone. Regular exercise, balanced nutrition, and sufficient sleep contribute to physical and mental well-being. Making healthy choices daily leads to better quality of life and increased productivity.",
    ];
    
    const PROGRAMMING_SNIPPETS = {
      javascript: [
        `function calculateSum(a, b) {
      return a + b;
    }
    
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(x => x * 2);
    
    console.log("Sum:", calculateSum(5, 3));
    console.log("Doubled:", doubled);`,
        
        `class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      
      greet() {
        console.log(\`Hello, my name is \${this.name}\`);
      }
    }
    
    const person1 = new Person("Alice", 30);
    person1.greet();`,
        
        `async function fetchData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }`,
      ],
      
      python: [
        `def fibonacci(n):
        if n <= 1:
            return n
        else:
            return fibonacci(n-1) + fibonacci(n-2)
    
    numbers = [1, 2, 3, 4, 5]
    squared = [x**2 for x in numbers]
    
    print("Fibonacci:", fibonacci(10))
    print("Squared:", squared)`,
        
        `class Animal:
        def __init__(self, name, species):
            self.name = name
            self.species = species
        
        def speak(self):
            raise NotImplementedError("Subclass must implement")
    
    class Dog(Animal):
        def speak(self):
            return "Woof!"`,
        
        `def quick_sort(arr):
        if len(arr) <= 1:
            return arr
        pivot = arr[len(arr) // 2]
        left = [x for x in arr if x < pivot]
        middle = [x for x in arr if x == pivot]
        right = [x for x in arr if x > pivot]
        return quick_sort(left) + middle + quick_sort(right)`,
      ],
      
      typescript: [
        `interface User {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
    }
    
    const users: User[] = [
      { id: 1, name: "Alice", email: "alice@example.com", isActive: true },
      { id: 2, name: "Bob", email: "bob@example.com", isActive: false }
    ];
    
    const activeUsers = users.filter(user => user.isActive);`,
        
        `type Status = "pending" | "success" | "error";
    
    function processRequest(status: Status): string {
      switch (status) {
        case "pending":
          return "Processing...";
        case "success":
          return "Completed successfully";
        case "error":
          return "An error occurred";
        default:
          return "Unknown status";
      }
    }`,
        
        `class Repository<T> {
      private items: T[] = [];
      
      add(item: T): void {
        this.items.push(item);
      }
      
      getAll(): T[] {
        return this.items;
      }
      
      find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
      }
    }`,
      ],
      
      html: [
        `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <header class="header">
        <nav class="navbar">
          <a href="/" class="logo">MySite</a>
          <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
    </body>
    </html>`,
        
        `<div class="card">
      <img src="profile.jpg" alt="Profile" class="card-image">
      <div class="card-content">
        <h3 class="card-title">John Doe</h3>
        <p class="card-text">Web Developer with 5+ years of experience</p>
        <button class="card-button">Contact</button>
      </div>
    </div>`,
        
        `<form class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          placeholder="Enter your name"
        >
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          placeholder="Enter your email"
        >
      </div>
      <button type="submit" class="submit-btn">Send Message</button>
    </form>`,
      ],
    };
    
    const CATEGORIES = {
      beginner: ['common', 'simple', 'easy'],
      intermediate: ['paragraphs', 'sentences', 'mixed'],
      advanced: ['technical', 'programming', 'complex'],
      quotes: ['motivational', 'famous', 'wisdom'],
      stories: ['short', 'fiction', 'nonfiction'],
    };
    
    const QUOTES = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "The way to get started is to quit talking and begin doing. - Walt Disney",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
      "It does not matter how slowly you go as long as you do not stop. - Confucius",
      "Everything you've ever wanted is on the other side of fear. - George Addair",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    ];
    
    export const generateText = (
      mode: 'time' | 'words' | 'developer' | 'zen',
      wordCount?: number,
      language?: string,
      category?: keyof typeof CATEGORIES
    ): string => {
      const count = wordCount || 50;
      
      // Developer mode
      if (mode === 'developer' && language && PROGRAMMING_SNIPPETS[language as keyof typeof PROGRAMMING_SNIPPETS]) {
        const snippets = PROGRAMMING_SNIPPETS[language as keyof typeof PROGRAMMING_SNIPPETS];
        return snippets[Math.floor(Math.random() * snippets.length)];
      }
      
      // Zen mode - use paragraphs or quotes
      if (mode === 'zen') {
        if (Math.random() > 0.5) {
          return PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
        }
        return QUOTES[Math.floor(Math.random() * QUOTES.length)];
      }
      
      // Word count mode - generate specific number of words
      if (mode === 'words' && count <= 25) {
        // For short word counts, use sentences
        const sentences = [...TYPING_SENTENCES];
        let result = '';
        let words = 0;
        
        while (words < count) {
          const sentence = sentences[Math.floor(Math.random() * sentences.length)];
          const sentenceWords = sentence.split(' ').length;
          
          if (words + sentenceWords <= count) {
            result += (result ? ' ' : '') + sentence;
            words += sentenceWords;
          } else {
            // If the sentence is too long, add part of it
            const neededWords = count - words;
            const wordsArray = sentence.split(' ');
            const partialSentence = wordsArray.slice(0, neededWords).join(' ');
            result += (result ? ' ' : '') + partialSentence + '.';
            words += neededWords;
          }
        }
        
        return result;
      }
      
      // Time mode or longer word counts - use paragraphs
      if (count > 25) {
        const paragraph = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
        const words = paragraph.split(' ');
        
        if (words.length <= count) {
          return paragraph;
        }
        
        // Take only the required number of words
        return words.slice(0, count).join(' ') + '...';
      }
      
      // Fallback: generate random words
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
        words.push(COMMON_WORDS[randomIndex]);
      }
      
      // Capitalize first word and add period
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(' ') + '.';
    };
    
    // Generate text with specific difficulty
    export const generateTextWithDifficulty = (
      difficulty: 'easy' | 'medium' | 'hard' = 'medium',
      length: 'short' | 'medium' | 'long' = 'medium'
    ): string => {
      let wordCount = 50;
      if (length === 'short') wordCount = 25;
      if (length === 'long') wordCount = 100;
      
      if (difficulty === 'easy') {
        // Use common words and simple sentences
        const simpleSentences = TYPING_SENTENCES.slice(0, 10);
        return simpleSentences[Math.floor(Math.random() * simpleSentences.length)];
      }
      
      if (difficulty === 'hard') {
        // Use technical or complex paragraphs
        const complexParagraphs = [
          "The intricate quantum mechanical phenomena observed at subatomic scales challenge our classical understanding of physics.",
          "Sophisticated algorithms employing machine learning techniques can discern intricate patterns within vast datasets.",
          "Neuroscientific research continues to elucidate the complex neural networks underlying cognitive processes.",
        ];
        return complexParagraphs[Math.floor(Math.random() * complexParagraphs.length)];
      }
      
      // Medium difficulty
      return generateText('time', wordCount);
    };
    
    // Get random text for practice
    export const getRandomText = (): string => {
      const types = ['sentence', 'paragraph', 'quote'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      switch (type) {
        case 'sentence':
          return TYPING_SENTENCES[Math.floor(Math.random() * TYPING_SENTENCES.length)];
        case 'paragraph':
          return PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
        case 'quote':
          return QUOTES[Math.floor(Math.random() * QUOTES.length)];
        default:
          return TYPING_SENTENCES[0];
      }
    };