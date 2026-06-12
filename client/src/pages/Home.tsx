import React from "react";
import portfolioData from "../data/portfolio.json";
import {
  Music,
  BookOpen,
  History,
  Award,
  Disc,
  Sliders,
  Activity,
  Compass,
  Layers,
  Waves,
  Wrench,
  BookMarked,
  Search,
  Link as LinkIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HERO_BANNER_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663278990076/czGJvccAQVkKBwvsWi3BUH/hero_banner-ZUJZndfy9nWXxk7HUooBnn.webp";

type SourceLink = { label: string; url: string };

function Sources({ items }: { items?: SourceLink[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-6 border-t border-border/40 pt-4">
      <div className="flex items-center gap-2 mb-2">
        <LinkIcon className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-accent font-bold">Sources</span>
      </div>
      <ul className="space-y-2">
        {items.map((s, i) => (
          <li key={i} className="leading-snug">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary dark:text-accent hover:underline font-medium"
            >
              {s.label}
            </a>
            <span className="block font-mono text-[10px] text-muted-foreground break-all">{s.url}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <div className="flex justify-center mb-3">
        <Icon className="h-8 w-8 text-accent" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary">{title}</h2>
    </div>
  );
}

export default function Home() {
  const d = portfolioData;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-accent" />
            <span className="font-serif text-xl font-bold tracking-tight text-primary">{d.title}</span>
          </div>
          <Badge variant="outline" className="border-accent/40 text-accent font-mono text-xs">
            {d.author}
          </Badge>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-black text-white py-28 md:py-40">
        <div className="absolute inset-0 z-0 opacity-45">
          <img src={HERO_BANNER_URL} alt="Acoustic guitar" className="h-full w-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30 z-10" />
        <div className="container relative z-20 max-w-4xl text-center">
          <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-md">
            {d.title}
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-stone-200 italic mt-6">{d.author}</p>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-16">
        {/* 1. Historical Background */}
        <section className="container mb-20">
          <SectionHeader icon={History} title="Historical Background" />
          <div className="space-y-8 max-w-5xl mx-auto">
            {d.eras.map((era, idx) => (
              <Card key={era.id} className="purfling-border bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className={`md:col-span-1 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                    <img src={era.image} alt={era.imageAlt} className="h-56 md:h-full w-full object-cover" />
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest font-bold">{era.period}</span>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-foreground/90">{era.details}</p>
                    <p className="mt-3 font-mono text-[10px] text-muted-foreground">{era.imageCaption}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="max-w-5xl mx-auto">
            <Sources items={d.historySources} />
          </div>
        </section>

        {/* 2. Influential Artists */}
        <section className="bg-card py-16 md:py-20 border-y border-border">
          <div className="container max-w-5xl">
            <SectionHeader icon={Award} title="Influential Artists" />
            <div className="space-y-14">
              {d.artists.map((artist) => (
                <div key={artist.name} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                      <img src={artist.image} alt={artist.name} className="w-full h-72 lg:h-80 object-cover object-top" />
                    </div>
                    <p className="mt-2 font-mono text-[10px] text-muted-foreground">{artist.imageCredit}</p>
                  </div>
                  <div className="lg:col-span-8">
                    {artist.years ? (
                      <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">{artist.years}</span>
                    ) : null}
                    <h3 className="font-serif text-3xl font-bold text-primary leading-tight">{artist.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-foreground/90">{artist.bio}</p>
                    <Sources items={artist.sources} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Significant Recordings */}
        <section className="container py-20 max-w-5xl">
          <SectionHeader icon={Disc} title="Significant Recordings" />
          <div className="space-y-8">
            {d.recordings.map((album, idx) => (
              <Card key={idx} className="purfling-border bg-card/40 backdrop-blur-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <img src={album.image} alt={album.title} className="h-56 md:h-full w-full object-cover" />
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30">{album.year}</Badge>
                      <span className="font-serif italic text-base text-muted-foreground">{album.artist}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-primary mt-2">{album.title}</h3>
                    <div className="mt-3 inline-block bg-muted/50 px-3 py-1 rounded text-xs font-mono">
                      <span className="text-accent font-bold">Key Track:</span> “{album.keyTrack}”
                    </div>
                    <p className="mt-4 text-sm md:text-base text-foreground/90 leading-relaxed">{album.significance}</p>
                    <p className="mt-3 font-mono text-[10px] text-muted-foreground">{album.imageCaption}</p>
                    <Sources items={album.sources} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Characteristic Techniques */}
        <section className="bg-card py-16 md:py-20 border-t border-border">
          <div className="container max-w-5xl">
            <SectionHeader icon={Sliders} title="Characteristic Techniques" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* PIMA card */}
              <Card className="lg:col-span-5 purfling-border bg-card/60 overflow-hidden">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="font-serif text-xl text-primary flex items-center gap-2">
                    <Layers className="h-5 w-5 text-accent" /> The PIMA Fingering System
                  </CardTitle>
                  <CardDescription className="font-sans text-xs">
                    The foundational classical shorthand for the picking-hand fingers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {d.pima.map((f) => (
                    <div key={f.letter} className="flex items-start gap-4 bg-muted/40 p-3 rounded border-l-2 border-accent">
                      <span className="font-mono text-xl font-bold text-accent w-5">{f.letter}</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm">{f.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{f.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* technique list + image */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {d.techniques.map((tech, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-background border border-border/60">
                    <h3 className="font-serif text-lg font-bold text-primary mb-2">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                  </div>
                ))}
                <figure className="rounded-lg overflow-hidden border border-border">
                  <img src={d.techniqueImage} alt="Fingerpicking hand position" className="w-full h-48 object-cover" />
                  <figcaption className="px-3 py-2 font-mono text-[10px] text-muted-foreground bg-card">{d.techniqueImageCaption}</figcaption>
                </figure>
              </div>
            </div>
            <Sources items={d.techniqueSources} />
          </div>
        </section>

        {/* 5. Stylistic Traits */}
        <section className="container py-20 max-w-5xl">
          <SectionHeader icon={Waves} title="Rhythmic, Harmonic & Stylistic Traits" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {d.stylisticTraits.map((trait, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-card border border-border/60 flex gap-4">
                  <span className="font-mono text-sm text-accent font-bold pt-1">{String(idx + 1).padStart(2, "0")}</span>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{trait}</p>
                </div>
              ))}
            </div>
            <figure className="lg:col-span-1 rounded-lg overflow-hidden border border-border">
              <img src={d.stylisticImage} alt="Guitar headstock and tuners" className="w-full h-64 lg:h-full object-cover" />
              <figcaption className="px-3 py-2 font-mono text-[10px] text-muted-foreground bg-card">{d.stylisticImageCaption}</figcaption>
            </figure>
          </div>
          <Sources items={d.stylisticSources} />
        </section>

        {/* 6. Practice Strategies */}
        <section className="bg-card py-16 md:py-20 border-y border-border">
          <div className="container max-w-5xl">
            <SectionHeader icon={Activity} title="Practice Strategies & Technical Exercises" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                {d.practice.map((p, idx) => (
                  <Card key={idx} className="purfling-border bg-background">
                    <CardContent className="p-6 space-y-4">
                      <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{p.text}</p>
                      {p.tab ? (
                        <pre className="p-5 rounded bg-stone-950 text-stone-200 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed border border-stone-800">
                          {p.tab}
                        </pre>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
                <Sources items={d.practiceSources} />
              </div>
              <div className="lg:col-span-4 space-y-4">
                <figure className="rounded-lg overflow-hidden border border-border">
                  <img src={d.practiceImage} alt="Metronome" className="w-full h-56 object-cover" />
                  <figcaption className="px-3 py-2 font-mono text-[10px] text-muted-foreground bg-background">{d.practiceImageCaption}</figcaption>
                </figure>
                <figure className="rounded-lg overflow-hidden border border-border">
                  <img src={d.practiceImage2} alt="Guitar etude sheet music" className="w-full h-56 object-cover" />
                  <figcaption className="px-3 py-2 font-mono text-[10px] text-muted-foreground bg-background">{d.practiceImage2Caption}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Equipment & Tone */}
        <section className="container py-20 max-w-5xl">
          <SectionHeader icon={Wrench} title="Equipment & Tone" />
          <div className="space-y-8">
            {d.equipment.map((item, idx) => (
              <Card key={idx} className="purfling-border bg-card/50 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className={`md:col-span-1 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                    <img src={item.image} alt="" className="h-56 md:h-full w-full object-cover" />
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{item.text}</p>
                    <p className="mt-3 font-mono text-[10px] text-muted-foreground">{item.imageCaption}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Sources items={d.equipmentSources} />
        </section>

        {/* 8. Personal Reflection */}
        <section className="bg-card py-16 md:py-20 border-y border-border">
          <div className="container max-w-3xl">
            <SectionHeader icon={BookMarked} title="Personal Reflection" />
            <Card className="purfling-border bg-background">
              <CardContent className="p-6 md:p-10">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  {d.reflection}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 9. Glossary */}
        <section className="container py-20 max-w-5xl">
          <SectionHeader icon={Search} title="Musical Vocabulary" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.glossary.map((item, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-card border-l-4 border-secondary border border-border/60">
                <h3 className="font-serif text-lg font-bold text-primary mb-2">{item.term}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
          <Sources items={d.vocabSources} />
        </section>

        {/* 10. Learning Resources */}
        <section className="bg-card py-16 md:py-20 border-t border-border">
          <div className="container max-w-4xl">
            <SectionHeader icon={BookOpen} title="Tutorials & Learning Resources" />
            <div className="space-y-4">
              {d.resources.map((r, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-background border border-border/60">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg font-bold text-primary hover:underline inline-flex items-center gap-2"
                  >
                    <Compass className="h-4 w-4 text-accent" /> {r.name}
                  </a>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.focus}</p>
                  <span className="block mt-1 font-mono text-[10px] text-muted-foreground break-all">{r.url}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container text-center space-y-3">
          <div className="flex justify-center items-center gap-2">
            <Music className="h-5 w-5 text-accent" />
            <span className="font-serif text-lg font-bold text-primary">{d.title}</span>
          </div>
          <p className="text-sm text-muted-foreground">{d.author} · Style Research Portfolio &amp; Musicianship Resource Package</p>
        </div>
      </footer>
    </div>
  );
}
