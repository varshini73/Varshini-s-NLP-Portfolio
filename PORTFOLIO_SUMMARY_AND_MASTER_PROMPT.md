# Portfolio conversation summary & master prompt

## 1. Portfolio identity

**Title:** The NLP Academy Chronicles  
**Tagline:** One classroom. A thousand little memories.  
**Context:** An interactive NLP course portfolio about Varshini's semester and the learning, people, projects, and memories connected to the class at VIT Vellore.

This is not a conventional résumé portfolio, not a static slideshow, and not a series of separate pages that require pressing Next repeatedly. It should feel like a continuous anime-inspired illustrated storybook.

## 2. Visual direction

- Anime / hand-painted cartoon / warm illustrated storybook.
- Cozy classroom atmosphere, chalkboards, desks, books, sunlight, plants, handwritten doodles, speech bubbles and gentle decorative details.
- Warm cream, peach, muted rose, dusty blue, sage green, and chalkboard teal.
- Use expressive illustrations and scene transitions; avoid generic stock photos and generic dashboard cards.
- The homepage has one shared classroom background. Sharmila Banu Ma'am stands on the LEFT. Varshini is seated/leaning on the RIGHT. The centre is reserved for the title and entrance invitation.
- The two approved characters should remain recognisable and consistent across all illustrations.
- Varshini's face should follow her supplied reference photos. Her casual outfit should not be given jhumkas or traditional accessories unless the scene uses a traditional outfit from her supplied photo.
- Sharmila Banu Ma'am wears a hijab and usually a patterned churithar/salwar-style outfit, based on the supplied references.
- Do not make random outfit, accessory, face, age, or hairstyle changes between scenes.
- Do not copy protected cartoon characters or use copyrighted show logos/audio. This is an original anime-school universe.

## 3. Interaction and flow — most important requirement

The experience must be **fluid and continuous**, not a sequence of slides or page-by-page navigation.

Desired interaction:
1. Visitor lands on the illustrated homepage.
2. Visitor scrolls down or clicks “Enter the Storybook”.
3. The page smoothly scrolls into a short story introduction.
4. Story chapters unfold vertically in one continuous page.
5. Each chapter has an illustration, narration text, speech bubbles, and optional play control.
6. Scroll-triggered animation reveals text and illustrations naturally.
7. A slim progress indicator shows where the visitor is in the story.
8. A chapter rail or chapter index allows jumping to a section, but it must scroll smoothly, not load a new page.
9. NLP lessons and projects are part of the same continuous narrative, not unrelated dashboard pages.
10. The final letter is an emotional final scene with an envelope and the user's own voice recording later.

Use smooth scroll, Framer Motion `whileInView`, gentle parallax/reveal, sticky progress indicators, and soft section transitions. Avoid forced full-screen snap scrolling, “Next slide” UX, route changes for every story, abrupt page reloads, or a generic card-only layout.

## 4. Confirmed story order

This exact story order was requested by the user. Preserve it unless the user changes it:

1. My First Day
2. The Great Faculty Switch
3. The First Star
4. The Project That Surprised Everyone
5. Lessons from the Classroom
6. Adventures in the Computer Lab
7. Mission Health Map
8. A Letter of Gratitude

The user specifically asked to begin with joining the class, then faculty switch. Although some events may not be strictly chronological, this is the user's preferred narrative order.

### Story 1 — My First Day
User joins the NLP class. Details still to be supplied; do not invent first-day dialogue or feelings.

### Story 2 — The Great Faculty Switch
Initially Sharmila Banu Ma'am taught NLP. There was a management-related issue/change and another faculty member took over. Sharmila Ma'am challenged the decision and returned to the class. Present respectfully; do not villainise management or any faculty member.

### Story 3 — The First Star
Ma'am asked for a Tamil word of around four to five syllables. Varshini answered “பதினெண்கீழ்க்கணக்கு” and “பதினெண்மேல்கணக்கு”. Ma'am said “Excellent, Varshini!” and gave one individual star. This is distinct from the Health Map team's four stars.

### Story 4 — The Project That Surprised Everyone
Project title: “Culturally Grounded Retrieval of Classical Tamil Poetry from Modern Emotional Situations.”
The idea was selected while another faculty member was taking the class. When Sharmila Ma'am returned, Varshini was nervous about presenting it. Ma'am was impressed and appreciated the idea.
Approximate remembered quote from Ma'am:
“oru subject padicha andha subject la ena irukunu purunchukalam but oruthar ooda thaai mozhi padicha thaan vaazkaiya purunchuka mudiyum”
Approximate Tamil script:
“ஒரு subject படிச்சா அந்த subject-ல என்ன இருக்கு என்று புரிஞ்சுக்கலாம். ஆனால் ஒருத்தரோட தாய்மொழி படிச்சாதான் வாழ்க்கையைப் புரிஞ்சுக்க முடியும்.”
English rendering:
“Studying a subject helps us understand what that subject contains. But studying someone's mother tongue helps us understand life itself.”
This is a remembered approximate quote, not an official transcript. Ma'am said she could give the project 100 marks; present this as encouragement, not a formal awarded grade.

