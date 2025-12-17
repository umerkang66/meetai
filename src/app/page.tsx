import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ArrowRight, Bot, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect('/meetings');
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <span>MeetAI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>AI-Powered Meeting Assistant</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Intelligent Meeting Companions for{' '}
                <span className="text-primary">Better Decisions</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Automated summaries, accurate transcripts, and actionable
                insights for your video conferences. Focus on the conversation,
                let us handle the notes.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/sign-up" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Hero Image */}
              <div className="mt-16 sm:mt-24 relative w-full max-w-5xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                  <Image
                    src="/images/1-meetings.png"
                    alt="MeetAI Dashboard Interface"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32 bg-secondary/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Everything you need to master your meetings
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Turn hours of video calls into searchable, actionable knowledge
                with our advanced AI features.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              {/* Feature 1 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden bg-muted">
                  <Image
                    src="/images/2-summary.png"
                    alt="Smart Summaries"
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">Smart Summaries</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Get concise summaries of your meetings instantly. Never miss
                    a key decision or action item again with AI-generated notes.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden bg-muted">
                  <Image
                    src="/images/3-transcript.png"
                    alt="Full Transcripts"
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Accurate Transcripts
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Searchable, speaker-diarized transcripts for every call.
                    Find exactly what was said and who said it in seconds.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="relative overflow-hidden bg-muted">
                  <Image
                    src="/images/5-chat.png"
                    alt="Interactive Chat"
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <Bot className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">Ask Your Meetings</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Chat with your meeting data. Ask questions, extract specific
                    details, and get instant answers from our AI assistant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-16 text-center shadow-lg relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                  Ready to transform your workflow?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
                  Join thousands of professionals who are saving time and making
                  better decisions with MeetAI.
                </p>
                <Link href="/sign-up">
                  <Button size="lg" className="h-12 px-8 text-base shadow-xl">
                    Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Bot className="h-5 w-5 text-primary" />
            <span>MeetAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MeetAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
