import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// this will render anything inside the layout component. It will be used to wrap the entire app in the main.tsx file, so that we can have a consistent layout across all pages.
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
      {children}
    <Footer />
    </div>
  );
}