Known project approach:
Modern situation → emotion/situation understanding → Akam/Puram → Tinai → Uri → classical Tamil poetry retrieval → simple Tamil/English explanation.
Known pilot work: 399 Natrinai records, Project Madurai PM296; conservative annotations; keyword matching, TF-IDF fallback, emotion-aware reranking, user-constrained Tinai/Uri routing. The implementation did not use pretrained semantic embeddings in the reported version. Do not claim definitive retrieval evaluation metrics where not established.

### Story 5 — Lessons from the Classroom
The user wants the NLP concepts taught for CAT 1 and CAT 2, such as bigram, trigram, etc., presented as blackboard lessons. Current lesson examples are placeholders and must be aligned with the user's actual notes/syllabus before publication.

### Story 6 — Adventures in the Computer Lab
There were two hands-on laptop sessions. In one, Varshini told Vijay Krishnaa that the code classified Vijay Krishnaa as female; this led to an interaction with Ma'am. Do not infer the cause until the code is reviewed.
GitHub practical repository: https://github.com/varshini73/nlp
Contains `nlp1.ipynb` and `nlp2.ipynb`.

### Story 7 — Mission Health Map
After Sharmila Ma'am returned, she formed teams, changed seating, and asked teams to select project topics. Varshini asked which topic had been selected by the fewest teams. Ma'am appreciated the question and suggested Health Map. The team chose it and received four stars.
Health Map idea:
“A location-based, disease-aware healthcare recommendation system that identifies and ranks nearby healthcare facilities based on the user's location, disease-specific treatment capabilities, and travel accessibility.”
Research gaps:
- Disease-specific facility matching.
- Treatment availability / verified diagnostic and treatment capabilities.
- Travel accessibility using road distance and estimated travel time.
NLP elements:
- Named Entity Recognition.
- Information Extraction.
- Semantic Similarity.
- Text Classification.
Team members as supplied (numbering was skipped in original list; use names without numbering unless user confirms):
Kondrarajender, Thaaruni, Harishankar, Lokesh, Varshini, Sathya sree, Sharun.
Do not imply implementation or results; this is currently a project idea unless user supplies more.

### Final episode — A Letter of Gratitude
A heartfelt letter to Sharmila Banu Ma'am. The user will write/approve the text. They want to personally record their voice reading it. Do not fabricate the letter or recording.

## 5. Voice plan

For now leave the temporary browser text-to-speech narration in place. The user disliked the default voice but decided to keep it temporarily and record their own voice at the end.
- No need to record now.
- Do not force TTS as the final voice solution.
- Later replace chapter narration with the user's MP3 recordings.
- Final letter must use the user's actual recorded voice.
- Include subtitles/transcript, play/pause, optional mute, and never autoplay audio.

## 6. Technology preference

React + Vite + CSS, Framer Motion for transitions, Lucide icons, Vercel deployment. Familiar React/Vite experience. A backend is not required for the initial portfolio. Use one continuous page with anchors and scroll progress rather than multiple route pages.

## 7. Current implementation baseline

The Flow Edition source includes:
- Single long-form page, not separate episode routes.
- Anime-style homepage artwork.
- Smooth scroll anchors.
- Chapter progress rail and reading progress bar.
- Reveal animations via Framer Motion.
- Story scenes, blackboard lesson area, project exhibition, final letter scene.
- Temporary text-to-speech controls.
- Responsive CSS.

Known limitation: episode art panels are currently CSS-built stylised scene illustrations, not fully custom anime character illustrations in every scene. The next design phase should create separate scene illustrations with consistent characters and use them as chapter artwork.

## 8. Master prompt for continuing the project

You are helping build “The NLP Academy Chronicles”, an original anime-inspired interactive NLP course portfolio for Varshini. The portfolio must feel like a continuous illustrated storybook, not a slide deck, not a standard dashboard, and not a collection of separate pages with Next buttons.

Build one seamless, vertically flowing experience with smooth scroll, chapter anchors, subtle parallax, scroll-triggered scene reveals, speech bubbles, character illustrations, ambient classroom details, a chapter progress rail, and a top reading progress bar. The homepage has one shared classroom background, with Sharmila Banu Ma'am standing on the left and Varshini seated/leaning on the right; the centre is for the title and “Enter the Storybook”. Preserve the supplied character references and outfits consistently. Use an original anime/storybook style; do not copy protected show characters or logos.

Follow the exact story order: My First Day → The Great Faculty Switch → The First Star → The Project That Surprised Everyone → Lessons from the Classroom → Adventures in the Computer Lab → Mission Health Map → A Letter of Gratitude.

Include real, accurate NLP course content, project explanations, the GitHub notebooks link, and the Tamil poetry retrieval project. Clearly distinguish completed implementation from project ideas and do not invent quotes, marks, project results, or experiences. Health Map is a project idea unless the user confirms implementation. Keep temporary narration for now; the user will record their own voice later. The final letter must be written/approved by the user and read in their own recording.

Before changing architecture or style, preserve the user's decisions and ask only when a missing detail materially affects correctness. Deliver runnable code, complete project structure, and a downloadable ZIP. Test the production build if possible and clearly report any unverified parts.
