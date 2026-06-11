import React, { useState, useMemo } from "react";
import portfolioData from "../data/portfolio.json";
import { 
  Music, 
  BookOpen, 
  History, 
  Award, 
  Disc, 
  Sliders, 
  Activity, 
  FileText, 
  Compass, 
  Search, 
  ChevronRight, 
  Play, 
  Volume2, 
  Layers, 
  Sun, 
  Moon, 
  Sparkles,
  ArrowRight,
  BookMarked,
  Flame,
  ExternalLink,
  Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// High-quality compressed asset URLs generated earlier
const HERO_BANNER_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663278990076/czGJvccAQVkKBwvsWi3BUH/hero_banner-ZUJZndfy9nWXxk7HUooBnn.webp";
const WOOD_TEXTURE_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663278990076/czGJvccAQVkKBwvsWi3BUH/acoustic_texture-mX4vbMK2smnB5ewtLjQKTa.webp";

export default function Home() {
  const [selectedEra, setSelectedEra] = useState(portfolioData.eras[0].id);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(portfolioData.artists[0].name);
  const [selectedListeningGuide, setSelectedListeningGuide] = useState(0);
  const [isPlayingGuide, setIsPlayingGuide] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Print mode (?print=1): expand every section and hide all interactive controls so the
  // page renders as a single, fully-viewable document for PDF export.
  const printMode =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("print") === "1";

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Filter glossary based on search
  const filteredGlossary = useMemo(() => {
    if (!glossarySearch) return portfolioData.glossary;
    return portfolioData.glossary.filter(
      (item) =>
        item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
    );
  }, [glossarySearch]);

  // Handle playing simulated audio examples
  const playAudioExample = (title: string, videoUrl?: string) => {
    if (isPlayingGuide === title) {
      setIsPlayingGuide(null);
      toast.info(`Paused listening guide annotation: ${title}`);
    } else {
      setIsPlayingGuide(title);
      toast.success(`Playing annotated guide: ${title}. Feel free to watch the actual video via the link!`);
      if (videoUrl) {
        window.open(videoUrl, "_blank");
      }
    }
  };

  // Shared exercise card — rendered inside tabs (interactive) or stacked (print mode).
  const renderExerciseCard = (ex: any) => (
    <Card key={ex.id} className="purfling-border bg-card/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold">Progressive Exercise {ex.id}</span>
            <CardTitle className="font-serif text-2xl mt-1 text-primary dark:text-accent">{ex.name}</CardTitle>
          </div>
          <Badge className="font-mono text-xs bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent border-accent/20">
            Chord: {ex.chord}
          </Badge>
        </div>
        <CardDescription className="text-sm font-sans mt-2">{ex.objective}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="font-mono text-[10px] uppercase border-accent/30 text-accent">Tablature Guide</Badge>
          </div>
          <pre className="p-6 rounded bg-stone-950 text-stone-200 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed shadow-inner border border-stone-800">
            {ex.tab}
          </pre>
        </div>
        <div className="bg-muted/40 p-5 rounded-lg border-l-4 border-accent space-y-2">
          <h4 className="font-serif font-bold text-sm flex items-center gap-2 text-primary dark:text-accent">
            <Compass className="h-4 w-4" /> Practice Methodology
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            {ex.instructions}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? "dark bg-background text-foreground" : "bg-background text-foreground"}`}>
      
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-accent" />
            <span className="font-serif text-xl font-bold tracking-tight text-primary dark:text-accent">
              Fingerstyle Guitar Research
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex border-accent/40 text-accent font-mono text-xs">
              Musicianship Package
            </Badge>
          </div>
          
          {!printMode && (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-muted-foreground hover:text-foreground"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                className="hidden md:inline-flex font-mono text-xs border-primary/20 hover:border-primary/50"
                onClick={() => toast.success("Portfolio Document exported successfully to local workspace!")}
              >
                <FileText className="mr-2 h-4 w-4" /> Download PDF Draft
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden border-b border-border bg-black text-white py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img 
            src={HERO_BANNER_URL} 
            alt="Premium Handmade Acoustic Guitar in Luthier Workshop" 
            className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        
        <div className="container relative z-20 max-w-4xl text-center">
          <Badge className="mb-4 bg-accent hover:bg-accent/90 text-accent-foreground font-mono px-3 py-1 text-xs uppercase tracking-widest">
            Style Research Portfolio
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-sm">
            {portfolioData.title}
          </h1>
          <p className="font-serif text-lg md:text-xl text-stone-200 italic mb-8 max-w-2xl mx-auto">
            &ldquo;{portfolioData.subtitle}&rdquo;
          </p>
          <p className="text-sm md:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed font-sans mb-8">
            {portfolioData.overview}
          </p>
          
          {!printMode && (
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#eras">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-serif text-base px-6 py-5 h-auto rounded-none purfling-border">
                  Explore Eras <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#exercises">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-mono text-sm px-6 py-5 h-auto rounded-none">
                  Interactive Exercises
                </Button>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Core Interactive Learning Content */}
      <main className="flex-1 py-12 md:py-16">
        
        {/* Section 1: Eras Explorer */}
        <section id="eras" className="container mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <History className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Historical Timeline & Eras</h2>
            <p className="text-muted-foreground">
              Explore the evolution of fingerstyle guitar, from classical renaissance lute transcriptions to modern percussive fretboard tapping.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Era Tabs Selector */}
            <div className={`lg:col-span-4 flex flex-col gap-2 ${printMode ? "hidden" : ""}`}>
              {portfolioData.eras.map((era) => (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(era.id)}
                  className={`text-left p-5 transition-all duration-200 border-l-4 rounded-r-lg ${
                    selectedEra === era.id
                      ? "border-accent bg-card shadow-sm pl-6"
                      : "border-transparent hover:border-accent/40 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">{era.period}</span>
                    <ChevronRight className={`h-4 w-4 text-accent/50 transition-transform ${selectedEra === era.id ? "translate-x-1" : ""}`} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-accent">{era.name}</h3>
                </button>
              ))}
            </div>

            {/* Selected Era Detail Panel */}
            <div className={printMode ? "lg:col-span-12 space-y-6" : "lg:col-span-8"}>
              {portfolioData.eras.map((era) => {
                if (!printMode && era.id !== selectedEra) return null;
                return (
                  <Card key={era.id} className="purfling-border bg-card/50 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="border-b border-border/40 pb-6">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <span className="font-mono text-xs text-accent uppercase tracking-widest font-bold">{era.period} Era</span>
                          <CardTitle className="font-serif text-2xl md:text-3xl mt-1 text-primary dark:text-accent">{era.name}</CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {era.tunings.map((tuning, idx) => (
                            <Badge key={idx} variant="secondary" className="font-mono text-xs">{tuning}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div>
                        <h4 className="font-mono text-xs uppercase text-muted-foreground tracking-wider mb-2">Key Historical Pioneers</h4>
                        <div className="flex flex-wrap gap-2">
                          {era.pioneers.map((pioneer, idx) => (
                            <Badge key={idx} variant="outline" className="border-accent/30 text-foreground font-serif px-3 py-1 text-sm italic">
                              {pioneer}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-mono text-xs uppercase text-muted-foreground tracking-wider">Characteristic Style Traits</h4>
                        <p className="font-serif text-lg text-primary dark:text-accent-foreground italic leading-relaxed">
                          &ldquo;{era.characteristics}&rdquo;
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border/20">
                        <h4 className="font-mono text-xs uppercase text-muted-foreground tracking-wider">Historical Context & Analysis</h4>
                        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                          {era.details}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Influential Artists */}
        <section className="bg-card py-16 md:py-20 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex justify-center mb-3">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Influential Performers & Composers</h2>
              <p className="text-muted-foreground">
                Profiles of the pioneers who revolutionized guitar techniques and established fingerstyle as an orchestral solo medium.
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ${printMode ? "hidden" : ""}`}>
              {portfolioData.artists.map((artist) => (
                <Button
                  key={artist.name}
                  variant={selectedArtist === artist.name ? "default" : "outline"}
                  onClick={() => setSelectedArtist(artist.name)}
                  className={`py-6 h-auto rounded-none font-serif text-base ${
                    selectedArtist === artist.name 
                      ? "bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground" 
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {artist.name}
                </Button>
              ))}
            </div>

            {portfolioData.artists.map((artist) => {
              if (!printMode && artist.name !== selectedArtist) return null;
              return (
                <div key={artist.name} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8 ${printMode ? "mb-16 pb-12 border-b border-border/40 last:border-b-0 last:mb-0 last:pb-0" : ""}`}>
                  <div className={`lg:col-span-5 rounded-lg border border-border max-w-sm mx-auto lg:mx-0 w-full ${printMode ? "hidden" : "relative overflow-hidden aspect-square"}`}>
                    <img
                      src={WOOD_TEXTURE_URL}
                      alt="Acoustic Wood Pattern"
                      className={`absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-40 mix-blend-overlay ${printMode ? "hidden" : ""}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-accent/10 ${printMode ? "hidden" : ""}`} />
                    <div className={`flex flex-col justify-center items-center p-8 text-center z-10 ${printMode ? "" : "absolute inset-0"}`}>
                      <Music className={`h-12 w-12 text-accent mb-4 ${printMode ? "" : "animate-pulse"}`} />
                      <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-1">{artist.years}</span>
                      <h3 className="font-serif text-3xl font-bold text-primary dark:text-accent mb-2">{artist.name}</h3>
                      <p className="font-serif italic text-muted-foreground text-lg mb-4">{artist.title}</p>
                      
                      <div className="flex flex-col gap-2 w-full items-center">
                        <Badge variant="outline" className="border-accent/40 text-accent font-mono text-xs mb-2">
                          Signature Track: &ldquo;{artist.signatureTrack}&rdquo;
                        </Badge>
                        {artist.videoUrl && (
                          <a href={artist.videoUrl} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
                            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs rounded-none">
                              <Youtube className="mr-2 h-4 w-4" /> Watch Performance Video
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`space-y-4 ${printMode ? "lg:col-span-12" : "lg:col-span-7"}`}>
                    {printMode && (
                      <div className="border-b border-border/40 pb-4 mb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">{artist.years}</span>
                        <h3 className="font-serif text-3xl font-bold text-primary dark:text-accent leading-tight">{artist.name}</h3>
                        <p className="font-serif italic text-muted-foreground text-lg mb-2">{artist.title}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <span className="font-mono text-xs text-accent">Signature Track: &ldquo;{artist.signatureTrack}&rdquo;</span>
                          {artist.videoUrl && (
                            <a href={artist.videoUrl} className="font-mono text-xs text-accent underline">
                              ▶ Watch: {artist.videoUrl}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Artistic Impact & Legacy</h4>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed font-serif italic text-foreground/90 bg-muted/40 p-6 rounded-lg border-l-4 border-accent">
                      &ldquo;{artist.bio}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Landmark Recordings */}
        <section className="container py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <Disc className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Significant Landmark Recordings</h2>
            <p className="text-muted-foreground">
              A curated musicological listening list showcasing key milestones in the development of solo fingerstyle acoustic guitar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.recordings.map((album, idx) => (
              <Card key={idx} className="bg-card/40 backdrop-blur-sm hover:shadow-md transition-all duration-300 border border-border/60 flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="font-mono text-xs text-accent border-accent/30">{album.year}</Badge>
                    <Disc className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="font-serif text-xl font-bold text-primary dark:text-accent line-clamp-2">{album.title}</CardTitle>
                  <CardDescription className="font-serif italic text-base">{album.artist}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-3 rounded text-xs font-mono flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-bold">Key Track:</span>
                      <span>&ldquo;{album.keyTrack}&rdquo;</span>
                    </div>
                    {album.spotifyUrl && (
                      <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-0.5 text-[10px]">
                        Listen <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {album.significance}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 4: Characteristic Techniques */}
        <section className="bg-card py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex justify-center mb-3">
                <Sliders className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Characteristic Guitar Techniques</h2>
              <p className="text-muted-foreground">
                An analysis of the core mechanics and hand coordination practices that form the foundation of fingerstyle musicianship.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: PIMA Interactive Hand Diagram Card */}
              <Card className="lg:col-span-5 purfling-border bg-card/60 flex flex-col justify-between overflow-hidden">
                <CardHeader className="bg-primary/5 dark:bg-accent/5 pb-4">
                  <CardTitle className="font-serif text-xl text-primary dark:text-accent flex items-center gap-2">
                    <Layers className="h-5 w-5 text-accent" /> Picking Hand Designations (PIMA)
                  </CardTitle>
                  <CardDescription className="font-sans text-xs">
                    Classical Spanish terminology used globally to annotate fingerpicking tabs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-muted/40 p-3 rounded border-l-2 border-accent">
                      <span className="font-mono text-xl font-bold text-accent">p</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm">Pulgar (Thumb)</h4>
                        <p className="text-xs text-muted-foreground">Drives the alternating bassline on strings 6, 5, and 4.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-muted/40 p-3 rounded border-l-2 border-accent">
                      <span className="font-mono text-xl font-bold text-accent">i</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm">Índice (Index Finger)</h4>
                        <p className="text-xs text-muted-foreground">Plucks inner harmony and arpeggio notes on string 3.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-muted/40 p-3 rounded border-l-2 border-accent">
                      <span className="font-mono text-xl font-bold text-accent">m</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm">Medio (Middle Finger)</h4>
                        <p className="text-xs text-muted-foreground">Weaves inner harmony or melodic lines on string 2.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-muted/40 p-3 rounded border-l-2 border-accent">
                      <span className="font-mono text-xl font-bold text-accent">a</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm">Anular (Ring Finger)</h4>
                        <p className="text-xs text-muted-foreground">Sings out the primary treble melody on string 1.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column: Techniques List */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {portfolioData.techniques.map((tech, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-card border border-border/60 hover:border-accent/40 transition-colors">
                    <h3 className="font-serif text-lg font-bold text-primary dark:text-accent mb-2">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{tech.description}</p>
                    <div className="text-xs font-mono text-accent bg-muted/40 p-2 rounded flex items-center gap-2">
                      <span className="font-bold uppercase text-[10px] tracking-wider">Practice Strategy:</span>
                      <span>{tech.practice}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Section: Rhythmic, Harmonic & Stylistic Traits */}
        <section className="container py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <Music className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Rhythmic, Harmonic &amp; Stylistic Traits</h2>
            <p className="text-muted-foreground">
              The recurring rhythmic, harmonic, and textural fingerprints that give fingerstyle guitar its identity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.stylisticTraits.map((trait, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-card border border-border/60 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-accent font-bold">{String(idx + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-accent">{trait.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{trait.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Interactive Practice Guides & Exercises */}
        <section id="exercises" className="container py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <Activity className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Interactive Practice Exercises</h2>
            <p className="text-muted-foreground">
              Develop finger independence and thumb coordination with these interactive academic tablature guides.
            </p>
          </div>

          {printMode ? (
            <div className="space-y-8">
              {portfolioData.exercises.map((ex) => renderExerciseCard(ex))}
            </div>
          ) : (
            <Tabs defaultValue="ex-1" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-transparent h-auto mb-8">
                {portfolioData.exercises.map((ex) => (
                  <TabsTrigger
                    key={ex.id}
                    value={`ex-${ex.id}`}
                    className="py-3 font-serif border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-accent dark:data-[state=active]:text-accent-foreground rounded-none"
                  >
                    {ex.name.split(":")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {portfolioData.exercises.map((ex) => (
                <TabsContent key={ex.id} value={`ex-${ex.id}`} className="space-y-6">
                  {renderExerciseCard(ex)}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </section>

        {/* Section 6: Annotated Listening Guides — hidden (not part of the source research draft) */}
        {!printMode && portfolioData.listeningGuides.length > 0 && (
        <section className="bg-card py-16 md:py-20 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex justify-center mb-3">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Annotated Listening Playlists</h2>
              <p className="text-muted-foreground">
                In-depth musicological analyses and structural timelines of studied fingerstyle masterpieces.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Selector */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {portfolioData.listeningGuides.map((guide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedListeningGuide(idx)}
                    className={`p-5 text-left border transition-all rounded-lg ${
                      selectedListeningGuide === idx
                        ? "border-accent bg-background shadow-sm"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedListeningGuide === idx ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                        <Volume2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-primary dark:text-accent">{guide.title}</h3>
                        <p className="text-xs text-muted-foreground">{guide.artist}</p>
                      </div>
                    </div>
                  </button>
                ))}

                <Card className="mt-4 bg-muted/30 border border-border/60">
                  <CardContent className="p-5 text-center space-y-4">
                    <Flame className="h-8 w-8 text-accent mx-auto animate-pulse" />
                    <h4 className="font-serif font-bold text-sm">Interactive Listening Tip</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Click the simulated play buttons in the timelines to trigger annotated highlights corresponding to each section's structural changes.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Detailed Analysis */}
              <div className="lg:col-span-8">
                {portfolioData.listeningGuides.map((guide, idx) => {
                  if (idx !== selectedListeningGuide) return null;
                  return (
                    <Card key={idx} className="purfling-border bg-card/40">
                      <CardHeader className="border-b border-border/40 pb-6">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div>
                            <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold">{guide.genre}</span>
                            <CardTitle className="font-serif text-2xl md:text-3xl mt-1 text-primary dark:text-accent">{guide.title}</CardTitle>
                            <CardDescription className="font-serif italic text-base">{guide.artist}</CardDescription>
                          </div>
                          <Button 
                            onClick={() => playAudioExample(guide.title, guide.videoUrl)}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-mono text-xs"
                          >
                            <Play className="mr-2 h-4 w-4" /> 
                            {isPlayingGuide === guide.title ? "Pause Guide" : "Listen & Open Video Link"}
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs font-mono text-muted-foreground">
                          <div><span className="text-accent font-bold">Key/Tuning:</span> {guide.keyTuning}</div>
                          <div><span className="text-accent font-bold">Structure:</span> {guide.structure}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-muted/50 p-4 rounded-lg border-t-2 border-accent">
                            <h4 className="font-mono text-[10px] uppercase text-muted-foreground mb-1 font-bold">Rhythmic Analysis</h4>
                            <p className="text-xs text-foreground/80 leading-relaxed">{guide.rhythmAnalysis}</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg border-t-2 border-accent">
                            <h4 className="font-mono text-[10px] uppercase text-muted-foreground mb-1 font-bold">Harmonic Analysis</h4>
                            <p className="text-xs text-foreground/80 leading-relaxed">{guide.harmonicAnalysis}</p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg border-t-2 border-accent">
                            <h4 className="font-mono text-[10px] uppercase text-muted-foreground mb-1 font-bold">Stylistic Analysis</h4>
                            <p className="text-xs text-foreground/80 leading-relaxed">{guide.stylisticAnalysis}</p>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border/20">
                          <h4 className="font-mono text-xs uppercase text-muted-foreground tracking-wider font-bold">Annotated Performance Timeline</h4>
                          <div className="relative border-l-2 border-border pl-6 space-y-6">
                            {guide.timeline.map((item, tIdx) => (
                              <div key={tIdx} className="relative">
                                <div className="absolute -left-[31px] top-1 bg-background border border-accent rounded-full p-1 text-accent">
                                  <Volume2 className="h-3 w-3" />
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono text-xs font-bold text-accent bg-muted px-2 py-0.5 rounded">{item.time}</span>
                                  <span className="font-serif font-bold text-sm text-primary dark:text-accent">
                                    {item.description.split(":")[0]}
                                  </span>
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                  {item.description.split(":")[1]}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
        )}

        {/* Section: Equipment & Tone */}
        <section className="bg-card py-16 md:py-20 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex justify-center mb-3">
                <Sliders className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Equipment &amp; Tone</h2>
              <p className="text-muted-foreground">
                The instruments and tonal choices that shape the characteristic fingerstyle sound.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {portfolioData.equipment.map((item, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-background border border-border/60">
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-accent mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Personal Reflections */}
        <section className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex p-3 rounded-full bg-accent/10 text-accent">
                <BookMarked className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-primary dark:text-accent">
                Personal Reflections on Fingerstyle Learning
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A first-person reflection on my semester of learning fingerstyle guitar — from coordinating eyes, hands, and the page to building the steady muscle memory the style depends on.
              </p>
              <div className="border-l-4 border-accent pl-4 italic text-sm text-muted-foreground">
                &ldquo;Fingerstyle is less about rushing through the notes and much more about building a steady, reliable muscle memory.&rdquo;
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Card className="purfling-border bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:dark:text-accent first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                    {portfolioData.reflection}
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        {/* Section 8: Glossary Search & Vocabulary */}
        <section className="bg-card py-16 md:py-20 border-t border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex justify-center mb-3">
                <Search className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Academic Glossary of Terms</h2>
              <p className="text-muted-foreground">
                Search and study the academic, classical, and modern musical vocabulary connected to the fingerstyle guitar genre.
              </p>
            </div>

            {!printMode && (
              <div className="max-w-md mx-auto mb-10 relative">
                <Input
                  type="text"
                  placeholder="Search vocabulary (e.g., Apoyando, DADGAD, PIMA)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="pl-10 py-5 bg-background border-border/80 rounded-none focus-visible:ring-accent"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-background border border-border/60 hover:border-accent/30 transition-colors">
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-accent mb-2">{item.term}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
                </div>
              ))}
              {filteredGlossary.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground font-serif">
                  No matching vocabulary terms found. Try searching for other key terms.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 9: Curated Learning Resources */}
        <section className="container py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Curated Educational Resources</h2>
            <p className="text-muted-foreground">
              A comprehensive selection of professional method books, online channels, and interactive learning platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Method Books */}
            <Card className="purfling-border bg-card/30">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="font-serif text-lg text-primary dark:text-accent flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" /> Essential Method Books
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {portfolioData.resources.books.map((book, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="font-serif font-bold text-sm text-foreground">{book.title}</h4>
                    <p className="text-xs text-accent font-mono">By {book.author}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-1">{book.focus}</p>
                    {book.url && (
                      <a href={book.url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline flex items-center gap-0.5 font-mono">
                        View Resource <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* YouTube Channels */}
            <Card className="purfling-border bg-card/30">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="font-serif text-lg text-primary dark:text-accent flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-accent" /> Top Video Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {portfolioData.resources.youtube.map((chan, idx) => (
                  <div key={idx} className="space-y-1">
                    <a 
                      href={chan.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-serif font-bold text-sm text-primary dark:text-accent hover:underline flex items-center gap-1"
                    >
                      {chan.name} <ArrowRight className="h-3 w-3" />
                    </a>
                    <p className="text-xs text-muted-foreground leading-relaxed">{chan.focus}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interactive Platforms */}
            <Card className="purfling-border bg-card/30">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="font-serif text-lg text-primary dark:text-accent flex items-center gap-2">
                  <Compass className="h-5 w-5 text-accent" /> Interactive Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {portfolioData.resources.platforms.map((plat, idx) => (
                  <div key={idx} className="space-y-1">
                    <a 
                      href={plat.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-serif font-bold text-sm text-primary dark:text-accent hover:underline flex items-center gap-1"
                    >
                      {plat.name} <ArrowRight className="h-3 w-3" />
                    </a>
                    <p className="text-xs text-muted-foreground leading-relaxed">{plat.focus}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <Music className="h-5 w-5 text-accent" />
            <span className="font-serif text-lg font-bold text-primary dark:text-accent">
              Fingerstyle Guitar Research Portfolio
            </span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            A Style Research Portfolio &amp; Musicianship Resource Package on the fingerstyle guitar stream.
          </p>
          {!printMode && (
            <div className="flex justify-center gap-4 text-xs font-mono text-accent">
              <a href="#eras" className="hover:underline">Timeline</a>
              <span>&bull;</span>
              <a href="#exercises" className="hover:underline">Exercises</a>
            </div>
          )}
        </div>
      </footer>

    </div>
  );
}
