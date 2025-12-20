
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminPanel from "@/src/components/admin/AdminPanel";

export default function AdminPage() {
  const { status } = useSession();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Still checking session
    
    if (status === 'unauthenticated') {
      // Not logged in - redirect immediately
      router.replace('/admin/login');
    } else if (status === 'authenticated') {
      // Logged in - allow rendering
      setShouldRender(true);
    }
  }, [status, router]);

  // Don't render anything while checking or redirecting
  if (status === 'loading' || !shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nga-navy mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render AdminPanel when authenticated
  return <AdminPanel />;
}