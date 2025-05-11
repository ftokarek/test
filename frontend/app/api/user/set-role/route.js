import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Pobierz ID użytkownika z bieżącej sesji
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Inicjalizuj klienta Clerk
    const client = await clerkClient();

    // Aktualizuj publicMetadata użytkownika, ustawiając rolę na 'seller'
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'seller',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'User role updated to seller',
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while updating the user role',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
