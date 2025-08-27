import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "@/services/mongo";

export const metadata = {
  title: "Edu Connect Learning Platform",
  description: "Explore || Learn || Build || Share ",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
