export const CODE_SNIPPETS = {
      javascript: [
        `function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }`,
        `const user = {
      name: "John",
      age: 30,
      greet() {
        console.log(\`Hello, \${this.name}!\`);
      }
    };`,
        `async function fetchData(url) {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    }`,
      ],
      
      python: [
        `def quick_sort(arr):
      if len(arr) <= 1:
        return arr
      pivot = arr[len(arr) // 2]
      left = [x for x in arr if x < pivot]
      middle = [x for x in arr if x == pivot]
      right = [x for x in arr if x > pivot]
      return quick_sort(left) + middle + quick_sort(right)`,
        
        `class Animal:
      def __init__(self, name, species):
        self.name = name
        self.species = species
      
      def speak(self):
        raise NotImplementedError("Subclass must implement")`,
        
        `@app.route('/api/data', methods=['GET'])
    def get_data():
      try:
        data = Database.query.all()
        return jsonify([item.to_dict() for item in data])
      except Exception as e:
        return jsonify({'error': str(e)}), 500`,
      ],
      
      typescript: [
        `interface User {
      id: number;
      name: string;
      email: string;
      createdAt: Date;
    }
    
    type PartialUser = Partial<User>;`,
        
        `const fetchData = async <T>(url: string): Promise<T> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return response.json();
    };`,
        
        `class Repository<T> {
      private items: T[] = [];
      
      add(item: T): void {
        this.items.push(item);
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
      <title>Modern Web App</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <header class="header">
        <nav class="nav">
          <a href="#home" class="logo">TypeQuest</a>
        </nav>
      </header>
    </body>
    </html>`,
        
        `<div class="card">
      <img src="avatar.jpg" alt="Avatar" class="card__image">
      <div class="card__content">
        <h3 class="card__title">John Doe</h3>
        <p class="card__text">Full Stack Developer</p>
        <button class="card__button">Contact</button>
      </div>
    </div>`,
        
        `<form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email"
          required
          placeholder="Enter your email"
        >
      </div>
      <button type="submit" class="btn btn-primary">
        Subscribe
      </button>
    </form>`,
      ],
    } as const;
    
    export const getRandomCodeSnippet = (language: keyof typeof CODE_SNIPPETS): string => {
      const snippets = CODE_SNIPPETS[language];
      return snippets[Math.floor(Math.random() * snippets.length)];
    };