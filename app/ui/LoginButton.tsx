"use client";
import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/utils/firebase";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa6";
const LoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" w-full p-4 flex justify-between h-14 "
                variant="bordered"
              >
                <img
                  className=" w-10 h-10 rounded-lg"
                  src={user.photoURL}
                  alt="Profile"
                />
                <p>{user.displayName}</p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="delete"
                onClick={handleSignOut}
                className="text-danger"
                color="danger"
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <Button
          className=" w-full p-4  h-14 "
          variant="bordered"
          onClick={handleSignInWithGoogle}
        >
          Login with{" "}
          <span>
            <FaGoogle />
          </span>{" "}
          Google
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
