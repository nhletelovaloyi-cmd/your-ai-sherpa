import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Loader2, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateEmail, type Tone } from "@/lib/mock-ai";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI Assistant" },
      {
        name: "description",
        content:
          "Turn bullet points into polished professional emails with formal, friendly, or persuasive tone options.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI Assistant" },
      {
        property: "og:description",
        content: "Draft professional emails from rough notes in seconds.",
      },
    ],
  }),
  component: EmailGenerator,
});

function EmailGenerator() {
  const [subject, setSubject] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const onGenerate = async () => {
    if (!context.trim()) {
      toast.error("Add some context or bullet points first.");
      return;
    }
    setLoading(true);
    setOutput("");
    const result = await generateEmail(
      subject.trim() ? `${subject.trim()}\n${context}` : context,
      tone,
    );
    setOutput(result);
    setLoading(false);
  };

  const onCopy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Email copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Paste raw notes, a topic, or bullet points and get a ready-to-send professional email in your chosen tone."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-rise">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>What should this email cover?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Topic (optional)</Label>
              <Input
                id="subject"
                placeholder="Q3 launch timeline"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">Context or bullet points</Label>
              <Textarea
                id="context"
                rows={9}
                placeholder={"• Launch slipped by one week\n• Need design sign-off by Friday"}
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={onGenerate} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles /> Generate email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-surface animate-rise">
          <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle>AI output</CardTitle>
              <CardDescription>Review before sending.</CardDescription>
            </div>
            {output && (
              <Button variant="outline" size="sm" onClick={onCopy}>
                <Copy /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-4 animate-pulse rounded bg-muted"
                    style={{ width: `${90 - i * 12}%` }}
                  />
                ))}
              </div>
            )}
            {!loading && !output && (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Your generated email will appear here.
              </p>
            )}
            {!loading && output && (
              <pre className="animate-rise rounded-lg border bg-background/70 p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {output}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
