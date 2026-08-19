import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, CheckCircle2, FileText, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summarizeNotes, type SummaryResult } from "@/lib/mock-ai";

export const Route = createFileRoute("/notes-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Paste a long transcript and get a concise summary, action items, decisions made, and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "Extract summaries, action items, decisions, and deadlines from meeting notes.",
      },
    ],
  }),
  component: NotesSummarizer,
});

function NotesSummarizer() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [done, setDone] = useState<Record<number, boolean>>({});

  const onSummarize = async () => {
    if (notes.trim().length < 20) {
      toast.error("Paste a few lines of meeting notes to summarize.");
      return;
    }
    setLoading(true);
    setResult(null);
    setDone({});
    setResult(await summarizeNotes(notes));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Drop in long transcriptions or messy notes and get a structured breakdown you can share with the team."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="animate-rise lg:col-span-2">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Meeting transcript or notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Paste your notes</Label>
              <Textarea
                id="notes"
                rows={16}
                placeholder="Alex: We reviewed the roadmap…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button onClick={onSummarize} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Analyzing…
                </>
              ) : (
                <>
                  <Sparkles /> Summarize notes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          {!result && !loading && (
            <Card className="gradient-surface">
              <CardContent className="py-20 text-center text-sm text-muted-foreground">
                Your structured summary will appear here.
              </CardContent>
            </Card>
          )}

          {loading && (
            <Card className="gradient-surface">
              <CardContent className="space-y-3 py-8">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-4 animate-pulse rounded bg-muted"
                    style={{ width: `${95 - i * 9}%` }}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {result && (
            <>
              <Card className="gradient-surface animate-rise">
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{result.summary}</p>
                </CardContent>
              </Card>

              <Card className="animate-rise">
                <CardHeader>
                  <CardTitle className="text-base">Action items</CardTitle>
                  <CardDescription>Tick items as they get done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.actionItems.map((item, i) => (
                    <label
                      key={i}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/40"
                    >
                      <Checkbox
                        checked={!!done[i]}
                        onCheckedChange={(v) => setDone((d) => ({ ...d, [i]: !!v }))}
                        className="mt-0.5"
                      />
                      <span className="flex-1 text-sm">
                        <span className={done[i] ? "line-through opacity-60" : ""}>{item.text}</span>
                        <Badge variant="secondary" className="ml-2 align-middle">
                          {item.owner}
                        </Badge>
                      </span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="animate-rise">
                  <CardHeader>
                    <CardTitle className="text-base">Decisions made</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.decisions.map((d) => (
                      <div key={d} className="flex gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                        <span className="text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="animate-rise">
                  <CardHeader>
                    <CardTitle className="text-base">Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.deadlines.map((d) => (
                      <div key={d.task} className="flex items-start gap-2.5 text-sm">
                        <CalendarClock className="mt-0.5 size-4 shrink-0 text-primary" />
                        <div>
                          <p>{d.task}</p>
                          <p className="text-xs text-muted-foreground">{d.due}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
