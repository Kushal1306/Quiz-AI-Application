"use client";
import React from "react";
import { Cover } from "../components/ui/Cover";
import { AnimatedTooltip } from "../components/ui/Trusted";
import {StarIcon} from 'lucide-react'



export function CoverDemo() {
  const people = [
    {
      id: 1,
      name: "Dilisha Jain",
      designation: "Software Engineer, Microsoft",
      image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Kala Anoop",
      designation: "Senior QA Consultant",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Nisha",
      designation: "Business Analyst",
      image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
    {
      id: 4,
      name: "Mehak",
      designation: "ML Engineer, ServiceNow",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Rishab Aggarwal",
      designation: "SDET, Progress",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dupathi Shravani",
      designation: "Software Engineer, Cognida.ai",
      image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];
  
  return (
    <div className="max-w-7xl mx-auto text-center mt-6 py-2">
      <h1 className="text-4xl md:text-5xl lg:text-7.5xl font-semibold">
        Generate Quizzes
      </h1>
      <h1 className="text-4xl md:text-5xl lg:text-7.5xl font-semibold mt-2 pt-3">
        with <Cover>AI in a Single Click</Cover>
      </h1>
      <p className="text-xl md:text-xl lg:text-2xl font-medium mt-2 mb-8 pt-3">
    Made with ❤️ for educators, content creators, and students.
      </p>
      <div className="flex flex-row items-center justify-center mb-2 pt-1 w-full">
      <div className="flex items-center justify-center w-full">
            <div className="flex flex-wrap justify-center md:flex-row ">
              <AnimatedTooltip items={people} />
            </div>
            <div className="flex flex-col gap-1 ml-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((item) => (
                  <StarIcon
                    key={item}
                    className="w-4 h-4 fill-current text-black dark:text-white"
                  />
                ))}
              </div>
              <p className="text-xs">Trusted by 1000+ developers</p>
            </div>
    </div>
    </div>
    </div>
  );
}
