"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
