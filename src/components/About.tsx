"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { GraduationCap, Award, BookOpen, Code2, Terminal, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const { personal, education } = portfolioData;

  const interests = [
    {
      icon: <Code2 className="w-5 h-5 text-indigo-400" />,
      title: "Full-Stack Development",
      desc: "Creating snappy frontends and robust, well-documented backend APIs with modern frameworks.",
    },
    {
      icon: <Rocket className="w-5 h-5 text-violet-400" />,
      title: "Systems & Scalability",
      desc: "Learning distributed architectures, caching strategies, and database optimization.",
    },
    {
      icon: <Terminal className="w-5 h-5 text-sky-400" />,
      title: "Open Source & Collaboration",
      desc: "Contributing to community projects and engaging with student developer clubs.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Get To Know Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            About Me & Education
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Core Interests */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>Hello there!</span>
                <span className="animate-wave inline-block origin-bottom-right">👋</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4">
                {personal.bio}
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                When I&apos;m not debugging code or grinding LeetCode, you can find me organizing university tech meetups, hacking on side-projects with friends at 2 AM, or exploring the latest developments in generative AI.
              </p>
            </div>

            {/* What I Focus On */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {interests.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-slate-800/80 w-fit mb-3 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <GraduationCap className="w-24 h-24 text-indigo-400" />
              </div>

              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{education.degree}</h3>
              <div className="text-sm font-medium text-slate-300 mb-1">{education.institution}</div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-5">
                <span>{education.period}</span>
                {education.gpa && (
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold">
                    GPA: {education.gpa}
                  </span>
                )}
              </div>

              {/* Coursework */}
              <div className="mb-5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Key Coursework</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Honors & Achievements */}
              {education.achievements && education.achievements.length > 0 && (
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Honors & Milestones</span>
                  </div>
                  <ul className="space-y-1.5">
                    {education.achievements.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
