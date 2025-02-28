import { NextRequest, NextResponse } from 'next/server';

// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@alma.ai',
    // this would be a hashed password
    password: 'password',
    role: 'admin'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Find user
    const user = users.find(u => u.email === email);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // you would generate a JWT token here
    const token = 'mock-jwt-token';
    
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}