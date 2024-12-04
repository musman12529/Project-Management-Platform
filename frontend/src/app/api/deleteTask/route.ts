export const DELETE = async (request: Request) => {
    try {
        const urlParts = request.url.split('/');
        const id = urlParts.pop(); // Extract the task ID from the URL
      const userEmail = request.headers.get('user-email');
      if (!userEmail) {
        return new Response(JSON.stringify({ message: 'User email is required' }), {
          status: 400,
        });
      }
  
      // Call the backend Express API to delete the task
      const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'user-email': userEmail,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
  
      return new Response(JSON.stringify({ message: 'Task deleted successfully' }), {
        status: 200,
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  };
  