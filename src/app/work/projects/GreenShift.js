import SectionHeading from "../SectionHeading";

export default function GreenShift() {
    return (
        <div className="mt-4 space-y-6">
            <div className="mb-6">
                <SectionHeading>The Project</SectionHeading>
                <p className="font-body font-light">
                    FinSight is a tool to help identify which neighborhoods are at risk of unsustainable gentrification; so that policymakers, developers, and communities can make smarter, more just decisions.
                </p>
            </div>
            <div className="mb-6">
                <SectionHeading>Technical Overview</SectionHeading>
                <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
                    <li>Gemini for calculating the risk of gentrification</li>
                    <li>Flask for the back-end</li>
                    <li>Reach for designing the website</li>
                </ul>
            </div>
            <div className="mb-6">
                <SectionHeading>Thoughts</SectionHeading>
                <p className="font-body mb-6 font-light">
                    Going into my first hackathon, I was completely lost ~ especially after both of my teammates were rejected. I ended up joining a group of other first-timers, and we got inspired by a Deloitte event on sustainability. Motivated by the idea (and the prize: a Snorlax plushie), we built a map that analyzed Toronto neighborhoods based on sustainability factors.

                    Most of us were new to coding, so it was a learning experience from start to finish. One of our biggest challenges was finding reliable open data, but in the process, we learned a lot about sustainability and urban planning, stuff we would have never considered before. Even though we didn’t win the cute Snorlax plushie, working with such a fun and curious team made the whole experience unforgettable.
                </p>
            </div>
        </div>
    );
}