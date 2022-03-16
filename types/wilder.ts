export interface Wilder {
  name: string;
  city: string;
  skills: Skill[];
}

export interface Skill {
  title: string;
  votes: number;
}
