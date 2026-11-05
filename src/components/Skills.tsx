"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Cpu, Layout, Server, Wrench } from "lucide-react";

export default function Skills() {
  const { skills } = portfolioData;

  const categoryIcons: Record<string, React.ReactNode> = {
    Languages: <Cpu className="w-5 h-5 text-indigo-400" />,
    "Frontend Development": <Layout className="w-5 h-5 text-violet-400" />,
    "Backend & Databases": <Server className="w-5 h-5 text-emerald-400" />,
    "Tools & DevOps": <Wrench className="w-5 h-5 text-sky-400" />,
  };

  const getLevelBadge = (level?: string) => {
    switch (level) {
      case "Advanced":
        return "bg-indigo-500/10 text-indigo-300 border-indigo-500/30";
      case "Intermediate":
        return "bg-sky-500/10 text-sky-300 border-sky-500/30";
      case "Beginner":
        return "bg-slate-700/30 text-slate-400 border-slate-700";
      default:
        return "bg-slate-800 text-slate-300 border-white/5";
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Skills & Technologies
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-2">
            The core programming languages, frameworks, and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category) => (
            <div
              key={category.title}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5">
                  {categoryIcons[category.title] || <Cpu className="w-5 h-5 text-indigo-400" />}
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-white/5 hover:border-white/20 transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${getLevelBadge(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
