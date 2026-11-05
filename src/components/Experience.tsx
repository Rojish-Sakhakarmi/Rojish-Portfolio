"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Briefcase, Trophy, Users, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const { experiences } = portfolioData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Internship":
        return <Briefcase className="w-4 h-4 text-indigo-400" />;
      case "Hackathon":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case "Leadership":
      case "Extracurricular":
      default:
        return <Users className="w-4 h-4 text-violet-400" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Internship":
        return "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
      case "Hackathon":
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "Leadership":
        return "bg-violet-500/10 text-violet-300 border-violet-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-white/5";
    }
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Journey & Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Experience & Leadership
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-2">
            Internships, hackathon wins, and community involvement that shaped my engineering mindset.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 pl-6 sm:pl-8 ml-3 sm:ml-6 space-y-10">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500/60 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-indigo-500/20">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
              </div>

              {/* Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getTypeBadge(
                        exp.type
                      )}`}
                    >
                      {getTypeIcon(exp.type)}
                      {exp.type}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-semibold text-indigo-400 mb-4">
                  {exp.organization}
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-4">
                  {exp.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.skillsUsed.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
