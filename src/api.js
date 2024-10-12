export async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
  }
  
  export async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await response.json();
  }
  
  export async function fetchTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return await response.json();
  }
  