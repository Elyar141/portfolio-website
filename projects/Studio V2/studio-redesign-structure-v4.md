# Studio Redesign — case study structure v4

**Working titles:** *One Level Less* · *The App That Needed a Narrator*

**Spine:** The legacy app had two nearly identical levels and one tile shape for everything, so nobody could build a mental model of it without a person explaining. The redesign removed a level.

**Changed in v4:** real numbers from the matched recordings, context preservation added as the core claim on slide 7, no timing claims anywhere.

Blanks marked `[TK]` need a fact only you have.

---

## Slide 1 — Hook

**Headline**
Two levels of the product became one.

**Body**
Same task in both versions: you're in a company's Customers app, you need the same app in another company's project.

| | Before | After |
|---|---|---|
| Clicks | 7 | 3 |
| Levels climbed | 3 | 0 |
| Times you re-select the app you were already in | 1 | 0 |

**Media**
`[Still — new dashboard, full width]`

No timings anywhere. The legacy build has page transitions the new one doesn't, so any seconds comparison measures animation, not navigation.

---

## Slide 2 — Scope

**Headline**
A full redesign and rebuild of a live B2B content platform. Sole designer, [TK] years.

**Body**
- **Product:** Studio — [TK: one line on what it does and who uses it]
- **Owned:** information architecture, interaction design, visual system, design system, front-end implementation
- **Context:** pre-seed, live customers throughout, no downtime, feature set fixed
- **Team:** [TK: engineering setup / working relationship]

Not a 0-to-1. Studio existed, had customers, and had a feature set I didn't control.

---

## Slide 3 — The reveal

**Headline**
The same task, before.

**Media**
`[V1 walkthrough — trimmed to the crossing only]`
Nordwind Kaffee → Onlineshop → Customers → up to root → Bergmann Immobilien → Apps grid → Customers again.

**Caption**
Seven clicks, and the last one is re-opening the app you never meant to leave.

---

## Slide 4 — The diagnosis

**Headline**
One shape stood in for three different things.

**Body**
A tile was a company. A tile was a project. A tile was an app. Same size, same colour, uppercase label, no icon, no metadata. Nothing told you what you were about to click.

**Media**
`[Still A — legacy company page, tiles = projects]`
`[Still B — legacy project page, tiles = apps]`

---

## Slide 5 — The finding

**Headline**
Company level and project level looked identical and weren't.

**Body**
Both showed a grid headed "Apps". The project grid had eight tiles, the company grid had six. Nothing marked the difference. Users inferred their location from which tiles were missing.

**Media**
`[Still C — project Apps grid, 8 tiles]`
`[Still D — company Apps grid, 6 tiles]`
Same crop, differing tiles marked.

This is the credibility slide.

---

## Slide 6 — Constraints, and the bet

**Headline**
No research budget, no feature authority, live customers. So I changed the structure, not the features.

**Body**
- Sole designer
- Live throughout, no migration downtime
- Feature set fixed — not my call to change it
- No formal research; signal came from [TK: support tickets / sales demos / onboarding questions]

**The bet**
The problem wasn't what Studio could do. It was that its structure was invisible.

**Media**
None. Let this one be text.

---

## Slide 7 — What changed

**Headline**
One level, and a switcher that keeps you where you are.

**Body**
- **Project-first.** Projects are what people work in. Company became metadata on the card and a filter in the header.
- **Apps stopped being a destination.** One overlay holds both the current project's apps and every project, switchable in place. No page change on either axis.
- **Context survives the switch.** Change project from inside Customers and you land in the other project's Customers. Same screen, different data.
- **Cards carry information.** Name, company, actions, favourites.
- **Breadcrumbs became labeled regions and back-links.**

**Media**
`[V2 walkthrough — ends on Bergmann's customer list, header still reading "Customers"]`
`[Still E — All Projects panel open, Nordwind's list visible underneath]`
`[Still F — Apps panel, active and inactive states, "hide inactive" toggle]`

**Caption**
The switcher also says what a project actually has — inactive apps are visible but dimmed.

---

## Slide 8 — Surface area

**Headline**
The same model applied across every area of the product.

**Media**
`[Thumbnail grid, uniform crop]`
Dashboard · Projects · Customers · Team & permissions · Media · Publish · Lists · Hosting · Settings · App Store

**Caption**
Detail views became structured records — a customer now carries Structure, Lists, Files, Connected Accounts and Actions in one panel. Team gained a real permission model instead of a tile with nothing behind it.

No walkthrough. The grid proves range; the interview covers depth.

---

## Slide 9 — How it shipped, and where it is

**Headline**
Built and shipped by one person, structure first.

**Body**
Designed and built in Claude Code against a living design system, so it went to production instead of into a backlog waiting for dev capacity. [TK: what's live] is in production; [TK: what's pending] is still on the legacy shell. The main app is last on purpose — everything else inherits from the structure.

**Known gaps**
Page transitions aren't implemented yet. The legacy app handled motion better, and that's still owed.

**Media**
`[Optional — one frame of the design system reference]`

**Closing**
What I'd measure next: time to first published item, how often support is asked "where do I find…", and whether the switcher actually gets used or people still return to the dashboard.

**Link line**
The design system and the workflow behind it →

---

## Notes to self — not on the slides

**Never say 0-to-1.** "Redesign and rebuild of a live product" is accurate and, for mid-to-senior, the harder claim.

**If asked where the numbers come from.** Say it first: hand-counted from matched screen recordings of the same task, not instrumented analytics. Clicks and levels are countable and stable; timings aren't, which is why there are none.

**If asked about research.** No budget, no panel, pre-seed. Diagnosis came from [TK]. Then say what you'd have run given a week.

**Expect "why project-first?"** People don't log in to look at a company, they log in to work on a thing.

**Expect a question about slide 8.** One sentence ready per area: what it was, what it is now.

**Unfinished migration.** Sequencing is the answer, not an excuse.

**Tone on the legacy app.** Dry, never mocking. Naming what it did better (motion) buys credibility.

---

## Before you publish

- [ ] Check `localhost` is cropped from every clip and still
- [ ] Trim V1 to the crossing only
- [ ] Hold V2's final frame a beat so the data change registers before it loops
- [ ] MP4, not GIF
- [ ] Confirm no real personal data survives anywhere in the media
- [ ] Capture slide 8 thumbnails at one consistent viewport
- [ ] Archive every legacy screen before decommissioning
