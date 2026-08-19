export type Tone = "formal" | "friendly" | "persuasive";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function bulletize(input: string) {
  return input
    .split(/\n|•|-\s|\.|;/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);
}

export async function generateEmail(context: string, tone: Tone) {
  await wait(900);
  const points = bulletize(context);
  const topic = points[0] ?? "our recent discussion";
  const short = topic.length > 60 ? topic.slice(0, 57) + "..." : topic;

  const openings: Record<Tone, string> = {
    formal: `Dear Colleague,\n\nI hope this message finds you well. I am writing regarding ${short.toLowerCase()}.`,
    friendly: `Hi there,\n\nHope your week is going well! Just wanted to share a quick update on ${short.toLowerCase()}.`,
    persuasive: `Hi there,\n\nThere is a clear opportunity in front of us, and it starts with ${short.toLowerCase()}.`,
  };

  const closings: Record<Tone, string> = {
    formal:
      "Please let me know if you require any further detail. I would be glad to provide additional context at your convenience.\n\nKind regards,\nYour Name",
    friendly:
      "Let me know what you think — happy to jump on a quick call if that's easier.\n\nThanks so much,\nYour Name",
    persuasive:
      "If we align on this now, we can capture the impact this quarter. Can we lock a 15-minute slot to confirm next steps?\n\nBest,\nYour Name",
  };

  const subjects: Record<Tone, string> = {
    formal: `Subject: Update and Next Steps — ${short}`,
    friendly: `Subject: Quick update on ${short}`,
    persuasive: `Subject: A faster path forward on ${short}`,
  };

  const body =
    points.length > 1
      ? `\n\nKey points:\n${points
          .slice(0, 5)
          .map((p) => `• ${p.charAt(0).toUpperCase() + p.slice(1)}`)
          .join("\n")}`
      : "";

  return `${subjects[tone]}\n\n${openings[tone]}${body}\n\n${closings[tone]}`;
}

export type SummaryResult = {
  summary: string;
  actionItems: { text: string; owner: string }[];
  decisions: string[];
  deadlines: { task: string; due: string }[];
};

export async function summarizeNotes(notes: string): Promise<SummaryResult> {
  await wait(1100);
  const lines = bulletize(notes);
  const first = lines.slice(0, 3).join(". ");
  const owners = ["Alex", "Priya", "Sam", "Jordan"];

  return {
    summary:
      (first ? `${first}. ` : "") +
      `The team reviewed current progress, aligned on ownership across ${Math.max(
        2,
        Math.min(6, lines.length),
      )} workstreams, and agreed to keep the delivery timeline unchanged while tightening weekly check-ins.`,
    actionItems: (lines.length ? lines.slice(0, 4) : ["Circulate the updated project brief"]).map(
      (l, i) => ({
        text: l.charAt(0).toUpperCase() + l.slice(1),
        owner: owners[i % owners.length]!,
      }),
    ),
    decisions: [
      "Proceed with the current scope; no additional features this cycle.",
      "Weekly status sync moves to Tuesday mornings.",
      "Documentation ownership stays with the product lead.",
    ],
    deadlines: [
      { task: "Share revised timeline", due: "Friday, end of day" },
      { task: "Stakeholder review", due: "Next Wednesday" },
      { task: "Final sign-off", due: "End of month" },
    ],
  };
}

export type Priority = "high" | "medium" | "low";
export type PlanTask = { id: string; title: string; priority: Priority; minutes: number };
export type ScheduleBlock = { time: string; task: string; priority: Priority; focus: string };
export type ScheduleDay = { day: string; blocks: ScheduleBlock[] };

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SLOTS = ["09:00 – 10:30", "10:45 – 12:00", "13:00 – 14:30", "14:45 – 16:00", "16:15 – 17:00"];
const FOCUS = ["Deep focus", "Collaborative", "Admin & follow-ups", "Deep focus", "Wrap-up"];

export async function buildSchedule(
  tasks: PlanTask[],
  view: "daily" | "weekly",
): Promise<ScheduleDay[]> {
  await wait(850);
  const order: Priority[] = ["high", "medium", "low"];
  const sorted = [...tasks].sort(
    (a, b) => order.indexOf(a.priority) - order.indexOf(b.priority) || b.minutes - a.minutes,
  );

  const days = view === "daily" ? DAYS.slice(0, 1) : DAYS;
  const result: ScheduleDay[] = days.map((day) => ({ day, blocks: [] }));

  sorted.forEach((task, index) => {
    const dayIndex = view === "daily" ? 0 : index % days.length;
    const day = result[dayIndex]!;
    const slot = SLOTS[day.blocks.length % SLOTS.length]!;
    day.blocks.push({
      time: slot,
      task: task.title,
      priority: task.priority,
      focus: FOCUS[day.blocks.length % FOCUS.length]!,
    });
  });

  return result.filter((d) => d.blocks.length > 0);
}
