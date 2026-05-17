# Global Encounters — Application Platform Redesign
## Milestone 1 · April 2026 · iiTechSolutions


---

**CLIENT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **PLATFORM** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **SCOPE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **DELIVERABLE**

iiTechSolutions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Global Encounters &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UX concept redesign &nbsp;&nbsp;&nbsp;&nbsp; 6 screens, Figma prototype

---
---

## 01 — The Situation

**THE SITUATION**

### A programme application that felt like filing a form

The Global Encounters platform is where Ismaili community members apply for international programmes — Heritage Journeys, GE Camps, the Talent Institute, and facilitator roles. Despite the significance of these experiences, the application journey felt transactional. The existing platform presented information-heavy forms with no sense of destination, no progression, and no emotional connection to what applicants were signing up for. The redesign reimagines the full journey — from the login screen to deep inside the application form — as something that feels like the beginning of a journey, not an administrative task.

---

| | | |
|---|---|---|
| **1** | **No sense of destination** | The login screen and dashboard gave no visual signal of where the programme would take you. Photography — the primary communicator of aspiration — was absent. |
| **2** | **Forms with no progression** | Multi-step application forms presented all fields with no progress indicator, no sense of how far through the process the user was, and no moment of orientation at the start. |
| **3** | **Generic visual language** | Mulish Extra-light and rounded corners gave the platform a generic SaaS appearance that was at odds with the heritage and cultural character of the brand. |
| **4** | **No sub-brand differentiation** | Heritage Journeys, GE Camps, the Talent Institute, and other programmes were visually identical. No colour or identity signal distinguished one from another. |
| **5** | **Applicant selection was unclear** | Users applying on behalf of family members had no clear way to select who the application was for or to distinguish between existing in-progress applications and starting fresh. |
| **6** | **Dashboard mixed everything equally** | Programme content, tools, links, and personal account information competed at equal visual weight with no hierarchy between what the user should act on and what was simply available. |

---
---

## 02 — The Core Insight

**THE CORE INSIGHT**

> *"The platform should feel like the beginning of a journey, not like filing a form."*

Every decision flows from this. From the destination photograph on the login screen to the progress indicator that appears the moment you enter the form. The platform earns the user's anticipation before asking anything of them.

---
---

## 03 — The Six Screens

**SCREEN SEQUENCE**

The prototype covers the complete path from login to deep inside the Heritage Journeys application. Six screens, each with exactly one job.

---

### Screen 01 — Login

**One photograph. One form. One action.**

The login screen opens on a full-bleed image of the Amber Fort — a heritage destination that communicates scale and cultural significance before any text is read. A white form container sits centred over the photograph: email or username, country selector, password, and a single teal Continue button. Forgot password and create account links sit below the button as secondary actions. The photograph is not decoration. It is the first answer to the question every applicant is implicitly asking: *what is this for?*

**Key decisions**

→ Full-bleed destination photography as primary visual element  
→ White form container creates clear figure/ground separation over the image  
→ Country selector anticipates an international applicant base  
→ One primary action — Continue — no competing buttons at this stage  
→ Teal button is the only interactive colour on the screen  

---

### Screen 02 — Dashboard

**Two hero cards. Three list items. No clutter.**

The dashboard opens with a personal greeting — "Welcome Back Elshan Azadi / Explore programmes and manage your applications." Two hero programme cards with destination photography dominate the upper half: Heritage Journeys 2026 (Kenya · India · Pakistan · Egypt) and GE Camps 2026. Each card carries an Apply Here button. Below the hero cards, three text-link items handle the remaining programme types: Festival Registration, GE Talent Institute, GE Programmes. The visual distinction between hero cards and text items is the message — photography signals programmes worth dwelling on, text links signal utility.

**Key decisions**

→ Hero cards use the same destination photography logic as the login screen  
→ Apply Here button is the CTA on each card — not the whole card — registration is a deliberate action  
→ Festival Registration, Talent Institute, and GE Programmes as text links below — browse intent, not commit intent  
→ No navigation sidebar or tab structure — all programmes visible in a single scroll  

---

### Screen 03 — Select a Programme

**A list, not cards — the form communicates the function.**

The programme selection screen presents three options as a clean list: Heritage Journeys 2026, Global Encounters Programmes, and Global Encounters Facilitator. Each row has a coloured circle identifying the programme sub-brand, a title, a one-line description, and a right-facing arrow. Below the programme list, a Pending Applications section shows any applications already in progress — in this case Heritage Journeys 2026, last updated April 10, with a Resume button. The user never has to wonder whether they've started an application before.

**Key decisions**

→ List rows not cards — the sparse format communicates that this is a selection step, not a destination  
→ Sub-brand colour circles: Heritage Journeys terracotta, GE Programmes teal, Facilitator neutral  
→ Pending applications surfaced on the same screen — no dead-end "you already started this" error state  
→ Resume button allows continuation without hunting through account settings  

---

### Screen 04 — Who Is This Application For?

**One question. Two cards. No ambiguity.**

Before entering the form, the applicant is asked a single question: who is this application for? Two cards — one for the existing account holder (Elshan Azadi, Application in progress) and one for a New application (for a new participant or family member). The existing applicant card shows a status badge — Application in progress — and a last updated date. The Continue button remains inactive until a selection is made. This screen prevents form abandonment caused by confusion about whether to resume or start fresh.

