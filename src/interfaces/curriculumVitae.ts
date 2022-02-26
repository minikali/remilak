export interface Task {
  id: number;
  attributes: {
    createdAt: string;
    locale: string;
    publishedAt: string;
    description: string;
    updatedAt: string;
  };
}

export interface WorkExperience {
  id: number;
  attributes: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    currentPosition: boolean;
    introduction: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    tasks: {
      data: Task[];
    };
  };
}

export interface Skill {
  id: number;
  attributes: {
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Language {
  id: number;
  attributes: {
    tongue: string;
    level: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}

export interface Education {
  id: number;
  attributes: {
    diploma: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}

export interface PictureData {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Formats {
  large: PictureData;
  small: PictureData;
  medium: PictureData;
  thumbnail: PictureData;
}

export interface Picture {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface CurriculumVitae {
  id: number;
  attributes: {
    name: string;
    title: string;
    introduction: string;
    dateOfBirth: string;
    wechatId: string;
    location: string;
    phone: string;
    linkedin: string;
    availability: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    picture: {
      data: Picture;
    };
    educations: {
      data: Education[];
    };
    languages: {
      data: Language[];
    };
    skills: {
      data: Skill[];
    };
    work_experiences: {
      data: WorkExperience[];
    };
  };
}

export default CurriculumVitae;
