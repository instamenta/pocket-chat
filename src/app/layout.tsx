import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Chatter",
	description: "Chat online",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
			<body className={inter.className}>
			<Navbar/>
			{children}
			<Footer/>
			</body>
			</html>
		</ClerkProvider>
	);
}