**Key decisions**

→ One question per screen — the user is never asked to do two things at once  
→ Status badge on existing applicant card surfaces in-progress state immediately  
→ New application card uses a + icon — universally understood, no label needed  
→ Continue button inactive until selection is made — prevents accidental navigation  

---

### Screen 05 — Application Intro (Step 1 of 8: Participant Registration)

**Welcome. Destinations. Dates. Registration type.**

The first screen inside the Heritage Journeys form opens with an orientation moment: a welcome paragraph explaining that the application will guide the user through the registration process and that emergency contact and support information are available. Below, a table of available destinations with dates and prices: Kenya July 15–29 $2,850 / India August 5–19 $2,650 / Pakistan August 12–26 $2,450 / Egypt September 2–16 $2,750. A progress indicator sits at the top of the screen showing step position (1 of 8). At the bottom, two registration types: Individual application (for a single participant aged 18 or over) and Family application (for spouses, children, parents or siblings).

**Key decisions**

→ Progress indicator appears immediately on entering the form — the user knows the scope before committing  
→ Welcome paragraph is brief — one orientation beat, not a legal disclaimer  
→ All destinations and prices on one screen — the user can see the full option set before choosing  
→ Registration type selection before programme preference — who is applying shapes everything that follows  

---

### Screen 06 — Programme Information (Step 2 of 8)

**Preferences. Discovery. History.**

The second form screen captures programme preference (destination selection with prices shown on each card), an open text field for availability comments, referral source (Social media, Jamat Khana announcement, ITREB communication, Email newsletter, Friend or family member, GE Festival, Previous participant, Other), and prior programme participation (Heritage Journeys, GE Camps, Youth Leadership Programme, Global Encounters Festival, Service Learning, None). The screen is structured so related questions group naturally — preference at top, discovery in the middle, history at the bottom — without section headers that interrupt the form flow.

**Key decisions**

→ Destination preference shown as cards with prices — the user is choosing, not just confirming  
→ Free text field for availability comments prevents rigid destination selection causing drop-off  
→ Referral source checkboxes, not a dropdown — allows multiple channels, no single answer required  
→ Prior programme history directly shapes the application — surfaced here rather than buried in profile settings  

---
---

## 04 — Design System

**VISUAL LANGUAGE**

### Decisions that apply across every screen

---

**Typography — Cabinet Grotesk**

Geometric grotesque with warmth and character. Replaces the generic Mulish Extra-light used in the current platform. Close in spirit to the official ITC Avant Garde Gothic from the brand guide, but optimised for digital interfaces. Consistent across all six screens — the same typeface carries from the login screen into the deepest form step.

---

**Colour — Sub-brand system**

Each programme uses its official sub-brand colour as an accent. Heritage Journeys terracotta (#B83D26). GE Camps green. Talent Institute purple. Teal is used consistently for all interactive elements across the platform — buttons, links, progress indicators, and selection states. Sub-brand colours appear in programme identity markers (the coloured circles on the selection screen, card accents on the dashboard) but never on interactive controls, which remain teal throughout.

---

**Photography as primary element**

Destination photography is not decoration — it is context. The Amber Fort login image and the hero card photographs communicate what each programme feels like before the user reads a single word. Photography is used where dwell time is appropriate (login, dashboard hero cards) and withheld where speed is needed (programme selection list, form steps). The decision about where to use photography follows the user's intent at each point in the flow.

---

**No rounded corners**

Sharp edges throughout. An intentional editorial aesthetic that differentiates the platform from the generic rounded-corner SaaS look. Consistent with the cultural and heritage tone of the brand. Cards, form containers, buttons, and status badges all use 0px border-radius.

---

**Cream background (#F8F7F5)**

Warmer and more human than cold white. Connects the digital platform to the cultural themes of the brand. White is reserved for form containers and cards, creating clear hierarchy between page and content without using grey.

---

**One decision per screen**

Every screen in the redesigned flow has exactly one job. The login screen authenticates. The dashboard selects entry point. The programme selection names the destination. The applicant screen resolves who is applying. Step 1 orients and sets registration type. Step 2 captures preferences. Progressive disclosure replaces information overload — users are never asked to do two things at once.

---
---

## 05 — What This Milestone Established

**FOUNDATION**

Milestone 1 established the visual language, design system, and application flow logic that carries forward into subsequent platform work. The specific decisions that became fixed:

→ Cabinet Grotesk as the platform typeface  
→ Cream background (#F8F7F5), white card containers, dark text (#1A1A18 range)  
→ Sharp edges — no rounded corners anywhere in the system  
→ Teal as the universal interactive colour  
→ Sub-brand colour accents for programme identity, never for interactive controls  
→ Photography used at aspiration moments, withheld at utility moments  
→ One decision per screen as the structural principle for all multi-step flows  
→ Progress indicators on all multi-step form flows  

These decisions carried directly into Milestone 2 (IIUK Portal Dashboard Redesign), where the visual language was adapted for an institutional context — cream, sharp edges, white containers, and Cabinet Grotesk all unchanged; teal replaced by IIUK brand blue as the interactive accent.

---
---

*Global Encounters — Application Platform Redesign · Milestone 1*  
*iiTechSolutions engagement · April 2026*

**Elshan Azadi** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pixelandprompt.com
