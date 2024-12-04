export const PUT = async (request: Request) => {
    try {
      // const urlParts = request.url.split('/');
      // const id = urlParts.pop(); // Extract the task ID from the URL
      // const { title, description, dueDate, status, priority } = await request.json(); // Extract updated task details including priority
      const id = request.headers.get('id'); // Use .get() for headers in Next.js 13
    
      const { title, description, dueDate, priority, status } = await request.json();
      const response = await fetch(`http://localhost:4000/api/tasks/674945c7d5e191d327547f23`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, dueDate, status, priority }), // Include priority in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  };
  