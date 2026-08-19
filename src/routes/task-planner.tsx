import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buildSchedule, type PlanTask, type Priority, type ScheduleDay } from "@/lib/mock-ai";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner & Scheduler — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "List your tasks, set High, Medium, or Low priorities, and generate an organized daily or weekly schedule.",
      },
      { property: "og:title", content: "AI Task Planner & Scheduler — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "Prioritize tasks and generate a focused daily or weekly plan.",
      },
    ],
  }),
  component: TaskPlanner,
});

const priorityStyles: Record<Priority, string> = {
  high: "border-destructive/40 bg-destructive/10 text-destructive",
  medium: "border-warning/40 bg-warning/15 text-warning-foreground",
  low: "border-success/40 bg-success/10 text-success",
};

const priorityLabel: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function TaskPlanner() {
  const [tasks, setTasks] = useState<PlanTask[]>([
    { id: "1", title: "Finalize quarterly report", priority: "high", minutes: 90 },
    { id: "2", title: "Review design handoff", priority: "medium", minutes: 60 },
    { id: "3", title: "Clear inbox backlog", priority: "low", minutes: 30 },
  ]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("high");
  const [minutes, setMinutes] = useState("60");
  const [view, setView] = useState<"daily" | "weekly">("weekly");
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleDay[] | null>(null);

  const addTask = () => {
    if (!title.trim()) {
      toast.error("Give the task a name.");
      return;
    }
    setTasks((t) => [
      ...t,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        priority,
        minutes: Number(minutes) || 30,
      },
    ]);
    setTitle("");
  };

  const generate = async (nextView: "daily" | "weekly" = view) => {
    if (tasks.length === 0) {
      toast.error("Add at least one task.");
      return;
    }
    setLoading(true);
    setSchedule(await buildSchedule(tasks, nextView));
    setLoading(false);
  };

  const counts = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={CalendarClock}
        title="AI Task Planner & Scheduler"
        description="Capture your workload, rank it by priority, and let the assistant lay out a realistic daily or weekly plan."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="animate-rise lg:col-span-2">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Add tasks and priorities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                value={title}
                placeholder="Draft client proposal"
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minutes">Estimate (min)</Label>
                <Input
                  id="minutes"
                  type="number"
                  min={15}
                  step={15}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={addTask}>
              <Plus /> Add task
            </Button>

            <div className="space-y-2 border-t pt-4">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg border p-2.5 transition-colors hover:bg-accent/40"
                >
                  <span className="flex-1 truncate text-sm">{t.title}</span>
                  <Badge variant="outline" className={priorityStyles[t.priority]}>
                    {priorityLabel[t.priority]}
                  </Badge>
                  <button
                    aria-label={`Remove ${t.title}`}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    onClick={() => setTasks((list) => list.filter((x) => x.id !== t.id))}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">No tasks yet.</p>
              )}
            </div>

            <Button className="w-full" disabled={loading} onClick={() => generate()}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Planning…
                </>
              ) : (
                <>
                  <Sparkles /> Generate schedule
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          <Card className="gradient-surface animate-rise">
            <CardHeader className="flex-col items-start justify-between gap-4 space-y-0 sm:flex-row sm:items-center">
              <div>
                <CardTitle>AI schedule</CardTitle>
                <CardDescription>
                  {counts.high} high · {counts.medium} medium · {counts.low} low priority
                </CardDescription>
              </div>
              <Tabs
                value={view}
                onValueChange={(v) => {
                  const next = v as "daily" | "weekly";
                  setView(next);
                  if (schedule) void generate(next);
                }}
              >
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
                  ))}
                </div>
              )}
              {!loading && !schedule && (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  Generate a plan to see your organized schedule.
                </p>
              )}
              {!loading && schedule && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {schedule.map((day) => (
                    <div key={day.day} className="animate-rise space-y-2 rounded-xl border p-3">
                      <p className="text-sm font-semibold">{day.day}</p>
                      {day.blocks.map((b) => (
                        <div
                          key={b.time + b.task}
                          className="rounded-lg border bg-background/70 p-2.5 transition-shadow hover:shadow-md"
                        >
                          <p className="text-xs font-medium text-primary">{b.time}</p>
                          <p className="mt-0.5 text-sm">{b.task}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <Badge variant="outline" className={priorityStyles[b.priority]}>
                              {priorityLabel[b.priority]}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{b.focus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
