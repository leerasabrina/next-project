"use client";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase.init";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(password.length !==6){
        return alert('password is weak.Please enter minimum 6 letters')
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update displayName
      await updateProfile(user, { displayName: name });

      // Save to MongoDB
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL || "",
        }),
      });

      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-80">
        <input type="text" name="name" placeholder="Name" required className="p-2 border rounded"/>
        <input type="email" name="email" placeholder="Email" required className="p-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" required className="p-2 border rounded"/>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
