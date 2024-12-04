// pages/api/tasks/overdue.ts


export const GET = async (request: Request) => {
  try {
    const userEmail = request.headers.get('user-email'); // Use .get() for headers in Next.js 13
    if (!userEmail) {
      return new Response(JSON.stringify({ message: 'User email is required' }), {
        status: 400,
      });
    }

    // Call the backend Express API
    const response = await fetch('http://localhost:4000/api/tasks/', {
      method: 'GET',
      headers: {
        'user-email': userEmail,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch overdue tasks from backend');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
