
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  text: string;
  initials: string;
  source: string;
}

export interface ContactMethod {
  id: string;
  name: string;
  icon: string;
  href: string;
  color: string;
}
