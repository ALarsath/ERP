import { redirect } from 'next/navigation';

export default function Home() {
  // Since this is a server component that redirects,
  // we need to return null after the redirect
  redirect('/login');
  return null;
}
