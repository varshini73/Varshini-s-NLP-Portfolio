export const chapters = [
  {
    id: "01", slug: "first-day", title: "My First Day", kicker: "Every story has a beginning",
    subtitle: "A new subject, a new classroom, and the start of a semester.",
    symbol: "✿", tone: "peach",
    paragraphs: [
      "Every semester begins with a new classroom, new faces, and a subject waiting to be explored.",
      "This is where my NLP classroom story begins. The moments that followed turned an ordinary course into a collection of memories."
    ],
    dialogue: [{ who: "Narrator", line: "A new chapter begins. Welcome to the NLP classroom!" }],
    visual: "first-day"
  },
  {
    id: "02", slug: "faculty-switch", title: "The Great Faculty Switch", kicker: "An unexpected plot twist",
    subtitle: "A change in the classroom, and a familiar teacher's return.",
    symbol: "✦", tone: "blue",
    paragraphs: [
      "At first, Sharmila Banu Ma’am was teaching our NLP class. Then, following a management-related change, another faculty member took over.",
      "Sharmila Ma’am challenged the decision and eventually returned to our class. It felt like an unexpected plot twist in the middle of the semester."
    ],
    dialogue: [{ who: "Narrator", line: "Just when the class was settling into its rhythm, an unexpected change arrived." }, { who: "Narrator", line: "And then, our original teacher returned to the classroom." }],
    visual: "switch"
  },
  {
    id: "03", slug: "first-star", title: "The First Star", kicker: "A little classroom victory",
    subtitle: "Two Tamil literary terms. One moment I still remember.",
    symbol: "★", tone: "yellow",
    paragraphs: [
      "One day, Ma’am asked the class for a Tamil word of around four or five syllables.",
      "I answered with “பதினெண்கீழ்க்கணக்கு” and “பதினெண்மேல்கணக்கு”. Ma’am responded, “Excellent, Varshini!” and gave me my first individual star."
    ],
    dialogue: [{ who: "Ma’am", line: "Excellent, Varshini!" }, { who: "Narrator", line: "One small answer. One star. A moment I still remember." }],
    visual: "star"
  },
  {
    id: "04", slug: "tamil-poetry-project", title: "The Project That Surprised Everyone", kicker: "A project rooted in language",
    subtitle: "Connecting modern emotional situations with classical Tamil poetry.",
    symbol: "❧", tone: "lavender",
    paragraphs: [
      "During the period when another faculty member was handling the class, I selected a project idea: “Culturally Grounded Retrieval of Classical Tamil Poetry from Modern Emotional Situations.”",
      "When Sharmila Ma’am returned, I was nervous about presenting an idea chosen during her absence. I explained it to her, and she was impressed by the concept.",
      "She shared a thought about how learning a subject helps us understand that subject, while learning a person's mother tongue can help us understand life itself. She also said she could give the project 100 marks. I remember that encouragement as one of the highlights of the semester."
    ],
    dialogue: [{ who: "Narrator", line: "What if a modern feeling could lead someone back to a piece of classical Tamil poetry?" }],
    visual: "poetry"
  },
  {
    id: "05", slug: "classroom-lessons", title: "Lessons from the Classroom", kicker: "The blackboard years",
    subtitle: "The NLP concepts that filled our CAT 1 and CAT 2 notes.",
    symbol: "⌁", tone: "green",
    paragraphs: [
      "This chapter is the academic notebook of the semester. It collects the NLP concepts taught in class and the topics prepared for CAT 1 and CAT 2.",
      "Each lesson can become a small blackboard moment, with a definition, a worked example, and a short practice question."
    ],
    dialogue: [{ who: "Narrator", line: "Some memories are big events. Others are the concepts that slowly begin to make sense." }],
    visual: "lessons"
  },
  {
    id: "06", slug: "computer-lab", title: "Adventures in the Computer Lab", kicker: "Theory meets the screen",
    subtitle: "Two hands-on sessions, code, and an unexpected prediction.",
    symbol: "⌘", tone: "blue",
    paragraphs: [
      "We had two hands-on sessions where we worked on NLP tasks using our laptops.",
      "In one session, I told Vijay Krishnaa that my code had classified Vijay Krishnaa as female. That led to an interaction with Ma’am about the result.",
      "The exact code and its output will be added after reviewing the notebooks, so the explanation stays technically accurate."
    ],
    dialogue: [{ who: "Narrator", line: "The theory moved to our laptop screens. It was time to test what we had learned." }],
    visual: "lab",
    link: "https://github.com/varshini73/nlp"
  },
  {
    id: "07", slug: "health-map", title: "Mission Health Map", kicker: "A team, a topic, four stars",
    subtitle: "A question about the least-selected topic led to a team idea.",
    symbol: "⌖", tone: "peach",
    paragraphs: [
      "After Ma’am returned, she formed teams, changed the seating arrangement, and asked us to select project topics.",
      "I asked which topic had been selected by the fewest teams. Ma’am appreciated the question and suggested Health Map. Our team selected it, and Ma’am awarded our team four stars.",
      "Health Map is a location-based, disease-aware healthcare recommendation system. Its goal is to identify and rank nearby healthcare facilities using disease-specific treatment capabilities and travel accessibility."
    ],
    dialogue: [{ who: "Narrator", line: "A question about the least-selected topic led our team to Health Map." }],
    visual: "health"
  }
];

