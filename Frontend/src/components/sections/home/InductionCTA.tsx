// src/components/sections/home/InductionCTA.tsx
import { Button } from "@/components/ui/button"

export default function InductionCTA() {
  return (
    <section className="section">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-8 shadow-glow">
          <div aria-hidden className="absolute -inset-1 bg-glow blur-2xl opacity-40" />
          <div className="relative">
            <h2 className="headline text-3xl sm:text-4xl">Ready to Join?</h2>
            <p className="mt-3 text-muted max-w-2xl">
              Inductions for second-year students are opening soon. Secure your
              spot, choose your track, and start building with Flux.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-primary text-black hover:brightness-110">
                <a href="/join">Apply Now</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
