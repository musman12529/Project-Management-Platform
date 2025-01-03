export const PUT = async (request: Request) => {
    try {
      const id = request.headers.get('id'); // Get the project ID from the headers
      if (!id) {
        return new Response(JSON.stringify({ message: 'Project ID is required' }), { status: 400 });
      }
  
      const { teammateEmail } = await request.json();
  
      if (!teammateEmail) {
        return new Response(JSON.stringify({ message: 'Teammate email is required' }), { status: 400 });
      }
  
      // Normalize teammateEmail to an array (in case it's a single email string)
      let teammates = Array.isArray(teammateEmail) ? teammateEmail : [teammateEmail];
  
      // Ensure all teammates are unique
      teammates = [...new Set(teammates)];
  
      // Make the PUT request to add teammates to the project
      const response = await fetch(`http://localhost:4000/api/projects/${id}/add-teammate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teammateEmail: teammates }), // Send the array of teammate emails
      });
  
      if (!response.ok) {
        throw new Error('Failed to add teammates');
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
  };
  