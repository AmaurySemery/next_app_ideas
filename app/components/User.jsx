"use client";

import { AuthContext } from "../context/AuthContextProvider";
import Link from "next/link";
import { useContext } from "react";

// Le but est de remplacer register par profile quand l'utilisateur est connecté

export default function User() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Link href="/profile">Profile</Link>}
      {!user && <Link href="/register">Register/Login</Link>}
    </>
  );
}
