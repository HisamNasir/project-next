import Image from "next/image";
import Dashboard from "./dashboard/page";
import { AuthProvider } from "@/app/context/AuthProvider";
export default function Home() {
  return (
    <main className=" h-full ">
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    </main>
  );
}