export const lessons = [
  ["Tokenisation", "Breaking text into smaller units such as words, subwords, or sentences.", "Natural Language Processing → [Natural] [Language] [Processing]"],
  ["Bigram", "A sequence of two consecutive tokens.", "I love NLP → [I love] [love NLP]"],
  ["Trigram", "A sequence of three consecutive tokens.", "I love NLP → [I love NLP]"],
  ["Named Entity Recognition", "Identifying named entities such as people, places, organisations, and dates.", "VIT Vellore → ORGANISATION / LOCATION (depending on annotation)"],
  ["Information Extraction", "Extracting structured facts from unstructured text.", "“Clinic offers MRI” → service: MRI"],
  ["Semantic Similarity", "Estimating how close two pieces of text are in meaning.", "“heart specialist” ≈ “cardiologist”"],
  ["Text Classification", "Assigning text to one or more predefined categories.", "A review → positive / neutral / negative"],
  ["TF–IDF", "A weighting scheme that highlights terms important to a document relative to a collection.", "A rare but relevant term can receive a higher weight."]
];

export const projects = [
  {
    title: "Culturally Grounded Retrieval of Classical Tamil Poetry from Modern Emotional Situations",
    kind: "Individual project",
    description: "A retrieval approach connecting a modern situation to emotion and the Akam/Puram framework, then routing towards Tinai, Uri, and relevant classical Tamil poetry.",
    stages: ["Modern situation", "Emotion & situation understanding", "Akam / Puram", "Tinai & Uri", "Poetry retrieval", "Simple explanation"],
    details: "The remembered implementation used a 399-record Natrinai pilot corpus, keyword matching, TF–IDF fallback, emotion-aware reranking and user-constrained Tinai/Uri routing. Evaluation metrics should only be published once the candidate sets are reviewed."
  },
  {
    title: "Health Map",
    kind: "Team project idea",
    description: "A location-based, disease-aware healthcare recommendation system designed to match a natural-language health query with suitable healthcare facilities and travel accessibility.",
    stages: ["User location & query", "Disease / service extraction", "Facility capability matching", "Travel accessibility", "Ranked recommendations"],
    details: "Research directions: disease-specific facility matching, treatment availability, and travel accessibility. NLP components: NER, information extraction, semantic similarity, and text classification. This is described as the project idea, not a completed implementation."
  }
];

export const letter = {
  salutation: "Dear Ma’am ❤️",
  paragraphs: [
    "I never expected an NLP class to leave me with so many memories that I would want to cherish forever.",
    "From the first star you gave me to the appreciation for my Tamil poetry project, your little words of encouragement have meant more to me than you probably realise.",
    "I'll always remember our classroom discussions, practical sessions, unexpected moments and even those four stars for Health Map!",
    "But beyond everything we learned, what I'll cherish most is how you encouraged me to think differently, explore my ideas and believe in myself.",
    "Thank you for making this semester so special, Ma’am. I may finish this course, but I'll carry these memories and your words with me for a long time.",
    "Some teachers become a chapter in our education. A few become a part of our story. You will always be one of those teachers for me. ❤️"
  ],
  signoff: "With lots of love and gratitude,",
  name: "Your student, Varshini"
};
// Where the story's pieces live on the page, in reading order.
export const letterChapter = { id: "08", slug: "letter", title: "A Letter of Gratitude", kicker: "The last page" };
