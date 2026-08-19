import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, FileText, Mail, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate everyday work: generate professional emails, summarize meeting notes, and plan prioritized schedules with AI.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Email drafting, meeting summaries, and AI task planning in one clean workspace.",
      },
    ],
  }),
  component: Overview,
});

const tools = [
  {
    to: "/email-generator" as const,
    icon: Mail,
    title: "Smart Email Generator",
    description:
      "Turn bullet points into a polished email with a formal, friendly, or persuasive tone.",
  },
  {
    to: "/notes-summarizer" as const,
    icon: FileText,
    title: "Meeting Notes Summarizer",
    description: "Extract a summary, action items, decisions, and deadlines from long transcripts.",
  },
  {
    to: "/task-planner" as const,
    icon: CalendarClock,
    title: "AI Task Planner",
    description: "Rank tasks by priority and generate an organized daily or weekly schedule.",
  },
];

const stats = [
  { label: "Hours saved this week", value: "6.5" },
  { label: "Emails drafted", value: "24" },
  { label: "Meetings summarized", value: "11" },
  { label: "Tasks scheduled", value: "38" },
];

function Overview() {
  return (
    <div className="space-y-8">
      <section className="gradient-hero animate-rise relative overflow-hidden rounded-2xl p-6 text-primary-foreground sm:p-10">
        <Badge className="border-0 bg-primary-foreground/15 text-primary-foreground">
          <Sparkles className="size-3.5" /> Demo workspace
        </Badge>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
          Automate the busywork in your workday
        </h1>
        <p className="mt-3 max-w-xl text-sm/relaxed text-primary-foreground/85">
          Three focused AI tools for professionals: draft emails, distill meeting notes, and build a
          prioritized schedule — all in one clean workspace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/email-generator">
              Start with email <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
          >
            <Link to="/task-planner">Plan my week</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="animate-rise">
            <CardContent className="py-5">
              <p className="text-2xl font-semibold">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Your tools</h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.to} to={tool.to} className="group">
              <Card className="animate-rise h-full transition-all group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-float)]">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <tool.icon className="size-5" />
                  </div>
                  <CardTitle className="mt-3 text-base">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Open tool
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <Card className="gradient-surface animate-rise">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="size-4 text-primary" /> How it works
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {[
              ["1. Add your input", "Paste notes, bullet points, or a task list."],
              ["2. Choose your settings", "Pick a tone, a view, or task priorities."],
              ["3. Review the output", "Copy, tick off, or reshuffle — always review first."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border bg-background/60 p-4">
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
